import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import { Actions } from "react-native-router-flux";
var styles = require('../Common/style.js');
var Utils = require('../Common/Utils');
var Lang = require('../Common/Lang');

class Temp extends React.Component {
    render() {
        var icon;
        if (this.props.type == 'atm')
            icon = require('../../element/RutTien/rt-atm.png');
        else if (this.props.type == 'account')
            icon = require('../../element/RutTien/rt-bank.png');
        else if (this.props.type == 'cashback')
            icon = require('../../element/RutTien/rt-cash-back.png');
        else if (this.props.type == 'money')
            icon = require('../../element/RutTien/rt-money.png');
        else if (this.props.type == 'cc')
            icon = require('../../element/RutTien/rt-cc.png');
        var fee;
        if (this.props.transaction_fee == 0 && this.props.fee_percent == '0.00')
            fee = Lang.khong_mat_phi();
        else if (this.props.transaction_fee == 0 && this.props.fee_percent != '0.00')
            fee = Lang.phi() + ': ' + Utils.toFixed(this.props.fee_percent, 2) + ' %';
        else if (this.props.transaction_fee != 0 && this.props.fee_percent == '0.00')
            fee = Lang.phi() + ': ' + Utils.number_format(this.props.transaction_fee, '.', '.') + ' đ';
        else
            fee = Lang.phi() + ': ' + Utils.number_format(this.props.transaction_fee, '.', '.') + ' đ + ' + this.props.fee_percent + ' %';
        return (
            <View style={styles.FormControl_RowGroup}>
                <TouchableOpacity onPress={this.props.onPressRow.bind(this)} style={styles.FormControl_RowTouch}>
                    <View style={styles.FormControl_RowTouch_Thumb}>
                        <Image source={icon} style={styles.FormControl_RowTouch_ThumbImg} />
                    </View>
                    <View style={styles.FormControl_RowTouch_Info}>
                        <Text style={styles.FormControl_RowTouch_InfoTitle} numberOfLines={1}>
                            {this.props.name}
                        </Text>
                        <Text style={styles.FormControl_RowTouch_InfoSub} numberOfLines={2}>
                            {fee} - {this.props.description}
                        </Text>
                    </View>
                    <View style={styles.FormControl_RowTouch_Point}>
                        <Image source={require('../../element/RutTien/ic-point.png')} style={styles.FormControl_RowTouch_PointImg} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

module.exports = Temp;