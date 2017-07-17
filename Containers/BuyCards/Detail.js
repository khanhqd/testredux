import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView,
    AsyncStorage,
    Platform,
    ScrollView,
    Image,
    Keyboard
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Actions.pop();
}

class ThongTin extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            quantity: 1
        }
    }

    onPressQuantity(flag) {
        if (flag == 'plus') {
            cards.quantity += 1;
        }
        else {
            if (cards.quantity > 1)
                cards.quantity -= 1;
        }
        this.setState({
            quantity: cards.quantity
        });
    }

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
                                    <View style={styles.FormControl_Setting_Touch}>
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                {Lang.loai_the()}
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_Setting_Touch_InfoRight}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitleRight} numberOfLines={1}>
                                                {cards.name}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.FormControl_Setting_Line}></View>
                                </View>
                                <View style={styles.FormControl_Setting_Group}>
                                    <View style={styles.FormControl_Setting_Touch}>
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                {Lang.so_luong()}: {this.state.quantity}
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_NumsberAdd}>
                                            <TouchableOpacity onPress={() => this.onPressQuantity('minus')} style={styles.FormControl_NumsberAdd_Left}>
                                                <Text style={styles.FormControl_NumsberText}>
                                                    -
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.onPressQuantity('plus')} style={styles.FormControl_NumsberAdd_Right}>
                                                <Text style={styles.FormControl_NumsberText}>
                                                    +
                                                </Text>
                                            </TouchableOpacity>
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
};

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

