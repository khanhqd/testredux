import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
    BackAndroid,
    Platform,
    Keyboard
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import KeyboardSpacer from 'react-native-keyboard-spacer';
import renderIf from '../Common/renderIf';
import TimerMixin from 'react-timer-mixin';
import Toast from '@remobile/react-native-toast';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import * as Requests from '../Helpers/Requests'

var Utils = require('../Common/Utils');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop();
}

const popToHome = () => {
    Actions.home({ type: 'reset' })
    setTimeout(() => {
        Actions.refresh();
    }, 10);
}

class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: false,
            isFocused: true,
            otp: '',
            phone: props.user_infor.phone_number ? props.user_infor.phone_number : ''
        }
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
        GoogleAnalytics.trackScreenView('ga_buy_card_otp');
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);
    }

    handleBackAndroid() {
        try {
            popToRoot();
            return true;
        } catch (err) {
            return false;
        }
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
            this.ConfirmOTP(text);
        }
    }

    ConfirmOTP(otp) {
        this.setState({ isLoading: true });
        let { access_token } = this.props
        Requests.Verify_transaction(access_token, this.props.transaction_id, otp, 'OTP')
            .then((data) => {
                this.setState({ isLoading: false });
                GoogleAnalytics.trackEvent('ga_buy_card', 'Confirm OTP');
                appsFlyer.trackEvent('af_buy_card_otp', {}, () => { }, () => { });
                AppEventsLogger.logEvent('fb_buy_card_otp', 1);
                Actions.buy_cards_success({ cards: JSON.stringify(data) });
            })
            .catch((error) => {
                this.setState({ isLoading: false })
            })
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
                                {Lang.mua_the2()}
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
                                    {Lang.nhap_otp_gui_toi_so()} <Text style={{ fontWeight: 'bold' }}>{this.state.phone}</Text>
                                </Text>
                            </View>
                            <View style={styles.RegisterForm_FieldEnter}>
                                <TextInput
                                    ref={'textSearch'}
                                    autoCapitalize="none"
                                    placeholder={Lang.ma_xac_minh()}
                                    placeholderTextColor="#c7c7cd"
                                    autoCorrect={false}
                                    returnKeyType={"done"}
                                    keyboardType={"phone-pad"}
                                    onBlur={() => this._onBlur()}
                                    onFocus={() => this._onFocus()}
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
                        </View>
                    </View>
                    {renderIf(Platform.OS == 'ios')(
                        <KeyboardSpacer />
                    )}
                    {renderIf(this.state.isLoading)(
                        <Loading />
                    )}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
})

export default connect(mapStateToProps)(AppotaView)