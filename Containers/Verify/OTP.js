import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform,
    Keyboard,
    BackAndroid,
    AsyncStorage
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import KeyboardSpacer from 'react-native-keyboard-spacer';
import renderIf from '../Common/renderIf';
import TimerMixin from 'react-timer-mixin';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var styles = require('../Common/style.js');
var RequestHelper = require('../Common/RequestHelper');
import Toast from '@remobile/react-native-toast';
var Utils = require('../Common/Utils');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');

const popToRoot = () => {
    Actions.pop();
}

class AppotaView extends React.Component {
    constructor(props, context) {
        GoogleAnalytics.trackScreenView('OTP');
        super(props, context)
        this.state = {
            isLoading: false,
            isFocused: true,
            otp: '',
            device_token: '',
            user_id: props.verify.user_id,
            username: props.verify.username,
            email: props.verify.email,
            cmnd_number: props.verify.cmnd_number,
            fullname: props.verify.fullname,
            address: props.verify.address,
            verify_info: props.verify.verify_info,
            password: props.password,
            phone: props.phone,
            isMerge: props.isMerge
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
        this.GetOTP();
    }

    GetOTP() {
        RequestHelper.GetOTP(this.state.phone)
            .then((data) => {
                if (data.status == 200) {
                }
                else {
                    var err = JSON.parse(data._bodyText);
                    Toast.showToast(err.error.message, "long", "center");
                }
            })
            .catch((error) => {
                Utils.onNetworkError(error.toString());
            })
            .done();
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
        let {access_token} = this.props
        RequestHelper.ConfirmOtp(access_token, this.props.phone, otp, 'register')
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    if (this.state.isMerge) {
                        this.Merge();
                    }
                    else {
                        this.Verify();
                    }
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
    }

    Verify() {
        RequestHelper.Verify(this.state.user_id, this.state.username, this.state.password, this.state.phone, this.state.email, this.state.cmnd_number, this.state.fullname, this.state.address, this.state.verify_info, '')
            .then((data) => {
                if (data.status == 201) {
                    GoogleAnalytics.trackEvent('ga_verify_appota', 'Login success');
                    appsFlyer.trackEvent('af_verify_appota', {}, () => { }, () => { });
                    AppEventsLogger.logEvent('fb_verify_appota', 1);
                    this.Login();
                }
                else {
                    var err = JSON.parse(data._bodyText);
                    Toast.showToast(err.error.message, "short", "center");
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    Merge() {
        RequestHelper.Merge(this.state.user_id, this.state.username, this.state.password, this.state.phone, this.state.email, this.state.cmnd_number, this.state.fullname, this.state.address, this.state.verify_info, '')
            .then((data) => {
                if (data.status == 200) {
                    GoogleAnalytics.trackEvent('ga_merge_appota', 'Login success');
                    appsFlyer.trackEvent('af_merge_appota', {}, () => { }, () => { });
                    AppEventsLogger.logEvent('fb_merge_appota', 1);
                    this.Login();
                }
                else {
                    var err = JSON.parse(data._bodyText);
                    Toast.showToast(err.error.message, "short", "center");
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    Login() {
        RequestHelper.Login(this.state.username, this.state.password, this.state.device_token)
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    Toast.showToast(Lang.dang_nhap_thanh_cong(), 'short', 'center');
                    GoogleAnalytics.trackEvent('ga_login', 'Login success');
                    appsFlyer.trackEvent('af_login', {}, () => { }, () => { });
                    AppEventsLogger.logEvent('fb_login', 1);
                    var token = JSON.parse(data._bodyText);
                    var account_type = token.account_type
                    let { dispatch } = this.props
                    dispatch(taskActionCreators.change_token(token.token))
                    this.TrackClient(token.token);
                    AsyncStorage.setItem('access_token', token.token).then(() => {
                        Actions.tabbar();
                    }).done();
                }
                else if (data.status == 400) {
                    Actions.popup({ title: Lang.thong_bao(), content: Lang.login_fail(), flag: 'error' });
                }
                else {
                    var err = JSON.parse(data._bodyText);
                    Actions.popup({ title: Lang.thong_bao(), content: err.error.message, flag: 'error' });
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    TrackClient(access_token) {
        let {fcm_token, appsflyer} = this.props
        RequestHelper.TrackClient(access_token, fcm_token, appsflyer.appsFlyerUID, appsflyer.appsflyer_idfa, appsflyer.appsflyer_advertising_id)
            .then((data) => {
                console.log('REGISTER TrackClient' + JSON.stringify(data._bodyText) +
                    '\nDeivice token = ' + fcm_token +
                    '\nappsFlyerUID=' + appsflyer.appsFlyerUID +
                    '\nappsflyer_idfa=' + appsflyer.appsflyer_idfa +
                    '\nappsflyer_advertising_id=' + appsflyer.appsflyer_advertising_id);
            })
            .catch((error) => {
                console.log('catch error');
            })
            .done();
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
                                OTP {Lang.dang_ky().toLowerCase()}
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
                                    {Lang.nhap_otp_gui_toi_so()}
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
                                    keyboardType={"phone-pad"}
                                    onBlur={this._onBlur.bind(this)}
                                    onFocus={this._onFocus.bind(this)}
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
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    appsflyer: state.taskState.appsflyer,
    fcm_token: state.taskState.fcm_token,
})

export default connect(mapStateToProps)(AppotaView)