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
    ScrollView
} from "react-native";
var {
    height: deviceHeight
} = Dimensions.get("window");
import { Actions, Modal } from "react-native-router-flux";
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import StarRating from 'react-native-star-rating';
import Toast from '@remobile/react-native-toast';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var styles = require('../Common/style.js');
import renderIf from '../Common/renderIf'
var RequestHelper = require('../Common/RequestHelper');
var Utils = require('../Common/Utils');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');

class BuyCard_Receipt extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: false,
            offset: new Animated.Value(-deviceHeight),
            starCount: 3.5,
        }
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
        GoogleAnalytics.trackScreenView('ga_buy_card_receipt');
        appsFlyer.trackEvent('af_buy_card_receipt', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_buy_card_receipt', 1);

        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start();
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);
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
        this.setState({ isLoading: true })
        if (this.props.cards.method == 'wallet') {
            GoogleAnalytics.trackEvent('ga_buy_card', 'Via wallet');
            appsFlyer.trackEvent('af_buy_card_wallet', {}, () => { }, () => { });
            this.RequestByCardEwallet()
        }
        else if (this.props.cards.method == 'cc' || this.props.cards.method == 'bank') {
            GoogleAnalytics.trackEvent('ga_buy_card', 'Via ' + this.props.cards.method);
            appsFlyer.trackEvent(`af_buy_card_${this.props.cards.method}`, {}, () => { }, () => { });
            this.BuyCardByBanking()
        }
    }

    BuyCardByBanking() {
        var order_info = [];
        order_info.push({
            vendor: this.props.cards.vendor,
            value: this.props.cards.value,
            quantity: this.props.cards.quantity
        });
        let { dispatch, access_token } = this.props
        RequestHelper.BuyCardByBanking(access_token, JSON.stringify(order_info), this.props.cards.bank_code)
            .then((data) => {
                Animated.timing(this.state.offset, {
                    duration: 150,
                    toValue: -deviceHeight
                }).start(Actions.pop);
                setTimeout(() => {
                    if (data.status == 200) {
                        var pay = JSON.parse(data._bodyText);
                        Actions.webview_trans({
                            url: pay.payment_url,
                            title: Lang.mua_the2(),
                            method: 'buy_card'
                        })
                    }
                    else if (data.status == 401) {
                        Toast.showToast(Lang.token_het_han(), "short", "center");
                        Actions.login();
                    }
                    else {
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

    RequestByCardEwallet() {
        var order_info = [];
        order_info.push({
            vendor: this.props.cards.vendor,
            value: this.props.cards.value,
            quantity: this.props.cards.quantity
        });
        let { dispatch, access_token, user_infor } = this.props
        RequestHelper.RequestByCardEwallet(access_token, JSON.stringify(order_info))
            .then((data) => {
                Animated.timing(this.state.offset, {
                    duration: 150,
                    toValue: -deviceHeight
                }).start(Actions.pop);
                setTimeout(() => {
                    if (data.status == 200) {
                        var trans = JSON.parse(data._bodyText)
                        if (user_infor.pay_verify_method == 'NONE')
                            Actions.protected({ transaction_id: trans.transaction_id, transaction_type: 'buy_card' })
                        else
                            Actions.buy_cards_otp({ transaction_id: trans.transaction_id })
                    }
                    else if (data.status == 401) {
                        Toast.showToast(Lang.token_het_han(), "short", "center");
                        dispatch(taskActionCreators.change_token(''))
                        AsyncStorage.removeItem("access_token");
                        Actions.login()
                    }
                    else {
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

    SumTransactionFee(amount, transaction_fee, transaction_percent_fee) {
        return (amount * transaction_percent_fee / 100 + transaction_fee);
    }

    render() {
        var fee = this.SumTransactionFee(this.props.cards.value, parseInt(this.props.cards.transaction_fee), parseInt(this.props.cards.transaction_percent_fee)) * this.props.cards.quantity;
        var transaction_fee = fee == 0 ? Lang.mien_phi() : Utils.number_format(fee, '.', '.') + ' đ';
        var total = Utils.number_format(parseInt(fee) + (parseInt(this.props.cards.value) * this.props.cards.quantity), '.', '.');
        return (

            <Animated.View style={[styles.popupReceipt, { transform: [{ translateY: this.state.offset }] }]}>
                <View style={styles.popupReceiptDialog}>
                    <View style={styles.popupReceiptHeader}>
                        <Text style={styles.popupReceiptHeader_Text}>
                            {Lang.xac_nhan_giao_dich()}
                        </Text>
                        <Text style={styles.popupReceiptHeader_TextSub}>
                            {Lang.mua_the2()}
                        </Text>
                    </View>
                    <View style={styles.popupReceiptLine}>
                        <Image source={require('../../element/receipt/line-receipt-blue.png')} style={styles.popupReceiptLine_Img} />
                    </View>
                    <ScrollView style={styles.popupReceiptBody}>
                        <View style={styles.ViewReceipt}>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.loai_the()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.cards.name}</Text>
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.menh_gia()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{Utils.number_format(this.props.cards.value, '.', '.')}đ</Text>
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.so_luong()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.cards.quantity}</Text>
                            </View>
                            <View style={styles.ViewReceipt_LineDot}>
                                <Image source={require('../../element/receipt/line-receipt-dot.png')} style={styles.ViewReceipt_LineDot_Img} />
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.nguon_tien()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.cards.bank_name}</Text>
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.so_tien()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{Utils.number_format(this.props.cards.price * this.props.cards.quantity, '.', '.')}đ</Text>
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.phi()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{transaction_fee}</Text>
                            </View>
                            {renderIf(this.props.cards.cashback_percent > 0)(
                                <View style={styles.ViewReceipt_Item}>
                                    <Text style={styles.ViewReceipt_Title}>Cashback</Text>
                                    <Text style={styles.ViewReceipt_Info}>{this.props.cards.cashback_percent}%</Text>
                                </View>
                            )}
                            <View style={styles.ViewReceipt_LineDot}>
                                <Image source={require('../../element/receipt/line-receipt-dot.png')} style={styles.ViewReceipt_LineDot_Img} />
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_TitleBottom}>{Lang.tong_tien().toUpperCase()}</Text>
                                <Text style={styles.ViewReceipt_InfoBottom}>{total}đ</Text>
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

export default connect(mapStateToProps)(BuyCard_Receipt)