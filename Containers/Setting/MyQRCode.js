import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    CameraRoll,
    Image
} from "react-native";
import { Actions } from "react-native-router-flux";
import Share, { ShareSheet, Button } from 'react-native-share';
import RNViewShot from "react-native-view-shot";
import Toast from '@remobile/react-native-toast';
import appsFlyer from 'react-native-appsflyer';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import { AppEventsLogger } from 'react-native-fbsdk';

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang.js');
import renderIf from '../Common/renderIf'
var RNQRCode = require('../../custom_modules/react-native-qrcode');

const popToRoot = () => {
    Actions.pop();
}

class AppotaView extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            visible: false,
            qrcode_data: {
                type: "personal",
                phone: ''
            },
            user_infor: null
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_my_qrcode');
        appsFlyer.trackEvent('af_my_qrcode', {}, () => { }, () => { });
        AppEventsLogger.logEvent(`fb_my_qrcode`, 1);

        AsyncStorage.getItem("user_infor").then((value) => {
            if (value != null && value.length != 0) {
                var user = JSON.parse(value);
                this.setState({
                    user_infor: user,
                    qrcode_data: {
                        type: "personal",
                        phone: user.phone_number
                    }
                });
            }
        }).done();
    }

    onCancel() {
        this.setState({ visible: false });
    }
    onOpen() {
        this.setState({ visible: true });
    }

    onSaveQR() {
        GoogleAnalytics.trackEvent('ga_my_qrcode', 'save to camera roll');
        appsFlyer.trackEvent('af_my_qrcode_save', {}, () => { }, () => { });
        AppEventsLogger.logEvent(`fb_my_qrcode_save`, 1);

        RNViewShot.takeSnapshot(this.refs['refQr'], {
            format: "jpeg",
            quality: 0.8
        })
            .then(
            uri => {
                var promise = CameraRoll.saveToCameraRoll(uri);
                promise.then(function (result) {
                    Toast.showToast(Lang.luu_anh_thanh_cong(), 'short', 'bottom');
                }).catch(function (error) {
                });
            },
            error => console.error("Oops, snapshot failed", error)
            );
    }

    onShareQR() {
        GoogleAnalytics.trackEvent('ga_my_qrcode', 'share qrcode');
        appsFlyer.trackEvent('af_my_qrcode_share', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_my_qrcode_share', 1);

        RNViewShot.takeSnapshot(this.refs['refQr'], {
            format: "jpeg",
            quality: 1,
            result: "data-uri"
        })
            .then(
            uri => {
                let shareOptions = {
                    title: Lang.vi_appota(),
                    url: uri,
                    subject: Lang.vi_appota() //  for email
                };
                Share.open(shareOptions)
                    .catch((err) => {
                    })
            },
            error => console.error("Oops, snapshot failed", error)
            );

    }

    render() {
        if (this.state.user_infor == null) return (<View style={[styles.container, styles.tabMyQRCode, this.props.style]}>
            <View style={styles.headerNav}>
                <View style={styles.headerNavInner}>
                    <View style={styles.navLeft}>
                        <TouchableOpacity onPress={popToRoot}>
                            <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navTitle}>
                        <Text style={styles.navTitle_Text}>
                        </Text>
                    </View>
                    <View style={styles.navRight}>
                    </View>
                </View>
            </View>
        </View>)

        return (
            <View style={[styles.container, styles.tabMyQRCode, this.props.style]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.FormControl_MyQRCode_Scroll}>
                    <View style={styles.MyPersonal_Header}>
                        <View style={styles.MyPersonal_Header_Info}>
                            <View style={styles.MyPersonal_Header_InfoCover}>
                                <Image source={this.state.user_infor.avatar.length == 0 ? require('../../element/profile/avatar-default.png') : { uri: this.state.user_infor.avatar }} style={styles.MyPersonal_Header_InfoCover_Img} />
                                <Text style={styles.MyPersonal_Header_InfoCover_Title}>
                                    {(this.state.user_infor.fullname.length == 0) ? this.state.user_infor.phone_number : this.state.user_infor.fullname}
                                </Text>
                                <Text style={styles.MyPersonal_Header_InfoCover_Sub}>
                                    {this.state.user_infor.phone_number}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.FormControl_MyQRCode}>
                        <View ref={'refQr'} style={styles.FormControl_MyQRCode_Inner}>
                            <RNQRCode
                                value={JSON.stringify(this.state.qrcode_data)}
                                size={200}
                                logo={'https://wallet.payhub.vn/images/ic_launcher.png'}
                                bgColor='#449D47'
                                fgColor='white' />
                        </View>
                        <View style={styles.FormControl_MyQRCode_Button}>
                            <TouchableOpacity onPress={this.onShareQR.bind(this)} style={styles.FormControl_MyQRCode_ButtonTouch} >
                                <Text style={styles.FormControl_MyQRCode_ButtonText}>{Lang.chia_se()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onSaveQR.bind(this)} style={styles.FormControl_MyQRCode_ButtonTouch} >
                                <Text style={styles.FormControl_MyQRCode_ButtonText}>{Lang.luu_anh()}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.FormControl_MyQRCode_Note}>
                            <Text style={styles.FormControl_MyQRCode_Text}>
                                {Lang.my_qrcode()}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

module.exports = AppotaView;
