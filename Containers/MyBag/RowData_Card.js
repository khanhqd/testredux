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
var Utils = require('../Common/Utils');
var Lang = require('../Common/Lang');

class Temp extends Component {
    renderIcon(vendor) {
        switch (vendor) {
            case 'appota':
                return require('../../element/logo-cards/card-appotacard.png')
            case 'mobifone':
                return require('../../element/logo-cards/card-mobifone.png')
            case 'viettel':
                return require('../../element/logo-cards/card-viettel.png')
            case 'vinaphone':
                return require('../../element/logo-cards/card-vinaphone.png')
            default:
                return require('../../element/logo-cards/card-appotacard.png')
        }
    }

    render() {
        var data = this.props.data;
        return (
            <TouchableOpacity style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]} onPress={this.props.onPress.bind(this)}>
                <View style={styles.FormControl_TouchRowSelect}>
                    <View style={styles.FormControl_TouchRowCard}>
                        <Image source={this.renderIcon(data.vendor)} style={styles.FormControl_TouchRowCardImg} />
                    </View>
                    <View style={styles.FormControl_TouchInfo}>
                        <Text style={styles.FormControl_TouchTitleBank} numberOfLines={1}>{Utils.vendor2Name(data.vendor)}</Text>
                        <Text style={styles.FormControl_TouchTitleNumber} numberOfLines={1}>Serial: {data.serial.trim()}</Text>
                        <Text style={styles.FormControl_TouchTitleNumber} numberOfLines={1}>{Lang.ma_the()}: {data.code.trim()}</Text>
                    </View>
                    <View style={styles.FormControl_TouchRowPrice}>
                        <Text style={styles.FormControl_TouchRowPrice_Txt} numberOfLines={1}>{Utils.number_format(parseInt(data.value), 0, '.', '.')}đ</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

module.exports = Temp;
