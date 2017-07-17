import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform,
    Image,
    Keyboard
} from "react-native";
import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Keyboard.dismiss();
    Actions.pop();
}

const hideKeyboard = () => {
    Keyboard.dismiss();
}

class ComingSoon extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: false,
            isFocused: false,
            txtName: props.holder_name ? props.holder_name : '',
            txtStk: props.account_number? props.account_number : '',
            txtBranch: props.branch? props.branch : '',
        }
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_cashout_input_bank');
        appsFlyer.trackEvent('af_cashout_input_bank', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_cashout_input_bank', 1);
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    _onBlur(e) {
        this.setState({ isFocused: false })
    }

    _onFocus(e) {
        this.setState({ isFocused: true })
    }

    _clearTxtStk(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            txtStk: ''
        })
    }

    _clearTxtName(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            txtName: ''
        })
    }

    _clearTxtBranch(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            txtBranch: ''
        })
    }

    focusNextField(nextField) {
        this.refs[nextField].focus();
    }

    onPressCashout() {
        Keyboard.dismiss()
        Actions.cashout_receipt({
            amount: this.props.amount,
            bank_code: this.props.bank_code,
            bank_name: this.props.bank_name,
            bank_account_number: this.state.txtStk,
            bank_holder_name: this.state.txtName,
            bank_branch: this.state.txtBranch,
            method: this.props.method,
            balance: this.props.balance,
            sAmount: this.props.sAmount,
            transaction_fee: this.props.transaction_fee,
            total: this.props.total
        });
    }

    render() {
        var branch = this.props.branch ? this.props.branch : ''
        var holder_name = this.props.holder_name ? this.props.holder_name : ''
        var account_number = this.props.account_number ? this.props.account_number : ''
        return (
            <View style={[styles.container, styles.tabAccount, this.props.style]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.rut_tien()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>

                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView style={styles.FormControl_Scroll} keyboardShouldPersistTaps='always'>
                        <View style={styles.FormControl_Title}>
                            <Text style={styles.FormControl_TitleText}>
                                {Lang.thong_tin().toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.FormControl_Inner}>
                            <View style={styles.FormControl_Profile}>

                                <View style={styles.FormControl_Input_Form}>
                                    <Text style={styles.FormControl_Active}>{Lang.so_tien()}</Text>
                                    <Text style={styles.FormControl_Text_Field}>{this.props.sAmount} VNĐ</Text>
                                    <Image style={styles.FormControl_CheckImg} source={require('../../element/merchant/ic-ok.png')} />
                                </View>
                                <View style={styles.FormControl_Line}></View>
                                <View style={styles.FormControl_Input_Form}>
                                    <Text style={styles.FormControl_Active}>{Lang.ngan_hang()}</Text>
                                    <Text style={styles.FormControl_Text_Field}>{this.props.bank_name}</Text>
                                    <Image style={styles.FormControl_CheckImg} source={require('../../element/merchant/ic-ok.png')} />
                                </View>
                                <View style={styles.FormControl_Line}></View>
                                {renderIf(this.props.method == 'account' && branch.length == 0)(
                                    <View style={styles.FormControl_Input_Form}>
                                        {renderIf(this.state.txtBranch != '')(
                                            <Text style={styles.FormControl_Active}>{Lang.chi_nhanh()}</Text>
                                        )}
                                        <TextInput
                                            ref={'txtBranch'}
                                            autoCapitalize="none"
                                            placeholder={Lang.chi_nhanh()}
                                            value={this.state.txtBranch}
                                            placeholderTextColor="#c7c7cd"
                                            autoCorrect={false}
                                            returnKeyType={"next"}
                                            onBlur={this._onBlur.bind(this)}
                                            onFocus={this._onFocus.bind(this)}
                                            onEndEditing={() => this.setState({ txtBranch: Utils.change_alias(this.state.txtBranch).toUpperCase() })}
                                            onSubmitEditing={() => this.focusNextField('txtName')}
                                            onChangeText={(text) => this.setState({ txtBranch: text })}
                                            style={styles.FormControl_Input_Field}
                                            underlineColorAndroid='rgba(0,0,0,0)'
                                        />
                                        {renderIf(this.state.txtBranch != '' && this.state.isFocused == true)(
                                            <TouchableOpacity onPress={() => this._clearTxtBranch('txtBranch')} style={styles.FormControl_Clear}>
                                                <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_ClearIcon} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                )}
                                {renderIf(this.props.method == 'account' && branch.length > 0)(
                                    <View style={styles.FormControl_Input_Form}>
                                        <Text style={styles.FormControl_Active}>{Lang.chi_nhanh()}</Text>
                                        <Text style={styles.FormControl_Text_Field}>{this.props.branch}</Text>
                                        <Image style={styles.FormControl_CheckImg} source={require('../../element/merchant/ic-ok.png')} />
                                    </View>
                                )}
                                <View style={styles.FormControl_Line}></View>
                                {renderIf(holder_name.length > 0)(
                                    <View style={styles.FormControl_Input_Form}>
                                        <Text style={styles.FormControl_Active}>{Lang.ten_day_du()}</Text>
                                        <Text style={styles.FormControl_Text_Field}>{this.props.holder_name}</Text>
                                        <Image style={styles.FormControl_CheckImg} source={require('../../element/merchant/ic-ok.png')} />
                                    </View>
                                )}
                                {renderIf(holder_name.length == 0)(
                                    <View style={styles.FormControl_Input_Form}>
                                        {renderIf(this.state.txtName != '')(
                                            <Text style={styles.FormControl_Active}>{Lang.ten_day_du()}</Text>
                                        )}
                                        <TextInput
                                            ref={'txtName'}
                                            autoCapitalize="none"
                                            placeholder={Lang.ten_day_du()}
                                            value={this.state.txtName}
                                            placeholderTextColor="#c7c7cd"
                                            autoCorrect={false}
                                            returnKeyType={"next"}
                                            onBlur={this._onBlur.bind(this)}
                                            onFocus={this._onFocus.bind(this)}
                                            onSubmitEditing={() => this.focusNextField('txtStk')}
                                            onEndEditing={() => this.setState({ txtName: Utils.change_alias(this.state.txtName).toUpperCase() })}
                                            onChangeText={(text) => this.setState({ txtName: text })}
                                            style={styles.FormControl_Input_Field}
                                            underlineColorAndroid='rgba(0,0,0,0)'
                                        />
                                        {renderIf(this.state.txtName != '' && this.state.isFocused == true)(
                                            <TouchableOpacity onPress={() => this._clearTxtName('txtName')} style={styles.FormControl_Clear}>
                                                <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_ClearIcon} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                )}
                                <View style={styles.FormControl_Line}></View>
                                {renderIf(account_number.length == 0)(
                                    <View style={styles.FormControl_Input_Form}>
                                        {renderIf(this.state.txtStk != '')(
                                            <Text style={styles.FormControl_Active}>{this.props.method == 'atm' ? Lang.so_the() : Lang.so_tai_khoan()}</Text>
                                        )}
                                        <TextInput
                                            ref={'txtStk'}
                                            autoCapitalize="none"
                                            placeholder={this.props.method == 'atm' ? Lang.so_the() : Lang.so_tai_khoan()}
                                            value={this.state.txtStk}
                                            placeholderTextColor="#c7c7cd"
                                            autoCorrect={false}
                                            returnKeyType={"done"}
                                            onBlur={this._onBlur.bind(this)}
                                            onFocus={this._onFocus.bind(this)}
                                            onEndEditing={() => this.setState({ txtStk: Utils.change_alias(this.state.txtStk).toUpperCase() })}
                                            onSubmitEditing={() => this.onPressCashout()}
                                            onChangeText={(text) => this.setState({ txtStk: text })}
                                            style={styles.FormControl_Input_Field}
                                            underlineColorAndroid='rgba(0,0,0,0)'
                                        />
                                        {renderIf(this.state.txtStk != '' && this.state.isFocused == true)(
                                            <TouchableOpacity onPress={() => this._clearTxtStk('txtStk')} style={styles.FormControl_Clear}>
                                                <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_ClearIcon} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                )}
                                {renderIf(account_number.length > 0)(
                                    <View style={styles.FormControl_Input_Form}>
                                        <Text style={styles.FormControl_Active}>{this.props.method == 'atm' ? Lang.so_the() : Lang.so_tai_khoan()}</Text>
                                        <Text style={styles.FormControl_Text_Field}>{this.props.account_number}</Text>
                                        <Image style={styles.FormControl_CheckImg} source={require('../../element/merchant/ic-ok.png')} />
                                    </View>
                                )}
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.FormControl_Button}>
                        {renderIf(this.state.txtName != '' && this.state.txtStk != '')(
                            <TouchableOpacity style={styles.FormControl_ButtonTouch} onPress={() => this.onPressCashout()}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.rut_tien().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {renderIf(this.state.txtName == '' || this.state.txtStk == '')(
                            <View style={styles.FormControl_ButtonTouchDisable}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.rut_tien().toUpperCase()}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
                {renderIf(Platform.OS == 'ios')(
                    <KeyboardSpacer />
                )}
            </View>
        );
    }
};


export default ComingSoon;
