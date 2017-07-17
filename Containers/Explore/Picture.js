import React, { Component } from 'react';
import {
    Text, 
    View, 
    TouchableOpacity,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Image
} from "react-native";
import { Actions } from 'react-native-router-flux';
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import Swiper from 'react-native-swiper'
import PhotoView from 'react-native-photo-view'
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var Lang = require('../Common/Lang');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Actions.pop()
}

const Viewer = props => <Swiper index={props.index} style={styles.Gallery_Wrapper} renderPagination={renderPagination}>
    {
        props.imgList.map((item, i) => <View key={i} style={styles.Gallery_Slide}>
            {renderIf(Platform.OS == 'ios')(
                <TouchableWithoutFeedback onPress={e => props.pressHandle()} style={styles.Gallery_SlideTouch}>
                    <PhotoView
                        source={{ uri: item }}
                        resizeMode='contain'
                        minimumZoomScale={0.5}
                        maximumZoomScale={3}
                        androidScaleType='center'
                        style={styles.Gallery_Photo} />
                </TouchableWithoutFeedback>
            )}
        </View>)
    }
</Swiper>

const renderPagination = (index, total, context) => {
    return (
        <View style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 80,
            left: 0,
            right: 0
        }}>
            <View style={{
                borderRadius: 15,
                backgroundColor: '#00A9FF',
                padding: 3,
                paddingHorizontal: 7
            }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 12
                }}>{index + 1}/ {total}</Text>
            </View>
        </View>
    )
}

class ComingSoon extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            imgList: JSON.parse(props.images),
            showViewer: false,
            showIndex: 0
        }
        this.viewerPressHandle = this.viewerPressHandle.bind(this)
        this.thumbPressHandle = this.thumbPressHandle.bind(this)
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_discover_detail_picture');
        AppEventsLogger.logEvent('fb_discover_detail_picture', 1);
        appsFlyer.trackEvent('af_discover_detail_picture', {}, () => { }, () => { });
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    viewerPressHandle() {
        this.setState({
            showViewer: false
        })
    }
    thumbPressHandle(i) {
        this.setState({
            showIndex: i,
            showViewer: true
        })
    }
    render() {
        if (this.state.imgList.length == 0) return null;
        return (
            <View {...this.props} style={[styles.container, styles.tabExplore]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.thu_vien_anh()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.ViewExplore_DetailPicture}>
                        {renderIf(this.state.showViewer && Platform.OS == 'ios')(
                            <Viewer
                                index={this.state.showIndex}
                                pressHandle={this.viewerPressHandle}
                                imgList={this.state.imgList} />
                        )}
                        {renderIf(!this.state.showViewer && Platform.OS == 'ios')(
                            <View style={styles.ViewExplore_DetailPicture_Inner}>
                                {
                                    this.state.imgList.map((item, i) => <TouchableOpacity key={i} onPress={e => this.thumbPressHandle(i)} style={styles.ViewExplore_DetailPicture_Touch}>
                                        <Image style={styles.ViewExplore_DetailPicture_Img} source={{ uri: item }} />
                                    </TouchableOpacity>)
                                }
                            </View>
                        )}
                        {renderIf(!this.state.showViewer && Platform.OS == 'android')(
                            <View style={styles.ViewExplore_DetailPicture_Inner}>
                                {
                                    this.state.imgList.map((item, i) => <View key={i} style={styles.ViewExplore_DetailPicture_Touch}>
                                        <Image style={styles.ViewExplore_DetailPicture_Img} source={{ uri: item }} />
                                    </View>)
                                }
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        );
    }
};


export default ComingSoon;
