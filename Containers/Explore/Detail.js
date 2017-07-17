/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Keyboard,
    Platform,
    AsyncStorage,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import LinearGradient from 'react-native-linear-gradient';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import * as Animatable from 'react-native-animatable';
import Communications from 'react-native-communications';
import TimerMixin from 'react-timer-mixin';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import moment from 'moment';

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
import renderIf from '../Common/renderIf'
var RequestHelper = require('../Common/RequestHelper');
var Utils = require('../Common/Utils');

const popToRoot = () => {
    Actions.pop();
}

class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: true,
            name: '',
            address: '',
            distance: 1000,
            sDistance: '',
            sum_rate: 0,
            total_rate: 1,
            cashback_percent: 0,
            mc_location: {
                lat: 0,
                lon: 0
            },
            images: [],
            description: '',
            phone_number: 0,
            txtCheckin: 'Checkin',
            cover: ''
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentWillMount() {
        AsyncStorage.getItem(this.props.id.toString()).then((value) => {
            if (value != null && value.length != 0) {
                var time = parseInt(value)
                var timeNow = moment().valueOf()
                if (timeNow - time > 18000000)
                    this.setState({
                        txtCheckin: 'Checkin'
                    })
                else
                    this.setState({
                        txtCheckin: 'Checkout'
                    })
            }
            else {
                this.setState({
                    txtCheckin: 'Checkin'
                })
            }
        }).done();
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_discover_detail');
        appsFlyer.trackEvent('af_discover_detail', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_discover_detail', 1);
        setTimeout(() => {
            this.GetMerchantDetail()
        }, 200);
    }

    genRateStar(sum_rate, total_rate) {
        var star1 = require('../../element/explore/star-full.png');
        var star2 = require('../../element/explore/star-full.png');
        var star3 = require('../../element/explore/star-full.png');
        var star4 = require('../../element/explore/star-full.png');
        var star5 = require('../../element/explore/star-full.png');
        var tb = parseInt(sum_rate / total_rate);
        switch (tb) {
            case 0:
                star1 = require('../../element/explore/star-line.png');
                star2 = require('../../element/explore/star-line.png');
                star3 = require('../../element/explore/star-line.png');
                star4 = require('../../element/explore/star-line.png');
                star5 = require('../../element/explore/star-line.png');
                break;
            case 1:
                if (sum_rate % total_rate > total_rate / 2)
                    star2 = require('../../element/explore/star-full.png');
                else
                    star2 = require('../../element/explore/star-line.png');
                star3 = require('../../element/explore/star-line.png');
                star4 = require('../../element/explore/star-line.png');
                star5 = require('../../element/explore/star-line.png');
                break;
            case 2:
                if (sum_rate % total_rate > total_rate / 2)
                    star3 = require('../../element/explore/star-full.png');
                else
                    star3 = require('../../element/explore/star-line.png');
                star4 = require('../../element/explore/star-line.png');
                star5 = require('../../element/explore/star-line.png');
                break;
            case 3:
                if (sum_rate % total_rate > total_rate / 2)
                    star4 = require('../../element/explore/star-full.png');
                else
                    star4 = require('../../element/explore/star-line.png');
                star5 = require('../../element/explore/star-line.png');
                break;
            case 4:
                if (sum_rate % total_rate > total_rate / 2)
                    star5 = require('../../element/explore/star-line.png');
                else
                    star5 = require('../../element/explore/star-line.png');
                break;
        }

        return {
            star1: star1,
            star2: star2,
            star3: star3,
            star4: star4,
            star5: star5,
        }
    }

    GetMerchantDetail() {
        RequestHelper.MerchantStoreDetail(this.props.merchant_id)
            .then((data) => {
                if (data.status == 200) {
                    var store = JSON.parse(data._bodyText);
                    var distance = Utils.getDistanceFromLatLonInKm(parseFloat(this.props.location.lat), parseFloat(this.props.location.lon), parseFloat(store.latitude), parseFloat(store.longitude));
                    var sDistance = '';
                    if (distance > 1)
                        sDistance = Utils.toFixed(distance, 2) + ' km';
                    else
                        sDistance = Utils.toFixed(distance * 1000, 0) + ' m';

                    this.setState({
                        isLoading: false,
                        sum_rate: store.sum_rate,
                        total_rate: store.total_rate,
                        cover: store.cover.length == 0 ? Utils.DefaultBanner() : store.cover,
                        name: store.name,
                        address: store.address,
                        distance: Utils.toFixed(distance * 1000, 0),
                        sDistance: sDistance,
                        cashback_percent: Utils.toFixed(store.cashback_percent, 1),
                        mc_location: {
                            lat: parseFloat(store.latitude),
                            lon: parseFloat(store.longitude)
                        },
                        images: JSON.stringify(store.images),
                        description: store.description,
                        phone_number: store.phone_number
                    });
                }
                else {
                    this.setState({ isLoading: false });
                    Utils.onRequestEnd(data);
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    ConfirmCheckin() {
        GoogleAnalytics.trackEvent('ga_discover', 'Confirm checkin');
        appsFlyer.trackEvent('af_discover_checkin', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_discover_checkin', 1);
        if (this.props.access_token.length == 0) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.can_dang_nhap(), onPress_Cancel: () => { }, onPress_Ok: () => Actions.login() });
        }
        else {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.confirm_checkin(this.state.txtCheckin.toLowerCase()) + ' ' + this.state.name + ' ?', onPress_Cancel: () => { }, onPress_Ok: () => this.Checkin(this.state.txtCheckin.toLowerCase()) });
        }
    }

    ConfirmRate() {
        GoogleAnalytics.trackEvent('ga_discover', 'Confirm rate');
        appsFlyer.trackEvent('af_discover_rate', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_discover_rate', 1);
        if (this.props.access_token.length == 0) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.can_dang_nhap(), onPress_Cancel: () => { }, onPress_Ok: () => Actions.login() });
        }
        else {
            Actions.explore_rate({ access_token: this.props.access_token, merchant_id: this.props.merchant_id, merchant_store_id: this.props.id })
        }
    }

    Checkin(type) {
        // type = 'checkout';
        RequestHelper.UserCheckin(this.props.access_token, this.props.id, this.props.location.lat, this.props.location.lon, type)
            .then((data) => {
                if (data.status == 200) {
                    if (type == 'checkin') {
                        AsyncStorage.setItem(this.props.id.toString(), new Date().getTime().toString());
                        this.setState({
                            txtCheckin: 'Checkout'
                        })
                    }
                    else {
                        AsyncStorage.removeItem(this.props.id.toString());
                        this.setState({
                            txtCheckin: 'Checkin'
                        })
                    }
                    Actions.popup({ title: Lang.thong_bao(), content: Lang.checkin_thanh_cong('Checkin') + ' ' + this.state.name + '\n' + Lang.nhac_cua_hang_hoan_tien(this.state.cashback_percent), flag: 'success' });
                }
                else {
                    Utils.onRequestEnd(data);
                }
            })
            .catch((error) => {
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    _handlePress(index) {
        var urlApple = 'http://maps.apple.com/?daddr=' + this.state.latitude + ',' + this.state.longitude;
        var urlGoogle = 'http://google.com/maps/?daddr=' + this.state.latitude + ',' + this.state.longitude + '&zoom=14';
        if (index == 1) {
            if (Platform.OS == 'ios') {
                Linking.openURL(urlApple);
            }
            if (Platform.OS == 'android') {
                Linking.openURL(urlApple);
            }
        }
        if (index == 2) {
            if (Platform.OS == 'ios') {
                Linking.openURL(urlGoogle);
            }
            if (Platform.OS == 'android') {
                Linking.openURL(urlGoogle);
            }
        }
    }
    show() {
        this.ActionSheet.show();
    }

    render() {
        const { onScroll = () => { } } = this.props;
        var stars = this.genRateStar(this.state.sum_rate, this.state.total_rate)
        var star1 = stars.star1
        var star2 = stars.star2
        var star3 = stars.star3
        var star4 = stars.star4
        var star5 = stars.star5

        return (
            <View {...this.props} style={[styles.container, styles.tabNews]}>
                <ParallaxScrollView
                    onScroll={onScroll}
                    headerBackgroundColor="#1C1C1C"
                    stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    backgroundSpeed={10}
                    style={styles.ParallaxScrollView}
                    renderBackground={() => (
                        <View key="background" style={styles.ViewDetail_Cover}>
                            {renderIf(this.state.cover.length != 0)(
                                <Image
                                    source={{ uri: this.state.cover }}
                                    style={styles.ViewDetail_CoverImg}
                                />
                            )}
                            <View style={styles.ViewDetail_Nav}>
                                <LinearGradient colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0)']} style={styles.ViewDetail_linearGradient}>
                                </LinearGradient>
                            </View>
                        </View>
                    )}
                    renderForeground={() => (
                        <View key="parallax-header" style={styles.parallaxHeader}>
                            <View style={styles.ViewDetail_Cover}>
                                <View style={styles.ViewExploreDetail_InfoSale}>
                                    <Animatable.Text animation="flash" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>
                                        <Text style={styles.ViewExploreDetail_InfoSaleText}>
                                            {this.state.cashback_percent}
                                            <Text style={styles.ViewExploreDetail_InfoSaleTextSub}>
                                                %
                                            </Text>
                                        </Text>
                                    </Animatable.Text>
                                </View>
                            </View>
                        </View>
                    )}
                    renderStickyHeader={() => (
                        <View style={styles.headerNav}>
                            <View style={styles.headerNavInner}>
                                <View style={styles.navLeft}>
                                </View>
                                <View style={styles.navTitle}>
                                    <Text style={styles.navTitle_Text} numberOfLines={1}>
                                        {this.state.name}
                                    </Text>
                                </View>
                                <View style={styles.navRight}>
                                </View>
                            </View>
                        </View>
                    )}
                    renderFixedHeader={() => (
                        <View key="fixed-header" style={styles.ViewDetail_Nav}>
                            <TouchableOpacity onPress={popToRoot} style={styles.ViewDetail_NavTouchLeft}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.ViewDetail_NavTouch_Img} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.ViewDetail_NavTouchRight} onPress={() => Actions.explore_detail_map({ mc_location: this.state.mc_location, name: this.state.name, address: this.state.address, avatar: this.state.cover })}>
                                <View style={styles.ViewDetail_NavTouchRight_Inner}>
                                    <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>
                                        <Text style={styles.ViewDetail_NavTouchRight_Text}>
                                            {Lang.ban_do()}
                                        </Text>
                                    </Animatable.Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}>
                    <View style={[styles.FormControl]}>
                        <View style={styles.ViewExploreDetail}>
                            <View style={styles.ViewExploreDetail_Row}>
                                <View style={styles.ViewExploreDetail_Info}>
                                    <Text style={styles.ViewExploreDetail_InfoTitle} numberOfLines={2}>
                                        {this.state.name}
                                    </Text>
                                    <View style={styles.ViewExploreDetail_InfoAddress}>
                                        <Text style={styles.ViewExploreDetail_InfoAddress_Text} numberOfLines={1}>
                                            {this.state.address}
                                        </Text>
                                        <Image source={require('../../element/profile/p-location-sm.png')} style={styles.ViewExploreDetail_InfoAddress_LocationSm} />
                                        <Text style={styles.ViewExploreDetail_InfoAddress_Location} numberOfLines={1}>
                                            {this.state.sDistance}
                                        </Text>
                                    </View>
                                    <View style={styles.ViewExploreDetail_InfoRate}>
                                        <Image source={star1} style={styles.ViewExploreDetail_InfoRate_Img} />
                                        <Image source={star2} style={styles.ViewExploreDetail_InfoRate_Img} />
                                        <Image source={star3} style={styles.ViewExploreDetail_InfoRate_Img} />
                                        <Image source={star4} style={styles.ViewExploreDetail_InfoRate_Img} />
                                        <Image source={star5} style={styles.ViewExploreDetail_InfoRate_Img} />
                                        <Text style={styles.ViewExploreDetail_InfoRate_Text} numberOfLines={1}>
                                            {this.state.total_rate} reviews
                                        </Text>
                                    </View>

                                </View>
                                <View style={styles.ViewExploreDetail_Buttom}>
                                    {renderIf(this.state.distance < 500)(
                                        <TouchableOpacity style={styles.ViewExploreDetail_ButtomTouch} onPress={this.ConfirmCheckin.bind(this)}>
                                            <Image
                                                source={require('../../element/profile/p-location.png')}
                                                style={styles.ViewExploreDetail_ButtomImg} />
                                            <Text style={styles.ViewExploreDetail_ButtomText} numberOfLines={1}>
                                                {this.state.txtCheckin}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity style={styles.ViewExploreDetail_ButtomTouch} onPress={() => Communications.phonecall(this.state.phone_number, true)}>
                                        <Image source={require('../../element/profile/p-phone.png')} style={styles.ViewExploreDetail_ButtomImg} />
                                        <Text style={styles.ViewExploreDetail_ButtomText} numberOfLines={1}>
                                            {Lang.lien_he()}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.ViewExploreDetail_ButtomTouch} onPress={() => Actions.explore_picture({ images: this.state.images })}>
                                        <Image source={require('../../element/profile/p-picture.png')} style={styles.ViewExploreDetail_ButtomImg} />
                                        <Text style={styles.ViewExploreDetail_ButtomText} numberOfLines={1}>
                                            {Lang.hinh_anh()}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.ViewExploreDetail_ButtomTouch}
                                        onPress={this.ConfirmRate.bind(this)}>
                                        <Image source={require('../../element/profile/p-rate.png')} style={styles.ViewExploreDetail_ButtomImg} />
                                        <Text style={styles.ViewExploreDetail_ButtomText} numberOfLines={1}>
                                            {Lang.danh_gia()}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.LineHeader}></View>
                                <View style={styles.ViewExploreDetail_Content}>
                                    <Text style={styles.ViewExploreDetail_ContentText}>
                                        {this.state.description}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ParallaxScrollView>
                {renderIf(this.state.isLoading)(
                    <Loading />
                )}
            </View>
        );
    }
}

var { height, width } = Dimensions.get('window');
const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = width * 0.5625;
const STICKY_HEADER_HEIGHT = 64;

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    location: state.taskState.location,
    ds_explore: state.taskState.ds_explore,
    ds_explore_cate: state.taskState.ds_explore_cate,
})

export default connect(mapStateToProps)(AppotaView)
