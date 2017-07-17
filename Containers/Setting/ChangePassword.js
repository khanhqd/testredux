import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform,
    Image,
    Keyboard,
    StatusBar
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import renderIf from '../Common/renderIf';
import TimerMixin from 'react-timer-mixin';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop();
}

class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: false,
            isFocused: true,
            pass_old: '',
            pass_new: '',
            pass_new_verify: '',
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_change_password');
        appsFlyer.trackEvent('af_change_password', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_change_password', 1);
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

    clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            pass_old: fieldName == 'pass_old' ? '' : this.state.pass_old,
            pass_new: fieldName == 'pass_new' ? '' : this.state.pass_new,
            pass_new_verify: fieldName == 'pass_new_verify' ? '' : this.state.pass_new_verify,
        });
    }

    focusNextField(nextField) {
        this.refs[nextField].focus();
    }

    ChangePassword() {
        Keyboard.dismiss();
        if (this.state.pass_old.length == 0 || this.state.pass_new.length == 0 || this.state.pass_new_verify.length == 0) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.nhap_day_du_thong_tin(), flag: 'error' });
            return;
        }
        if (this.state.pass_new.length < 6 || this.state.pass_new_verify.length < 6) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.mat_khau_moi_6_ky_tu(), flag: 'error' });
            return;
        }
        if (this.state.pass_new != this.state.pass_new_verify) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.mat_khau_khong_khop(), flag: 'error' });
            return;
        }
        this.setState({ isLoading: true });
        let { access_token } = this.props
        RequestHelper.ChangePassword(access_token, this.state.pass_old, this.state.pass_new)
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    Actions.popup({ title: Lang.thong_bao(), content: Lang.doi_mat_khau_thanh_cong(), flag: 'success', onPress_Ok: () => Actions.pop() });
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

    render() {
        return (
            <View style={[styles.container, styles.tabAccount, this.props.style]}>
                {renderIf(Platform.OS === 'ios')(
                    <StatusBar barStyle={'default'} />
                )}
                <View style={styles.RegisterForm}>
                    <View style={styles.RegisterForm_Inner}>
                        <ScrollView style={styles.RegisterForm_Field} keyboardShouldPersistTaps='always'>
                            <View style={styles.RegisterForm_FieldTitle}>
                                <Text style={styles.RegisterForm_FieldTitle_Text}>
                                    {Lang.doi_mat_khau()}
                                </Text>
                            </View>
                            <View style={styles.RegisterForm_FieldInfo}>
                                <Text style={styles.RegisterForm_FieldInfo_Text}>
                                    {Lang.mat_khau_moi_6_ky_tu()}
                                </Text>
                            </View>
                            <View style={styles.RegisterForm_FieldEnter}>
                                {renderIf(this.state.pass_old != '')(
                                    <Text style={styles.LoginForm_FieldEnter_Active}>{Lang.mat_khau_cu()}</Text>
                                )}
                                <TextInput
                                    ref={'pass_old'}
                                    autoCapitalize="none"
                                    autoFocus={true}
                                    secureTextEntry={true}
                                    placeholder={Lang.mat_khau_cu()}
                                    placeholderTextColor="#c7c7cd"
                                    autoCorrect={false}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => this.focusNextField('pass_new')}
                                    onBlur={this._onBlur.bind(this)}
                                    onFocus={this._onFocus.bind(this)}
                                    onChangeText={(pass_old) => this.setState({ pass_old })}
                                    style={styles.RegisterForm_FieldEnter_Input}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                />
                                {renderIf(this.state.pass_old != '')(
                                    <TouchableOpacity onPress={() => this.clearText('pass_old')} style={styles.LoginForm_Clear}>
                                        <Image source={require('../../element/form/ic-clear.png')} style={styles.LoginForm_ClearIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={styles.RegisterForm_FieldEnter}>
                                {renderIf(this.state.pass_new != '')(
                                    <Text style={styles.LoginForm_FieldEnter_Active}>{Lang.mat_khau_moi()}</Text>
                                )}
                                <TextInput
                                    ref={'pass_new'}
                                    autoCapitalize="none"
                                    autoFocus={false}
                                    secureTextEntry={true}
                                    placeholder={Lang.mat_khau_moi()}
                                    placeholderTextColor="#c7c7cd"
                                    autoCorrect={false}
                                    returnKeyType={"next"}
                                    onBlur={this._onBlur.bind(this)}
                                    onFocus={this._onFocus.bind(this)}
                                    onSubmitEditing={() => this.focusNextField('pass_new_verify')}
                                    onChangeText={(pass_new) => this.setState({ pass_new })}
                                    style={styles.RegisterForm_FieldEnter_Input}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                />
                                {renderIf(this.state.pass_new != '')(
                                    <TouchableOpacity onPress={() => this.clearText('pass_new')} style={styles.LoginForm_Clear}>
                                        <Image source={require('../../element/form/ic-clear.png')} style={styles.LoginForm_ClearIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={styles.RegisterForm_FieldEnter}>
                                {renderIf(this.state.pass_new_verify != '')(
                                    <Text style={styles.LoginForm_FieldEnter_Active}>{Lang.nhap_lai_mat_khau()}</Text>
                                )}
                                <TextInput
                                    ref={'pass_new_verify'}
                                    autoCapitalize="none"
                                    autoFocus={false}
                                    secureTextEntry={true}
                                    placeholder={Lang.nhap_lai_mat_khau()}
                                    placeholderTextColor="#c7c7cd"
                                    autoCorrect={false}
                                    returnKeyType={"done"}
                                    onBlur={this._onBlur.bind(this)}
                                    onFocus={this._onFocus.bind(this)}
                                    onSubmitEditing={() => this.ChangePassword()}
                                    onChangeText={(pass_new_verify) => this.setState({ pass_new_verify })}
                                    style={styles.RegisterForm_FieldEnter_Input}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                />
                                {renderIf(this.state.pass_new_verify != '')(
                                    <TouchableOpacity onPress={() => this.clearText('pass_new_verify')} style={styles.LoginForm_Clear}>
                                        <Image source={require('../../element/form/ic-clear.png')} style={styles.LoginForm_ClearIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.RegisterForm_Button}>
                        {renderIf(this.state.pass_old != '' && this.state.pass_new != '' && this.state.pass_new_verify != '')(
                            <TouchableOpacity style={styles.RegisterForm_ButtonTouch} onPress={() => this.ChangePassword()}>
                                <Text style={styles.RegisterForm_ButtonText}>
                                    {Lang.doi_mat_khau().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {renderIf(this.state.pass_old == '' || this.state.pass_new == '' || this.state.pass_new_verify == '')(
                            <View style={styles.RegisterForm_ButtonTouchDisable} onPress={popToRoot}>
                                <Text style={styles.RegisterForm_ButtonText}>
                                    {Lang.doi_mat_khau().toUpperCase()}
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
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
})

export default connect(mapStateToProps)(AppotaView)
