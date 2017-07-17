/* @flow */

import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ListView,
    Platform,
    Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import renderIf from '../Common/renderIf'
import RowData from './RowData'
import Toast from '@remobile/react-native-toast'
import GoogleAnalytics from 'react-native-google-analytics-bridge'
import appsFlyer from 'react-native-appsflyer'
import { AppEventsLogger } from 'react-native-fbsdk'
import TimerMixin from 'react-timer-mixin'
import * as Requests from '../Helpers/Requests'

var styles = require('../Common/style.js')
var Lang = require('../Common/Lang')
var Loading = require('../Common/Loading')

const popToRoot = () => {
    Actions.pop()
}

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
class GameTopup extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    state = {
        isLoading: false,
        dataSource: ds.cloneWithRows(this.props.ds_games),
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
        this.setState({ isLoading: true })
        let { dispatch, access_token } = this.props
        Requests.List_Game(access_token)
            .then((games) => {
                dispatch(taskActionCreators.update_ds_games(games.data))
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(games.data)
                })
            })
            .catch((e) => {
                this.setState({ isLoading: false })
            })
    }

    onPressGameRow = (rowData) => {
        GoogleAnalytics.trackEvent('ga_games_topup', `Select game ${rowData.name}`)
        let { dispatch, selected_game } = this.props
        var games = selected_game
        games.game_id = rowData.game_id
        games.game_name = rowData.name
        dispatch(taskActionCreators.change_selected_game(games))
        Actions.games_topup_detail()
    }

    render() {
        return (
            <View {...this.props} style={styles.container}>
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
                            renderRow={(data, sectionID, rowID) => <RowData {...data} rowID={rowID} onPressRow={() => this.onPressGameRow(data)} />}
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
    selected_game: state.taskState.selected_game,
})

export default connect(mapStateToProps)(GameTopup)
