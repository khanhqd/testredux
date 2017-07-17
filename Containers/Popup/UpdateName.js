import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    Dimensions,
    TouchableOpacity,
    Keyboard,
    BackAndroid,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { Actions, Modal } from "react-native-router-flux";
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import renderIf from '../Common/renderIf'
import TimerMixin from 'react-timer-mixin';
import Toast from '@remobile/react-native-toast';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import KeyboardSpacer from 'react-native-keyboard-spacer';

var {
    height: deviceHeight
} = Dimensions.get("window");
var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var RequestHelper = require('../Common/RequestHelper');
var Utils = require('../Common/Utils');

class AppotaView extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackAndroid = this.handleBackAndroid.bind(this);
        this.state = {
            name: this.props.user_infor.fullname.length == 0 ? '' : this.props.user_infor.fullname,
            isLoading: false,
            offset: new Animated.Value(-deviceHeight)
        };
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
        GoogleAnalytics.trackScreenView('ga_update_name');

        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start();
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);
    }

    handleBackAndroid() {
        try {
            this.closeModal();
            return true;
        } catch (err) {
            return false;
        }
    }

    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.pop);

        Keyboard.dismiss();
    }

    onUpdate() {
        Keyboard.dismiss();
        this.UpdateProfile();
    }

    UpdateProfile() {
        this.setState({ isLoading: true });
        let { dispatch, access_token, user_infor } = this.props
        RequestHelper.UpdateProfile(access_token, user_infor.email, user_infor.cmnd_number, this.state.name, user_infor.address, '')
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    appsFlyer.trackEvent('af_update_name', {}, () => { }, () => { });
                    AppEventsLogger.logEvent('fb_update_name', 1);
                    var user = user_infor
                    user.fullname = this.state.name
                    dispatch(taskActionCreators.change_user(user))
                    Toast.showToast(Lang.cap_nhat_thong_tin_thanh_cong(), "short", "center");
                }
                else {
                    if (data.status == 401) var access_token = '';
                    Utils.onRequestEnd(data);
                }
                Animated.timing(this.state.offset, {
                    duration: 50,
                    toValue: -deviceHeight
                }).start(Actions.pop);
                setTimeout(() => {
                    Actions.refresh()
                }, 100);
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    _onBlur(e) {
        this.setState({ isFocused: false })
    }
    _onFocus(e) {
        this.setState({ isFocused: true })
    }

    render() {
        var flag = this.props.flag;
        return (

            <Animated.View style={[styles.popup, { transform: [{ translateY: this.state.offset }] }]}>
                    <View style={styles.popupDialog}>
                        <View style={styles.popupBody}>
                            <View style={styles.popupBody_Form}>
                                <View style={styles.UpdateForm}>
                                    <View style={styles.UpdateForm_Inner}>
                                        <View style={styles.UpdateForm_FieldNone}>
                                            <View style={styles.UpdateForm_FieldTitle}>
                                                <Text style={styles.UpdateForm_FieldTitle_Text}>
                                                    {Lang.ten_la_gi()}
                                                </Text>
                                            </View>
                                            <View style={styles.UpdateForm_FieldInfo}>
                                                <Text style={styles.UpdateForm_FieldInfo_Text}>
                                                    {Lang.des_update_name()}
                                                </Text>
                                            </View>
                                            <View style={styles.UpdateForm_FieldEnter}>
                                                <TextInput
                                                    ref={'textSearch'}
                                                    autoCapitalize="none"
                                                    autoFocus={false}
                                                    placeholder={Lang.ten_day_du()}
                                                    placeholderTextColor="#c7c7cd"
                                                    autoCorrect={false}
                                                    value={this.state.name}
                                                    onBlur={this._onBlur.bind(this)}
                                                    onFocus={this._onFocus.bind(this)}
                                                    onChangeText={(text) => this.setState({ name: text })}
                                                    style={styles.UpdateForm_FieldEnter_Input}
                                                    underlineColorAndroid='rgba(0,0,0,0)'
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.popupFooter}>
                            <TouchableOpacity style={styles.popupFooter_TouchLeft} onPress={this.closeModal.bind(this)}>
                                <Text style={styles.popupFooter_TextLeft} >
                                    {Lang.button_huy()}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.popupFooter_TouchRight} onPress={this.UpdateProfile.bind(this)}>
                                <Text style={styles.popupFooter_TextRight} >
                                    {Lang.cap_nhat()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                {renderIf(this.state.isLoading)(
                    <Loading />
                )}
                {renderIf(Platform.OS == 'ios')(
                        <KeyboardSpacer />
                    )}
            </Animated.View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
})

export default connect(mapStateToProps)(AppotaView)