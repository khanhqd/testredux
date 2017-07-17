/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView,
    Keyboard,
    Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux'

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');

class AppotaView extends Component {
    renderRow(rowData, sectionID, rowID) {
        var icon;
        if (rowData.id == '')
            icon = rowData.icon;
        else
            icon = { uri: rowData.icon };
        return (
            <TouchableOpacity onPress={this.props.onPressRowCate.bind(this, rowID)} style={styles.ViewExploreCategory_Touch}>
                <View style={{ height: 56, width: 68, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={icon} style={styles.ViewExploreCategory_Img} />
                    <Text style={styles.ViewExploreCategory_Text} numberOfLines={1}>
                        {rowData.name}
                    </Text>
                </View>
                <View style={{ width: 68, height: 2, marginBottom: 1, backgroundColor: rowData.select_line }} />
            </TouchableOpacity>
        );
    }

    render() {
        if (typeof (this.props.dataSource) == 'undefined') return null;
        return (
            <View style={styles.ViewExploreCategory}>
                <ListView
                    showsHorizontalScrollIndicator={false}
                    style={{ flex: 1 }}
                    horizontal={true}
                    enableEmptySections={true}
                    contentContainerStyle={{ flexDirection: 'row' }}
                    dataSource={this.props.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        );
    }
}

module.exports = AppotaView;
