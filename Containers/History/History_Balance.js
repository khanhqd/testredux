import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    RefreshControl,
    ListView,
    ScrollView,
    Dimensions,
    Image
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import moment from 'moment';
import TimerMixin from 'react-timer-mixin';
import Toast from '@remobile/react-native-toast'
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
import renderIf from '../Common/renderIf';
import RowData from './RowData';
import BaseListViewComponent from '../BaseClass/BaseListViewComponent';

var styles = require('../Common/style.js');

const popToRoot = () => {
    Actions.pop();
}

var resData = [];
class AppotaView extends BaseListViewComponent {
    constructor(props, context) {
        super(props, context)
    }

    componentWillMount() {
        this.setState({
            isLoading: true,
            date_time: {
                start_curr: moment().startOf('month').format('YYYYMMDD'),
                end_curr: moment().format('YYYYMMDD'),
                start_near1: moment().subtract(1, 'months').startOf('month').format('YYYYMMDD'),
                end_near1: moment().subtract(1, 'months').endOf('month').format('YYYYMMDD'),
                start_near2: moment().subtract(2, 'months').startOf('month').format('YYYYMMDD'),
                end_near2: moment().subtract(2, 'months').endOf('month').format('YYYYMMDD'),
            },
        });
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_history_balance');
        appsFlyer.trackEvent('af_history_balance', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_history_balance', 1);

        setTimeout(() => {
            this.getListItems(0);
        }, 200);
    }

    getListItems(startIndex) {
        if (startIndex == 0) {
            this.listItems = [];
            resData = [];
        }
        var start = this.state.date_time.start_near2;
        var end = this.state.date_time.end_curr;
        var typee = this.props.balance_type == 'wallet' ? '' : this.props.balance_type;
        RequestHelper.ListHistory(this.props.access_token, 30, startIndex, start, end, typee)
            .then((respone) => {
                this.setState({ isLoading: false });
                if (respone.status == 200) {
                    var data = JSON.parse(respone._bodyText);
                    var list = data.data;
                    var _list = [];
                    this.setState({
                        refreshing: false,
                    });
                    for (var i = 0; i < list.length; i++) {
                        list[i].numberOfLines = 1;
                        _list.push(list[i]);
                        resData.push(list[i]);
                    }
                    resData.concat(_list)
                    this.handleGetItemsDone(_list, startIndex);
                }
                else {
                    if (respone.status == 401) var access_token = '';
                    Utils.onRequestEnd(respone, '');
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    onPressHistoryDetail(data) {
        Actions.history_detail({
            history_type: data.type,
            transaction_id: data.transaction_id
        })
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.getListItems(0);
    }

    filterHistory(item, keyword) {
        return item.type.toLowerCase() == keyword.toLowerCase() ? false : true;
    }

    onLoadMore(e) {
        this.onScroll(e);
    }

    render() {
        return (
            <View {...this.props} style={[styles.container, styles.tabHistory]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.lich_su()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <View style={styles.headerTransaction}>
                    <View style={styles.headerTransaction_Inner}>
                        <Text style={styles.headerTransaction_Title}>{Utils.number_format(this.props.balance, 0, '.', '.')}</Text>
                        <Text style={styles.headerTransaction_Option}>đ</Text>
                    </View>
                    <Text style={styles.headerTransaction_Sub}>{this.props.balance_type == 'receive_cashback' ? Lang.tk_cashback().toUpperCase() : Lang.tk_vi().toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    {renderIf(this.listItems && resData.length == 0 && !this.state.refreshing)(
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                            <Image style={{ width: 120, }} source={require('../../element/history/no_history.png')} />
                        </View>
                    )}
                    <View style={styles.ListHistory}>
                        <ListView
                            ref={component => this.listview = component}
                            style={{ flex: 1, backgroundColor: 'white' }}
                            dataSource={this.state.dataSource}
                            renderRow={(data, sectionID, rowID) => <RowData {...data} isBalance={this.props.balance_type == 'wallet' ? true : false} onPressRow={this.onPressHistoryDetail.bind(this, data)} />}
                            enableEmptySections={true}
                            showsVerticalScrollIndicator={false}
                            onScroll={this.onLoadMore.bind(this)}
                            pageSize={30}
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
};

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
})

export default connect(mapStateToProps)(AppotaView)
