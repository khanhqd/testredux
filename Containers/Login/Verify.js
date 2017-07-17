/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    StatusBar,
    ScrollView,
    TextInput,
    AsyncStorage,
    AdSupportIOS
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import { TaskReducer } from "../../Reducers/aptReducer"

import Toast from '@remobile/react-native-toast';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import GAID from 'react-native-gaid';
import { AppEventsLogger } from 'react-native-fbsdk';
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf'
import * as Requests from '../Helpers/Requests'

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop()
}

const popToHome = () => {
    Keyboard.dismiss()
    Actions.tabbar()
}

class AppotaView extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    
    state = {
        isFocused: false,
        isLoading: false,
        otp: '',
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_verify_login');
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

    _clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({ otp: '' })
    }


    onInputOtp(text) {
        this.setState({ otp: text })
        if (text.length == 6) {
            Keyboard.dismiss()
            this.VerifyLogin(text);
        }
    }

    VerifyLogin(otp) {
        Keyboard.dismiss()
        this.setState({ isLoading: true })
        let {dispatch} = this.props
        let data = this.props.data
        Requests.Verify_Login(data.token, otp)
            .then((respone) => {
                this.setState({ isLoading: false })
                var account_type = data.account_type
                GoogleAnalytics.trackEvent('ga_login', 'Verify login');
                appsFlyer.trackEvent('af_verify_login', {}, () => { }, () => { });
                AppEventsLogger.logEvent('fb_verify_login', 1)
                Toast.showToast(Lang.dang_nhap_thanh_cong(), 'short', 'center')
                dispatch(taskActionCreators.change_token(data.token))
                // this.TrackClient(data.token)
                AsyncStorage.getItem("Merchant_UI").then((value) => {
                    if (value != null && value.length != 0) {
                        if ((value == 'true' && account_type == 'user') || (value == 'false' && account_type != 'user')) {
                            AsyncStorage.setItem('access_token', data.token).then(() => {
                                AsyncStorage.setItem('Merchant_UI', value == 'true' ? 'false' : 'true').then(() => {
                                    this.props.onSwitchMC();
                                }).done();
                            }).done();
                        }
                        else if ((value == 'false' && account_type == 'user') || (value == 'true' && account_type != 'user')) {
                            AsyncStorage.setItem('access_token', data.token).then(() => {
                                Actions.tabbar();
                            }).done();
                        }
                    }
                    else {
                        if (account_type == 'user') {
                            AsyncStorage.setItem('access_token', data.token).then(() => {
                                Actions.tabbar();
                            }).done();
                        }
                        else {
                            AsyncStorage.setItem('access_token', data.token).then(() => {
                                AsyncStorage.setItem('Merchant_UI', 'true').then(() => {
                                    this.props.onSwitchMC();
                                }).done();
                            }).done();
                        }
                    }
                }).done()

            })
            .catch((error) => {
                this.setState({ isLoading: false })
            })
    }

    TrackClient(access_token) {
        Requests.TrackClient(access_token, this.props.fcm_token, this.props.appsFlyerUID, this.props.appsflyer_idfa, this.props.appsflyer_advertising_id)
            .then((data) => {
                console.log('Track client success')
            })
            .catch((error) => {
                console.log('Track client error')
            })
    }

    render() {
        return (
            <View style={[styles.container, styles.tabAccount, this.props.style]}>
                {renderIf(Platform.OS === 'ios')(
                    <StatusBar barStyle={'light-content'} />
                )}
                {renderIf(Platform.OS === 'android')(
                    <StatusBar backgroundColor={'#1b6614'} />
                )}
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.dang_nhap()}
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
                                    {Lang.xac_minh_tai_khoan()}
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
                </View>
                {renderIf(this.state.isLoading)(
                    <Loading />
                )}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
})

export default connect(mapStateToProps)(AppotaView)
