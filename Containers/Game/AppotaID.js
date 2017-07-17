/* 
project: Appota Wallet
author: huutq
date:13/6/2017
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Keyboard,
    ScrollView,
    TextInput,
    Platform,
    AsyncStorage
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
import KeyboardSpacer from 'react-native-keyboard-spacer';
import moment from 'moment'
import vi from 'moment/locale/vi.js'

var styles = require('../Common/style.js')
var Lang = require('../Common/Lang')
var Loading = require('../Common/Loading')

const popToRoot = () => {
    Actions.pop()
}

class Game_AppotaID extends Component {
    state = {
        appota_id: this.props.user_infor.phone_number == this.props.user_infor.username ? '' : this.props.user_infor.username,
        isLoading: false,
        isAppotaId: false,
        isFocused: false,
        server_games: [],
        user_games: [],
        recent: []
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_games_topup_detail');
        AppEventsLogger.logEvent('fb_games_topup_detail', 1);
        appsFlyer.trackEvent('af_games_topup_detail', {}, () => { }, () => { });
    }

    componentWillMount() {
        AsyncStorage.getItem(`recent_game_${this.props.selected_game.game_id}`).then((value) => {
            if (value != null && value.length != 0) {
                this.setState({ recent: JSON.parse(value) })
            }
        }).done()
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    _onBlur = (e) => {
        this.setState({ isFocused: false })
    }

    _onFocus = (e) => {
        this.setState({ isFocused: true })
    }

    _clearText = (fieldName) => {
        this.refs[fieldName].setNativeProps({ text: '' });
        games.appota_id = '';
        games.role_id = '';
        games.role_name = '';
        games.server_id = '';
        games.server_name = '';
        this.setState({
            isFocused: true,
            isAppotaId: false,
            server_games: [],
            user_games: []
        })
    }

    onTextAppotaIdChange = (text) => {
        let { dispatch, selected_game } = this.props
        var games = selected_game
        games.role_id = '';
        games.role_name = '';
        games.server_id = '';
        games.server_name = '';
        this.setState({
            
            isAppotaId: false,
            server_games: [],
            user_games: []
        })
        dispatch(taskActionCreators.change_selected_game(games))
    }

    onPressRecentGame = (item) => {
        games.appota_id = item.appota_id;
        games.role_id = item.role_id;
        games.role_name = item.role_name;
        games.server_id = item.server_id;
        games.server_name = item.server_name;
        this.setState({
            isAppotaId: true,
        });
        // this.GetListGamesServer()
    }

    render() {
        var games = this.props.selected_game
        return (
            <View {...this.props} style={[styles.container, styles.tabHome]}>
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
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView keyboardShouldPersistTaps='always' >
                        <View style={styles.FormControl_Group}>
                            <View style={styles.FormControl_Title}>
                                <Text style={styles.FormControl_TitleText}>
                                    APPOTA ID
                                </Text>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_Input}>
                                    <TextInput
                                        ref={'textClear'}
                                        autoCapitalize="none"
                                        autoFocus={true}
                                        placeholder={Lang.nhap_appota_id()}
                                        placeholderTextColor="rgba(0,0,0,0.3)"
                                        value={this.state.appota_id}
                                        autoCorrect={false}
                                        returnKeyType={"done"}
                                        onBlur={() => this._onBlur()}
                                        onFocus={() => this._onFocus()}
                                        onSubmitEditing={() => this.GetListGamesServer()}
                                        onChangeText={(text) => this.onTextAppotaIdChange(text)}
                                        style={styles.FormControl_Input_Enter}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                    />
                                    {renderIf(games.appota_id != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this._clearText('textClear')} style={styles.FormControl_Addon}>
                                            <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_AddonIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                        {renderIf(!this.state.isAppotaId && this.state.recent.length > 0)(
                            <View style={styles.FormControl_Group}>
                                <View style={styles.FormControl_Title}>
                                    <Text style={styles.FormControl_TitleText}>
                                        {Lang.gan_day().toUpperCase()}
                                    </Text>
                                </View>
                                <View style={styles.ListRecentEvent}>
                                    {this.state.recent.map((item, i) => {
                                        var day = moment(item.timestamp);
                                        day.locale(Lang.getLanguage())
                                        var time = day.fromNow()
                                        return (
                                            <View key={i} style={[styles.ListRecent_Row, { borderBottomColor: '#e3e3e3', borderBottomWidth: 1 }]}>
                                                <View style={styles.ListRecent_Item}>
                                                    <TouchableOpacity onPress={this.onPressRecentGame.bind(this, item)} style={styles.ListRecent_ItemTouch}>
                                                        <View style={styles.ListRecent_Info}>
                                                            <Text style={styles.ListRecent_InfoPhone}>
                                                                {item.appota_id}
                                                            </Text>
                                                            <Text style={styles.ListRecent_InfoDate}>
                                                                {item.server_name} · {item.role_name} · {time}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        )}

                    </ScrollView>

                    {renderIf(games.appota_id.length == 0)(
                        <View style={styles.FormControl_Button}>
                            <View style={styles.FormControl_ButtonTouchDisable}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.lay_thong_tin_game().toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    )}
                    {renderIf(!this.state.isAppotaId && games.appota_id.length != 0)(
                        <View style={styles.FormControl_Button}>
                            <TouchableOpacity style={styles.FormControl_ButtonTouch} onPress={() => this.GetListGamesServer()}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.lay_thong_tin_game().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                {renderIf(Platform.OS == 'ios')(
                    <KeyboardSpacer />
                )}
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
    selected_game: state.taskState.selected_game,
})

export default connect(mapStateToProps)(Game_AppotaID)
