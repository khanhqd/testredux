import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ListView,
    AsyncStorage,
    Platform,
    Image
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

var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading2');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Actions.pop()
}

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: false,
            dataSource: ds.cloneWithRows(props.ds_cards)
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_buy_card');
        appsFlyer.trackEvent('af_buy_card', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_buy_card', 1);

        setTimeout(() => {
            if (this.props.ds_cards.length == 0)
                this.GetListCards();
        }, 200);
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    GetListCards() {
        let { dispatch, access_token } = this.props
        this.setState({ isLoading: true })
        Requests.List_Card(access_token)
            .then((cards) => {
                AsyncStorage.setItem('list_card', JSON.stringify(cards.data))
                dispatch(taskActionCreators.update_ds_cards(cards.data))
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(cards.data)
                })
            })
            .catch((error) => {
                this.setState({ isLoading: false })
            })
    }

    onPressThe(rowData) {
        GoogleAnalytics.trackEvent('ga_buy_card', 'Chọn vendor ' + rowData.vendor);
        Actions.buy_cards_detail({ card: rowData })
    }

    renderRow(rowData, sectionID, rowID) {
        var icon;
        if (rowData.vendor == 'appota')
            icon = require('../../element/logo-cards/card-appotacard.png');
        else if (rowData.vendor == 'viettel')
            icon = require('../../element/logo-cards/card-viettel.png');
        else if (rowData.vendor == 'mobifone')
            icon = require('../../element/logo-cards/card-mobifone.png');
        else if (rowData.vendor == 'vinaphone')
            icon = require('../../element/logo-cards/card-vinaphone.png');
        else if (rowData.vendor == 'vietnamobile')
            icon = require('../../element/logo-cards/card-vietnamobile.png');
        else if (rowData.vendor == 'gmobile')
            icon = require('../../element/logo-cards/card-gmobile.png');
        return (
            <TouchableOpacity onPress={() => this.onPressThe(rowData)} style={[styles.ViewList_ListTouch, this.props.ds_cards.length == 3 ? styles.ViewList_ListTouch3Col : styles.ViewList_ListTouch2Col]}>
                <View style={[styles.ViewList_ListTouch_Inner]}>
                    <Image source={icon} style={styles.ViewList_ListImgCard} />
                    <View style={styles.ViewList_ListName}>
                        <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                            {rowData.name}
                        </Text>
                    </View>
                </View>
                {renderIf(rowData.vendor == 'appota')(
                    <View style={styles.ViewList_Alert}>
                        <Image style={styles.ViewList_Alert_Img}source={require('../../element/form/ic-alert.png')}/>
                        <Text style={styles.ViewList_Alert_Text}>-6%</Text>
                    </View>
                )}
                {renderIf(rowData.vendor == 'viettel')(
                    <View style={styles.ViewList_Alert}>
                        <Image style={styles.ViewList_Alert_Img}source={require('../../element/form/ic-alert.png')}/>
                        <Text style={styles.ViewList_Alert_Text}>-3%</Text>
                    </View>
                )}
                {renderIf(rowData.vendor == 'mobifone')(
                    <View style={styles.ViewList_Alert}>
                        <Image style={styles.ViewList_Alert_Img}source={require('../../element/form/ic-alert.png')}/>
                        <Text style={styles.ViewList_Alert_Text}>-4.5%</Text>
                    </View>
                )}
                {renderIf(rowData.vendor == 'vinaphone')(
                    <View style={styles.ViewList_Alert}>
                        <Image style={styles.ViewList_Alert_Img}source={require('../../element/form/ic-alert.png')}/>
                        <Text style={styles.ViewList_Alert_Text}>-5%</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View {...this.props} style={[styles.container, styles.tabWhite]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.mua_the2()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                            <TouchableOpacity onPress={() => Actions.history_balance({ balance: this.props.user_infor.balance, balance_type: 'buy_card' })}>
                                <Image source={require('../../element/nav-bar/nav-history.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl_Group}>
                    <View style={styles.FormControl_TitleBorder}>
                        <Text style={styles.FormControl_TitleText}>
                            {Lang.chon_loai_the().toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.ViewListCol}>
                        <View style={styles.ViewList_List}>
                            <View style={styles.ViewList_ListScroll} >
                                <View style={styles.ViewList_ListScroll_InnerCol}>
                                    <View style={[styles.ViewList_ListScroll_Row, styles.ViewList_ListScroll_RowCol]}>
                                        <ListView
                                            showsVerticalScrollIndicator={false}
                                            keyboardShouldPersistTaps='always'
                                            enableEmptySections={true}
                                            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}
                                            dataSource={this.state.dataSource}
                                            renderRow={this.renderRow.bind(this)} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.FormControl_Note}>
                        <Text style={styles.FormControl_NoteText}>
                            {Lang.des_mua_the()}
                        </Text>
                    </View>
                    {renderIf(this.state.isLoading)(
                        <Loading />
                    )}
                </View>
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    ds_cards: state.taskState.ds_cards,
    user_infor: state.taskState.user_infor,
})

export default connect(mapStateToProps)(AppotaView)
