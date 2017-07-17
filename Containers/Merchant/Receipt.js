import React, { Component } from 'react';
import {
    View,
    Text,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    BackAndroid,
    ScrollView
} from "react-native";
import { Actions, Modal } from "react-native-router-flux";
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import renderIf from '../Common/renderIf'
import KeyboardSpacer from 'react-native-keyboard-spacer';

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var {
    height: deviceHeight
} = Dimensions.get("window");

var access_token = '';
var Popup = React.createClass({

    getInitialState() {
        return {
            isLoading: false,
            offset: new Animated.Value(-deviceHeight),
            starCount: 3.5,
        };
    },

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start();
        AsyncStorage.getItem("access_token").then((value) => {
            access_token = value;
        }).done();
    },

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);
    },

    handleBackAndroid() {
        try {
            this.closeModal();
            return true;
        } catch (err) {
            return false;
        }
    },

    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.pop);
    },

    openPage() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.pop);
        this.props.onPress();
    },

    render() {
        return (
            <Animated.View style={[styles.popupReceipt, { transform: [{ translateY: this.state.offset }] }]}>
                <View style={styles.popupReceiptDialog}>
                    <View style={styles.popupReceiptHeader}>
                        <Text style={styles.popupReceiptHeader_Text}>
                            {Lang.hoa_don2()}
                        </Text>
                        <Text style={styles.popupReceiptHeader_TextSub}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={styles.popupReceiptLine}>
                        <Image source={require('../../element/receipt/line-receipt-blue.png')} style={styles.popupReceiptLine_Img} />
                    </View>
                    <ScrollView style={styles.popupReceiptBody}>
                        <View style={styles.ViewReceipt}>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.so_dien_thoai()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.phone_customer}</Text>
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.so_tien()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.sAmount}đ</Text>
                            </View>
                            {renderIf(this.props.cashback_percent)(
                                <View style={styles.ViewReceipt_Item}>
                                    <Text style={styles.ViewReceipt_Title}>Cashback</Text>
                                    <Text style={styles.ViewReceipt_Info}>{this.props.cashback_percent}%</Text>
                                </View>
                            )}
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.thoi_gian()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{moment().format('HH:mm DD/MM/YYYY')}</Text>
                            </View>
                            <View style={{ paddingTop: 7, paddingBottom: 10 }}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.noi_dung()}: {this.props.message}</Text>
                            </View>
                            <View style={styles.ViewReceipt_LineDot}>
                                <Image source={require('../../element/receipt/line-receipt-dot.png')} style={styles.ViewReceipt_LineDot_Img} />
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_TitleBottom}>{Lang.tong_tien().toUpperCase()}</Text>
                                <Text style={styles.ViewReceipt_InfoBottom}>{this.props.sAmount}đ</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.ViewReceipt_LineDotBottom}>
                        <Image source={require('../../element/receipt/line-receipt-dot-bottom.png')} style={styles.ViewReceipt_LineDotBottom_Img} />
                    </View>
                    <View style={styles.popupReceiptFooter}>
                        <TouchableOpacity style={styles.popupReceiptFooter_TouchLeft} onPress={() => this.closeModal()}>
                            <Text style={styles.popupReceiptFooter_TextLeft} >
                                {Lang.button_huy()}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.ViewReceipt_LineDot_Vertical}>
                            <Image source={require('../../element/receipt/line-receipt-dot-vertical.png')} style={styles.ViewReceipt_LineDot_VerticalImg} />
                        </View>
                        <TouchableOpacity style={styles.popupReceiptFooter_TouchRight} onPress={() => this.openPage()} >
                            <Text style={styles.popupReceiptFooter_TextRight} >
                                {Lang.button_ok()}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Animated.View>
        );
    }
});

module.exports = Popup;