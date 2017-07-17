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
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import renderIf from '../Common/renderIf'
import GoogleAnalytics from 'react-native-google-analytics-bridge';

var styles = require('../Common/style.js');
var RequestHelper = require('../Common/RequestHelper');
var Utils = require('../Common/Utils');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');

class AppotaView extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isFocused: true,
            text: '',
            isLoading: false
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_forgot_password');
        AppEventsLogger.logEvent('fb_forgot_password', 1);
        const eventName = "af_forgot_password";
        appsFlyer.trackEvent(eventName, {}, () => { }, () => { });
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
    resetPassword() {
        Keyboard.dismiss()
        this.setState({ isLoading: true });
        RequestHelper.ResetPassword(this.props.phone_number, this.state.text, this.props.access_key, this.props.otp)
            .then((data) => {
                if (data.status == 201 || data.status == 200) {
                    Actions.popup({ title: Lang.thong_bao(), content: Lang.doi_mat_khau_thanh_cong(), flag: 'success', onPress_Ok: () => Actions.login() });
                }
                else {
                    Utils.onRequestEnd(data);
                }
                this.setState({ isLoading: false });
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
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
                                    placeholder={Lang.mat_khau()}
                                    placeholderTextColor="#c7c7cd"
                                    autoCorrect={false}
                                    returnKeyType={"done"}
                                    secureTextEntry={true}
                                    onBlur={this._onBlur.bind(this)}
                                    onFocus={this._onFocus.bind(this)}
                                    onSubmitEditing={() => this.resetPassword()}
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
                            <TouchableOpacity style={styles.RegisterForm_ButtonTouch} onPress={() => this.resetPassword()}>
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
                {renderIf(this.state.isLoading)(
                    <Loading />
                )}
            </View>
        );
    }
}

module.exports = AppotaView;