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
var Lang = require('../Common/Lang');

class Temp extends Component {
    
    render() {
        var data = this.props
        return (
            <View style={styles.ViewGames_Group}>
                <View style={styles.ViewGames_Touch} >
                    <View style={styles.ViewGames_Touch_Thumb}>
                        <Image source={{ uri: !data.avatar ? 'https://appotapay.com/uploads/thumbs/092016/512.png' : data.avatar }} style={styles.ViewGames_Touch_ThumbImg} />
                    </View>
                    <View style={styles.ViewGames_Touch_Info}>
                        <Text style={styles.ViewGames_Touch_InfoTitle} numberOfLines={2}>
                            {data.name}
                        </Text>
                        <Text style={styles.ViewGames_Touch_InfoSub} numberOfLines={2}>
                            {data.game_name}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={this.props.onBuyGC.bind(this)} style={styles.ViewGames_Touch_Price}>
                        <Text style={styles.ViewGames_Touch_Price_Txt}>{data.price} Spin</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ViewGames_Touch_Desc}>
                    <Text style={styles.ViewGames_Touch_DescInfo} numberOfLines={5}>
                        {data.description ? data.description.trim() : ''}
                    </Text>
                </View>
                <View style={styles.ViewGames_LineFull}></View>
            </View>
        );
    }
}

module.exports = Temp;
