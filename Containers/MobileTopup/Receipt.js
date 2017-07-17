import React, { Component } from 'react';
import {
    View,
    Text,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    BackAndroid,
    ScrollView
} from "react-native";
import { Actions, Modal } from "react-native-router-flux"
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import appsFlyer from 'react-native-appsflyer';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import { AppEventsLogger } from 'react-native-fbsdk';

var styles = require('../Common/style.js');
import renderIf from '../Common/renderIf'
var RequestHelper = require('../Common/RequestHelper');
var Utils = require('../Common/Utils');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var {
    height: deviceHeight
} = Dimensions.get("window");

class MobileTopup_Receipt extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    
    state = {
        isLoading: false,
        offset: new Animated.Value(-deviceHeight),
        starCount: 3.5,
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
        GoogleAnalytics.trackScreenView('ga_mobile_topup_receipt');
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
        this.setState({ isLoading: true });
        GoogleAnalytics.trackEvent('ga_mobile_topup', `Via ${this.props.method}`);
        appsFlyer.trackEvent(`af_mobile_${this.props.method}`, {}, () => { }, () => { });
        AppEventsLogger.logEvent(`fb_mobile_${this.props.method}`, 1);

        if (this.props.method == 'topup_cc' || this.props.method == 'topup_bank') {
            this.TopupByBank();
        }
        else if (this.props.method == 'topup_wallet') {
            this.TopupByEwallet();
        }
    }

    TopupByBank() {
        let { access_token, user_infor } = this.props
        RequestHelper.TopupBank(access_token, this.props.bank_code, this.props.amount, this.props.contact_number)
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
                            title: Lang.nap_dienthoai2(),
                            method: 'topup'
                        })
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

    TopupByEwallet() {
        let { access_token, user_infor } = this.props
        RequestHelper.TopupEwallet(access_token, this.props.amount, this.props.contact_number)
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
                            Actions.mobile_topup_otp({ transaction_id: trans.transaction_id, contact_number: this.props.contact_number });
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
        var method = '';
        if (this.props.method == 'cc')
            method = Lang.qua_ngan_hang();
        else if (this.props.method == 'bank')
            method = Lang.qua_ngan_hang();
        else if (this.props.method == 'topup_cc' || this.props.method == 'topup_bank' || this.props.method == 'topup_wallet')
            method = Lang.dien;
        else if (this.props.method == 'wallet')
            method = Lang.qua_tk_vi()

        return (
            <Animated.View style={[styles.popupReceipt, { transform: [{ translateY: this.state.offset }] }]}>
                <View style={styles.popupReceiptDialog}>
                    <View style={styles.popupReceiptHeader}>
                        <Text style={styles.popupReceiptHeader_Text}>
                            {Lang.xac_nhan_giao_dich()}
                        </Text>
                        <Text style={styles.popupReceiptHeader_TextSub}>
                            {Lang.nap_dienthoai2()}
                        </Text>
                    </View>
                    <View style={styles.popupReceiptLine}>
                        <Image source={require('../../element/receipt/line-receipt-blue.png')} style={styles.popupReceiptLine_Img} />
                    </View>
                    <ScrollView style={styles.popupReceiptBody}>
                        <View style={styles.ViewReceipt}>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.nguon_tien()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.bank_name}</Text>
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.so_tien()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.sAmount} đ</Text>
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.phi()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.transaction_fee}</Text>
                            </View>
                            {renderIf(this.props.method == 'topup_cc' || this.props.method == 'topup_bank' || this.props.method == 'topup_wallet')(
                                <View style={styles.ViewReceipt_Item}>
                                    <Text style={styles.ViewReceipt_Title}>Cashback</Text>
                                    <Text style={styles.ViewReceipt_Info}>{this.props.cashback_percent}%</Text>
                                </View>
                            )}
                            <View style={styles.ViewReceipt_LineDot}>
                                <Image source={require('../../element/receipt/line-receipt-dot.png')} style={styles.ViewReceipt_LineDot_Img} />
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_TitleBottom}>{Lang.tong_tien().toUpperCase()}</Text>
                                <Text style={styles.ViewReceipt_InfoBottom}>{this.props.total} đ</Text>
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

export default connect(mapStateToProps)(MobileTopup_Receipt)