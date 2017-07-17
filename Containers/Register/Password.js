import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform,
    AsyncStorage,
    Keyboard
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import KeyboardSpacer from 'react-native-keyboard-spacer';
import renderIf from '../Common/renderIf'
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import Toast from '@remobile/react-native-toast';
import { AppEventsLogger } from 'react-native-fbsdk';

var styles = require('../Common/style.js');
var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Utils = require('../Common/Utils');
var Loading = require('../Common/Loading');

const popToRoot = () => {
    Keyboard.dismiss();
    Actions.tabbar();
}

class AppotaView extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isFocused: true,
            text: ''
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_register_password');
    }

    _onBlur(e) {
        this.setState({ isFocused: false })
    }

    _onFocus(e) {
        this.setState({ isFocused: true })
    }
    _clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({ text: '' })
    }

    register() {
        Keyboard.dismiss()
        this.setState({ isLoading: true });
        RequestHelper.Register(this.props.phone, this.state.text, this.props.phone)
            .then((data) => {
                if (data.status == 201) {
                    GoogleAnalytics.trackEvent('ga_register', 'Register success');
                    appsFlyer.trackEvent('af_register', {}, () => { }, () => { });
                    AppEventsLogger.logEvent('fb_register', 1);
                    this.Login();
                }
                else {
                    var err = JSON.parse(data._bodyText);
                    Toast.showToast(err.error.message, "short", "center");
                }
            })
            .catch((error) => {
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    Login() {
        RequestHelper.Login(this.props.phone, this.state.text)
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
                        popToRoot()
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
                <View style={styles.RegisterForm}>
                    <View style={styles.RegisterForm_Inner}>
                        <View style={styles.RegisterForm_Field}>
                            <View style={styles.RegisterForm_FieldTitle}>
                                <Text style={styles.RegisterForm_FieldTitle_Text}>
                                    {Lang.mat_khau_la_gi()}
                                </Text>
                            </View>
                            <View style={styles.RegisterForm_FieldInfo}>
                                <Text style={styles.RegisterForm_FieldInfo_Text}>
                                    {Lang.mat_khau_de_thao_tac()}
                                </Text>
                            </View>
                            <View style={styles.RegisterForm_FieldEnter}>
                                <TextInput
                                    ref={'textSearch'}
                                    autoCapitalize="none"
                                    autoFocus={true}
                                    secureTextEntry={true}
                                    placeholder={Lang.mat_khau()}
                                    placeholderTextColor="#c7c7cd"
                                    autoCorrect={false}
                                    returnKeyType={"done"}
                                    onSubmitEditing={() => this.register()}
                                    onBlur={this._onBlur.bind(this)}
                                    onFocus={this._onFocus.bind(this)}
                                    onChangeText={(text) => this.setState({ text })}
                                    style={styles.RegisterForm_FieldEnter_Input}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                />
                                {renderIf(this.state.text != '')(
                                    <TouchableOpacity onPress={() => this._clearText('textSearch')} style={styles.Input_Clear}>
                                        <Image source={require('../../element/form/ic-clear.png')} style={styles.Input_ClearIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>

                        </View>
                    </View>
                    <View style={styles.RegisterForm_Button}>
                        {renderIf(this.state.text != '')(
                            <TouchableOpacity style={styles.RegisterForm_ButtonTouch} onPress={() => this.register()}>
                                <Text style={styles.RegisterForm_ButtonText}>
                                    {Lang.tiep_tuc().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {renderIf(this.state.text == '')(
                            <View style={styles.RegisterForm_ButtonTouchDisable}>
                                <Text style={styles.RegisterForm_ButtonText}>
                                    {Lang.tiep_tuc().toUpperCase()}
                                </Text>
                            </View>
                        )}
                    </View>
                    {renderIf(Platform.OS == 'ios')(
                        <KeyboardSpacer />
                    )}
                    {renderIf(this.state.isLoading)(
                        <Loading />
                    )}
                </View>
                <View style={styles.headerTransparent}>
                    <View style={styles.headerTransparentInner}>
                        <View style={styles.headerTransparent_Left}>
                            <TouchableOpacity onPress={() => Actions.pop()}>
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
}

const mapStateToProps = (state) => ({
    appsflyer: state.taskState.appsflyer,
    fcm_token: state.taskState.fcm_token,
})

export default connect(mapStateToProps)(AppotaView)