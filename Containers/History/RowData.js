import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from "react-native";
import { Actions } from 'react-native-router-flux';
import TimerMixin from 'react-timer-mixin';
import BaseComponent from '../BaseClass/BaseComponent';
var Lang = require('../Common/Lang');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');
import * as Utility from './Utility'

export default class RowData extends BaseComponent {
    render() {
        var _mount;
        var _operator;
        if (this.props.amount > 0) {
            _mount = Utils.number_format(this.props.amount, '.', '.');
            _operator = require('../../element/history/ic-plus.png');
        }
        else {
            _mount = Utils.number_format(-this.props.amount, '.', '.');
            _operator = require('../../element/history/ic-minus.png');
        }

        var date = new Date(this.props.timestamp * 1000);
        var time = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        var _type = Utility.renderHistoryType(this.props.type)

        var color_operator;
        if (this.props.operator == '+')
            color_operator = '#7ED321';
        else if (this.props.operator == '-')
            color_operator = '#FE3824';
        var _extra_info = JSON.stringify(this.props.extra_info);
        var extra_info = this.props.extra_info;
        var InfoID = '';
        if (_extra_info.indexOf('receiver_phone_number') > -1) InfoID = JSON.parse(extra_info).receiver_phone_number
        else if (_extra_info.indexOf('payer_phone_number') > -1) InfoID = JSON.parse(extra_info).payer_phone_number
        else if (_extra_info.indexOf('topup_phone_number') > -1) InfoID = JSON.parse(extra_info).topup_phone_number
        else if (_extra_info.indexOf('merchant_store_phone_number') > -1) InfoID = JSON.parse(extra_info).merchant_store_phone_number
        else InfoID = this.props.transaction_id

        if (this.props.isBalance && this.props.type == 'receive_cashback') return null
        return (
            <View style={styles.ListHistory_Row}>
                <TouchableOpacity style={styles.ListHistory_Touch} onPress={this.props.onPressRow.bind(this)}>
                    <View style={[styles.ListHistory_Item]}>
                        <View style={styles.ListHistory_InfoLeft}>
                            <Text style={styles.ListHistory_InfoName}>
                                {_type}
                            </Text>
                            <Text style={styles.ListHistory_InfoID}>
                                {InfoID}
                            </Text>
                        </View>
                        <View style={styles.ListHistory_InfoRight}>
                            <View style={styles.ListHistory_InfoMoneyStatus}>
                                <Image source={_operator} />
                                <Text style={styles.ListHistory_InfoMoney}>
                                    {_mount}đ
                                </Text>
                            </View>
                            <Text style={styles.ListHistory_InfoTime}>
                                {time}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.ListHistory_InfoPoint}>
                        <Image source={require('../../element/form/ic-point.png')} style={styles.ListHistory_InfoPoint_Img} />
                    </View>
                </TouchableOpacity>
                <View style={styles.ListHistory_Line}></View>
            </View>
        );
    }
};
