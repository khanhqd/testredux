import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    Platform,
    TextInput,
    Keyboard
} from "react-native";
import { Actions, Modal } from "react-native-router-flux";
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import renderIf from '../Common/renderIf'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import TimerMixin from 'react-timer-mixin';
import appsFlyer from 'react-native-appsflyer';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import { AppEventsLogger } from 'react-native-fbsdk';

var styles = require('../Common/style.js');
var RequestHelper = require('../Common/RequestHelper');
var Utils = require('../Common/Utils');
var Loading = require('../Common/Loading');
var Lang = require('../Common/Lang');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop();
}

class PaymentOrders extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isFocused: false,
            isLoading: false,
            sAmount: '',
            amount: '',
            cashback_percent: this.props.cashback_percent,
            cashback_amount: 0,
            message: ''
        }
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
            amount: fieldName == 'amount' ? '' : this.state.amount,
            sAmount: fieldName == 'amount' ? '' : this.state.sAmount,
            message: fieldName == 'message' ? '' : this.state.message,
        })
    }

    focusNextField(nextField) {
        this.refs[nextField].focus();
    }

    onTextChange(text) {
        var _amount = Utils.replaceAll(text, '.', '');
        this.setState({
            cashback_amount: parseInt(_amount) * this.props.cashback_percent / 100,
            amount: _amount,
            sAmount: Utils.toDotString(parseInt(_amount)).toString() == 'NaN' ? '0' : Utils.toDotString(parseInt(_amount))
        })
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_payment_order');
    }

    confirmPayment() {
        Keyboard.dismiss()
        if (this.state.amount.length == 0) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.nhap_so_tien(), flag: 'error' });
            return;
        }

        if (parseInt(this.state.amount) > parseInt(this.props.balance)) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.khong_du_tien(), flag: 'error' });
            return;
        }

        Actions.merchant_receipt({
            title: Lang.thanh_toan(),
            phone_customer: this.props.phone,
            cashback_percent: null,
            amount: this.state.amount,
            sAmount: this.state.sAmount,
            message: this.state.message,
            onPress: () => this.PaymentOrder()
        });
    }

    PaymentOrder() {
        this.setState({ isLoading: true })
        let { access_token, user_infor } = this.props
        TimerMixin.setTimeout(() => {
            RequestHelper.RequestPaymentOrder(access_token, this.props.phone, this.state.amount, this.state.message)
                .then((data) => {
                    this.setState({ isLoading: false });
                    if (data.status == 200) {
                        appsFlyer.trackEvent('af_payment_order', {}, () => { }, () => { });
                        AppEventsLogger.logEvent('fb_payment_order', 1);
                        var trans = JSON.parse(data._bodyText)
                        if (user_infor.pay_verify_method == 'NONE')
                            Actions.protected({ transaction_id: trans.transaction_id })
                        else
                            Actions.payment_orders_otp({ transaction_id: trans.transaction_id })
                    }
                    else {
                        Utils.onRequestEnd(data);
                    }
                })
                .catch((error) => {
                    this.setState({ isLoading: false });
                    Utils.onNetworkError(error.toString());
                })
                .done();
        }, 500);
    }

    render() {
        return (
            <View {...this.props} style={[styles.container, styles.tabHome]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={() => { popToRoot() }}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.thanh_toan()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView style={styles.FormControl_Scroll} keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
                        <View style={styles.FormControl_Title}>
                            <Text style={styles.FormControl_TitleText}>
                                {Lang.thong_tin().toUpperCase()} {Lang.thanh_toan().toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.FormControl_Inner}>
                            <View style={styles.FormControl_Profile}>
                                <View style={styles.FormControl_Input_Form}>
                                    <Text style={styles.FormControl_Active}>{Lang.so_dien_thoai()}</Text>
                                    <TextInput
                                        ref={'phone'}
                                        autoCapitalize="none"
                                        placeholder={Lang.so_dien_thoai()}
                                        value={this.props.phone}
                                        placeholderTextColor="#c7c7cd"
                                        autoCorrect={false}
                                        editable={false}
                                        style={styles.FormControl_Input_Field}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                    />
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
                                        returnKeyType={"next"}
                                        onBlur={this._onBlur.bind(this)}
                                        onFocus={this._onFocus.bind(this)}
                                        onSubmitEditing={this.focusNextField.bind(this, 'message')}
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
                                        onBlur={this._onBlur.bind(this)}
                                        onFocus={this._onFocus.bind(this)}
                                        onSubmitEditing={this.confirmPayment.bind(this)}
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
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.FormControl_Button}>
                        {renderIf(this.props.phone != '' && this.state.amount != '')(
                            <TouchableOpacity style={styles.FormControl_ButtonTouch} onPress={this.confirmPayment.bind(this)}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.thanh_toan().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {renderIf(this.props.phone == '' || this.state.amount == '')(
                            <View style={styles.FormControl_ButtonTouchDisable} >
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.thanh_toan().toUpperCase()}
                                </Text>
                            </View>
                        )}
                    </View>
                    {renderIf(this.state.isLoading)(
                        <Loading />
                    )}
                </View>
                {renderIf(Platform.OS == 'ios')(
                    <KeyboardSpacer />
                )}
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
})

export default connect(mapStateToProps)(PaymentOrders)