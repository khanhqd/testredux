import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    RefreshControl,
    ListView,
    AsyncStorage,
    Platform,
    Image,
    ScrollView,
    Dimensions
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import TimerMixin from 'react-timer-mixin';
import RowData from './RowData';
import NewsHot from './NewsHot';
import renderIf from '../Common/renderIf';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var RequestHelper = require('../Common/RequestHelper');
var Toast = require('../../custom_modules/react-native-toast');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

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
        dataSource: ds.cloneWithRows(this.props.ds_news)
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_news');
        appsFlyer.trackEvent('af_news', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_news', 1);

        if (this.props.ds_news.length == 0) {
            this.setState({ isLoading: true });
            setTimeout(() => {
                this.getListItems(0);
            }, 200);
        }
    }

    componentWillReceiveProps() {
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    _onRefresh() {
        let { dispatch } = this.props
        dispatch(taskActionCreators.update_ds_news([]))
        this.setState({ refreshing: true });
        this.getListItems(0);
    }

    getListItems(startIndex) {
        let { dispatch, ds_news } = this.props
        RequestHelper.ListNews(startIndex)
            .then((respone) => {
                if (respone.status == 200) {
                    var items = JSON.parse(respone._bodyText);
                    var resDataa = startIndex == 0 ? items.data : ds_news.concat(items.data)
                    this.setState({
                        dataSource: ds.cloneWithRows(resDataa)
                    })
                    dispatch(taskActionCreators.update_ds_news(resDataa))
                }
                else {
                    Actions.popup({ title: Lang.thong_bao(), content: Lang.lay_tin_tuc_fail(), flag: 'error' });
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
        if (this.props.ds_news.length == 0) return;
        if (this.state.isLoading) return;
        this.setState({ isLoadingMore: true })
        this.getListItems(this.props.ds_news.length);
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
        let { ds_news } = this.props
        return (
            <View {...this.props} style={[styles.container, styles.tabNews]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.tin_tuc()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />} onScroll={(e) => this.onScroll(e)} style={styles.tabScroll}>
                    <NewsHot data={ds_news} />
                    <View style={styles.NewsList}>
                        <View style={styles.NewsList_Inner}>
                            <ListView
                                ref={component => this.listview = component}
                                style={{ flex: 1, backgroundColor: 'white' }}
                                dataSource={this.state.dataSource}
                                renderRow={(data) => <RowData {...data} />}
                                enableEmptySections={true}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                </ScrollView>
                {renderIf(this.state.isLoading)(
                    <Loading />
                )}
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    ds_news: state.taskState.ds_news,
})

export default connect(mapStateToProps)(AppotaView)
