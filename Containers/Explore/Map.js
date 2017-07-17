import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import MapView from 'react-native-maps';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import Toast from '@remobile/react-native-toast';

import TimerMixin from 'react-timer-mixin';
var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Utils = require('../Common/Utils');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var styles = require('../Common/style.js');

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
            latitude: this.props.location.lat,
            longitude: this.props.location.lon,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        markers: [
            {
                coordinate: {
                    latitude: this.props.location.lat,
                    longitude: this.props.location.lon,
                },
            },
        ],
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_map');
        AppEventsLogger.logEvent('fb_map', 1);
        appsFlyer.trackEvent('af_map', {}, () => { }, () => { });
        let { dispatch, location } = this.props
        if (Platform.OS == 'ios') {
            if (location.lat == 0 || location.lon == 0) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        var _location = {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        }
                        dispatch(taskActionCreators.change_location(_location))
                        this.setState({
                            region: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            },
                        })
                    },
                    (error) => { },
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                );
            }
        }

        setTimeout(() => {
            this.FindMerchantStore()
        }, 500)
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    FindMerchantStore() {
        RequestHelper.FindMerchantStore(10, 0, this.props.location.lat, this.props.location.lon)
            .then((data) => {
                if (data.status == 200) {
                    var merchant = JSON.parse(data._bodyText);
                    var anno = [];
                    for (var i = 0; i < merchant.data.length; i++) {
                        var distance = Utils.getDistanceFromLatLonInKm(parseFloat(this.props.location.lat), parseFloat(this.props.location.lon), parseFloat(merchant.data[i].latitude), parseFloat(merchant.data[i].longitude));
                        var sDistance = '';
                        if (distance > 1)
                            sDistance = Utils.toFixed(distance, 2) + ' km';
                        else
                            sDistance = Utils.toFixed(distance * 1000, 0) + ' m';
                        var cate_ic = require('../../element/map/location.png');
                        if (merchant.data[i].category_id == 1)
                            cate_ic = require('../../element/map/location-AmThuc.png');
                        else if (merchant.data[i].category_id == 2)
                            cate_ic = require('../../element/map/location-ThoiTrang.png');
                        else if (merchant.data[i].category_id == 3)
                            cate_ic = require('../../element/map/location-SieuThi.png');
                        else if (merchant.data[i].category_id == 4)
                            cate_ic = require('../../element/map/location-GiaoDuc.png');
                        else if (merchant.data[i].category_id == 5)
                            cate_ic = require('../../element/map/location-YTe.png');
                        else if (merchant.data[i].category_id == 6)
                            cate_ic = require('../../element/map/location-DuLich.png');
                        else if (merchant.data[i].category_id == 10)
                            cate_ic = require('../../element/map/location-NoiThat.png');
                        else if (merchant.data[i].category_id == 7)
                            cate_ic = require('../../element/map/location-MyPham.png');
                        else if (merchant.data[i].category_id == 11)
                            cate_ic = require('../../element/map/location-Wedding.png');

                        anno.push({
                            coordinate: {
                                latitude: parseFloat(merchant.data[i].latitude),
                                longitude: parseFloat(merchant.data[i].longitude),
                            },
                            id: merchant.data[i].id,
                            merchant_id: merchant.data[i].merchant_id,
                            name: merchant.data[i].name,
                            cate_ic: cate_ic,
                            avatar: { uri: merchant.data[i].avatar },
                            address: merchant.data[i].address,
                            distance: sDistance,
                            category_name: merchant.data[i].category_name,
                        });
                    }
                    this.setState({ markers: anno });
                }

            })
            .catch((error) => {
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    onPressRowMerchant(rowData) {
        Actions.explore_detail({
            id: rowData.id,
            merchant_id: rowData.merchant_id,
        });
    }

    render() {
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
                        </View>
                    </View>
                </View>
                <View style={styles.ViewExplore_DetailMap}>
                    <View style={styles.container_map}>
                        <MapView
                            style={styles.map}
                            region={this.state.region}
                            showsUserLocation={true}
                        >
                            {this.state.markers.map((item, i) => {
                                return (
                                    <MapView.Marker key={i}
                                        ref={ref => { this.marker = ref; }}
                                        coordinate={item.coordinate}>
                                        <Image style={{ marginBottom: Platform.OS == 'ios' ? -30 : 0 }} source={item.cate_ic} />
                                        <MapView.Callout style={styles.Marker_Container}>
                                            <TouchableOpacity style={styles.Marker_Container_Touch} onPress={() => this.onPressRowMerchant(item)}>
                                                <View style={styles.Marker_Container_Avatar} >
                                                    <Image source={item.avatar} style={styles.Marker_Container_Avatar_Img} />
                                                </View>
                                                <View style={styles.Marker_Container_Name} >
                                                    <Text style={styles.Marker_Container_Name_Text}>{item.name}</Text>
                                                    <Text style={styles.Marker_Container_Name_Sub}>{item.address}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </MapView.Callout>
                                    </MapView.Marker>)
                            })}
                        </MapView>
                    </View>
                </View>
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    location: state.taskState.location,
})

export default connect(mapStateToProps)(AppotaView)
