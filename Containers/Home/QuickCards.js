import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    Platform,
    TextInput,
    Image
} from "react-native";
import { Actions } from "react-native-router-flux";
var styles = require('../Common/style.js');
var Utils = require('../Common/Utils');
var Lang = require('../Common/Lang');
import TimerMixin from 'react-timer-mixin';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

class QuickCards extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            hasData: false,
            resData: []
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        this.GetListCards();
    }

    onSort(a, b) {
        var nameA = a.vendor.toUpperCase(); // ignore upper and lowercase
        var nameB = b.vendor.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }

    onSort2(a, b) {
        var valueA = a.value;
        var valueB = b.value;
        if (valueA < valueB) {
            return -1;
        }
        if (valueA > valueB) {
            return 1;
        }
        return 0;
    }

    GetListCards() {
        if (this.props.ds_cards.length == 0) {
            AsyncStorage.getItem("list_card").then((value) => {
                if (value != null && value.length != 0) {
                    this.parseData(JSON.parse(value))
                }
            }).done();
        }
        else {
            this.parseData(this.props.ds_cards)
        }
    }

    parseData(cards) {
        var _resData = [];
        for (var i = 0; i < cards.length; i++) {
            cards[i].name = cards[i].vendor.charAt(0).toUpperCase() + cards[i].vendor.slice(1).toLowerCase()
            var values = cards[i].values_list
            for (var j = 0; j < values.length; j++) {
                if (cards[i].vendor == 'appota' && (parseInt(cards[i].values_list[j].price) >= 200000)) {
                    _resData.push({
                        vendor: 'appota',
                        name: 'Appota',
                        vendor_ic: require('../../element/logo-cards/card-appotacard.png'),
                        ewallet_cashback_percent: cards[i].values_list[j].ewallet_cashback_percent,
                        value: cards[i].values_list[j].value,
                        price: cards[i].values_list[j].price
                    });
                }
                else if (cards[i].vendor == 'mobifone' && (parseInt(cards[i].values_list[j].price) >= 500000)) {
                    _resData.push({
                        vendor: 'mobifone',
                        name: 'Mobifone',
                        vendor_ic: require('../../element/logo-cards/card-mobifone.png'),
                        ewallet_cashback_percent: cards[i].values_list[j].ewallet_cashback_percent,
                        value: cards[i].values_list[j].value,
                        price: cards[i].values_list[j].price
                    });
                }
                else if (cards[i].vendor == 'vinaphone' && (parseInt(cards[i].values_list[j].price) >= 500000)) {
                    _resData.push({
                        vendor: 'vinaphone',
                        name: 'Vinaphone',
                        vendor_ic: require('../../element/logo-cards/card-vinaphone.png'),
                        ewallet_cashback_percent: cards[i].values_list[j].ewallet_cashback_percent,
                        value: cards[i].values_list[j].value,
                        price: cards[i].values_list[j].price
                    });
                }
                else if (cards[i].vendor == 'viettel' && (parseInt(cards[i].values_list[j].price) >= 500000)) {
                    _resData.push({
                        vendor: 'viettel',
                        name: 'Viettel',
                        vendor_ic: require('../../element/logo-cards/card-viettel.png'),
                        ewallet_cashback_percent: cards[i].values_list[j].ewallet_cashback_percent,
                        value: cards[i].values_list[j].value,
                        price: cards[i].values_list[j].price
                    });
                }
            }
        }
        _resData.reverse().sort((a, b) => this.onSort(a, b));
        this.setState({
            hasData: _resData.length == 0 ? false : true,
            resData: _resData,
        });
    }

    onPressItem(data) {
        if (parseInt(data.value) > this.props.user_infor.balance) {
            Actions.popup({
                title: Lang.thong_bao(),
                content: Lang.tk_khong_du(),
                flag: 'error'
            });
        }
        else {
            GoogleAnalytics.trackScreenView('ga_quick_purchase');
            AppEventsLogger.logEvent('fb_quick_purchase', 1);
            appsFlyer.trackEvent('af_quick_purchase', {}, () => { }, () => { });

            var cards = {
                vendor: data.vendor,
                name: data.name,
                method: 'wallet',
                bank_name: Lang.tk_vi(),
                value: data.value,
                price: data.price,
                quantity: 1,
                transaction_fee: 0,
                cashback_percent: Utils.toFixed(data.ewallet_cashback_percent, 2),
                transaction_percent_fee: 0
            };

            Actions.buy_cards_receipt({
                cards: cards
            });
        }
    }

    render() {
        if (!this.state.hasData) return null;
        return (
            <View style={styles.ListPurchase}>
                <View style={styles.ListPurchase_Header}>
                    <Image
                        source={require('../../element/homepage/ic-MuaMaThe.png')}
                        style={styles.ListPurchase_Header_Img} />
                    <View style={styles.ListPurchase_Title}>
                        <Text style={styles.ListPurchase_Title_Name}>{Lang.mua_the_nhanh()}</Text>
                        <Text style={styles.ListPurchase_Title_Sub}>{Lang.thanh_toan_nhanh_bang_vi()}</Text>
                    </View>
                </View>
                <ScrollView style={styles.ItemPurchase_Scroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        this.state.resData.map((item, i) => {
                            return (
                                <View key={i} style={styles.ItemPurchase}>
                                    <TouchableOpacity onPress={this.onPressItem.bind(this, item)} style={styles.ItemPurchase_Touch}>
                                        <Image source={item.vendor_ic} style={styles.ItemPurchase_Img} />
                                        <View style={styles.ItemPurchase_Title}>
                                            <Text style={styles.ItemPurchase_Title_Name}>{Utils.number_format(item.value, '.', '.')}đ</Text>
                                            <Text style={styles.ItemPurchase_Title_Sale}>{Lang.hoan_tien()}: {Utils.number_format(item.value * item.ewallet_cashback_percent / 100, '.', '.')}đ</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.ViewList_Alert}>
                                        <Image style={styles.ViewList_Alert_Img} source={require('../../element/form/ic-alert.png')} />
                                        <Text style={styles.ViewList_Alert_Text}>- {Utils.toFixed(item.ewallet_cashback_percent, 2)}%</Text>
                                    </View>
                                </View>
                            );
                        })
                    }
                    <View style={styles.ItemPurchase}>
                        <TouchableOpacity style={styles.ItemPurchase_Touch} onPress={() => Actions.buy_cards()}>
                            <View style={styles.ItemPurchase_More}>
                                <Text style={styles.ItemPurchase_More_Txt}>{Lang.mua_the_khac()}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
module.exports = QuickCards;
