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
import { Actions, Modal } from "react-native-router-flux"
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

class Cashin_Receipt extends Component {
    state = {
        offset: new Animated.Value(-deviceHeight),
        starCount: 3.5,
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_cashin_receipt');
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start()
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
        GoogleAnalytics.trackEvent('ga_cashin', `Via ${this.props.method}`);
        appsFlyer.trackEvent(`af_cashin_${this.props.method}`, {}, () => { }, () => { });
        AppEventsLogger.logEvent(`fb_cashin_${this.props.method}`, 1);

        if (this.props.method == 'bank_add') {
            this.CashinByBankAcc();
        }
        else if (this.props.method == 'ac') {
            this.CashinByCard();
        }
        else {
            this.CashinByBank();
        }
    }

    CashinByBank() {
        let { access_token } = this.props
        RequestHelper.CashinBank(access_token, this.props.bank_code, this.props.amount)
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
                            title: Lang.nap_vi2(),
                            method: 'cashin'
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

    CashinByBankAcc() {
        var accId = {
            account_id: this.props.account_id
        }
        let { access_token } = this.props
        RequestHelper.CashinBankAcc(access_token, this.props.bank_code, this.props.amount, 'mapped_account', JSON.stringify(accId))
            .then((data) => {
                Animated.timing(this.state.offset, {
                    duration: 150,
                    toValue: -deviceHeight
                }).start(Actions.pop);
                setTimeout(() => {
                    if (data.status == 200) {
                        var pay = JSON.parse(data._bodyText);
                        if (pay.success) {
                            Actions.cashin_bank_otp({ transaction_id: pay.transaction_id });
                        }
                        else {
                            Actions.popup({
                                title: Lang.thong_bao(),
                                content: Lang.giao_dich_that_bai(),
                                flag: 'error'
                            })
                        }
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

    CashinByCard() {
        var accId = {
            account_id: this.props.account_id
        }
        let { access_token } = this.props
        RequestHelper.CashinByCard(access_token, this.props.code, this.props.serial, this.props.card_vendor)
            .then((data) => {
                Animated.timing(this.state.offset, {
                    duration: 150,
                    toValue: -deviceHeight
                }).start(Actions.pop);
                setTimeout(() => {
                    if (data.status == 200) {
                        var trans = JSON.parse(data._bodyText);
                        if (trans.success) {
                            Actions.cashin_success({
                                title: Lang.thong_bao(),
                                value: Utils.toDotString(trans.amount),
                                net_wage: Utils.toDotString(trans.earning_amount),
                                fee: Utils.toDotString(trans.fee),
                                card_vendor: this.props.card_vendor
                            });
                        }
                        else {
                            Actions.popup({
                                title: Lang.thong_bao(),
                                content: trans.message,
                                flag: 'error'
                            });
                        }
                    }
                    else {
                        Utils.onRequestEnd(data);
                    }
                }, 200);
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
            method = 'qua thẻ tín dụng';
        else if (this.props.method == 'bank')
            method = Lang.qua_ngan_hang();

        return (

            <Animated.View style={[styles.popupReceipt, { transform: [{ translateY: this.state.offset }] }]}>
                <View style={styles.popupReceiptDialog}>
                    <View style={styles.popupReceiptHeader}>
                        <Text style={styles.popupReceiptHeader_Text}>
                            {Lang.xac_nhan_giao_dich()}
                        </Text>
                        <Text style={styles.popupReceiptHeader_TextSub}>
                            {Lang.nap_vi2()}
                        </Text>
                    </View>
                    <View style={styles.popupReceiptLine}>
                        <Image source={require('../../element/receipt/line-receipt-blue.png')} style={styles.popupReceiptLine_Img} />
                    </View>
                    {renderIf(this.props.method != 'ac')(
                        <ScrollView style={styles.popupReceiptBody}>
                            <View style={styles.ViewReceipt}>
                                <View style={styles.ViewReceipt_Item}>
                                    <Text style={styles.ViewReceipt_Title}>{Lang.nguon_tien()}</Text>
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
                                    <Text style={styles.ViewReceipt_InfoBottom}>{this.props.total}đ</Text>
                                </View>
                            </View>
                        </ScrollView>
                    )}
                    {renderIf(this.props.method == 'ac')(
                        <ScrollView style={styles.popupReceiptBody}>
                            <View style={styles.ViewReceipt}>
                                <View style={styles.ViewReceipt_Item}>
                                    <Text style={styles.ViewReceipt_Title}>{Lang.nguon_tien()}</Text>
                                    <Text style={styles.ViewReceipt_Info}>{this.props.bank_name}</Text>
                                </View>
                                <View style={styles.ViewReceipt_Item}>
                                    <Text style={styles.ViewReceipt_Title}>Serial</Text>
                                    <Text style={styles.ViewReceipt_Info}>{this.props.serial}</Text>
                                </View>
                                <View style={styles.ViewReceipt_Item}>
                                    <Text style={styles.ViewReceipt_Title}>{Lang.ma_the()}</Text>
                                    <Text style={styles.ViewReceipt_Info}>{this.props.code}</Text>
                                </View>
                                <View style={styles.ViewReceipt_LineDot}>
                                    <Image source={require('../../element/receipt/line-receipt-dot.png')} style={styles.ViewReceipt_LineDot_Img} />
                                </View>
                                <View style={styles.ViewReceipt_Item}>
                                    <Text style={styles.ViewReceipt_TitleBottom}>{Lang.phi().toUpperCase()}</Text>
                                    <Text style={styles.ViewReceipt_InfoBottom}>{this.props.transaction_fee}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    )}
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
})

export default connect(mapStateToProps)(Cashin_Receipt)