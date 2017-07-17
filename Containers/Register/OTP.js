import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform,
    Keyboard
} from "react-native";
import { Actions } from "react-native-router-flux";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import renderIf from '../Common/renderIf';
import TimerMixin from 'react-timer-mixin';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import * as Requests from '../Helpers/Requests'

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');

var CountDown = React.createClass({
    mixins: [TimerMixin],
    getInitialState: function () {
        return {
            time: this.props.time ? this.props.time : 60,
            disabled: true
        };
    },
    componentDidMount() {
        this._countdown();
    },
    render() {
        var style = [styles.text];
        var component;
        if (this.state.disabled) {
            style.push({ color: 'gray' });
            style.push(this.props.disabledTextStyle);
            component =
                <View style={styles.RegisterForm_FieldAction}>
                    <Text style={styles.RegisterForm_FieldAction_Title}>{Lang.chua_nhan_duoc_otp()}</Text>
                    <Text style={styles.RegisterForm_FieldAction_Time}>
                        {this.props.text}&nbsp;
                        <Text style={styles.RegisterForm_FieldAction_CountDown}>
                            {this.state.time} {Lang.giay()}
                        </Text>
                    </Text>
                </View>
        } else {
            component =
                <View style={styles.RegisterForm_FieldAction}>
                    <Text style={styles.RegisterForm_FieldAction_Title}>{Lang.chua_nhan_duoc_otp()}</Text>
                    <View style={styles.RegisterForm_FieldAction_Button}>
                        <TouchableOpacity style={styles.RegisterForm_ButtonAction} onPress={() => this.props.onPress()}>
                            <Text style={styles.RegisterForm_ButtonActionText}>
                                {Lang.gui_lai().toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.RegisterForm_ButtonAction} onPress={() => Actions.pop()}>
                            <Text style={styles.RegisterForm_ButtonActionText}>
                                {Lang.doi_so().toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
        }
        return (
            component
        )
    },
    _onPress() {
        if (this.state.disabled) {
            //nothing
        } else {
            this.setState({ disabled: true });
            this._countdown();
            if (this.props.onPress) {
                this.props.onPress();
            }
        }
    },

    _countdown() {
        var timer = function () {
            var time = this.state.time - 1;
            this.setState({ time: time });
            if (time > 0) {
                this.setTimeout(timer, 1000);
            } else {
                this.setState({ disabled: false });
                this.setState({ time: this.props.time ? this.props.time : 60 });
            }
        };
        this.setTimeout(timer.bind(this), 1000);
    }
});

const popToRoot = () => {
    Actions.popTo("login");
}

var Register_Step_Verify = React.createClass({
    getInitialState() {
        return {
            isFocused: true,
            otp: ''
        }
    },

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_register_otp');
        // yêu cầu mã otp
        this.GetOTP();
    },

    GetOTP() {
        Requests.GetOTP(this.props.phone)
            .then((data) => {
                console.log('OTP_SS=' + JSON.stringify(data))
            })
            .catch((error) => {
                console.log('OTP_ER=' + error)
            })
    },

    _onBlur(e) {
        this.setState({ isFocused: false })
    },

    _onFocus(e) {
        this.setState({ isFocused: true })
    },
    _clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({ otp: '' })
    },

    sendAgain() {
        this.GetOTP();
    },

    onInputOtp(text) {
        this.setState({ otp: text })
        if (text.length == 6) {
            this.ConfirmOTP(text);
        }
    },

    ConfirmOTP(otp) {
        Keyboard.dismiss()
        Requests.Verify_Register(otp, this.props.phone)
            .then((data) => {
                GoogleAnalytics.trackEvent('ga_register', 'Confirm OTP');
                appsFlyer.trackEvent('af_register_otp', {}, () => { }, () => { });
                AppEventsLogger.logEvent('fb_register_otp', 1);
                Actions.register_password({ otp: otp, phone: this.props.phone });
            })
            .catch((error) => {
            })
    },

    render() {
        return (
            <View style={[styles.container, styles.tabAccount, this.props.style]}>
                <View style={styles.RegisterForm}>
                    <View style={styles.RegisterForm_Inner}>
                        <View style={styles.RegisterForm_Field}>
                            <View style={styles.RegisterForm_FieldTitle}>
                                <Text style={styles.RegisterForm_FieldTitle_Text}>
                                    {Lang.ma_xac_minh()}
                                </Text>
                            </View>
                            <View style={styles.RegisterForm_FieldInfo}>
                                <Text style={styles.RegisterForm_FieldInfo_Text}>
                                    {Lang.nhap_otp_gui_toi_so()} {this.props.phone}
                                </Text>
                            </View>
                            <View style={styles.RegisterForm_FieldEnter}>
                                <TextInput
                                    ref={'textSearch'}
                                    autoCapitalize="none"
                                    autoFocus={true}
                                    placeholder={Lang.ma_xac_minh()}
                                    placeholderTextColor="#c7c7cd"
                                    autoCorrect={false}
                                    returnKeyType={"done"}
                                    onBlur={() => this._onBlur()}
                                    onFocus={() => this._onFocus()}
                                    value={this.state.otp}
                                    keyboardType={"phone-pad"}
                                    onChangeText={(text) => this.onInputOtp(text)}
                                    style={styles.RegisterForm_FieldEnter_Input}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                />
                                {renderIf(this.state.otp != '')(
                                    <TouchableOpacity onPress={() => this._clearText('textSearch')} style={styles.Input_Clear}>
                                        <Image source={require('../../element/form/ic-clear.png')} style={styles.Input_ClearIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>

                            <View style={styles.RegisterForm_FieldCountdown}>
                                <CountDown
                                    onPress={this.sendAgain} //default null 
                                    text={Lang.yeu_cau_otp_sau()} //default '' 
                                    time={60} //default 60 
                                    buttonStyle={{ padding: 10 }}
                                    textStyle={{ color: '#00a9ff' }} //default black 
                                    disabledTextStyle={{ color: '#c7c7cd' }} //default gray 
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.RegisterForm_Button}>
                        <TouchableOpacity style={styles.RegisterForm_ButtonAnother} onPress={popToRoot}>
                            <Text style={styles.RegisterForm_ButtonAnotherText}>
                                {Lang.luc_khac()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {renderIf(Platform.OS == 'ios')(
                        <KeyboardSpacer />
                    )}
                </View>
                <View style={styles.headerTransparent}>
                    <View style={styles.headerTransparentInner}>
                        <View style={styles.headerTransparent_Left}>
                            <TouchableOpacity onPress={() => {Keyboard.dismiss(); Actions.pop()}}>
                                <Image source={require('../../element/nav-bar/nav-back-gray.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerTransparent_Title}>
                        </View>
                        <View style={styles.headerTransparent_Right}>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = Register_Step_Verify;