import React, { Component } from 'react';
import {PropTypes} from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Navigator,
    Platform
} from "react-native";
import {Actions} from "react-native-router-flux";
import ProgressImage from 'react-native-progress/CircleSnail';
/*CSS*/
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build();
var styles = require('../Common/style.js');
/*End CSS*/
import renderIf from '../Common/renderIf'
var Lang = require('../Common/Lang')
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

const propTypes = {
    name: PropTypes.string,
    sceneStyle: View.propTypes.style,
    title: PropTypes.string,
};

const popToRoot = () => {
    Actions.pop();
}

class Betting_Type extends React.Component {
    render() {
        return (
            <View style={styles.FormControl_Group}>
                <View style={styles.FormControl_TitleBorder}>
                    <Text  style={styles.FormControl_TitleText}>
                        CHỌN PHÒNG
                    </Text>
                </View>
                <View style={styles.FormControl_ContentNoBorder}>
                    <View style={styles.FormControl_Row}>
                        <View  style={styles.FormControl_RowGroup}>
                            <TouchableOpacity style={styles.FormControl_RowTouch} onPress={() => Actions.tabHome_RutTien_TaiKhoan() }>
                                <View style={styles.FormControl_RowTouch_Thumb}>
                                    <Image source={require('../../element/RutTien/rt-atm.png') } style={styles.FormControl_RowTouch_ThumbImg}/>
                                </View>
                                <View style={styles.FormControl_RowTouch_Info}>
                                    <Text style={styles.FormControl_RowTouch_InfoTitle} numberOfLines={1}>
                                        Vainglory
                                    </Text>
                                    <Text style={styles.FormControl_RowTouch_InfoSub} numberOfLines={2}>
                                        Mức cược: 200.000 đ - 4/6 thành viên
                                    </Text>
                                </View>
                                <View style={styles.FormControl_RowTouch_Point}>
                                    <Image source={require('../../element/RutTien/ic-point.png') } style={styles.FormControl_RowTouch_PointImg}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View  style={styles.FormControl_RowGroup}>
                            <TouchableOpacity style={styles.FormControl_RowTouch} onPress={() => Actions.tabHome_RutTien_TaiKhoan() }>
                                <View style={styles.FormControl_RowTouch_Thumb}>
                                    <Image source={require('../../element/RutTien/rt-cc.png') } style={styles.FormControl_RowTouch_ThumbImg}/>
                                </View>
                                <View style={styles.FormControl_RowTouch_Info}>
                                    <Text style={styles.FormControl_RowTouch_InfoTitle} numberOfLines={1}>
                                       Đế chế T3
                                    </Text>
                                    <Text style={styles.FormControl_RowTouch_InfoSub} numberOfLines={2}>
                                        Mức cược: 50.000 đ - 6/8 thành viên
                                    </Text>
                                </View>
                                <View style={styles.FormControl_RowTouch_Point}>
                                    <Image source={require('../../element/RutTien/ic-point.png') } style={styles.FormControl_RowTouch_PointImg}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View  style={styles.FormControl_RowGroup}>
                            <TouchableOpacity style={styles.FormControl_RowTouch} onPress={() => Actions.tabHome_RutTien_TaiKhoan() }>
                                <View style={styles.FormControl_RowTouch_Thumb}>
                                    <Image source={require('../../element/RutTien/rt-bank.png') } style={styles.FormControl_RowTouch_ThumbImg}/>
                                </View>
                                <View style={styles.FormControl_RowTouch_Info}>
                                    <Text style={styles.FormControl_RowTouch_InfoTitle} numberOfLines={1}>
                                        half life
                                    </Text>
                                    <Text style={styles.FormControl_RowTouch_InfoSub} numberOfLines={2}>
                                        Mức cược: 100.000 đ - 8/8 thành viên
                                    </Text>
                                </View>
                                <View style={styles.FormControl_RowTouch_Point}>
                                    <Image source={require('../../element/RutTien/ic-point.png') } style={styles.FormControl_RowTouch_PointImg}/>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        );
    }
}


class Betting_Room extends React.Component {
    render() {
        return (
            <View {...this.props}  style={[styles.container, styles.tabWhite]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png') } style={styles.headerNav_Img}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.ca_cuoc()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView
                        keyboardShouldPersistTaps='always'
                    >
                        <Betting_Type/>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

module.exports = Betting_Room;
