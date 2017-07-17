import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Image,
    Linking
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import * as Animatable from 'react-native-animatable';
import MapView from 'react-native-maps';
import ActionSheet from 'react-native-actionsheet';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var RequestHelper = require('../Common/RequestHelper');
var Toast = require('../../custom_modules/react-native-toast');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var styles = require('../Common/style.js');
const buttons = [Lang.button_huy(), 'Apple Maps', 'Google Maps'];
const CANCEL_INDEX = 0;

// Map
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const popToRoot = () => {
    Actions.pop();
}

class AppotaView extends Component {
    state = {
        isLoading: false,
        region: {
            latitude: this.props.mc_location.lat,
            longitude: this.props.mc_location.lon,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        markers: [
            {
                coordinate: {
                    latitude: this.props.mc_location.lat,
                    longitude: this.props.mc_location.lon,
                },
            },
        ],
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_discover_map');
        AppEventsLogger.logEvent('fb_discover_map', 1);
        appsFlyer.trackEvent('af_discover_map', {}, () => { }, () => { });
        setTimeout(() => {
            var merchant = this.props;
            var anno = [];
            anno.push({
                coordinate: {
                    latitude: parseFloat(merchant.mc_location.lat),
                    longitude: parseFloat(merchant.mc_location.lon),
                },
                name: merchant.name,
                cate_ic: require('../../element/map/location.png'),
                avatar: { uri: merchant.avatar },
                address: merchant.address,
            });
            this.setState({ markers: anno });
        }, 200)
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    _handlePress(index) {
        var urlApple = 'http://maps.apple.com/?daddr=' + this.props.mc_location.lat + ',' + this.props.mc_location.lon + '&zoom=14';
        var urlGoogle = 'http://google.com/maps/?daddr=' + + this.props.mc_location.lat + ',' + this.props.mc_location.lon + '&zoom=14';
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
        const { region, markers } = this.state;
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
                                {Lang.ban_do()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                            <TouchableOpacity onPress={this.show.bind(this)}>
                                <Image source={require('../../element/nav-bar/nav-directions.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.ViewExplore_DetailMap}>
                    <View style={styles.container_map}>
                        <MapView style={styles.map} initialRegion={region} showsUserLocation={true} >
                            <MapView.Marker ref={ref => { this.marker = ref; }} coordinate={markers[0].coordinate} >
                                <View style={styles.Marker_Box}>
                                    <View style={styles.Marker_Box_Inner}>
                                        <View style={styles.Marker_Container}>
                                            <View style={styles.Marker_Container_Touch}>
                                                <View style={styles.Marker_Container_Avatar}>
                                                    <Image source={{ uri: this.props.avatar }} style={styles.Marker_Container_Avatar_Img} />
                                                </View>
                                                <View style={styles.Marker_Container_Name}>
                                                    <Text style={styles.Marker_Container_Name_Text}>{this.props.name}</Text>
                                                    <Text style={styles.Marker_Container_Name_Sub}>{this.props.address}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <Image source={require('../../element/map/location.png')} />
                                </View>
                            </MapView.Marker>
                        </MapView>
                    </View>
                </View>
                <View style={[styles.Tutorial_Badge, styles.Tutorial_TopRight]}>
                    <View style={[styles.Tutorial_Badge_Inner,{marginBottom: 45}]}>
                        <Animatable.View animation="pulse" iterationCount={1000}>
                            <Image source={require('../../element/form/ic-badge-top-right.png')} style={styles.Tutorial_Badge_Img} />
                            <Text style={styles.Tutorial_Badge_Text}>
                                {Lang.chi_duong()}
                            </Text>
                        </Animatable.View>
                    </View>
                </View>
                <ActionSheet ref={(o) => this.ActionSheet = o} title={Lang.chon_ung_dung_map()} options={buttons} cancelButtonIndex={CANCEL_INDEX} onPress={this._handlePress.bind(this)} tintColor="#007aff" />
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    location: state.taskState.location,
})

export default connect(mapStateToProps)(AppotaView)
