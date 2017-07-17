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

class RowData_Giftcode extends Component {

    render() {
        var data = this.props.data
        return (
            <TouchableOpacity style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]} onPress={this.props.onPress}>
                <View style={styles.FormControl_TouchRowSelect}>
                    <View style={styles.FormControl_TouchRowCard}>
                        <Image source={{ uri: data.icon }} style={styles.FormControl_TouchRowCardImg} />
                    </View>
                    <View style={styles.FormControl_TouchInfo}>
                        <Text style={styles.FormControl_TouchTitleBank} numberOfLines={1}>{data.name}</Text>
                        <Text style={styles.FormControl_TouchTitleNumber} numberOfLines={1}>Game: {data.game_name}</Text>
                        <Text style={styles.FormControl_TouchTitleNumber} numberOfLines={1}>Giftcode: {data.code}</Text>
                        {/*<Text style={styles.FormControl_TouchTitleNumber} numberOfLines={1}>{Lang.han_dung()}: {this.props.timestamp}</Text>*/}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

module.exports = RowData_Giftcode
