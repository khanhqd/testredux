import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ListView,
    Clipboard,
    Image
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import Toast from '@remobile/react-native-toast';
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import * as Requests from '../Helpers/Requests'

var Lang = require('../Common/Lang');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Actions.home({ type: 'reset' })
    setTimeout(() => {
        Actions.refresh();
    }, 10);
}

class MuaMaThe_ThongTin extends React.Component {
    render() {
        return (
            <View style={styles.Personal}>
                <View style={styles.Personal_Setting}>
                    <View style={styles.FormControl_Group}>
                        <View style={styles.FormControl_Title}>
                        </View>
                        <View style={styles.FormControl_Content}>
                            <View style={styles.FormControl_Setting}>
                                <View style={styles.FormControl_Setting_Group}>
                                    <View style={styles.FormControl_Setting_Touch} >
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                {Lang.loai_the()}
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_Setting_Touch_InfoRight}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitleRight} numberOfLines={1}>
                                                {this.props.vendor.charAt(0).toUpperCase() + this.props.vendor.slice(1).toLowerCase()}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.FormControl_Setting_Line}></View>
                                </View>
                                <View style={styles.FormControl_Setting_Group}>
                                    <View style={styles.FormControl_Setting_Touch}>
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                {Lang.so_luong()}
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_Setting_Touch_InfoRight}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitleRight} numberOfLines={1}>
                                                {this.props.quantity}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.FormControl_Setting_Line}></View>
                                </View>
                                <View style={styles.FormControl_Setting_Group}>
                                    <View style={styles.FormControl_Setting_Touch}>
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                {Lang.han_dung()}
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_Setting_Touch_InfoRight}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitleRight} numberOfLines={1}>
                                                {this.props.expiry_date}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

class MuaMaThe_Code extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            dataSource: this.props.dataSource
        }
    }

    onPressCopy(data) {
        Toast.showToast(Lang.da_copy(), "short", "center");
        Clipboard.setString(data);
    }

    renderRow(rowData, sectionID, rowID) {
        var number = parseInt(rowID) + 1;
        return (
            <View>
                <View style={styles.FormControl_Title}>
                    <Text style={styles.FormControl_TitleText}>
                        {Lang.ma_the().toUpperCase()} {number}
                    </Text>
                </View>
                <View style={styles.FormControl_Content}>
                    <View style={styles.FormControl_Setting}>
                        <View style={styles.FormControl_Setting_Group}>
                            <View style={styles.FormControl_Setting_Touch} >
                                <View style={styles.FormControl_Setting_Touch_Info}>
                                    <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                        {Lang.menh_gia()}
                                    </Text>
                                </View>
                                <View style={styles.FormControl_Setting_Touch_InfoRight}>
                                    <Text style={styles.FormControl_Setting_Touch_InfoTitleRight} numberOfLines={1}>
                                        {Utils.number_format(parseInt(rowData.value), '.', '.')}
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.FormControl_Setting_Touch_Copy}>
                                    <Image source={require('../../element/form/ic-copy.png')} style={styles.FormControl_Setting_Touch_CopyImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.FormControl_Setting_Line}></View>
                        </View>
                        <View style={styles.FormControl_Setting_Group}>
                            <View style={styles.FormControl_Setting_Touch} >
                                <View style={styles.FormControl_Setting_Touch_Info}>
                                    <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                        Serial
                                    </Text>
                                </View>
                                <View style={styles.FormControl_Setting_Touch_InfoRight}>
                                    <Text style={styles.FormControl_Setting_Touch_InfoTitleRight}>
                                        {rowData.serial}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={this.onPressCopy.bind(this, rowData.serial)} style={styles.FormControl_Setting_Touch_Copy}>
                                    <Image source={require('../../element/form/ic-copy.png')} style={styles.FormControl_Setting_Touch_CopyImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.FormControl_Setting_Line}></View>
                        </View>
                        <View style={styles.FormControl_Setting_Group}>
                            <View style={styles.FormControl_Setting_Touch}>
                                <View style={styles.FormControl_Setting_Touch_Info}>
                                    <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                        {Lang.ma_the()}
                                    </Text>
                                </View>
                                <View style={styles.FormControl_Setting_Touch_InfoRight}>
                                    <Text style={styles.FormControl_Setting_Touch_InfoTitleRight}>
                                        {rowData.code}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={this.onPressCopy.bind(this, rowData.code)} style={styles.FormControl_Setting_Touch_Copy}>
                                    <Image source={require('../../element/form/ic-copy.png')} style={styles.FormControl_Setting_Touch_CopyImg} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={[styles.Personal, { flex: 1 }]}>
                <ListView
                    showsVerticalScrollIndicator={false}
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderRow={this.renderRow.bind(this)} />
            </View>
        );
    }
};

class BuyCardSuccess extends Component {
    constructor(props, context) {
        super(props, context)
        var cards = JSON.parse(this.props.cards);//{"success":true,"transaction_id":"PH161205005011","data":[{"code":"1533929289323","serial":"57507127854","vendor":"viettel","value":"10000","expiry_date":"20221231"},{"code":"1533946976024","serial":"57507127855","vendor":"viettel","value":"10000","expiry_date":"20221231"},{"code":"1533964621466","serial":"57507127856","vendor":"viettel","value":"10000","expiry_date":"20221231"}]};
        var data_card = [];
        for (var i = 0; i < cards.data.length; i++) {
            data_card.push({ code: cards.data[i].code, value: cards.data[i].value, serial: cards.data[i].serial });
        }
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            vendor: cards.data.length == 0 ? '' : cards.data[0].vendor,
            quantity: cards.data.length,
            expiry_date: cards.data.length == 0 ? '' : (cards.data[0].expiry_date.slice(6) + '/' + cards.data[0].expiry_date.slice(4).slice(0, 2) + '/' + cards.data[0].expiry_date.slice(0, 4)),
            dataSource: ds.cloneWithRows(data_card),
        }
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_buy_card_success');
        appsFlyer.trackEvent('af_buy_card_success', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_buy_card_success', 1);
        setTimeout(() => {
            this.GetUserInfo()
        }, 200);
    }

    GetUserInfo() {
        let { dispatch, access_token } = this.props
        Requests.User_Infor(access_token)
            .then((data) => {
                dispatch(taskActionCreators.change_user(data))
            })
            .catch((error) => {
            })
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    render() {
        return (
            <View {...this.props} style={[styles.container, styles.tabHome]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-close.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.chi_tiet_giao_dich()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <MuaMaThe_ThongTin vendor={this.state.vendor}
                        quantity={this.state.quantity}
                        expiry_date={this.state.expiry_date} />
                    <MuaMaThe_Code dataSource={this.state.dataSource} />
                </View>
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
})

export default connect(mapStateToProps)(BuyCardSuccess)