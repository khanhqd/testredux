/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux'

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');
var Utils = require('../Common/Utils');

class AppotaView extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    render() {
        return (
            <View style={styles.headerInfo}>
                <View style={styles.headerInfo_Inner}>
                    <View style={styles.headerInfo_Ac}>
                        <TouchableOpacity style={styles.FormControl_SettingAccount_Inner} onPress={() => Actions.history_balance({ balance: this.props.user_infor.balance, balance_type: 'wallet' })}>
                            <Text style={styles.headerInfo_Ac_Sub}>
                                {Lang.tk_vi().toUpperCase()}
                            </Text>
                            <Text style={styles.headerInfo_Ac_Title}>
                                {Utils.number_format(this.props.user_infor.balance, 0, '.', '.')} đ
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerInfo_Avatar}>
                        <Image
                            source={this.props.user_infor.avatar.length == 0 ? require('../../element/homepage/avatar-default.png') : { uri: this.props.user_infor.avatar }}
                            style={styles.headerInfo_Ac_Img} />
                    </View>
                    <View style={styles.headerInfo_Ac}>
                        <TouchableOpacity style={styles.FormControl_SettingAccount_Inner} onPress={() => Actions.history_balance({ balance: this.props.user_infor.cashback_balance, balance_type: 'receive_cashback' })}>
                            <Text style={styles.headerInfo_Ac_Sub}>
                                {Lang.tk_cashback().toUpperCase()}
                            </Text>
                            <Text style={styles.headerInfo_Ac_Title}>
                                {Utils.number_format(this.props.user_infor.cashback_balance, 0, '.', '.')} đ
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

module.exports = AppotaView;
