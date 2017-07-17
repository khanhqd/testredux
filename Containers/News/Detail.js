import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    WebView,
    Image
} from "react-native";

import { Actions } from 'react-native-router-flux';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import LinearGradient from 'react-native-linear-gradient';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import { LINK } from '../Helpers/constString'

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var Dimensions = require('Dimensions');
var { height, width } = Dimensions.get('window');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Actions.pop();
}

class Detail extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: false,
            title: '',
            avatar: '',
            content: '',
            created_at: '',
            newsHeight: height - PARALLAX_HEADER_HEIGHT - 15,
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_news_detail');
        appsFlyer.trackEvent('af_news_detail', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_news_detail', 1);
        setTimeout(() => {
            this.GetNewsDetail(this.props.news_id);
        }, 200);
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    GetNewsDetail(new_id) {
        RequestHelper.NewsDetail(new_id)
            .then((respone) => {
                if (respone.status == 200) {
                    var data = JSON.parse(respone._bodyText);
                    this.setState({
                        title: data.title,
                        avatar: data.avatar.length == 0 ? LINK.DEFAULT_BANNER : data.avatar,
                        content: data.content,
                        created_at: data.created_at
                    });
                }
                else {
                    Actions.popup({ title: 'Thông báo', content: 'Lấy chi tiết tin tức thất bại', flag: 'error' });
                }
            })
            .catch((error) => {
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    renderNode(node, index, parent, type) {
        var name = node.name
        if (name == 'img') {
            var uri = node.attribs.src;
            // Alert.alert(node.attribs.src.toString());
            var w = 300;
            var h = 200;
            return (
                <View key={index} style={{ width: width, height: parseInt(h), marginLeft: -25, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: uri }} style={{ width: w, height: h }} />
                </View>
            )
        }
    }

    render() {
        const { onScroll = () => { } } = this.props;
        const HTML = `<html><header><meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport"></header><body style="font-family: Arial">` + this.state.content + `</body></html>`;
        return (
            <View {...this.props} style={[styles.container, styles.tabNews]}>
                <ParallaxScrollView
                    onScroll={onScroll}
                    headerBackgroundColor="#1C1C1C"
                    stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    backgroundSpeed={10}
                    scrollEnabled={false}
                    onChangeHeaderVisibility={(a) => this.setState({ newsHeight: a ? (height - PARALLAX_HEADER_HEIGHT - 15) : (height - 15) })}
                    style={styles.ParallaxScrollView}
                    renderBackground={() => (
                        <View key="background" style={styles.ViewDetail_Cover}>
                            {renderIf(this.state.avatar.length != 0)(
                                <Image
                                    source={{ uri: this.state.avatar }}
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

                        </View>
                    )}
                    renderStickyHeader={() => (
                        <View style={styles.headerNav}>
                            <View style={styles.headerNavInner}>
                                <View style={styles.navLeft}>
                                </View>
                                <View style={styles.navTitle}>
                                    <Text style={styles.navTitle_Text} numberOfLines={1}>
                                        {this.state.title}
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
                        </View>
                    )}
                >
                    <View style={[styles.NewsDetail, { height: this.state.newsHeight }]}>

                        <View style={[styles.NewsDetail_Header]}>
                            <Text style={styles.NewsDetail_HeaderTitle}>
                                {this.state.title}
                            </Text>
                            <Text style={styles.NewsDetail_HeaderTime}>
                                {this.state.created_at}
                            </Text>
                        </View>
                        <WebView
                            ref={'webview'}
                            automaticallyAdjustContentInsets={false}
                            source={{ html: HTML }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            decelerationRate="normal"
                            startInLoadingState={false}
                            scalesPageToFit={false}
                            scrollEnabled={true}
                            renderError={(e) => {
                                return (
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 14, color: 'black', marginTop: 20, textAlign: 'center' }}>
                                            Lỗi kết nối, vui lòng kiểm tra lại!
                                            </Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </ParallaxScrollView>
            </View>
        );
    }
}

const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = width * 0.5625;
const STICKY_HEADER_HEIGHT = 64;

export default Detail;
