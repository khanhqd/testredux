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
    Switch,
    StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import renderIf from '../Common/renderIf'
import Toast from '@remobile/react-native-toast'
import GoogleAnalytics from 'react-native-google-analytics-bridge'
import appsFlyer from 'react-native-appsflyer'
import { AppEventsLogger } from 'react-native-fbsdk'
import TimerMixin from 'react-timer-mixin'
import * as Requests from '../Helpers/Requests'

var styles = require('../Common/style.js')
var Lang = require('../Common/Lang')
var Loading = require('../Common/Loading')

const popToRoot = () => {
    Actions.pop();
}

class AppotaView extends Component {
    state = {
        sms_otp: false
    }

    componentDidMount() {
        let { user_infor } = this.props
        if (user_infor.pay_verify_method == 'NONE') {
            this.setState({
                sms_otp: false
            })
        }
        else {
            this.setState({
                sms_otp: true
            })
        }
    }

    switchSmsOtp = (value) => {
        if (value) {
            Actions.popup({
                title: Lang.thong_bao(),
                content: Lang.des_bat_tat_sms_otp(),
                onPress_Ok: () => this.onEnableSmsOtp(),
                onPress_Cancel: () => { }
            })
        }
        else {
            this.onDisableSmsOtp()
        }
    }

    onEnableSmsOtp = () => {
        let { access_token } = this.props
        Requests.enableSmsOtp(access_token, 0)
            .then((data) => {
                this.setState({
                    sms_otp: true
                })
                this.GetUserInfo()
            })
            .catch((e) => {
                this.setState({
                    sms_otp: false
                })
            })
    }

    onDisableSmsOtp = () => {
        let { access_token } = this.props
        Requests.disableSmsOtp(access_token)
            .then((data) => {
                this.setState({
                    sms_otp: false
                })
                this.GetUserInfo()
            })
            .catch((e) => {
                this.setState({
                    sms_otp: true
                })
            })
    }

    GetUserInfo() {
        let { dispatch, access_token } = this.props
        Requests.User_Infor(access_token)
            .then((data) => {
                dispatch(taskActionCreators.change_user(data))
            })
            .catch((error) => {
            })
    }

    render() {
        return (
            <View {...this.props} style={styles.container}>
                {renderIf(Platform.OS === 'ios')(
                    <StatusBar barStyle={'light-content'} />
                )}
                {renderIf(Platform.OS === 'android')(
                    <StatusBar backgroundColor="#1b6614" animated={true} />
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
                                {Lang.cai_dat_bao_mat()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <View style={styles.FormControl_Content}>
                        <View style={styles.FormControl_Setting}>
                            <View style={styles.FormControl_Setting_Group}>
                                <TouchableOpacity onPress={() => Actions.change_password()} style={styles.FormControl_Setting_Touch}>
                                    <View style={styles.FormControl_Setting_Touch_Info}>
                                        <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                            {Lang.doi_mat_khau()}
                                        </Text>
                                    </View>
                                    <View style={styles.FormControl_Setting_Touch_Point}>
                                        <Image source={require('../../element/RutTien/ic-point.png')} style={styles.FormControl_Setting_Touch_PointImg} />
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.FormControl_Setting_Line}></View>
                            </View>
                            <View style={styles.FormControl_Setting_Group}>
                                <TouchableOpacity onPress={() => Actions.change_pin()} style={styles.FormControl_Setting_Touch}>
                                    <View style={styles.FormControl_Setting_Touch_Info}>
                                        <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                            {Lang.doi_ma_pin()}
                                        </Text>
                                    </View>
                                    <View style={styles.FormControl_Setting_Touch_Point}>
                                        <Image source={require('../../element/RutTien/ic-point.png')} style={styles.FormControl_Setting_Touch_PointImg} />
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                    <View style={styles.FormControl_Title}>

                    </View>
                    <View style={styles.FormControl_Content}>
                        <View style={styles.FormControl_Setting}>
                            <View style={styles.FormControl_Setting_Group}>
                                <View style={styles.FormControl_Setting_Touch}>
                                    <View style={styles.FormControl_Setting_Touch_Info}>
                                        <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                            {Lang.bat_tat_sms_otp()}
                                        </Text>
                                    </View>
                                    <View style={styles.FormControl_Setting_Touch_Swithch}>
                                        <Switch value={this.state.sms_otp} onValueChange={this.switchSmsOtp} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.FormControl_Note}>
                        <Text style={styles.FormControl_NoteText}>
                            {Lang.des_bat_tat_sms_otp()}
                        </Text>
                    </View>
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
