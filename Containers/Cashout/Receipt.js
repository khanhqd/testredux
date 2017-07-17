import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    BackAndroid,
    ScrollView,
} from "react-native";
import { Actions, Modal } from "react-native-router-flux"
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import StarRating from 'react-native-star-rating';
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf'
import Toast from '@remobile/react-native-toast';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var styles = require('../Common/style.js');
var RequestHelper = require('../Common/RequestHelper');
var Utils = require('../Common/Utils');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');

var {
    height: deviceHeight
} = Dimensions.get("window");

class Cashout_Receipt extends Component {
    state = {
        isLoading: false,
        offset: new Animated.Value(-deviceHeight),
        starCount: 3.5,
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
        GoogleAnalytics.trackScreenView('ga_cashout_receipt');
        AppEventsLogger.logEvent('fb_cashout_receipt', 1);
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start();
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);
        TimerMixin.clearTimeout(this.timer);
    }

    handleBackAndroid() {
        try {
            this.closeModal();
            return true;
        } catch (err) {
            return false;
        }
    }

    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.pop);
    }

    openPage() {
        appsFlyer.trackEvent('af_cashout', {}, () => { }, () => { });
        this.CashoutBank();
    }

    CashoutBank() {
        this.setState({ isLoading: true });
        var account_info = {
            bank_account_number: this.props.bank_account_number,
            bank_holder_name: this.props.bank_holder_name,
            bank_branch: this.props.bank_branch,
            method: this.props.method,
        }
        let { access_token, user_infor } = this.props
        RequestHelper.CashoutBank(access_token, this.props.amount, this.props.bank_code, 'bank_account', JSON.stringify(account_info))
            .then((data) => {
                Animated.timing(this.state.offset, {
                    duration: 150,
                    toValue: -deviceHeight
                }).start(Actions.pop);
                setTimeout(() => {
                    if (data.status == 200) {
                        var trans = JSON.parse(data._bodyText)
                        if (user_infor.pay_verify_method == 'NONE')
                            Actions.protected({ transaction_id: trans.transaction_id })
                        else
                            Actions.cashout_otp({ transaction_id: trans.transaction_id })
                    }
                    else {
                        if (data.status == 401) access_token = '';
                        Utils.onRequestEnd(data);
                    }
                }, 500);
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    render() {
        return (
            <Animated.View style={[styles.popupReceipt, { transform: [{ translateY: this.state.offset }] }]}>
                <View style={styles.popupReceiptDialog}>
                    <View style={styles.popupReceiptHeader}>
                        <Text style={styles.popupReceiptHeader_Text}>
                            {Lang.xac_nhan_giao_dich()}
                        </Text>
                        <Text style={styles.popupReceiptHeader_TextSub}>
                            {Lang.rut_tien()}
                        </Text>
                    </View>
                    <View style={styles.popupReceiptLine}>
                        <Image source={require('../../element/receipt/line-receipt-blue.png')} style={styles.popupReceiptLine_Img} />
                    </View>
                    <ScrollView style={styles.popupReceiptBody}>
                        <View style={styles.ViewReceipt}>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.ngan_hang()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.bank_name}</Text>
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.so_tien()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.sAmount}đ</Text>
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.phi()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.transaction_fee}</Text>
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.so_du()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.balance}đ</Text>
                            </View>
                            <View style={styles.ViewReceipt_LineDot}>
                                <Image source={require('../../element/receipt/line-receipt-dot.png')} style={styles.ViewReceipt_LineDot_Img} />
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_TitleBottom}>{Lang.tong_tien().toUpperCase()}</Text>
                                <Text style={styles.ViewReceipt_InfoBottom}>{this.props.total}đ</Text>
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
                {renderIf(this.state.isLoading)(
                    <Loading />
                )}
            </Animated.View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
})

export default connect(mapStateToProps)(Cashout_Receipt)