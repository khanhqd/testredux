/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import * as Animatable from '../../custom_modules/react-native-animatable';
import GoogleAnalytics from 'react-native-google-analytics-bridge';

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');

checkToken = (access_token, flag) => {
    if (access_token.length == 0) {
        Actions.login();
    }
    else {
        switch (flag) {
            case 'cashin':
                GoogleAnalytics.trackEvent('ga_home', 'cashin');
                Actions.cashin()
                break;
            case 'borrow_money':
                GoogleAnalytics.trackEvent('ga_home', 'borrow_money');
                Actions.borrow_money();
                break;
            case 'transfer':
                GoogleAnalytics.trackEvent('ga_home', 'transfer');
                Actions.transfer();
                break;
            case 'cashout':
                GoogleAnalytics.trackEvent('ga_home', 'cashout');
                Actions.cashout();
                break;
            case 'my_qrcode':
                GoogleAnalytics.trackEvent('ga_home', 'my_qrcode');
                Actions.my_qrcode();
                break;
            case 'mobile_topup':
                GoogleAnalytics.trackEvent('ga_home', 'mobile_topup');
                Actions.mobile_topup();
                break;
            case 'buy_cards':
                GoogleAnalytics.trackEvent('ga_home', 'buy_cards');
                Actions.buy_cards();
                break;
            case 'about':
                GoogleAnalytics.trackEvent('ga_home', 'about');
                Actions.webview2({ title: Lang.gioi_thieu(), url: 'https://appota.com/app/about.html' })
                break;
            case 'support':
                GoogleAnalytics.trackEvent('ga_home', 'support');
                Actions.webview2({ title: Lang.ho_tro(), url: 'https://vi.appota.com/faq-app.html' })
                break;
            case 'games_topup':
                GoogleAnalytics.trackEvent('ga_home', 'games_topup');
                Actions.games_topup();
                break;
            case 'giftcode':
                GoogleAnalytics.trackEvent('ga_home', 'giftcode');
                Actions.giftcode();
                break;
            case 'betting':
                GoogleAnalytics.trackEvent('ga_home', 'betting');
                Actions.betting();
                break;
            case 'mini_game':
                GoogleAnalytics.trackEvent('ga_home', 'mini_game');
                Actions.mini_game();
                break;
            case 'thu_mua_the':
                GoogleAnalytics.trackEvent('ga_home', 'thu_mua_the');
                Actions.cashin_card();
                break;
            default:
                GoogleAnalytics.trackEvent('ga_home', 'login');
                Actions.login()
                break
        }
    }
}

class AppotaView extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling = false;
    }
    render() {
        return (
            <View style={styles.ViewList}>
                <View style={styles.ViewList_List}>
                    <View style={styles.ViewList_ListScroll} >
                        <View style={styles.ViewList_ListScroll_Inner}>
                            <View style={styles.ViewList_ListScroll_Row}>
                                <TouchableOpacity onPress={() => checkToken(this.props.access_token, 'cashin')} style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image source={require('../../element/homepage/ic-NapTien.png')} style={styles.ViewList_ListImg} />
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                {Lang.nap_vi()}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => checkToken(this.props.access_token, 'borrow_money')} style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image source={require('../../element/homepage/ic-MuonTien.png')} style={styles.ViewList_ListImg} />
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                {Lang.muon_tien()}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => checkToken(this.props.access_token, 'transfer')} style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image source={require('../../element/homepage/ic-ChuyenTien.png')} style={styles.ViewList_ListImg} />
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                {Lang.chuyen_tien()}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => checkToken(this.props.access_token, 'cashout')} style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image source={require('../../element/homepage/ic-RutTien.png')} style={styles.ViewList_ListImg} />
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                {Lang.rut_tien()}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.ViewList_ListScroll_Row}>
                                <TouchableOpacity onPress={() => checkToken(this.props.access_token, 'thu_mua_the')} style={styles.ViewList_ListTouch}>
                                    <View style={[styles.ViewList_ListTouch_Inner, { opacity: 1 }]}>
                                        <Image source={require('../../element/homepage/ic-NhanTien.png')} style={styles.ViewList_ListImg} />
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                {Lang.thu_mua_the()}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => checkToken(this.props.access_token, 'mobile_topup')} style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image source={require('../../element/homepage/ic-NapTienDienThoai.png')} style={styles.ViewList_ListImg} />
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                {Lang.nap_dienthoai()}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => checkToken(this.props.access_token, 'buy_cards')} style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image source={require('../../element/homepage/ic-MuaMaThe.png')} style={styles.ViewList_ListImg} />
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                {Lang.mua_the()}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => checkToken(this.props.access_token, 'games_topup')} style={styles.ViewList_ListTouch}>
                                    <View style={[styles.ViewList_ListTouch_Inner, { opacity: 1 }]}>
                                        <Image source={require('../../element/homepage/ic-Games.png')} style={styles.ViewList_ListImg} />
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                {Lang.nap_game()}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={[styles.ViewList_Badge, styles.ViewList_Badge_P3]}>
                                    <View style={[styles.ViewList_Badge_Inner, { marginBottom: 20 }]}>
                                        <Animatable.View animation="pulse" iterationCount={1000} >
                                            <Image source={require('../../element/form/ic-badge.png')} style={styles.ViewList_Badge_Img} />
                                            <Text style={styles.ViewList_Badge_Text}>
                                                {Lang.chiet_khau()}
                                            </Text>
                                        </Animatable.View>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.ViewList_ListScroll_Row, { display: 'flex' }]}>
                                <TouchableOpacity onPress={() => { checkToken(this.props.access_token, 'giftcode'); this.props.onPressGC() }} style={styles.ViewList_ListTouch}>
                                    <View style={[styles.ViewList_ListTouch_Inner, { opacity: 1 }]}>
                                        <Image source={require('../../element/homepage/ic-Gift.png')} style={styles.ViewList_ListImg} />
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                {Lang.giftcode()}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => checkToken(this.props.access_token, 'mini_game')} style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image source={require('../../element/homepage/ic-MiniGame.png')} style={styles.ViewList_ListImg} />
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                {Lang.mini_game()}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => checkToken(this.props.access_token, 'support')} style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image source={require('../../element/homepage/ic-HoTro.png')} style={styles.ViewList_ListImg} />
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                {Lang.ho_tro()}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => checkToken(this.props.access_token, 'about')} style={styles.ViewList_ListTouch}>
                                    <View style={[styles.ViewList_ListTouch_Inner, { opacity: 1 }]}>
                                        <Image source={require('../../element/homepage/ic-GioiThieu.png')} style={styles.ViewList_ListImg} />
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                {Lang.gioi_thieu()}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

module.exports = AppotaView;
