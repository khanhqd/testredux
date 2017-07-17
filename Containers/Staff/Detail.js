import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    RefreshControl,
    ListView,
    ScrollView,
    Image
} from "react-native";
import { Actions } from 'react-native-router-flux';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import moment from 'moment';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Actions.pop();
}

var access_token = '';
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class ComingSoon extends React.Component  {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: true,
            hasData: false,
            refreshing: false,
            dataSource: ds.cloneWithRows([]),
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('Log giao dịch staff');
        const eventName = "af_staff_detail";
        appsFlyer.trackEvent(eventName, {}, () => { }, () => { });

        setTimeout(() => {
            this.GetCashbackTrans();
        }, 200);
    }

    GetCashbackTrans() {
        RequestHelper.GetCashbackTrans(this.props.access_token, this.props.staff.phone_number)
            .then((respone) => {
                this.setState({ isLoading: false, refreshing: false });
                if (respone.status == 200) {
                    var data = JSON.parse(respone._bodyText);
                    this.setState({
                        hasData: data.data.length == 0 ? false : true,
                        dataSource: ds.cloneWithRows(data.data)
                    });
                }
                else {
                    if (respone.status == 401) access_token = '';
                    Utils.onRequestEnd(respone);
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false, refreshing: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    // onPressHistoryDetail(data) {
    //     if (data.type == 'game_ewallet_charging') {
    //         Actions.popup({ title: Lang.thong_bao(), content: Lang.khong_xem_duoc_lich_su() + ' ' + Lang.nap_game_Tkvi().toLowerCase(), flag: 'error' });
    //         return;
    //     }
    //     if (data.type == 'game_card_charging') {
    //         Actions.popup({ title: Lang.thong_bao(), content: Lang.khong_xem_duoc_lich_su() + ' ' + Lang.nap_game_card().toLowerCase(), flag: 'error' });
    //         return;
    //     }
    //     if (data.type == 'receive_orders_money') {
    //         Actions.popup({ title: Lang.thong_bao(), content: Lang.khong_xem_duoc_lich_su() + ' ' + Lang.nhan_tien_thanh_toan().toLowerCase(), flag: 'error' });
    //         return;
    //     }
    //     Actions.history_home_detail({
    //         history_type: data.type,
    //         transaction_id: data.transaction_id
    //     });
    // }

    renderRow(data) {
        return <View style={styles.ListHistory_Row}>
            <View style={styles.ListHistory_Touch}>
                <View style={[styles.ListHistory_Item]}>
                    <View style={[styles.ListHistory_InfoLeft, { marginLeft: 10 }]}>
                        <Text style={styles.ListHistory_InfoName}>
                            Cashback
                        </Text>
                        <Text>
                            {data.receiver_phone_number}
                        </Text>
                    </View>
                    <View style={styles.ListHistory_InfoRight}>
                        <View style={styles.ListHistory_InfoMoneyStatus}>
                            <Image source={require('../../element/history/ic-minus.png')} />
                            <Text style={styles.ListHistory_InfoMoney}>
                                {Utils.number_format(data.amount, '.', '.')}đ
                                </Text>
                        </View>
                        <Text style={styles.ListHistory_InfoTime}>
                            {moment(new Date(data.time)).format('HH:mm DD/MM/YYYY')}
                        </Text>
                    </View>
                </View>
                <View style={styles.ListHistory_InfoPoint}>
                    <Image source={require('../../element/form/ic-point.png')} style={styles.ListHistory_InfoPoint_Img} />
                </View>
            </View>
            <View style={styles.ListHistory_Line}></View>
        </View>
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.GetCashbackTrans();
    }

    onLoadMore(e) {
        this.onScroll(e);
    }

    onPressStaff(data) {
        Actions.popup({
            title: Lang.thong_bao(),
            content: Lang.confirm_xoa_nv(),
            onPress_Ok: () => this.RemoveStaff(data.phone_number),
            onPress_Cancel: () => { }
        })
    }

    RemoveStaff(phone) {
        this.setState({ isLoading: true });
        RequestHelper.RemoveStaff(this.props.access_token, phone)
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    const eventName = "af_staff_remove";
                    appsFlyer.trackEvent(eventName, {}, () => { }, () => { });
                    var staff = JSON.parse(data._bodyText);
                    if (staff.success) {
                        Actions.popup({
                            title: Lang.thong_bao(),
                            content: Lang.xoa_thong_bao_thanh_cong(),
                            onPress_Ok: () => {
                                Actions.pop(); setTimeout(() => {
                                    Actions.refresh()
                                }, 10)
                            }
                        });
                    }
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
                                Staff Detail
                            </Text>
                        </View>
                        <TouchableOpacity onPress={this.onPressStaff.bind(this, this.props.staff)} style={[styles.navRight]}>
                            <Text style={{ color: 'white' }}>
                                {Lang.xoa()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <View style={{ backgroundColor: 'white', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                            <View style={styles.FormControl_TouchRowSelect}>
                                <View style={styles.FormControl_TouchInfo}>
                                    <Text style={styles.FormControl_TouchTitleName} numberOfLines={1}>{this.props.staff.name}</Text>
                                    <Text style={styles.FormControl_TouchTitleNumber} numberOfLines={1}>{this.props.staff.phone_number}</Text>
                                </View>
                                <View style={styles.FormControl_TouchRowCC}>
                                </View>
                            </View>
                        </View>
                    </View>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(data, sectionID, rowID) => this.renderRow(data)}
                        enableEmptySections={true}
                        showsVerticalScrollIndicator={false}
                        pageSize={30}
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
        );
    }
};


export default ComingSoon;
