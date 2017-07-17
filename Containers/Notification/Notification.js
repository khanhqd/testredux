import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView,
    AsyncStorage,
    Dimensions,
    RefreshControl,
    Image
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
var styles = require('../Common/style.js');
import RowData from './RowData';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk'

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading2');
var Utils = require('../Common/Utils');

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
class AppotaView extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    state = {
        canLoadMore: true,
        refreshing: false,
        isLoading: false,
        isLoadingMore: false,
        dataSource: ds.cloneWithRows(this.props.ds_notice)
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_notification');
        appsFlyer.trackEvent('af_notification', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_notification', 1);

        if (this.props.ds_notice.length == 0) {
            this.setState({ isLoading: true });
            setTimeout(() => {
                this.getListItems(0);
            }, 200);
        }
    }

    _onRefresh() {
        let { dispatch } = this.props
        dispatch(taskActionCreators.update_ds_notice([]))
        this.setState({
            refreshing: true,
            dataSource: ds.cloneWithRows([])
        });
        this.getListItems(0);
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    getListItems(startIndex) {
        let { dispatch, access_token, ds_notice } = this.props
        RequestHelper.GetNotification(access_token, startIndex)
            .then((data) => {
                if (data.status == 200) {
                    var items = JSON.parse(data._bodyText)
                    var _resData = []
                    for (var i = 0; i < items.data.length; i++) {
                        var _item = items.data[i]
                        _item.numberOfLines = 2
                        _resData.push(_item)
                    }

                    var resDataa = startIndex == 0 ? _resData : ds_notice.concat(_resData)
                    dispatch(taskActionCreators.update_ds_notice(resDataa))
                    this.setState({
                        canLoadMore: items.data.length == 0 ? false : true,
                        dataSource: ds.cloneWithRows(resDataa)
                    })
                }
                else {
                    if (data.status == 401) access_token = '';
                    Utils.onRequestEnd(data);
                }
                this.setState({
                    refreshing: false,
                    isLoading: false,
                    isLoadingMore: false,
                });
            })
            .catch((error) => {
                this.setState({
                    refreshing: false,
                    isLoading: false,
                    isLoadingMore: false,
                });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    loadMoreItems() {
        if (this.state.isLoadingMore) return;
        if (!this.state.canLoadMore) return
        if (this.props.ds_notice.length == 0) return;
        if (this.state.isLoading) return;
        this.setState({ isLoadingMore: true })
        this.getListItems(this.props.ds_notice.length);
    }

    onScroll(e) {
        var windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
        if (windowHeight + offset > height + 30) {
            this.loadMoreItems();
        }
    }

    AcceptRequest(rowID, schema_url, type) {
        var arr = JSON.parse(JSON.stringify(this.props.ds_notice));
        arr.splice(rowID, 1);
        let { dispatch, access_token, user_infor } = this.props
        dispatch(taskActionCreators.update_ds_notice(arr))
        this.setState({ isLoading: true });
        var _type = type == 'accept' ? 'accepted' : type;
        var schema = schema_url.split('://');
        if (schema.length == 0) return;
        if (schema[0] == 'muontien') {
            var transaction_id = schema[1];
            RequestHelper.AcceptBorrow(this.props.access_token, transaction_id, _type)
                .then((data) => {
                    this.setState({ isLoading: false });
                    if (data.status == 200) {
                        if (_type == 'accepted') {
                            var trans = JSON.parse(data._bodyText)
                            if (user_infor.pay_verify_method == 'NONE')
                                Actions.protected({ transaction_id: trans.transaction_id })
                            else
                                Actions.borrow_money_otp({ transaction_id: trans.transaction_id });
                        }
                        else {
                            Actions.popup({ title: Lang.thong_bao(), content: Lang.tu_choi_muon_tien(), flag: 'success' });
                        }
                        this._onRefresh()
                    }
                    else {
                        if (data.status == 401) access_token = '';
                        Utils.onRequestEnd(data);
                    }
                })
                .catch((error) => {
                    this.setState({ isLoading: false });
                    Utils.onNetworkError(error.toString());
                })
                .done();
        }
        else {
            var transaction_id = schema[1];
            RequestHelper.AcceptPaymentOrder(this.props.access_token, transaction_id, _type)
                .then((data) => {
                    this.setState({ isLoading: false });
                    if (data.status == 200) {
                        if (_type == 'accepted') {
                            var trans = JSON.parse(data._bodyText)
                            if (user_infor.pay_verify_method == 'NONE')
                                Actions.protected({ transaction_id: trans.transaction_id })
                            else
                                Actions.payment_orders_otp({ transaction_id: trans.transaction_id });
                        }
                        else {
                            Actions.popup({ title: Lang.thong_bao(), content: Lang.tu_choi_thanh_toan(), flag: 'success' });
                        }
                        this._onRefresh()
                    }
                    else {
                        if (data.status == 401) access_token = '';
                        Utils.onRequestEnd(data);
                    }
                })
                .catch((error) => {
                    this.setState({ isLoading: false });
                    Utils.onNetworkError(error.toString());
                })
                .done();
        }
    }

    onPressAcept(data, rowID, type) {
        var _button = data.button.length == 0 ? '' : data.button.split(',');
        var _type = type == 'ok' ? _button[0] : _button[1];
        this.AcceptRequest(rowID, data.schema_url, _type);
    }

    onRemove(notiId) {
        var notice_ids = [];
        notice_ids.push(notiId);
        this.setState({ isLoading: true });
        let { dispatch, access_token, ds_notice } = this.props
        RequestHelper.DeleteNotification(access_token, JSON.stringify(notice_ids))
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    var returnData = ds_notice.filter((item) => item.id != notiId)
                    dispatch(taskActionCreators.update_ds_notice(returnData))
                    this.setState({
                        dataSource: ds.cloneWithRows(returnData)
                    })
                    Actions.popup({ title: Lang.thong_bao(), content: Lang.xoa_thong_bao_thanh_cong(), flag: 'success' });
                }
                else {
                    var err = JSON.parse(data._bodyText);
                    Actions.popup({ title: Lang.thong_bao(), content: err.error.message, flag: 'error' });
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    removeItemArr(arr) {
        return arr.filter((item, index, self) => self.findIndex((t) => { return t.id === item.id }) === index)
    }

    onPressItem = (rowID) => {
        let { dispatch, ds_notice } = this.props
        var resData = JSON.parse(JSON.stringify(ds_notice))
        if (resData[rowID].numberOfLines == 2) {
            resData[rowID].numberOfLines = 0;
        }
        else {
            resData[rowID].numberOfLines = 2;
        }
        dispatch(taskActionCreators.update_ds_notice(resData))
        this.setState({
            dataSource: ds.cloneWithRows(resData)
        })
    }

    render() {
        let { ds_notice } = this.props

        return (
            <View {...this.props} style={[styles.container, this.props.sceneStyle]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.thong_bao()}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    {renderIf(this.props.ds_notice.length == 0 && !this.state.refreshing && !this.state.isLoading)(
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                            <Image style={{ width: 120, }} source={require('../../element/history/no_history.png')} />
                            <Text style={styles.Page_404_Text} >{Lang.khong_co_thong_bao()}</Text>
                        </View>
                    )}
                    <ListView
                        ref={component => this.listview = component}
                        style={{ flex: 1, backgroundColor: 'white' }}
                        dataSource={this.state.dataSource}
                        renderRow={(data, sectionID, rowID) => <RowData {...data} onPressItem={() => this.onPressItem(rowID)} access_token={this.props.access_token} onRemove={this.onRemove.bind(this, data.id)} onPressAceptOk={this.onPressAcept.bind(this, data, rowID, 'ok')} onPressAceptCancel={this.onPressAcept.bind(this, data, rowID, 'cancel')} />}
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
    ds_notice: state.taskState.ds_notice,
    user_infor: state.taskState.user_infor,
})

export default connect(mapStateToProps)(AppotaView)