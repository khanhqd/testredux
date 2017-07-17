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
import { Actions } from "react-native-router-flux";
var styles = require('../Common/style.js');
import renderIf from '../Common/renderIf'
var Lang = require('../Common/Lang');
import moment from 'moment';
var Swipeout = require('../../custom_modules/react-native-swipeout')

class Temp extends Component {

    render() {
        var data = this.props;
        var ThumbImg;
        // var payload = JSON.parse(data.payload);
        if (!data.icon) {
            if (data.type == 'cashin' ||
                data.type == 'cashout' ||
                data.type == 'transfer' ||
                data.type == 'cashback' ||
                data.type == 'cashout_cashback_money' ||
                data.type == 'receive_cashback' ||
                data.type == 'receive_transfer' ||
                data.type == 'game_ewallet_charging' ||
                data.type == 'game_bank_charging' ||
                data.type == 'game_card_charging')
                ThumbImg = require('../../element/notification/i-money.png');
            else if (data.type == 'topup')
                ThumbImg = require('../../element/notification/i-phone.png');
            else if (data.type == 'buy_card')
                ThumbImg = require('../../element/notification/i-pay.png');
            else if (data.type == 'system')
                ThumbImg = require('../../element/notification/i-maintenance.png');
            else
                ThumbImg = require('../../element/notification/i-notification.png');
        }
        else {
            ThumbImg = { uri: data.icon }
        }

        var _button = data.button.length == 0 ? '' : data.button.split(',');
        var btn1 = _button.length > 0 ? _button[0].charAt(0).toUpperCase() + _button[0].slice(1).toLowerCase() : '';
        var btn2 = _button.length > 1 ? _button[1].charAt(0).toUpperCase() + _button[1].slice(1).toLowerCase() : '';

        var fromNow = moment(data.created_at, 'YYYY-MM-DD HH:mm:ss').fromNow();

        return (
            <View onPress={this.props.onPressItem} style={[styles.rowContainer, { minHeight: 88 }]}>
                <Swipeout sensitivity={0} autoClose={true} right={[{ text: Lang.xoa(), backgroundColor: 'red', onPress: () => Actions.popup({ title: Lang.thong_bao(), content: Lang.confirm_xoa_thong_bao(), onPress_Cancel: () => { }, onPress_Ok: () => this.props.onRemove() }) }]} backgroundColor={'transparent'}>
                    <TouchableOpacity onPress={this.props.onPressItem} >
                        <View style={styles.FormControl_RowSm_Touch}>
                            <View style={styles.FormControl_RowSm_Touch_Thumb}>
                                <Image source={ThumbImg} style={styles.FormControl_RowSm_Touch_ThumbImg} />
                            </View>
                            <View style={styles.FormControl_RowSm_Touch_Content}>
                                <View style={styles.FormControl_RowSm_Touch_Info}>
                                    <Text style={styles.FormControl_RowSm_Touch_InfoTitle} numberOfLines={2}>
                                        {this.props.title}
                                    </Text>
                                    <Text style={styles.FormControl_RowSm_Touch_InfoTime} numberOfLines={1}>
                                        {fromNow}
                                    </Text>
                                </View>
                                <Text style={styles.FormControl_RowSm_Touch_InfoSub} numberOfLines={this.props.numberOfLines}>
                                    {this.props.content}
                                </Text>
                            </View>
                        </View>
                        {renderIf(_button.length == 2)(
                            <View style={styles.FormControl_RowSm_Botton}>
                                <TouchableOpacity onPress={this.props.onPressAceptOk.bind(this)} style={styles.FormControl_RowSm_BottonDone}>
                                    <Text style={styles.FormControl_RowSm_BottonDone_Text}>
                                        {Lang.button_ok()}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.props.onPressAceptCancel.bind(this)} style={styles.FormControl_RowSm_BottonCancel}>
                                    <Text style={styles.FormControl_RowSm_BottonCancel_Text}>
                                        {Lang.button_huy()}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <View style={styles.FormControl_RowSm_Line}></View>
                    </TouchableOpacity>
                </Swipeout>
            </View>
        );
    }
}

module.exports = Temp;
