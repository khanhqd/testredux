import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    ScrollView, 
    TextInput, 
    AsyncStorage, 
    BackAndroid, 
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

var RequestHelper = require('../Common/RequestHelper');
var Utils = require('../Common/Utils');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop();
}

const popToHome = () => {
    Actions.popTo('staff')
    setTimeout(() => {
        Actions.refresh();
    }, 10);
}

var access_token = '';
var Home_OTP = React.createClass({
    getInitialState() {
        GoogleAnalytics.trackScreenView('OTP');
        return {
            isLoading: false,
            isFocused: true,
            otp: '',
            phone: ''
        }
    },

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
        AsyncStorage.getItem("UserInfo").then((value) => {
            if (value != null && value.length != 0) {
                var info = JSON.parse(value);
                this.setState({
                    phone: info.phone_number
                });
            }
        }).done();
    },

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);
    },

    handleBackAndroid() {
        try {
            popToRoot();
            return true;
        } catch (err) {
            return false;
        }
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

    onInputOtp(text) {
        this.setState({ otp: text })
        if (text.length == 6) {
            Keyboard.dismiss()
            this.ConfirmOTP(text);
        }
    },

    ConfirmOTP(otp) {
        GoogleAnalytics.trackEvent('OTP', 'Confirm OTP Add staff');
        this.setState({ isLoading: true });
        RequestHelper.AcceptAddStaff(this.props.access_token, this.props.staff_phone_number, this.props.access_key, otp)
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    const eventName = "af_staff_otp";
                    appsFlyer.trackEvent(eventName, {}, () => { }, () => { });
                    Actions.popup({ title: Lang.thong_bao(), content: 'Thêm nhân viên thành công !', flag: 'success', onPress_Ok: () => popToHome() });
                }
                else {
                    if (data.status == 401) access_token = '';
                    Utils.onRequestEnd(data);
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    },

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
                                {Lang.them_nhan_vien()}
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
                                    {Lang.nhap_otp_gui_toi_so()} <Text style={{ fontWeight: 'bold' }}>{this.state.phone}</Text> để thêm nhân viên <Text style={{ fontWeight: 'bold' }}>{this.props.staff_phone_number}</Text>
                                </Text>
                            </View>
                            <View style={styles.RegisterForm_FieldEnter}>
                                <TextInput
                                    ref={'textSearch'}
                                    autoCapitalize="none"
                                    autoFocus={false}
                                    placeholder={Lang.ma_xac_minh()}
                                    placeholderTextColor="#c7c7cd"
                                    autoCorrect={false}
                                    returnKeyType={"done"}
                                    keyboardType={"phone-pad"}
                                    onBlur={() => this._onBlur()}
                                    onFocus={() => this._onFocus()}
                                    onChangeText={(text) => this.onInputOtp(text)}
                                    style={styles.RegisterForm_FieldEnter_Input}
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
});

module.exports = Home_OTP;