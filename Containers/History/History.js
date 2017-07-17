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
    Image,
    StatusBar,
    Dimensions
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
var styles = require('../Common/style.js');
import renderIf from '../Common/renderIf';
import RowData from './RowData';

const popToRoot = () => {
    Actions.pop();
}

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
class AppotaView extends Component {
    constructor(props, context) {
        super(props, context);
        Text.defaultProps.allowFontScaling = false;
    }

    state = {
        canLoadMore: true,
        refreshing: false,
        isLoading: false,
        isLoadingMore: false,
        resData: [],
        date_time: {
            start_curr: moment().startOf('month').format('YYYYMMDD'),
            end_curr: moment().format('YYYYMMDD'),
            start_near1: moment().subtract(1, 'months').startOf('month').format('YYYYMMDD'),
            end_near1: moment().subtract(1, 'months').endOf('month').format('YYYYMMDD'),
            start_near2: moment().subtract(2, 'months').startOf('month').format('YYYYMMDD'),
            end_near2: moment().subtract(2, 'months').endOf('month').format('YYYYMMDD'),
        },
        history_type: '',
        tab: 1,
        isShowTime: false,
        tabName: Lang.tat_ca().toUpperCase(),
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_history');
        appsFlyer.trackEvent('af_history', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_history', 1);

        setTimeout(() => {
            this.setState({ isLoading: true })
            this.getListItems(0);
        }, 200);
    }

    getListItems(startIndex) {
        var start;
        var end;
        if (this.state.tab == 1) {
            start = this.state.date_time.start_near2;
            end = this.state.date_time.end_curr;
        }
        else if (this.state.tab == 2) {
            start = this.state.date_time.start_curr;
            end = this.state.date_time.end_curr;
        }
        else if (this.state.tab == 3) {
            start = this.state.date_time.start_near1;
            end = this.state.date_time.end_near1;
        }
        else if (this.state.tab == 4) {
            start = this.state.date_time.start_near2;
            end = this.state.date_time.end_near2;
        }
        let { access_token } = this.props
        RequestHelper.ListHistory(access_token, 30, startIndex, start, end, this.state.history_type)
            .then((respone) => {
                if (respone.status == 200) {
                    var data = JSON.parse(respone._bodyText).data;
                    var _resData = startIndex == 0 ? data : this.state.resData.concat(data)
                    this.setState({
                        canLoadMore: data.length < 30 ? false : true,
                        resData: _resData
                    })
                }
                else {
                    if (respone.status == 401) access_token = '';
                    Utils.onRequestEnd(respone, '');
                }
                this.setState({
                    refreshing: false,
                    isLoading: false,
                    isLoadingMore: false,
                });
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    _onRefresh() {
        this.setState({
            refreshing: true,
            resData: []
        });
        this.getListItems(0);
    }

    loadMoreItems() {
        if (this.state.isLoadingMore) return;
        if (!this.state.canLoadMore) return
        if (this.state.isLoading) return;
        this.setState({ isLoadingMore: true })
        this.getListItems(this.state.resData.length);
    }

    onScroll(e) {
        var windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
        if (windowHeight + offset > height + 30) {
            this.loadMoreItems();
        }
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

    renderTabName(tab) {
        if (tab == 1)
            return Lang.tat_ca().toUpperCase();
        else if (tab == 2)
            return Lang.thang().toUpperCase() + ' ' + (moment().month() + 1);
        else if (tab == 3)
            return Lang.thang().toUpperCase() + ' ' + (moment().subtract(1, 'months').month() + 1);
        else if (tab == 4)
            return Lang.thang().toUpperCase() + ' ' + (moment().subtract(2, 'months').month() + 1);
    }

    onPressHistoryTab(tab) {
        this.setState({
            tab: tab,
            isShowTime: false,
            isLoading: true,
            tabName: this.renderTabName(tab),
        }, () => {
            this.getListItems(0);
        })
    }

    _onRefresh() {
        this.setState({ refreshing: true, history_filter: 'tat_ca', history_type: '' });
        this.getListItems(0);
    }

    onPressHistoryFilter(history_type) {
        this.setState({
            isLoading: true,
            history_type: history_type,
            resData: []
        }, () => {
            this.getListItems(0)
        })
    }

    filterHistory(item, keyword) {
        return item.type.toLowerCase() == keyword.toLowerCase() ? false : true;
    }

    render() {
        var bg_tab1 = (this.state.tab == 1) ? '#00A9FF' : 'transparent';
        var bg_tab2 = (this.state.tab == 2) ? '#00A9FF' : 'transparent';
        var bg_tab3 = (this.state.tab == 3) ? '#00A9FF' : 'transparent';
        var bg_tab4 = (this.state.tab == 4) ? '#00A9FF' : 'transparent';
        var txt_tab1 = (this.state.tab == 1) ? 'white' : 'black';
        var txt_tab2 = (this.state.tab == 2) ? 'white' : 'black';
        var txt_tab3 = (this.state.tab == 3) ? 'white' : 'black';
        var txt_tab4 = (this.state.tab == 4) ? 'white' : 'black';
        let dataSource = ds.cloneWithRows(this.state.resData)
        return (
            <View {...this.props} style={[styles.container, styles.tabHistory]}>
                <StatusBar hidden={false} />
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
                <View style={{ flex: 1 }}>
                    <View style={styles.FormControl_TitleBorder}>
                        <Text style={styles.FormControl_TitleText}>
                            {Lang.lich_su_giao_dich().toUpperCase()}
                        </Text>
                        <TouchableOpacity style={styles.FormControl_TitleRight} onPress={() => this.setState({ isShowTime: !this.state.isShowTime })}>
                            <Text style={styles.FormControl_TitleRightText}>
                                {this.state.tabName}
                            </Text>
                            <Image source={require('../../element/history/point-drop.png')} style={styles.FormControl_TitleRight_Img} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ListTag}>
                        <ScrollView horizontal={true} style={styles.ListTag_Scroll}>
                            <TouchableOpacity onPress={this.onPressHistoryFilter.bind(this, '')} style={this.state.history_type == '' ? styles.ListTag_Touch_Active : styles.ListTag_Touch}>
                                <Text style={this.state.history_type == '' ? styles.ListTag_Text_Active : styles.ListTag_Text}>{Lang.tat_ca()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressHistoryFilter.bind(this, 'cashin')} style={this.state.history_type == 'cashin' ? styles.ListTag_Touch_Active : styles.ListTag_Touch}>
                                <Text style={this.state.history_type == 'cashin' ? styles.ListTag_Text_Active : styles.ListTag_Text}>{Lang.nap_tien()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressHistoryFilter.bind(this, 'cashout')} style={this.state.history_type == 'cashout' ? styles.ListTag_Touch_Active : styles.ListTag_Touch}>
                                <Text style={this.state.history_type == 'cashout' ? styles.ListTag_Text_Active : styles.ListTag_Text}>{Lang.rut_tien()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressHistoryFilter.bind(this, 'cashback')} style={this.state.history_type == 'cashback' ? styles.ListTag_Touch_Active : styles.ListTag_Touch}>
                                <Text style={this.state.history_type == 'cashback' ? styles.ListTag_Text_Active : styles.ListTag_Text}>{Lang.hoan_tien()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressHistoryFilter.bind(this, 'game_ewallet_charging')} style={this.state.history_type == 'game_ewallet_charging' ? styles.ListTag_Touch_Active : styles.ListTag_Touch}>
                                <Text style={this.state.history_type == 'game_ewallet_charging' ? styles.ListTag_Text_Active : styles.ListTag_Text}>{Lang.nap_game_Tkvi()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressHistoryFilter.bind(this, 'transfer')} style={this.state.history_type == 'transfer' ? styles.ListTag_Touch_Active : styles.ListTag_Touch}>
                                <Text style={this.state.history_type == 'transfer' ? styles.ListTag_Text_Active : styles.ListTag_Text}>{Lang.chuyen_tien_Tkvi()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressHistoryFilter.bind(this, 'receive_transfer')} style={this.state.history_type == 'receive_transfer' ? styles.ListTag_Touch_Active : styles.ListTag_Touch}>
                                <Text style={this.state.history_type == 'receive_transfer' ? styles.ListTag_Text_Active : styles.ListTag_Text}>{Lang.nhan_tien_Tkvi()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressHistoryFilter.bind(this, 'buy_card')} style={this.state.history_type == 'buy_card' ? styles.ListTag_Touch_Active : styles.ListTag_Touch}>
                                <Text style={this.state.history_type == 'buy_card' ? styles.ListTag_Text_Active : styles.ListTag_Text}>{Lang.mua_the2()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressHistoryFilter.bind(this, 'topup')} style={this.state.history_type == 'topup' ? styles.ListTag_Touch_Active : styles.ListTag_Touch}>
                                <Text style={this.state.history_type == 'topup' ? styles.ListTag_Text_Active : styles.ListTag_Text}>{Lang.nap_dienthoai2()}</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    {renderIf(this.listItems && resData.length == 0 && !this.state.refreshing)(
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                            <Image style={{ width: 120, }} source={require('../../element/history/no_history.png')} />
                        </View>
                    )}
                    <View style={styles.ListHistory}>
                        <ListView
                            ref={component => this.listview = component}
                            style={{ flex: 1, backgroundColor: 'white' }}
                            dataSource={dataSource}
                            renderRow={(data, sectionID, rowID) => <RowData {...data} isBalance={false} onPressRow={this.onPressHistoryDetail.bind(this, data)} />}
                            enableEmptySections={true}
                            showsVerticalScrollIndicator={false}
                            onScroll={(e) => this.onScroll(e)}
                            pageSize={30}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                        />
                    </View>
                    {renderIf(this.state.isShowTime)(
                        <View style={{ position: 'absolute', top: 50, right: 10, backgroundColor: 'white', borderColor: '#dddddd', borderWidth: 1, width: 80, height: 150 }}>
                            <TouchableOpacity onPress={() => this.onPressHistoryTab(1)} style={{ backgroundColor: bg_tab1, flex: 1 / 4, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: txt_tab1, fontSize: 12 }}>{Lang.tat_ca()}</Text>
                                <View style={{ height: 0.5, width: 80, backgroundColor: '#dddddd', position: 'absolute', bottom: 0, left: 0 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onPressHistoryTab(2)} style={{ backgroundColor: bg_tab2, flex: 1 / 4, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: txt_tab2, fontSize: 12 }}>{Lang.thang()} {moment().month() + 1}</Text>
                                <View style={{ height: 0.5, width: 80, backgroundColor: '#dddddd', position: 'absolute', bottom: 0, left: 0 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onPressHistoryTab(3)} style={{ backgroundColor: bg_tab3, flex: 1 / 4, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: txt_tab3, fontSize: 12 }}>{Lang.thang()} {moment().subtract(1, 'months').month() + 1}</Text>
                                <View style={{ height: 0.5, width: 80, backgroundColor: '#dddddd', position: 'absolute', bottom: 0, left: 0 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onPressHistoryTab(4)} style={{ backgroundColor: bg_tab4, flex: 1 / 4, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: txt_tab4, fontSize: 12 }}>{Lang.thang()} {moment().subtract(2, 'months').month() + 1}</Text>
                                <View style={{ height: 0.5, width: 80, backgroundColor: '#dddddd', position: 'absolute', bottom: 0, left: 0 }} />
                            </TouchableOpacity>
                        </View>
                    )}
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
