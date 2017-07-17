/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    RefreshControl,
    Keyboard,
    Platform,
    TextInput,
    ListView,
    Dimensions,
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import Toast from '@remobile/react-native-toast';
import TimerMixin from 'react-timer-mixin';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');
import renderIf from '../Common/renderIf'
var RequestHelper = require('../Common/RequestHelper');
var ExploreCate = require('./ExploreCate');
var Utils = require('../Common/Utils');
var Loading = require('../Common/Loading');
import RowData from './RowData';

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
        cate_index: 0,
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_discover');
        appsFlyer.trackEvent('af_discover', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_discover', 1);

        let { dispatch, location, ds_explore_cate, ds_explore } = this.props
        if (Platform.OS == 'ios') {
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
        }
        setTimeout(() => {
            if (ds_explore_cate.length == 0) {
                this.GetMerchantCate();
            }
            else {
                if (ds_explore.length == 0)
                    this.getListItems(0, '', '');
            }
        }, 200);
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    GetMerchantCate() {
        let { dispatch, ds_explore, ds_explore_cate } = this.props
        if (ds_explore_cate.length == 0)
            this.setState({ isLoading: true });
        RequestHelper.MerchantCate()
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    var resData_cate = [];
                    var cate = JSON.parse(data._bodyText);
                    resData_cate.push({ 'id': '', 'name': Lang.map_gan_day(), 'select_line': 'yellow', 'icon': require('../../element/explore/ic-All.png') });
                    for (var i = 0; i < cate.data.length; i++) {
                        resData_cate.push({ 'id': cate.data[i].id, 'name': cate.data[i].name, 'select_line': 'transparent', 'icon': cate.data[i].icon });
                    }
                    dispatch(taskActionCreators.update_ds_explore_cate(resData_cate))
                }
                else {
                    Toast.showToast(Lang.khong_lay_duoc_thong_tin(), "short", "center");
                }
                if (ds_explore.length == 0) {
                    setTimeout(() => {
                        this.getListItems(0, '', '');
                    }, 500);
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    getListItems(startIndex, cid, search) {
        let { dispatch, location } = this.props
        if (startIndex == 0) {
            this.setState({ isLoading: true });
            dispatch(taskActionCreators.update_ds_explore([]))
        }
        RequestHelper.MerchantStores(cid, 10, startIndex, location.lat, location.lon, search)
            .then((data) => {
                console.log(JSON.stringify(data))
                if (data.status == 200) {
                    var resData = [];
                    var merchant = JSON.parse(data._bodyText);
                    for (var i = 0; i < merchant.data.length; i++) {
                        var distance = Utils.getDistanceFromLatLonInKm(parseFloat(location.lat), parseFloat(location.lon), parseFloat(merchant.data[i].latitude), parseFloat(merchant.data[i].longitude));
                        // var sDistance = '';
                        // if (distance > 1)
                        //     sDistance = Utils.toFixed(distance, 2) + ' km';
                        // else
                        //     sDistance = Utils.toFixed(distance * 1000, 0) + ' m';
                        resData.push({
                            id: merchant.data[i].id,
                            merchant_id: merchant.data[i].merchant_id,
                            name: merchant.data[i].name,
                            cashback_percent: Utils.toFixed(merchant.data[i].cashback_percent, 1),
                            avatar: { uri: merchant.data[i].avatar },
                            description: merchant.data[i].description,
                            address: merchant.data[i].address,
                            distance: distance,
                            category_name: merchant.data[i].category_name,
                            total_rate: merchant.data[i].total_rate,
                            sum_rate: merchant.data[i].sum_rate,
                            phone_number: merchant.data[i].phone_number
                        });
                    }
                    var ds = this.props.ds_explore.concat(resData)
                    dispatch(taskActionCreators.update_ds_explore(ds))
                }
                else {
                    if (data.status == 401) access_token = '';
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

    loadMoreItems() {
        if (this.state.isLoadingMore) return;
        if (this.props.ds_explore.length == 0) return;
        if (this.state.isLoading) return;
        this.setState({ isLoadingMore: true })
        this.getListItems(this.props.ds_explore.length, this.props.ds_explore_cate[this.state.cate_index].id, this.state.search);
    }

    onScroll(e) {
        var windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
        if (windowHeight + offset > height + 30) {
            this.loadMoreItems();
        }
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        if (this.props.ds_explore_cate.length > 0)
            this.getListItems(0, this.props.ds_explore_cate[this.state.cate_index].id, this.state.search);
    }

    SearchMerchant() {
        if (this.props.ds_explore_cate.length > 0)
            this.getListItems(0, this.props.ds_explore_cate[this.state.cate_index].id, this.state.search);
    }

    _onBlur(e) {
        this.setState({ isFocused: false })
    }

    _onFocus(e) {
        this.setState({ isFocused: true })
    }

    _clearAll(fieldName) {
        // this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            search: '',
            isFocused: false
        })
        if (this.props.ds_explore_cate.length > 0)
            this.getListItems(0, this.props.ds_explore_cate[this.state.cate_index].id, '');
    }

    _clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({ search: '' })
        if (this.props.ds_explore_cate.length > 0)
            this.getListItems(0, this.props.ds_explore_cate[this.state.cate_index].id, '');
    }

    onSearchTextChange(search) {
        this.setState({ search: search });
        if (search.length == 0 && this.props.ds_explore_cate.length > 0)
            this.getListItems(0, this.props.ds_explore_cate[this.state.cate_index].id, search);
    }

    onPressRowCate(rowID) {
        if (rowID != this.state.cate_index) {
            GoogleAnalytics.trackEvent('ga_discover', 'Select cate ' + this.props.ds_explore_cate[rowID].name);
            let { dispatch, ds_explore_cate } = this.props
            var arrdata = ds_explore_cate;
            arrdata[rowID].select_line = 'yellow';
            arrdata[this.state.cate_index].select_line = 'transparent';
            dispatch(taskActionCreators.update_ds_explore_cate(arrdata))
            this.setState({ cate_index: rowID });
            if (this.props.ds_explore_cate.length > 0)
                this.getListItems(0, this.props.ds_explore_cate[rowID].id, this.state.search);
        }
    }

    render() {
        let { ds_explore, ds_explore_cate, location } = this.props
        let dataSource_cate = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(ds_explore_cate);
        return (
            <View {...this.props} style={[styles.container, styles.tabExplore]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navSearch}>
                            <Image source={require('../../element/explore/ic-search.png')} style={styles.navSearch_Icon} />
                            <TextInput
                                ref={'textSearch'}
                                autoCapitalize="none"
                                autoFocus={false}
                                placeholder={Lang.tim_kiem()}
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                autoCorrect={false}
                                onEndEditing={this.clearFocus}
                                onSubmitEditing={() => this.SearchMerchant()}
                                onBlur={this._onBlur.bind(this)}
                                onFocus={this._onFocus.bind(this)}
                                onChangeText={(text) => this.onSearchTextChange(text)}
                                style={styles.navSearch_Input}
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            {renderIf(this.state.search != '')(
                                <TouchableOpacity onPress={() => this._clearText('textSearch')} style={styles.navSearch_Clear}>
                                    <Image source={require('../../element/explore/ic-clear.png')} style={styles.navSearch_ClearIcon} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={styles.navLocation}>
                            <TouchableOpacity onPress={() => Actions.explore_map()}>
                                <Image source={require('../../element/nav-bar/nav-map.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ExploreCate dataSource={dataSource_cate} onPressRowCate={this.onPressRowCate.bind(this)} />
                <View style={styles.tabScroll}>
                    <View style={styles.ViewExplore}>
                        <FlatList
                            style={{ backgroundColor: 'white' }}
                            data={ds_explore}
                            renderItem={({ item }) => <RowData data={item} location={location} onPress={() => Actions.explore_detail({ id: item.id, merchant_id: item.merchant_id })} />}
                            keyExtractor={(item, index) => item.id}
                            enableEmptySections={true}
                            onScroll={(e) => this.onScroll(e)}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                        />
                    </View>
                </View>
                {renderIf(this.state.isLoading)(
                    <Loading />
                )}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    location: state.taskState.location,
    ds_explore: state.taskState.ds_explore,
    ds_explore_cate: state.taskState.ds_explore_cate,
})

export default connect(mapStateToProps)(AppotaView)
