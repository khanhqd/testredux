/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    Platform,
    AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import ImagePicker from 'react-native-image-picker';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import * as Requests from '../Helpers/Requests'

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');
var Utils = require('../Common/Utils');
import renderIf from '../Common/renderIf'
var Setting = require('./Setting');
var Loading = require('../Common/Loading');
import Toast from '@remobile/react-native-toast';

class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: false,
            avatar: require('../../element/homepage/avatar-default.png')
        }
        Text.defaultProps.allowFontScaling = false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_setting');
        appsFlyer.trackEvent('af_setting', {}, () => { }, () => { })
        AppEventsLogger.logEvent('fb_setting', 1);

        const { dispatch, access_token, user_infor, visa_fee } = this.props
        if (access_token.length > 0) {
            this.GetUserInfo()
        }
        if (user_infor != null) {
            this.setState({
                avatar: user_infor.avatar.length == 0 ? require('../../element/homepage/avatar-default.png') : { uri: user_infor.avatar }
            })
        }
    }

    GetUserInfo() {
        Requests.User_Infor(this.props.access_token)
            .then((data) => {
                dispatch(taskActionCreators.change_user(data))
            })
            .catch((error) => {
            })
    }

    confirmLogout() {
        Actions.popup({ title: Lang.thong_bao(), content: Lang.xac_nhan_dang_xuat(), onPress_Ok: () => this.Logout(), onPress_Cancel: () => { } });
    }

    Logout() {
        GoogleAnalytics.trackEvent('ga_setting', 'Logout');
        appsFlyer.trackEvent('af_logout', {}, () => { }, () => { });
        AppEventsLogger.logEvent(`fb_logout`, 1);

        let { dispatch, access_token } = this.props
        this.setState({ isLoading: true })
        Requests.Logout(access_token)
            .then((data) => {
                this.setState({ isLoading: false })
                Actions.login();
            })
            .catch((error) => {
                dispatch(taskActionCreators.change_token(''))
                dispatch(taskActionCreators.change_user(null))
                this.setState({ isLoading: false })
                AsyncStorage.removeItem("access_token")
            })
    }

    displayImagePicker() {
        var options = {
            title: Lang.chon_anh_dai_dien(),
            cancelButtonTitle: Lang.button_huy(),
            takePhotoButtonTitle: Lang.chup_anh(),
            chooseFromLibraryButtonTitle: Lang.chon_anh_thu_vien(),
            cameraType: 'front',
            mediaType: 'photo',
            videoQuality: 'high',
            maxWidth: 200,
            maxHeight: 200,
            quality: 1,
            allowsEditing: false,
            noData: false,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            isSwitchOn: false
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else if (response.customButton) {
            }
            else {
                const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatar: source
                });
                var photo = {
                    uri: response.uri,
                    type: 'image/jpeg',
                    name: 'photo.jpg',
                };
                var body = new FormData();
                body.append('avatar', photo);
                let { dispatch, access_token, user_infor } = this.props
                Requests.Update_Avatar(access_token, body)
                    .then((data) => {
                        GoogleAnalytics.trackEvent('ga_setting', 'Update avatar');
                        appsFlyer.trackEvent('af_update_avatar', {}, () => { }, () => { });
                        AppEventsLogger.logEvent(`fb_update_avatar`, 1);

                        Toast.showToast(Lang.cap_nhat_avt_thanh_cong(), "short", "center");
                        var user = user_infor
                        user.avatar = 'data:image/jpeg;base64,' + response.data
                        dispatch(taskActionCreators.change_user(user))
                    })
                    .catch((error) => {
                    })
            }
        });
    }

    renderUserInfor(user_infor) {
        if (!user_infor) return <View style={{ height: 0 }} />
        return (
            <View style={styles.Personal}>
                <View style={styles.Personal_Header}>
                    <View style={styles.Personal_Header_Info}>
                        <View style={styles.Personal_Header_InfoBg}></View>
                        <View style={styles.Personal_Header_InfoCover}>
                            <TouchableOpacity onPress={this.displayImagePicker.bind(this)}>
                                <Image source={this.state.avatar} style={styles.Personal_Header_InfoCover_Img} />
                                <Image style={{ position: 'absolute', bottom: 8, right: 8 }} source={require('../../element/profile/edit-photo.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Actions.update_name()}>
                                <Text style={styles.Personal_Header_InfoCover_Title}>
                                    {user_infor.fullname.length == 0 ? Lang.ten_ban_la_gi() : user_infor.fullname}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.Personal_Header_Info_Vip}>
                                {renderIf(user_infor.vip && user_infor.vip > 0)(
                                    <View style={[styles.Personal_Vip, styles.Personal_Vip1]}>
                                        <Text style={styles.Personal_Vip_Title}>
                                            VIP {user_infor.vip}
                                        </Text>
                                    </View>
                                )}
                                <Text style={styles.Personal_Header_InfoCover_Sub}>
                                    {user_infor.phone_number}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.Personal_Header_Buttom}>
                        <TouchableOpacity onPress={() => Actions.my_qrcode()} style={styles.Personal_Header_ButtomTouch}>
                            <Image source={require('../../element/profile/p-qrcode.png')} style={styles.Personal_Header_ButtomImg} />
                            <Text style={styles.Personal_Header_ButtomText} numberOfLines={1}>
                                QR Code
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Actions.history()} style={styles.Personal_Header_ButtomTouch}>
                            <Image source={require('../../element/profile/p-history.png')} style={styles.Personal_Header_ButtomImg} />
                            <Text style={styles.Personal_Header_ButtomText} numberOfLines={1}>
                                {Lang.lich_su()}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Actions.cashin()} style={styles.Personal_Header_ButtomTouch}>
                            <Image source={require('../../element/profile/p-pay.png')} style={styles.Personal_Header_ButtomImg} />
                            <Text style={styles.Personal_Header_ButtomText} numberOfLines={1}>
                                {Lang.nap_tien()}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Actions.cashout()} style={styles.Personal_Header_ButtomTouch} >
                            <Image source={require('../../element/profile/p-money.png')} style={styles.Personal_Header_ButtomImg} />
                            <Text style={styles.Personal_Header_ButtomText} numberOfLines={1}>
                                {Lang.rut_tien()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    renderBalance(user_infor) {
        if (!user_infor) return null
        return (
            <View style={styles.FormControl_Group}>
                <View style={styles.FormControl_Content}>
                    <View style={styles.FormControl_SettingAccount}>
                        <View style={styles.FormControl_SettingAccount_Inner}>
                            <Text style={styles.FormControl_SettingAccount_Sub}>
                                {Lang.tk_vi()}
                            </Text>
                            <Text style={styles.FormControl_SettingAccount_Title}>
                                {Utils.number_format(user_infor.balance, 0, '.', '.')}đ
                            </Text>
                        </View>
                        <View style={styles.FormControl_SettingAccount_Inner}>
                            <Text style={styles.FormControl_SettingAccount_Sub}>
                                {Lang.tk_cashback()}
                            </Text>
                            <Text style={styles.FormControl_SettingAccount_Title}>
                                {Utils.number_format(user_infor.cashback_balance, 0, '.', '.')}đ
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        let { user_infor, access_token } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {user_infor ? '' : Lang.cai_dat()}
                            </Text>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    {this.renderUserInfor(user_infor)}
                    {this.renderBalance(user_infor)}
                    <Setting language={this.props.lang} isUser={user_infor ? true : false} confirmLogout={this.confirmLogout.bind(this)} />
                </ScrollView>
                {renderIf(this.state.isLoading)(
                    <Loading />
                )}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
    lang: state.taskState.lang,
})

export default connect(mapStateToProps)(AppotaView)
