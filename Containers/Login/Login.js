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
    Keyboard.dismiss();
    Actions.tabbar();
}

class AppotaView extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    state = {
        isFocused: false,
        isLoading: false,
        user_name: '',
        password: '',
        appsFlyerUID: '',
        appsflyer_idfa: '',
        appsflyer_advertising_id: ''
    }

    componentWillMount() {
        AsyncStorage.getItem("login_phone").then((value) => {
            if (value != null && value.length != 0) {
                this.setState({
                    user_name: value
                })
            }
        }).done()
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_login');
        let { dispatch } = this.props
        AsyncStorage.removeItem('access_token')
        dispatch(taskActionCreators.clear_all_state())
        setTimeout(() => {
            if (Platform.OS == 'ios') {
                AdSupportIOS.getAdvertisingId(
                    this._onDeviceIDSuccess,
                    this._onDeviceIDFailure
                );
            }
            else if (Platform.OS == 'android') {
                GAID.getAdvertisingInfo().then(info => {
                    this.setState({
                        appsflyer_advertising_id: info.advertisingId
                    });
                })
                    .catch(err => {
                    });
            }

            appsFlyer.getAppsFlyerUID((error, appsFlyerUID) => {
                if (error) {
                } else {
                    this.setState({
                        appsFlyerUID: appsFlyerUID
                    });
                }
            })
        }, 200);
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    _onDeviceIDSuccess = (deviceID) => {
        this.setState({
            appsflyer_idfa: deviceID,
        });
    };

    _onDeviceIDFailure = (e) => {
        this.setState({
            appsflyer_idfa: 'error',
        });
    };

    _onBlur(e) {
        this.setState({ isFocused: false })
    }

    _onFocus(e) {
        this.setState({ isFocused: true })
    }

    focusNextField(nextField) {
        this.refs[nextField].focus()
    }

    clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            user_name: fieldName == 'user_name' ? '' : this.state.user_name,
            password: fieldName == 'password' ? '' : this.state.password
        });
    }

    onPressRegister() {
        let { dispatch, appsflyer } = this.props
        if (appsflyer.appsFlyerUID.length == 0) {
            dispatch(taskActionCreators.change_appsflyer({
                appsFlyerUID: this.state.appsFlyerUID,
                appsflyer_idfa: this.state.appsflyer_idfa,
                appsflyer_advertising_id: this.state.appsflyer_advertising_id
            }))
        }
        Actions.register()
    }

    Login() {
        Keyboard.dismiss()
        AsyncStorage.setItem('login_phone', this.state.user_name)
        this.setState({ isLoading: true })
        Requests.Login(this.state.user_name, this.state.password)
            .then((data) => {
                this.setState({ isLoading: false })
                // if (data.token_status == 'verified') {
                    this.TrackClient(data.token)
                    var account_type = data.account_type
                    GoogleAnalytics.trackEvent('ga_login', 'Login success');
                    appsFlyer.trackEvent('af_login', {}, () => { }, () => { });
                    AppEventsLogger.logEvent('fb_login', 1);
                    Toast.showToast(Lang.dang_nhap_thanh_cong(), 'short', 'center')
                    let { dispatch } = this.props
                    dispatch(taskActionCreators.change_token(data.token))
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
                // }
                // else {
                //     Actions.verify_login({
                //         data: data,
                //         fcm_token: this.props.fcm_token,
                //         appsFlyerUID: this.state.appsFlyerUID,
                //         appsflyer_idfa: this.state.appsflyer_idfa,
                //         appsflyer_advertising_id: this.state.appsflyer_advertising_id
                //     })
                // }
            })
            .catch((error) => {
                this.setState({ isLoading: false })
            })
    }

    TrackClient(access_token) {
        Requests.TrackClient(access_token, this.props.fcm_token, this.state.appsFlyerUID, this.state.appsflyer_idfa, this.state.appsflyer_advertising_id)
            .then((data) => {
                console.log('Track client success')
            })
            .catch((error) => {
                console.log('Track client error')
            })
    }

    render() {
        return (
            <View style={[styles.container, styles.tabAccount]}>
                {renderIf(Platform.OS === 'ios')(
                    <StatusBar barStyle={'default'} />
                )}
                {renderIf(Platform.OS === 'android')(
                    <StatusBar backgroundColor={'#1b6614'} />
                )}
                <View style={styles.LoginForm}>
                    <View style={styles.LoginForm_Scroll} >
                        <View style={styles.LoginForm_Inner}>
                            <KeyboardAvoidingView keyboardVerticalOffset={-300} behavior={'height'}>
                                <ScrollView keyboardShouldPersistTaps='always'>
                                    <View style={styles.LoginForm_Logo}>
                                        <Image source={require('../../element/Appota.png')} style={styles.LoginForm_LogoImg} />
                                    </View>
                                    <View style={styles.LoginForm_Field}>
                                        <View style={styles.LoginForm_FieldItem}>
                                            {renderIf(this.state.user_name != '')(
                                                <Text style={styles.LoginForm_FieldEnter_Active}>{Lang.so_dien_thoai()}</Text>
                                            )}
                                            <TextInput
                                                ref={'user_name'}
                                                autoCapitalize="none"
                                                autoFocus={false}
                                                placeholder={Lang.so_dien_thoai()}
                                                placeholderTextColor="#c7c7cd"
                                                autoCorrect={false}
                                                returnKeyType={"next"}
                                                onBlur={this._onBlur.bind(this)}
                                                keyboardType={'phone-pad'}
                                                onFocus={this._onFocus.bind(this)}
                                                onSubmitEditing={() => this.focusNextField('password')}
                                                onChangeText={(user_name) => this.setState({ user_name })}
                                                value={this.state.user_name}
                                                style={styles.LoginForm_FieldEnter_Input}
                                                underlineColorAndroid='rgba(0,0,0,0)'
                                            />
                                            {renderIf(this.state.user_name != '')(
                                                <TouchableOpacity onPress={() => this.clearText('user_name')} style={styles.LoginForm_Clear}>
                                                    <Image source={require('../../element/form/ic-clear.png')} style={styles.LoginForm_ClearIcon} />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        <View style={styles.LoginForm_Line}></View>
                                        <View style={styles.LoginForm_FieldItem}>
                                            {renderIf(this.state.password != '')(
                                                <Text style={styles.LoginForm_FieldEnter_Active}>{Lang.mat_khau()}</Text>
                                            )}
                                            <TextInput
                                                ref={'password'}
                                                autoCapitalize="none"
                                                placeholder={Lang.mat_khau()}
                                                placeholderTextColor="#c7c7cd"
                                                autoCorrect={false}
                                                secureTextEntry={true}
                                                onBlur={this._onBlur.bind(this)}
                                                onFocus={this._onFocus.bind(this)}
                                                onChangeText={(password) => this.setState({ password })}
                                                style={styles.LoginForm_FieldEnter_Input}
                                                underlineColorAndroid='rgba(0,0,0,0)'
                                            />
                                            {renderIf(this.state.password != '')(
                                                <TouchableOpacity onPress={() => this.clearText('password')} style={styles.LoginForm_Clear}>
                                                    <Image source={require('../../element/form/ic-clear.png')} style={styles.LoginForm_ClearIcon} />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        <View style={styles.LoginForm_Line}></View>
                                    </View>
                                    <View style={styles.LoginForm_Extra}>
                                        <TouchableOpacity style={styles.LoginForm_Forgot} onPress={() => Actions.forgot()}>
                                            <Text style={styles.LoginForm_PressRegister_Btn}>
                                                {Lang.quen_mat_khau()}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.LoginForm_PressRegister} onPress={this.onPressRegister.bind(this)}>
                                            <Text style={styles.LoginForm_PressRegister_Info}>
                                                {Lang.ban_chua_co_tk()}
                                            </Text>
                                            <Text style={styles.LoginForm_PressRegister_Btn}>
                                                {Lang.dang_ky()}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                    <View style={styles.LoginForm_Button}>
                        {renderIf(this.state.user_name != '' && this.state.password != '')(
                            <TouchableOpacity style={styles.LoginForm_ButtonTouch} onPress={() => this.Login()}>
                                <Text style={styles.LoginForm_ButtonText}>
                                    {Lang.dang_nhap().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {renderIf(this.state.user_name == '' || this.state.password == '')(
                            <View style={styles.LoginForm_ButtonTouchDisable}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.dang_nhap().toUpperCase()}
                                </Text>
                            </View>
                        )}
                    </View>
                    {renderIf(Platform.OS == 'ios')(
                        <KeyboardSpacer />
                    )}
                </View>
                <View style={styles.headerTransparent}>
                    <View style={styles.headerTransparentInner}>
                        <View style={styles.headerTransparent_Left}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-close-gray.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerTransparent_Title}>
                        </View>
                        <View style={styles.headerTransparent_Right}>
                        </View>
                    </View>
                </View>
                {renderIf(this.state.isLoading)(
                    <Loading />
                )}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    fcm_token: state.taskState.fcm_token,
    appsflyer: state.taskState.appsflyer,
})

export default connect(mapStateToProps)(AppotaView)
