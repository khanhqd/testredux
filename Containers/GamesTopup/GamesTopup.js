import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ListView,
    Platform,
    Image,
    AsyncStorage
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import RowData from './RowData';
import Toast from '@remobile/react-native-toast';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';


var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Actions.pop()
}

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: false,
            dataSource: ds.cloneWithRows(props.ds_games),
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_games_topup');
        AppEventsLogger.logEvent('fb_games_topup', 1);
        appsFlyer.trackEvent('af_games_topup', {}, () => { }, () => { });

        setTimeout(() => {
            if (this.props.ds_games.length == 0)
                this.GetListGames();
        }, 200);
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    GetListGames() {
        this.setState({ isLoading: true });
        let { dispatch, access_token } = this.props
        RequestHelper.ListGames(access_token)
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    var games = JSON.parse(data._bodyText);
                    AsyncStorage.setItem('list_game', JSON.stringify(games.data))
                    dispatch(taskActionCreators.update_ds_games(games.data))
                    this.setState({
                        dataSource: ds.cloneWithRows(games.data)
                    });
                }
                else if (data.status == 401) {
                    Toast.showToast(Lang.token_het_han(), "short", "center");
                    Actions.login();
                }
                else {
                    Utils.onRequestEnd(data);
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    onPressGameRow(rowData) {
        GoogleAnalytics.trackEvent('ga_games_topup', `Select game ${rowData.name}`)
        Actions.games_topup_detail({
            game_name: rowData.name,
            game_id: rowData.id
        })
    }

    render() {
        return (
            <View {...this.props} style={[styles.container, styles.tabGames]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.nap_game2()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                            <TouchableOpacity onPress={() => Actions.history_balance({ balance: this.props.user_infor.balance, balance_type: 'game_ewallet_charging' })}>
                                <Image source={require('../../element/nav-bar/nav-history.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.ViewGames}>
                    <View style={styles.ViewGames_Inner}>
                        <ListView
                            showsVerticalScrollIndicator={false}
                            initialListSize={this.props.ds_games.length}
                            dataSource={this.state.dataSource}
                            enableEmptySections={true}
                            renderRow={(data, sectionID, rowID) => <RowData {...data} rowID={rowID} onPressRow={this.onPressGameRow.bind(this, data)} />}
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
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
    ds_games: state.taskState.ds_games,
})

export default connect(mapStateToProps)(AppotaView)
