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
import BaseComponent from '../BaseClass/BaseComponent';
import renderIf from '../Common/renderIf'
var styles = require('../Common/style.js');

class Temp extends React.Component {
    render() {
        var rowData = this.props;
        var cate_icon = require('../../element/explore/ic-All.png');
        if (rowData.category_name.trim() == 'Ẩm thực') {
            cate_icon = require('../../element/explore/ic-AmThuc.png');
        }
        else if (rowData.category_name.trim() == 'Siêu thị') {
            cate_icon = require('../../element/explore/ic-SieuThi.png');
        }
        else if (rowData.category_name.trim() == 'Thời trang') {
            cate_icon = require('../../element/explore/ic-MuaSam.png');
        }
        else if (rowData.category_name.trim() == 'Giáo dục') {
            cate_icon = require('../../element/explore/ic-GiaoDuc.png');
        }
        else if (rowData.category_name.trim() == 'Chăm sóc sức khỏe') {
            cate_icon = require('../../element/explore/ic-YTe.png');
        }
        else if (rowData.category_name.trim() == 'Du lịch') {
            cate_icon = require('../../element/explore/ic-DuLich.png');
        }
        else if (rowData.category_name.trim() == 'Mỹ phẩm') {
            cate_icon = require('../../element/explore/ic-MyPham.png');
        }
        else if (rowData.category_name.trim() == 'Nội thất') {
            cate_icon = require('../../element/explore/ic-NoiThat.png');
        }
        else if (rowData.category_name.trim() == 'Cưới hỏi') {
            cate_icon = require('../../element/explore/ic-Wedding.png');
        }
        return (
            <TouchableOpacity onPress={this.props.onPressRow.bind(this)}>
                <View style={styles.ListCheckin_Item}>
                    <View style={styles.ListCheckin_Avatar}>
                        <Image style={styles.ListCheckin_AvatarImg} source={cate_icon} />
                    </View>
                    <View style={styles.ListCheckin_Info}>
                        <Text style={styles.ListCheckin_InfoName}>
                            {rowData.name}
                        </Text>
                        <View style={styles.ListCheckin_InfoAddress}>
                            <Text style={styles.ListCheckin_InfoAddress_Text} numberOfLines={1}>
                                {rowData.address}
                            </Text>
                            {renderIf(this.props.location.lat != 0 && this.props.location.lon != 0)(
                                <Text style={styles.ListCheckin_InfoAddress_Location} numberOfLines={1}>
                                    {rowData.distance}
                                </Text>
                            )}
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
}

module.exports = Temp;