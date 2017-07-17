import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    RefreshControl,
    AsyncStorage,
    ListView,
    Platform,
    TextInput,
    Image,
    Dimensions
} from "react-native";

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
import renderIf from '../Common/renderIf';
import TimerMixin from 'react-timer-mixin';
import RowData from './RowData';
import BaseListViewComponent from '../BaseClass/BaseListViewComponent';
var styles = require('../Common/style.js');

const popToRoot = () => {
    Actions.pop();
}

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
class AppotaView extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    state = {
        refreshing: false,
        isLoading: false,
        isLoadingMore: false,
        isFocused: false,
        search: '',
        dataSource: ds.cloneWithRows(this.props.ds_explore)
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_checkin');
        AppEventsLogger.logEvent('fb_checkin', 1);
        let { dispatch, location, ds_explore } = this.props
        if (location.lat == 0 || location.lon == 0) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    var _location = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    }
                    dispatch(taskActionCreators.change_location(_location))
                },
                (error) => { },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        }
        if (ds_explore.length == 0) {
            setTimeout(() => {
                this.getListItems(0, '');
            }, 200);
        }
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    getListItems(startIndex, search) {
        let { dispatch, location } = this.props
        if (startIndex == 0) {
            this.setState({ isLoading: true });
            dispatch(taskActionCreators.update_ds_explore([]))
        }
        RequestHelper.MerchantStores('', 10, startIndex, location.lat, location.lon, search)
            .then((data) => {
                if (data.status == 200) {
                    var resData = [];
                    var merchant = JSON.parse(data._bodyText);
                    for (var i = 0; i < merchant.data.length; i++) {
                        var distance = Utils.getDistanceFromLatLonInKm(parseFloat(location.lat), parseFloat(location.lon), parseFloat(merchant.data[i].latitude), parseFloat(merchant.data[i].longitude));
                        var sDistance = '';
                        if (distance > 1)
                            sDistance = Utils.toFixed(distance, 2) + ' km';
                        else
                            sDistance = Utils.toFixed(distance * 1000, 0) + ' m';
                        resData.push({
                            id: merchant.data[i].id,
                            merchant_id: merchant.data[i].merchant_id,
                            name: merchant.data[i].name,
                            cashback_percent: Utils.toFixed(merchant.data[i].cashback_percent, 1),
                            avatar: { uri: merchant.data[i].avatar },
                            description: merchant.data[i].description,
                            address: merchant.data[i].address,
                            distance: sDistance,
                            category_name: merchant.data[i].category_name,
                            total_rate: merchant.data[i].total_rate,
                            sum_rate: merchant.data[i].sum_rate,
                            phone_number: merchant.data[i].phone_number
                        });
                    }
                    var _ds = this.props.ds_explore.concat(resData)
                    dispatch(taskActionCreators.update_ds_explore(_ds))
                    this.setState({ dataSource: ds.cloneWithRows(_ds) });
                }
                else {
                    Utils.onRequestEnd(data);
                }
                this.setState({ refreshing: false, isLoadingMore: false, isLoading: false });
            })
            .catch((error) => {
                this.setState({ refreshing: false, isLoadingMore: false, isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    _onBlur(e) {
        this.setState({ isFocused: false });
    }

    _onFocus(e) {
        this.setState({ isFocused: true });
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.getListItems(0, '');
    }

    onPressRow(data) {
        if (this.props.access_token.length == 0) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.can_dang_nhap(), flag: 'error', onPress_Cancel: () => { }, onPress_Ok: () => Actions.login() });
        }
        else {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.confirm_checkin('checkin') + ' ' + data.name + ' ?', onPress_Cancel: () => { }, onPress_Ok: () => this.Checkin(data) });
        }
    }

    SearchMerchant() {
        this.getListItems(0, this.state.search);
    }

    onSearchTextChange(_search) {
        this.setState({ search: _search });
        if (_search.length == 0)
            this.getListItems(0, _search);
    }

    _clearAll(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({ isFocused: false, search: '' });
        this.getListItems(0, '');
    }

    _clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({ isFocused: true, search: '' });
        this.getListItems(0, '');
    }

    Checkin(data) {
        let { access_token, location } = this.props
        RequestHelper.UserCheckin(access_token, data.id, location.lat, location.lon, 'checkin')
            .then((_data) => {
                if (_data.status == 200) {
                    appsFlyer.trackEvent('af_checkin', {}, () => { }, () => { });
                    AsyncStorage.setItem(data.id.toString(), new Date().getTime().toString());
                    Actions.popup({
                        title: Lang.thong_bao(),
                        content: Lang.checkin_thanh_cong('Checkin') + ' ' + data.name + '\n' + Lang.nhac_cua_hang_hoan_tien(data.cashback_percent),
                        flag: 'success'
                    });
                }
                else {
                    Utils.onRequestEnd(_data);
                }
            })
            .catch((error) => {
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    loadMoreItems() {
        if (this.state.isLoadingMore) return;
        if (this.props.ds_explore.length == 0) return;
        if (this.state.isLoading) return;
        this.setState({ isLoadingMore: true })
        this.getListItems(this.props.ds_explore.length, this.state.search);
    }

    onScroll(e) {
        var windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
        if (windowHeight + offset > height + 30) {
            this.loadMoreItems();
        }
    }

    render() {
        return (
            <View {...this.props} style={[styles.container, this.props.sceneStyle]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                Check-in
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl_Search}>
                    <View style={styles.FormControl_Search_Inner}>
                        <TextInput
                            ref={'textClear'}
                            autoCapitalize="none"
                            autoFocus={false}
                            placeholder={Lang.tim_cua_hang()}
                            placeholderTextColor="#8E8E93"
                            value={this.state.search}
                            autoCorrect={false}
                            returnKeyType={"done"}
                            onBlur={this._onBlur.bind(this)}
                            onFocus={this._onFocus.bind(this)}
                            onSubmitEditing={this.SearchMerchant.bind(this)}
                            onChangeText={(text) => this.onSearchTextChange(text)}
                            style={styles.FormControl_SearchInput}
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <Image source={require('../../element/explore/ic-search-gray.png')} style={styles.FormControl_SearchIcon} />

                    </View>
                </View>
                <View style={styles.tabScroll}>
                    <View style={styles.ListCheckin}>
                        <ListView
                            ref={component => this.listview = component}
                            style={{ flex: 1, backgroundColor: 'white' }}
                            dataSource={this.state.dataSource}
                            renderRow={(data, sectionID, rowID) => <RowData {...data} location={this.props.location} onPressRow={this.onPressRow.bind(this, data)} />}
                            enableEmptySections={true}
                            showsVerticalScrollIndicator={false}
                            onScroll={this.onScroll.bind(this)}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                        />
                    </View>
                    {renderIf(this.state.isLoading)(
                        <Loading />
                    )}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    location: state.taskState.location,
    ds_explore: state.taskState.ds_explore,
})

export default connect(mapStateToProps)(AppotaView)
