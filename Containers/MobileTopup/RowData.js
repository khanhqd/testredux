import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
var styles = require('../Common/style.js');
var Utils = require('../Common/Utils');
var Lang = require('../Common/Lang');

class Temp extends React.Component {
    render() {
        var data = this.props.data
        var style_bg_money;
        var style_title;
        var style_price;
        if (this.props.value == data.value) {
            style_bg_money = styles.FormControl_TouchSelect_Active;
            style_title = styles.FormControl_TouchTitle_Active;
            style_price = styles.FormControl_TouchPrice_Active;
        }
        else {
            style_bg_money = styles.FormControl_TouchSelect;
            style_title = styles.FormControl_TouchTitle;
            style_price = styles.FormControl_TouchPrice;
        }

        var percent = 0;
        var vender = Utils.vendorHelper(this.props.contact_number);
        if (vender == 'viettel') {
            percent = this.props.payment_method == 'wallet' ? data.viettel_ewallet_cashback_percent : data.viettel_bank_cashback_percent;
        }
        else if (vender == 'vina') {
            percent = this.props.payment_method == 'wallet' ? data.vinaphone_ewallet_cashback_percent : data.vinaphone_bank_cashback_percent;
        }
        else if (vender == 'mobi') {
            percent = this.props.payment_method == 'wallet' ? data.mobifone_ewallet_cashback_percent : data.mobifone_bank_cashback_percent;
        }
        else {
            percent = 0;
        }

        return (
            <TouchableOpacity onPress={this.props.onPress.bind(this)} style={[styles.FormControl_TouchWidthText, styles.FormControl_Touch3Col]}>
                <View style={style_bg_money}>
                    <Text style={style_title}>{Utils.number_format(data.value, '.', '.')} đ</Text>
                    <Text style={style_price}>{Lang.hoan_tien()} {Utils.toFixed(percent, 2)}%</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

module.exports = Temp;