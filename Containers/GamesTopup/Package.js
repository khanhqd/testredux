import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView,
    Image,
    AsyncStorage,
    ScrollView
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import Toast from '@remobile/react-native-toast';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import * as Requests from '../Helpers/Requests'

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');


const popToRoot = () => {
    Actions.pop();
    setTimeout(() => {
        Actions.refresh();
    }, 10);
}

var games = {
    game_id: '',
    game_name: '',
    appota_id: '',
    server_id: '',
    server_name: '',
    role_id: '',
    role_name: '',
    packageId: '',
    packageValue: '',
    gameCurrency: '',
    amount: '',
    payment_method: '',
    transaction_fee: '',
    transaction_percent_fee: '',
    bank_code: '',
    packageType: ''
};
var resData = [];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        games = this.props.games;
        this.state = {
            game_packages: [],
            dataSource: ds.cloneWithRows([]),
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_games_topup_package');
        AppEventsLogger.logEvent('fb_games_topup_package', 1);
        appsFlyer.trackEvent('af_games_topup_package', {}, () => { }, () => { });

        setTimeout(() => {
            this.GetGameConfig()
            if (games.payment_method == 'wallet')
                this.GetGamePackage()
        }, 200);
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    GetGameConfig() {
        let { access_token } = this.props
        RequestHelper.GameConfig(access_token, games.game_id)
            .then((data) => {
                if (data.status == 200) {
                    resData = [];
                    var payment = JSON.parse(data._bodyText);
                    for (var i = 0; i < payment.data.payment_config.packages.length; i++) {
                        resData.push(payment.data.payment_config.packages[i]);
                    }

                    games.packageId = '';
                    games.packageValue = '';
                    games.gameCurrency = '';
                    games.amount = '';

                    this.setState({
                        dataSource: ds.cloneWithRows(resData)
                    });
                }
                else {
                    if (data.status == 401) access_token = '';
                    Utils.onRequestEnd(data);
                }
            })
            .catch((error) => {
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    GetGamePackage() {
        let { access_token } = this.props
        Requests.Game_Packages(this.props.access_token, games.game_id)
            .then((packages) => {
                // console.log('GetGamePackage=' + JSON.stringify(packages))
                this.setState({
                    game_packages: packages.data
                })
            })
            .catch((error) => {
            })
    }

    onPressPayment(rowData) {
        GoogleAnalytics.trackEvent('ga_games_topup', `Select package ${rowData.amount}`)
        games.packageId = rowData.packageId;
        games.packageValue = rowData.value;
        games.gameCurrency = rowData.gameCurrency;
        games.amount = rowData.amount
        games.packageType = ''
        this.setState({
            dataSource: ds.cloneWithRows(resData)
        });

        if (games.payment_method == 'bank') {
            Actions.bank({
                page: 'games',
                title: Lang.nap_game2(),
                games: games
            })
        }
        else if (games.payment_method == 'card') {
            Actions.games_topup_card({ games: games });
        }
        else {
            Actions.games_topup_receipt({ games: games })
        }
    }

    renderRow(rowData) {
        var style_bg_payment;
        var style_txt_payment;
        var style_txt_price;
        if (games.packageId == rowData.packageId && games.packageType.length == 0) {
            style_bg_payment = styles.FormControl_TouchSelect_Active;
            style_txt_payment = styles.FormControl_TouchTitle_Active;
            style_txt_price = styles.FormControl_TouchPrice_Active;
        }
        else {
            style_bg_payment = styles.FormControl_TouchSelect;
            style_txt_payment = styles.FormControl_TouchTitle;
            style_txt_price = styles.FormControl_TouchPrice;
        }

        return (
            <TouchableOpacity onPress={() => this.onPressPayment(rowData)} style={[styles.FormControl_TouchWidthText, styles.FormControl_Touch3Col]}>
                <View style={style_bg_payment}>
                    <Text style={style_txt_payment}>{rowData.value} {rowData.gameCurrency}</Text>
                    <Text style={style_txt_price}>{Lang.gia()}: {Utils.number_format(rowData.amount, '.', '.')} đ</Text>
                </View>
            </TouchableOpacity>
        );
    }

    onPressPackage = (data) => {
        GoogleAnalytics.trackEvent('ga_games_topup', `Select package ${data.price}`)
        games.packageId = data.package_id
        games.packageValue = data.value
        games.gameCurrency = data.currency
        games.amount = data.price
        games.packageType = 'special'
        Actions.refresh()

        setTimeout(() => {
            Actions.games_topup_receipt({ games: games })
        }, 10)
    }

    render() {
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
                <View style={[styles.FormControl_Group, { flex: 1, }]}>
                    <ScrollView>
                        <View style={styles.FormControl_Title}>
                            <Text style={styles.FormControl_TitleText}>
                                {Lang.chon_goi_nap().toUpperCase()}
                            </Text>
                        </View>
                        <View style={[styles.FormControl_Content]}>
                            <View style={styles.FormControl_Select}>
                                <View style={styles.FormControl_SelectGroup}>
                                    <ListView
                                        enableEmptySections={true}
                                        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}
                                        dataSource={this.state.dataSource}
                                        initialListSize={resData.length}
                                        renderRow={(rowData) => this.renderRow(rowData)} />
                                </View>
                            </View>
                        </View>
                        {renderIf(this.state.game_packages.length > 0)(
                            <View>
                                <View style={styles.FormControl_Title}>
                                    <Text style={styles.FormControl_TitleText}>
                                        GÓI NẠP ĐẶC BIỆT
                            </Text>
                                </View>
                                <View style={styles.FormControl_Content}>
                                    <View style={styles.FormControl_Select}>
                                        <View style={styles.FormControl_SelectGroup}>
                                            {
                                                this.state.game_packages.map((item, i) => {
                                                    var style_bg_payment = (games.packageId == item.package_id && games.packageType.length > 0) ? styles.FormControl_TouchSelect_Active : styles.FormControl_TouchSelect
                                                    var style_txt_payment = (games.packageId == item.package_id && games.packageType.length > 0) ? styles.FormControl_TouchTitle_Active : styles.FormControl_TouchTitle
                                                    var style_txt_price = (games.packageId == item.package_id && games.packageType.length > 0) ? styles.FormControl_TouchPrice_Active : styles.FormControl_TouchPrice
                                                    return (
                                                        <TouchableOpacity onPress={() => this.onPressPackage(item)} key={i} style={[styles.FormControl_TouchWidthText, styles.FormControl_Touch1Col]}>
                                                            <View style={style_bg_payment}>
                                                                <Text style={style_txt_payment}>{item.value} {item.currency} + {item.description}</Text>
                                                                <Text style={style_txt_price}>Giá: {Utils.number_format(item.price, 0, '.', '.')} đ</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
})

export default connect(mapStateToProps)(AppotaView)