var cards = {};
class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        cards.values_list = props.card.values_list;
        cards.name = props.card.vendor.charAt(0).toUpperCase() + props.card.vendor.slice(1).toLowerCase()
        cards.vendor = props.card.vendor;
        cards.value = props.card.values_list.length == 0 ? 0 : props.card.values_list[0].value;
        cards.price = props.card.values_list.length == 0 ? 0 : props.card.values_list[0].price;
        cards.cashback_percent = props.card.values_list.length == 0 ? 0 : Utils.toFixed(props.card.values_list[0].ewallet_cashback_percent, 2);
        cards.quantity = 1;
        cards.bank_name = Lang.tk_vi();
        cards.bank_code = '';
        cards.transaction_fee = 0;
        cards.transaction_percent_fee = 0
        cards.method = 'wallet';
        this.state = {
            method: 'wallet',
            dataSource: ds.cloneWithRows(cards.values_list),
        }
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_buy_card_detail');
        appsFlyer.trackEvent('af_buy_card_detail', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_buy_card_detail', 1);
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    SumTransactionFee(amount, transaction_fee, transaction_percent_fee) {
        return (amount * transaction_percent_fee / 100 + transaction_fee);
    }

    onPressMuaThe() {
        if (cards.method == 'bank') {
            Actions.bank({
                page: 'cards',
                title: Lang.nap_dienthoai2(),
                cards: cards
            })
        }
        else if (cards.method == 'cc') {
            Actions.buy_cards_receipt({ cards: cards });
        }
        else {
            var fee = this.SumTransactionFee(cards.value, parseInt(cards.transaction_fee), parseInt(cards.transaction_percent_fee)) * cards.quantity;
            var total = parseInt(fee) + (parseInt(cards.value) * cards.quantity);
            if (total > this.props.user_infor.balance) {
                Actions.popup({
                    title: Lang.thong_bao(),
                    content: Lang.tk_khong_du(),
                    flag: 'error'
                });
            }
            else {
                Actions.buy_cards_receipt({ cards: cards });
            }
        }
    }

    //hinh thuc
    onPressPayment(method) {
        cards.method = method;
        cards.transaction_fee = method == 'wallet' ? 0 : this.props.visa_fee.transaction_fee;
        cards.transaction_percent_fee = method == 'wallet' ? 0 : this.props.visa_fee.transaction_percent_fee;
        cards.bank_code = this.props.visa_fee.bank_code;
        cards.bank_name = method == 'wallet' ? Lang.tk_vi() : Lang.the_tin_dung()
        var data = cards.values_list.filter((item) => this.filterCard(item, cards.value));
        cards.cashback_percent = data.length == 0 ? 0 : (cards.method == 'wallet' ? Utils.toFixed(data[0].ewallet_cashback_percent, 2) : Utils.toFixed(data[0].bank_cashback_percent, 2));
        this.setState({
            method: method,
            dataSource: ds.cloneWithRows(cards.values_list),
        })
    }

    filterCard(item, keyword) {
        var name = item.value
        return name == keyword
    }

    renderBgMethod(flag) {
        if (this.state.payment_method == flag)
            return styles.FormControl_TouchRowSelect_Active;
        else
            return styles.FormControl_TouchRowSelect;
    }

    renderTxtMethod(flag) {
        if (this.state.payment_method == flag)
            return styles.FormControl_TouchTitle_Active;
        else
            return styles.FormControl_TouchTitle;
    }

    render_payment(flag) {
        var style_bg_payment = this.state.method == flag ? styles.FormControl_TouchRowSelect_Active : styles.FormControl_TouchRowSelect;
        var style_txt_payment = this.state.method == flag ? styles.FormControl_TouchTitle_Active : styles.FormControl_TouchTitle;
        switch (flag) {
            case 'wallet':
                var icon = this.state.method == flag ? require('../../element/form/ic-wallet-active.png') : require('../../element/form/ic-wallet.png')
                return (
                    <TouchableOpacity onPress={() => this.onPressPayment('wallet')} style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                        <View style={style_bg_payment}>
                            <Image source={require('../../element/form/pay-payhub.png')} style={styles.FormControl_TouchRowImg} />
                            <Text style={style_txt_payment}>{Lang.tk_vi()}</Text>
                        </View>
                    </TouchableOpacity>
                );
            case 'bank':
                var icon = this.state.method == flag ? require('../../element/form/ic-cc-active.png') : require('../../element/form/ic-cc.png')
                return (
                    <TouchableOpacity onPress={() => this.onPressPayment('bank')} style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                        <View style={style_bg_payment}>
                            <Image source={require('../../element/form/pay-atm-ibanking.png')} style={styles.FormControl_TouchRowImg} />
                            <Text style={style_txt_payment}>ATM/iBanking</Text>
                        </View>
                    </TouchableOpacity>
                );
            case 'cc':
                var icon = this.state.method == flag ? require('../../element/form/ic-atm-active.png') : require('../../element/form/ic-atm.png')
                return (
                    <TouchableOpacity onPress={() => this.onPressPayment('cc')} style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                        <View style={style_bg_payment}>
                            <Image source={require('../../element/form/pay-credit-card.png')} style={styles.FormControl_TouchRowImg} />
                            <Text style={style_txt_payment}>{Lang.the_tin_dung()}</Text>
                        </View>
                    </TouchableOpacity>
                );
        }
    }

    //menh gia
    onPressMenhGia(data) {
        cards.price = data.price;
        cards.value = data.value;
        cards.cashback_percent = cards.method == 'wallet' ? Utils.toFixed(data.ewallet_cashback_percent, 2) : Utils.toFixed(data.bank_cashback_percent, 2);
        this.setState({
            dataSource: ds.cloneWithRows(cards.values_list)
        });
    }

    renderRow(data, sectionID, rowID) {
        var style_bg_price;
        var style_txt_title;
        var style_txt_price;
        if (cards.price == data.price) {
            style_bg_price = styles.FormControl_TouchSelect_Active;
            style_txt_title = styles.FormControl_TouchTitle_Active;
            style_txt_price = styles.FormControl_TouchPrice_Active;
        }
        else {
            style_bg_price = styles.FormControl_TouchSelect;
            style_txt_title = styles.FormControl_TouchTitle;
            style_txt_price = styles.FormControl_TouchPrice;
        }
        var percent = cards.method == 'wallet' ? data.ewallet_cashback_percent : data.bank_cashback_percent;
        return (
            <TouchableOpacity onPress={this.onPressMenhGia.bind(this, data)} style={[styles.FormControl_TouchWidthText, styles.FormControl_Touch3Col]}>
                <View style={style_bg_price}>
                    <Text style={style_txt_title}>{Utils.number_format(data.value, '.', '.')}đ</Text>
                    <Text style={style_txt_price}>{Lang.hoan_tien()} {Utils.toFixed(percent, 2)}%</Text>
                </View>
            </TouchableOpacity>
        );
    }

    toFixed(value, precision) {
        var power = Math.pow(10, precision || 0);
        return String(Math.round(value * power) / power);
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
                                {Lang.mua_the2()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView style={styles.FormControl_Scroll} keyboardShouldPersistTaps='always' >
                        <ThongTin />
                        <View style={styles.FormControl_Group}>
                            <View style={styles.FormControl_Title}>
                                <Text style={styles.FormControl_TitleText}>
                                    {Lang.menh_gia().toUpperCase()}
                                </Text>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_Select}>
                                    <View style={styles.FormControl_SelectGroup}>
                                        <ListView keyboardShouldPersistTaps='always' enableEmptySections={true} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.FormControl_Group}>
                            <View style={styles.FormControl_Title}>
                                <Text style={styles.FormControl_TitleText}>
                                    {Lang.hinh_thuc_thanh_toan().toUpperCase()}
                                </Text>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_Select}>
                                    <View style={styles.FormControl_SelectGroup}>
                                        {this.render_payment('wallet')}
                                        {this.render_payment('bank')}
                                        {this.render_payment('cc')}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.FormControl_Note}>
                                <Text style={styles.FormControl_NoteText}>
                                    {Lang.des_thanh_toan()}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.FormControl_Button}>
                        <TouchableOpacity onPress={() => this.onPressMuaThe()} style={styles.FormControl_ButtonTouch}>
                            <Text style={styles.FormControl_ButtonText}>
                                {Lang.thanh_toan().toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    user_infor: state.taskState.user_infor,
    visa_fee: state.taskState.visa_fee,
})

export default connect(mapStateToProps)(AppotaView)
