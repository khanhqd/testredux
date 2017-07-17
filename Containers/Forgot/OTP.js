import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    BackAndroid,
    Platform,
    Keyboard
} from "react-native";
import { Actions } from "react-native-router-flux";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import renderIf from '../Common/renderIf';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop();
}

class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isFocused: true,
            otp: '',
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_forgot_otp');
        AppEventsLogger.logEvent('fb_forgot_otp', 1);
        appsFlyer.trackEvent('af_forgot_otp', {}, () => { }, () => { });
    }

    _onBlur(e) {
        this.setState({ isFocused: false })
    }

    _onFocus(e) {
        this.setState({ isFocused: true })
    }

    _clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({ otp: '' })
    }

    onInputOtp(text) {
        this.setState({ otp: text })
        if (text.length == 6) {
            Keyboard.dismiss()
            Actions.forgot_password({
                access_key: this.props.access_key, 
                phone_number: this.props.phone_number, 
                otp: text
            });
        }
    }

    render() {
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
                                {Lang.quen_mat_khau()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
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
                                    {Lang.nhap_otp_gui_toi_so()} <Text style={{ fontWeight: 'bold' }}>{this.props.phone_number}</Text>
                                </Text>
                            </View>
                            <View style={styles.RegisterForm_FieldEnter}>
                                <TextInput
                                    ref={'textOTP'}
                                    autoCapitalize="none"
                                    autoFocus = {true}
                                    placeholder={Lang.ma_xac_minh()}
                                    placeholderTextColor = "#c7c7cd"
                                    autoCorrect={false}
                                    returnKeyType = {"done"}
                                    onBlur={this._onBlur.bind(this) }
                                    onFocus={this._onFocus.bind(this) }
                                    keyboardType={"phone-pad"}
                                    value={this.state.otp}
                                    onChangeText={(text) => this.onInputOtp(text) }
                                    style={styles.RegisterForm_FieldEnter_Input}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    />
                                {renderIf(this.state.text != '')(
                                    <TouchableOpacity onPress={() => this._clearText('textOTP') } style={styles.Input_Clear}>
                                        <Image source={require('../../element/form/ic-clear.png') } style={styles.Input_ClearIcon}/>
                                    </TouchableOpacity>
                                ) }
                            </View>                       
                        </View>
                    </View>
                    {renderIf(Platform.OS == 'ios')(
                        <KeyboardSpacer />
                    )}
                </View>
            </View>
        );
    }
}

module.exports = AppotaView;