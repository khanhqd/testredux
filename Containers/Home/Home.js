/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Keyboard,
    Platform,
    StatusBar,
    ScrollView,
    AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import Toast from '@remobile/react-native-toast';
import FCM, {
    FCMEvent,
    RemoteNotificationResult,
    WillPresentNotificationResult,
    NotificationType
} from 'react-native-fcm';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import * as Animatable from 'react-native-animatable';

var styles = require('../Common/style.js')
var Lang = require('../Common/Lang')
import renderIf from '../Common/renderIf'
var UserInfor = require('./UserInfor')
var HeaderMenu = require('./HeaderMenu')
var BodyMenu = require('./BodyMenu')
var BodyServices = require('./BodyServices')
var Utils = require('../Common/Utils')
var QuickLogin = require('./QuickLogin')
var QuickCards = require('./QuickCards')
var QuickGames = require('./QuickGames')
var UpdateProfile = require('./UpdateProfile')
var BannerSpin = require('./BannerSpin')

import * as Requests from '../Helpers/Requests'

class AppotaView extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling = false;
    }
    componentWillMount() {
        if (Platform.OS == 'android') {
            BackgroundGeolocation.configure({
                desiredAccuracy: 10,
                stationaryRadius: 50,
                distanceFilter: 50,
                locationTimeout: 30,
                notificationTitle: 'Background tracking',
                notificationText: 'enabled',
                debug: false,
                startOnBoot: false,
                startForeground: false,
                stopOnTerminate: true,
                locationProvider: BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
                interval: 10000,
                fastestInterval: 5000,
                activitiesInterval: 10000,
                stopOnStillActivity: true,
            });
            BackgroundGeolocation.on('location', (location) => {

                //handle your locations here
                let { dispatch } = this.props
                var _location = {
                    lat: location.latitude,
                    lon: location.longitude
                }
                dispatch(taskActionCreators.change_location(_location))
                BackgroundGeolocation.stop();
            });
            BackgroundGeolocation.on('error', (error) => {
            });
            BackgroundGeolocation.start(() => {
            });
        }
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_home');
        setTimeout(() => {
            if (this.props.access_token.length > 0 && this.props.visa_fee == null)
                this.GetListBank()

            if (this.props.access_token.length > 0) {
                this.GetUserInfo()
            }
        }, 200);

        let { dispatch, fcm_token } = this.props
        FCM.requestPermissions(); // for iOS
        FCM.setBadgeNumber(0);
        FCM.getFCMToken().then(token => {
            // store fcm token in your server
            if (token) {
                dispatch(taskActionCreators.change_fcm_token(token))
            }
        });
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            try {
                if (Platform.OS == 'ios') {
                    var payload = JSON.parse(notif.payload);
                    uri = payload.url
                    var msg = notif.aps.alert
                    if (uri.indexOf('muontien://') > -1 && !this.state.isLoading) {
                        this.setState({ isLoading: true });
                        Actions.popup({
                            title: msg.title,
                            content: msg.body,
                            onPress_Ok: () => { this.setState({ isLoading: false }); this.AcceptRequest(uri, 'accepted') },
                            onPress_Cancel: () => this.setState({ isLoading: false })
                        })
                        uri = ''
                    }
                    else if (uri.indexOf('paymentorders://') > -1 && !this.state.isLoading) {
                        this.setState({ isLoading: true });
                        Actions.popup({
                            title: msg.title,
                            content: msg.body,
                            onPress_Ok: () => { this.setState({ isLoading: false }); this.AcceptRequest(uri, 'accepted') },
                            onPress_Cancel: () => this.setState({ isLoading: false })
                        })
                        uri = '';
                    }
                    else if (uri.indexOf('news://') > -1 && !this.state.isLoading) {
                        this.setState({ isLoading: true });
                        Actions.popup({
                            title: msg.title,
                            content: msg.body,
                            onPress_Ok: () => { this.setState({ isLoading: false }); Actions.home_news_detail({ news_id: uri.split('://').length > 1 ? uri.split('://')[1] : '7' }) },
                            onPress_Cancel: () => this.setState({ isLoading: false })
                        });
                        uri = '';
                    }
                }
                else {
                    var payload = JSON.parse(notif.payload);
                    uri = payload.uri
                    var msg = notif.fcm;
                    if (uri.indexOf('muontien://') > -1 && !this.state.isLoading) {
                        this.setState({ isLoading: true })
                        Actions.popup({
                            title: msg.title,
                            content: msg.body,
                            onPress_Ok: () => { this.setState({ isLoading: false }); this.AcceptRequest(uri, 'accepted') },
                            onPress_Cancel: () => this.setState({ isLoading: false })
                        })
                        uri = ''
                    }
                    else if (uri.indexOf('paymentorders://') > -1 && !this.state.isLoading) {
                        this.setState({ isLoading: true })
                        Actions.popup({
                            title: msg.title,
                            content: msg.body,
                            onPress_Ok: () => { this.setState({ isLoading: false }); this.AcceptRequest(uri, 'accepted') },
                            onPress_Cancel: () => this.setState({ isLoading: false })
                        })
                        uri = ''
                    }
                    else if (uri.indexOf('news://') > -1 && !this.state.isLoading) {
                        this.setState({ isLoading: true });
                        Actions.popup({
                            title: msg.title,
                            content: msg.body,
                            onPress_Ok: () => { this.setState({ isLoading: false }); Actions.home_news_detail({ news_id: uri.split('://').length > 1 ? uri.split('://')[1] : '7' }) },
                            onPress_Cancel: () => this.setState({ isLoading: false })
                        });
                        uri = '';
                    }
                }
            }
            catch (e) { }

            if (Platform.OS === 'ios') {
                switch (notif._notificationType) {
                    case NotificationType.Remote:
                        notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                        break;
                    case NotificationType.NotificationResponse:
                        notif.finish();
                        break;
                    case NotificationType.WillPresent:
                        notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                        break;
                }
            }
        });
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
            if (fcm_token.length == 0) {
                dispatch(taskActionCreators.change_fcm_token(token))
            }
        });
    }

    GetUserInfo() {
        let { dispatch, access_token } = this.props
        Requests.User_Infor(access_token)
            .then((info) => {
                // lưu lại user infor để sử dụng cho component my qrcode lúc mất mạng
                AsyncStorage.setItem('user_infor', JSON.stringify(info));
                dispatch(taskActionCreators.change_user(info))
                if (info.used_pincode) {
                    AsyncStorage.setItem('PIN', access_token);
                }
                else {
                    Actions.set_pin({
                        step: 1,
                        pin: '',
                        access_token: access_token
                    });
                }
            })
            .catch((error) => {
            })
    }

    GetListBank() {
        let { dispatch, access_token } = this.props
        Requests.List_Bank(access_token, '')
            .then((banks) => {
                var list_banks = []
                var visa_fee = {}
                for (var i = 0; i < banks.data.length; i++) {
                    if (banks.data[i].name.toLowerCase() == 'visa') {
                        visa_fee = {
                            bank_code: banks.data[i].code,
                            transaction_fee: banks.data[i].transaction_fee,
                            transaction_percent_fee: banks.data[i].transaction_percent_fee,
                            cashin_transaction_fee: banks.data[i].cashin_transaction_fee,
                            cashin_transaction_percent_fee: banks.data[i].cashin_transaction_percent_fee,
                            topup_transaction_fee: banks.data[i].topup_transaction_fee,
                            topup_transaction_percent_fee: banks.data[i].topup_transaction_percent_fee,
                            game_transaction_fee: banks.data[i].game_transaction_fee,
                            game_transaction_percent_fee: banks.data[i].game_transaction_percent_fee,
                        }
                    }
                    else {
                        list_banks.push({
                            code: banks.data[i].code,
                            name: banks.data[i].name,
                            icon: banks.data[i].icon,
                            transaction_fee: banks.data[i].transaction_fee,
                            transaction_percent_fee: banks.data[i].transaction_percent_fee,
                            cashin_transaction_fee: banks.data[i].cashin_transaction_fee,
                            cashin_transaction_percent_fee: banks.data[i].cashin_transaction_percent_fee,
                            topup_transaction_fee: banks.data[i].topup_transaction_fee,
                            topup_transaction_percent_fee: banks.data[i].topup_transaction_percent_fee,
                            game_transaction_fee: banks.data[i].game_transaction_fee,
                            game_transaction_percent_fee: banks.data[i].game_transaction_percent_fee,
                        })
                    }
                }
                dispatch(taskActionCreators.update_ds_bank_fee(list_banks))
                dispatch(taskActionCreators.change_visa_fee(visa_fee))
            })
            .catch((error) => {
            })
    }

    onPressGC = () => {
        this.props.dispatch(taskActionCreators.change_show_giftcode_des(true))
    }

    onPressVip = ()=>{
        Actions.popup({
            title: Lang.quyen_loi_vip(),
            content: Lang.mien_phi_otp_sms()
        })
    }

    render() {
        var renderUpdateProfile = null
        let renderVip = null
        if (this.props.user_infor && this.props.access_token.length > 0) {
            var email = this.props.user_infor.email ? this.props.user_infor.email : ''
            if (email.length == 0 || this.props.user_infor.fullname.length == 0) {
                renderUpdateProfile = <UpdateProfile />
            }

            let vip = this.props.user_infor.vip ? this.props.user_infor.vip : 0
            if (vip > 0)
                renderVip = <TouchableOpacity onPress={this.onPressVip}>
                    <Animatable.View animation="flash" easing="ease-out" iterationCount="infinite" style={[styles.Personal_Vip, styles.Personal_Vip1]}>
                        <Text style={styles.Personal_Vip_Title}>
                            VIP {vip}
                        </Text>
                    </Animatable.View>
                </TouchableOpacity>
        }

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
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.vi_appota()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                            {renderVip}
                        </View>
                    </View>
                </View>
                {renderIf(this.props.user_infor && this.props.access_token.length > 0)(
                    <UserInfor user_infor={this.props.user_infor} />
                )}
                <ScrollView style={styles.tabScroll}>
                    <HeaderMenu access_token={this.props.access_token} />
                    {renderUpdateProfile}
                    {renderIf(this.props.access_token.length == 0)(
                        <QuickLogin />
                    )}
                    <BodyMenu access_token={this.props.access_token} onPressGC={this.onPressGC} />
                    {renderIf(this.props.user_infor && this.props.access_token.length > 0)(
                        <View>
                            <BannerSpin />
                            <BodyServices access_token={this.props.access_token}/>
                            <QuickCards ds_cards={this.props.ds_cards} user_infor={this.props.user_infor} />
                            <QuickGames ds_games={this.props.ds_games} />
                        </View>
                    )}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
    visa_fee: state.taskState.visa_fee,
    ds_cards: state.taskState.ds_cards,
    ds_games: state.taskState.ds_games,
    fcm_token: state.taskState.fcm_token,
})

export default connect(mapStateToProps)(AppotaView)
