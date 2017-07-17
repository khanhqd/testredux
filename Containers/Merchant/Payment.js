import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    AsyncStorage,
    ScrollView,
    TextInput,
    Image,
    Keyboard
} from "react-native";
import { Actions } from 'react-native-router-flux';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RNQRCode from 'react-native-qrcode';
import appsFlyer from 'react-native-appsflyer';

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading2');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

class ThanhToan extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isFocused: false,
            isLoading: false,
            text: '',
            phone: '',
            display_name: '',
            sAmount: '',
            amount: '',
            cashback_amount: 0,
            cashback_percent: this.props.cashback_percent,
            message: ''
        }
        Text.defaultProps.allowFontScaling=false;
    }

    confirmThanhToan() {
        Keyboard.dismiss()
        if (this.state.phone.length < 9) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.nhap_so_dien_thoai(), flag: 'error' });
            return;
        }
        if (this.state.amount.length == 0) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.nhap_so_tien(), flag: 'error' });
            return;
        }
        if (parseInt(this.state.amount) < 100000) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.nhap_so_tien_min(100), flag: 'error' });
            return;
        }

        Actions.merchant_receipt({
            title: Lang.gui_yeu_cau(),
            phone_customer: this.state.phone,
            cashback_percent: Utils.toFixed(this.props.cashback_percent, 2),
            amount: this.state.amount,
            sAmount: this.state.sAmount,
            message: this.state.message,
            onPress: () => this.thanhtoan()
        });
    }

    thanhtoan() {
        this.setState({ isLoading: true });
        setTimeout(() => {
            RequestHelper.CreatePaymentOrder(this.props.access_token, this.state.phone, this.state.amount)
                .then((data) => {
                    this.setState({ isLoading: false });
                    if (data.status == 200) {
                        const eventName = "af_merchant_request_payment";
                        appsFlyer.trackEvent(eventName, {}, () => { }, () => { });
                        var trans = JSON.parse(data._bodyText);
                        Actions.popup({ title: Lang.thong_bao(), content: 'Gửi yêu cầu thanh toán tới khách hàng ' + this.state.phone + ' với số tiền ' + this.state.sAmount + ' đ thành công.\nMã giao dịch: ' + trans.transaction_id, flag: 'success' });
                    }
                    else {
                        if (data.status == 401) this.props.access_token = '';
                        Utils.onRequestEnd(data, '');
                    }
                })
                .catch((error) => {
                    this.setState({ isLoading: false });
                    Utils.onNetworkError(error.toString());
                })
                .done();
        }, 500);
    }

    FindUser() {
        RequestHelper.FindUser(this.props.access_token, this.state.phone)
            .then((data) => {
                if (data.status == 200) {
                    var user = JSON.parse(data._bodyText);
                    this.setState({
                        display_name: (user.fullname.length != 0 ? user.fullname : (user.username != this.state.phone ? user.username : ''))
                    });
                }
            })
            .catch((error) => {
            })
            .done();
    }

    _onBlur(e) {
        this.setState({ isFocused: false })
    }

    _onFocus(e) {
        this.setState({ isFocused: true })
    }

    clearTextInput(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            display_name: fieldName == 'phone' ? '' : this.state.display_name,
            phone: fieldName == 'phone' ? '' : this.state.phone,
            amount: fieldName == 'amount' ? '' : this.state.amount,
            sAmount: fieldName == 'amount' ? '' : this.state.sAmount,
            message: fieldName == 'message' ? '' : this.state.message,
        })
    }

    focusNextField(nextField) {
        this.refs[nextField].focus();
    }

    onTotalMoneyChange(text) {
        var iMoney = (text.length == 0) ? 0 : parseInt(text);
        this.setState({ amount: (text), cashback_amount: iMoney * this.props.cashback_percent / 100 })
    }

    onTextChange(text) {
        var _amount = Utils.replaceAll(text, '.', '');
        this.setState({
            cashback_amount: parseInt(_amount) * this.props.cashback_percent / 100,
            amount: _amount,
            sAmount: Utils.toDotString(parseInt(_amount)).toString() == 'NaN' ? '0' : Utils.toDotString(parseInt(_amount))
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.FormControl_Scroll} keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
                    <View style={styles.FormControl_Title}>
                        <Text style={styles.FormControl_TitleText}>
                            {Lang.thong_tin().toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.FormControl_Inner}>
                        <View style={styles.FormControl_Profile}>
                            <View style={styles.FormControl_Input_Form}>
                                {renderIf(this.state.phone != '')(
                                    <Text style={styles.FormControl_Active}>{Lang.so_dien_thoai()} {this.state.display_name.length == 0 ? '' : '- ' + this.state.display_name}</Text>
                                )}
                                <TextInput
                                    ref={'phone'}
                                    autoCapitalize="none"
                                    placeholder={Lang.so_dien_thoai()}
                                    value={this.state.phone}
                                    placeholderTextColor="#c7c7cd"
                                    autoCorrect={false}
                                    keyboardType={"phone-pad"}
                                    returnKeyType={"next"}
                                    onBlur={this._onBlur.bind(this)}
                                    onFocus={this._onFocus.bind(this)}
                                    onEndEditing={this.FindUser.bind(this)}
                                    onSubmitEditing={() => { this.focusNextField('amount'); }}
                                    onChangeText={(text) => this.setState({ phone: text, display_name: '' })}
                                    style={styles.FormControl_Input_Field}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                />
                                {renderIf(this.state.phone != '' && this.state.isFocused == true)(
                                    <TouchableOpacity onPress={() => this.clearTextInput('phone')} style={styles.FormControl_Clear}>
                                        <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_ClearIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={styles.FormControl_Line}></View>
                            <View style={styles.FormControl_Input_Form}>
                                {renderIf(this.state.amount != '')(
                                    <Text style={styles.FormControl_Active}>{Lang.so_tien()}</Text>
                                )}
                                <TextInput
                                    ref={'amount'}
                                    autoCapitalize="none"
                                    placeholder={Lang.so_tien()}
                                    value={this.state.sAmount}
                                    placeholderTextColor="#c7c7cd"
                                    autoCorrect={false}
                                    keyboardType={"phone-pad"}
                                    returnKeyType={"done"}
                                    onBlur={() => this._onBlur()}
                                    onFocus={() => this._onFocus()}
                                    onSubmitEditing={() => this.Cashback()}
                                    onChangeText={(text) => this.onTextChange(text)}
                                    style={styles.FormControl_Input_Field}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                />
                                {renderIf(this.state.amount != '' && this.state.isFocused == true)(
                                    <TouchableOpacity onPress={() => this.clearTextInput('amount')} style={styles.FormControl_Clear}>
                                        <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_ClearIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={styles.FormControl_Line}></View>
                            <View style={styles.FormControl_Input_Form}>
                                {renderIf(this.state.message != '')(
                                    <Text style={styles.FormControl_Active}>{Lang.noi_dung()} ({this.state.message.length}/80)</Text>
                                )}
                                <TextInput
                                    ref={'message'}
                                    autoCapitalize="none"
                                    autoFocus={false}
                                    placeholder={Lang.noi_dung()}
                                    maxLength={80}
                                    placeholderTextColor="rgba(0,0,0,0.3)"
                                    value={this.state.message}
                                    multiline={true}
                                    autoCorrect={false}
                                    returnKeyType={"done"}
                                    onBlur={() => this._onBlur()}
                                    onFocus={() => this._onFocus()}
                                    onSubmitEditing={() => this.Cashback()}
                                    onChangeText={(message) => this.setState({ message })}
                                    style={styles.FormControl_Input_Field}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                />
                                {renderIf(this.state.message != '' && this.state.isFocused == true)(
                                    <TouchableOpacity onPress={() => this.clearTextInput('message')} style={styles.FormControl_Clear}>
                                        <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_ClearIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={styles.FormControl_Line}></View>
                            <View style={styles.FormControl_Input_Form}>
                                <Text style={styles.FormControl_Active}>{Lang.so_tien_hoan_lai()} ({Utils.toFixed(this.props.cashback_percent, 2)}%)</Text>
                                <Text style={styles.FormControl_Text_Field}>{Utils.number_format(this.state.cashback_amount, '.', '.')}đ</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.FormControl_Note}>
                        <Text style={styles.FormControl_NoteText}>
                            {Lang.note_cashback_1()}
                        </Text>
                    </View>
                </ScrollView>
                <View style={styles.FormControl_Button}>
                    {renderIf(this.state.phone != '' && this.state.amount != '')(
                        <TouchableOpacity style={styles.FormControl_ButtonTouch} onPress={() => this.confirmThanhToan()}>
                            <Text style={styles.FormControl_ButtonText}>
                                {Lang.yeu_cau_thanh_toan().toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {renderIf(this.state.phone == '' || this.state.amount == '')(
                        <View style={styles.FormControl_ButtonTouchDisable} >
                            <Text style={styles.FormControl_ButtonText}>
                                {Lang.yeu_cau_thanh_toan().toUpperCase()}
                            </Text>
                        </View>
                    )}
                </View>
                {renderIf(this.state.isLoading)(
                    <Loading />
                )}
            </View>
        );
    }
};

export default ThanhToan;
