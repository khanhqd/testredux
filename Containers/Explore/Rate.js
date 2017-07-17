import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet, 
    Text, 
    View, 
    Animated,
    Dimensions,
    TouchableOpacity,
    Image
} from "react-native";
import { Actions } from 'react-native-router-flux';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import TimerMixin from 'react-timer-mixin';
import StarRating from 'react-native-star-rating';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

var {
    height: deviceHeight
} = Dimensions.get("window");

class ComingSoon extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            offset: new Animated.Value(-deviceHeight),
            starCount: 1,
            access_token: props.access_token,
            merchant_id: props.merchant_id,
            merchant_store_id: props.merchant_store_id,
        };
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_discover_detail_rate');
        AppEventsLogger.logEvent('fb_discover_detail_rate', 1);
        appsFlyer.trackEvent('af_discover_detail_rate', {}, () => { }, () => { });

        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start();
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    cancelRate() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.pop);
    }

    okRate() {
        Animated.timing(this.state.offset, {
            duration: 1,
            toValue: -deviceHeight
        }).start(Actions.pop);
        this.RateStore();
    }

    RateStore() {
        RequestHelper.MerchantRate(this.state.access_token, this.state.merchant_id, this.state.merchant_store_id, this.state.starCount)
            .then((data) => {
                if (data.status == 200) {
                    Actions.popup({ title: Lang.thong_bao(), content: Lang.danh_gia_thanh_cong(), flag: 'success' });
                }
                else {
                    if (data.status == 401) access_token = '';
                    Utils.onRequestEnd(data, Lang.danh_gia_that_bai());
                }
            })
            .catch((error) => {
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    render() {
        return (

            <Animated.View style={[styles.popup, { transform: [{ translateY: this.state.offset }] }]}>
                <View style={styles.popupDialog}>
                    <View style={styles.popupHeader}>
                        <Text style={styles.popupHeader_Text}>
                            {Lang.danh_gia()}
                        </Text>
                    </View>
                    <View style={styles.popupBody}>
                        <Text style={styles.popupBody_Text}>
                            {Lang.des_danh_gia()}
                        </Text>
                        <View style={styles.viewRate}>
                            <View style={styles.viewRate_Star}>
                                <StarRating
                                    disabled={false}
                                    emptyStar={'ios-star-outline'}
                                    fullStar={'ios-star'}
                                    halfStar={'ios-star-half'}
                                    iconSet={'Ionicons'}
                                    maxStars={5}
                                    rating={this.state.starCount}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    starColor={'#00A9FF'}
                                    />
                            </View>
                        </View>
                    </View>
                    <View style={styles.popupFooter}>
                        <TouchableOpacity style={styles.popupFooter_TouchLeft} onPress={this.cancelRate.bind(this)}>
                            <Text style={styles.popupFooter_TextLeft} >
                                {Lang.button_huy()}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.popupFooter_TouchRight} onPress={this.okRate.bind(this)}>
                            <Text style={styles.popupFooter_TextRight} >
                                {Lang.button_ok()}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Animated.View>
        );
    }
};


export default ComingSoon;
