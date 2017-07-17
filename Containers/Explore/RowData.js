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
import BaseComponent from '../BaseClass/BaseComponent';
var Utils = require('../Common/Utils')

class Temp extends BaseComponent {
    render() {
        var rowData = this.props.data
        var sDistance = '';
        if (rowData.distance > 1)
            sDistance = Utils.toFixed(rowData.distance, 2) + ' km';
        else
            sDistance = Utils.toFixed(rowData.distance * 1000, 0) + ' m';
        var render_distance = null
        if (this.props.location.lat != 0 && this.props.location.lon != 0 )
            render_distance = (<Text style={styles.ViewExplore_InfoAddress_Location} numberOfLines={1}>
                {sDistance}
            </Text>)

        var star1 = require('../../element/explore/star-full.png');
        var star2 = require('../../element/explore/star-full.png');
        var star3 = require('../../element/explore/star-full.png');
        var star4 = require('../../element/explore/star-full.png');
        var star5 = require('../../element/explore/star-full.png');
        var tb = parseInt(rowData.sum_rate / rowData.total_rate);
        switch (tb) {
            case 0:
                star1 = require('../../element/explore/star-line.png');
                star2 = require('../../element/explore/star-line.png');
                star3 = require('../../element/explore/star-line.png');
                star4 = require('../../element/explore/star-line.png');
                star5 = require('../../element/explore/star-line.png');
                break;
            case 1:
                if (rowData.sum_rate % rowData.total_rate > rowData.total_rate / 2)
                    star2 = require('../../element/explore/star-full.png');
                else
                    star2 = require('../../element/explore/star-line.png');
                star3 = require('../../element/explore/star-line.png');
                star4 = require('../../element/explore/star-line.png');
                star5 = require('../../element/explore/star-line.png');
                break;
            case 2:
                if (rowData.sum_rate % rowData.total_rate > rowData.total_rate / 2)
                    star3 = require('../../element/explore/star-full.png');
                else
                    star3 = require('../../element/explore/star-line.png');
                star4 = require('../../element/explore/star-line.png');
                star5 = require('../../element/explore/star-line.png');
                break;
            case 3:
                if (rowData.sum_rate % rowData.total_rate > rowData.total_rate / 2)
                    star4 = require('../../element/explore/star-full.png');
                else
                    star4 = require('../../element/explore/star-line.png');
                star5 = require('../../element/explore/star-line.png');
                break;
            case 4:
                if (rowData.sum_rate % rowData.total_rate > rowData.total_rate / 2)
                    star5 = require('../../element/explore/star-line.png');
                else
                    star5 = require('../../element/explore/star-line.png');
                break;
        }

        return (
            <TouchableOpacity style={styles.ViewExplore_Row} onPress={this.props.onPress.bind(this)}>
                <View style={styles.ViewExplore_Cover}>
                    <Image source={rowData.avatar} style={styles.ViewExplore_CoverImg} />
                </View>
                <View style={styles.ViewExplore_Info}>
                    <View style={styles.ViewExplore_InfoSale}>
                        <Text style={styles.ViewExplore_InfoSaleText}>
                            {rowData.cashback_percent}
                            <Text style={styles.ViewExplore_InfoSaleTextSub}>
                                %
                            </Text>
                        </Text>
                    </View>
                    <Text style={styles.ViewExplore_InfoTitle} numberOfLines={2}>
                        {rowData.name}
                    </Text>
                    <Text style={styles.ViewExplore_InfoCategory} numberOfLines={1}>
                        {rowData.category_name}
                    </Text>
                    <View style={styles.ViewExplore_InfoAddress}>
                        <Text style={styles.ViewExplore_InfoAddress_Text} numberOfLines={1}>
                            {rowData.address}
                        </Text>
                        {render_distance}
                    </View>
                    <View style={styles.ViewExplore_InfoRate}>
                        <Image source={star1} style={styles.ViewExplore_InfoRate_Img} />
                        <Image source={star2} style={styles.ViewExplore_InfoRate_Img} />
                        <Image source={star3} style={styles.ViewExplore_InfoRate_Img} />
                        <Image source={star4} style={styles.ViewExplore_InfoRate_Img} />
                        <Image source={star5} style={styles.ViewExplore_InfoRate_Img} />
                        <Text style={styles.ViewExplore_InfoRate_Text} numberOfLines={1}>
                            {rowData.total_rate} reviews
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

module.exports = Temp;
