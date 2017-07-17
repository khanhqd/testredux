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
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import * as Requests from '../Helpers/Requests'
import { CASHBACK_PERCENT } from '../Helpers/constString'

var {
    height: deviceHeight
} = Dimensions.get("window");

var styles = require('../Common/style.js');
var RequestHelper = require('../Common/RequestHelper');
var Utils = require('../Common/Utils');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');

class Game_Receipt extends Component {
    constructor(props) {
        super(props);
        this.handleBackAndroid = this.handleBackAndroid.bind(this);
        this.state = {
            isLoading: false,
            offset: new Animated.Value(-deviceHeight),
            starCount: 3.5,
        };
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);
        GoogleAnalytics.trackScreenView('ga_games_topup_receipt');
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start()
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
        this.setState({ isLoading: true })
        GoogleAnalytics.trackEvent('ga_games_topup', `Via ${this.props.games.payment_method}`)
        appsFlyer.trackEvent(`af_games_topup_${this.props.games.payment_method}`, {}, () => { }, () => { });
        AppEventsLogger.logEvent(`fb_games_topup_${this.props.games.payment_method}`, 1);
        if (this.props.games.payment_method == 'wallet') {
            if (this.props.games.packageType == 'special')
                this.BuyGamePackge()
            else
                this.RequestEwalletCharging()
        }
        else if (this.props.games.payment_method == 'cashback') {
            this.RequestCashbackCharging()
        }
        else if (this.props.games.payment_method == 'cc' || this.props.games.payment_method == 'bank') {
            this.RequestChargingBank();
        }
        else if (this.props.games.payment_method == 'card') {
            this.GameChargingCard();
        }
    }

    GameChargingCard() {
        let { access_token, user_infor } = this.props
        RequestHelper.ChargingCard(access_token,
            this.props.games.game_id,
            this.props.games.appota_id,
            this.props.games.role_id,
            this.props.games.role_name,
            this.props.games.server_id,
            this.props.games.server_name,
            this.props.games.packageId,
            this.props.games.packageValue,
            this.props.games.card_code,
            this.props.games.card_serial,
            this.props.games.card_vendor)
            .then((data) => {
                Animated.timing(this.state.offset, {
                    duration: 150,
                    toValue: -deviceHeight
                }).start(Actions.pop);
                setTimeout(() => {
                    if (data.status == 200) {
                        var trans = JSON.parse(data._bodyText);
                        if (trans.success) {
                            Actions.popup({
                                title: Lang.thong_bao(),
                                content: Lang.giao_dich_thanh_cong(),
                            });
                        }
                        else {
                            Actions.popup({
                                title: Lang.thong_bao(),
                                content: trans.error.message,
                            });
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

    RequestChargingBank() {
        let { access_token, user_infor } = this.props
        RequestHelper.ChargingBank(access_token,
            this.props.games.game_id,
            this.props.games.appota_id,
            this.props.games.role_id,
            this.props.games.role_name,
            this.props.games.server_id,
            this.props.games.server_name,
            this.props.games.amount,
            this.props.games.packageId,
            this.props.games.packageValue,
            this.props.games.bank_code)
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
                            title: Lang.nap_game2(),
                            method: 'game_topup'
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

    RequestEwalletCharging() {
        let { access_token, user_infor } = this.props
        RequestHelper.RequestChargingEwallet(access_token,
            this.props.games.game_id,
            this.props.games.appota_id,
            this.props.games.role_id,
            this.props.games.role_name,
            this.props.games.server_id,
            this.props.games.server_name,
            this.props.games.amount,
            this.props.games.packageId,
            this.props.games.packageValue)
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
                            Actions.games_topup_otp({ transaction_id: trans.transaction_id });
                    }
                    else {
                        if (data.status == 401) access_token = '';
                        Utils.onRequestEnd(data);
                    }
                }, 500);
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    RequestCashbackCharging() {
        let { access_token, user_infor } = this.props
        Requests.Game_Cashback_Charging(access_token,
            this.props.games.game_id,
            this.props.games.appota_id,
            this.props.games.role_id,
            this.props.games.role_name,
            this.props.games.server_id,
            this.props.games.server_name,
            this.props.games.amount,
            this.props.games.packageId,
            this.props.games.packageValue)
            .then((data) => {
                this.setState({ isLoading: false })
                Animated.timing(this.state.offset, {
                    duration: 150,
                    toValue: -deviceHeight
                }).start(Actions.pop)
                setTimeout(() => {
                    if (user_infor.pay_verify_method == 'NONE')
                        Actions.protected({ transaction_id: data.transaction_id })
                    else
                        Actions.games_topup_otp({ transaction_id: data.transaction_id })
                }, 310);
            })
            .catch((error) => {
                this.setState({ isLoading: false })
            })
    }

    BuyGamePackge() {
        let { access_token, user_infor } = this.props
        Requests.Buy_Game_Packages(access_token,
            this.props.games.game_id,
            this.props.games.appota_id,
            this.props.games.role_id,
            this.props.games.role_name,
            this.props.games.server_id,
            this.props.games.server_name,
            this.props.games.packageId)
            .then((data) => {
                this.setState({ isLoading: false })
                Animated.timing(this.state.offset, {
                    duration: 150,
                    toValue: -deviceHeight
                }).start(Actions.pop)
                setTimeout(() => {
                    if (user_infor.pay_verify_method == 'NONE')
                        Actions.protected({ transaction_id: data.transaction_id })
                    else
                        Actions.games_topup_otp({ transaction_id: data.transaction_id })
                }, 310);
            })
            .catch((error) => {
                this.setState({ isLoading: false })
            })
    }

    SumTransactionFee(amount, transaction_fee, transaction_percent_fee) {
        return (amount * transaction_percent_fee / 100 + transaction_fee);
    }

    render() {
        var nguon_tien = '';
        if (this.props.games.payment_method == 'wallet')
            nguon_tien = Lang.tk_vi();
        else if (this.props.games.payment_method == 'card')
            nguon_tien = Lang.the_cao();
        else if (this.props.games.payment_method == 'bank')
            nguon_tien = this.props.games.bank_name;
        else if (this.props.games.payment_method == 'cc')
            nguon_tien = Lang.the_tin_dung()
        else if (this.props.games.payment_method == 'cashback')
            nguon_tien = Lang.tk_cashback()

        var fee = this.SumTransactionFee(this.props.games.amount, parseInt(this.props.games.transaction_fee), parseInt(this.props.games.transaction_percent_fee));
        var transaction_fee = fee == 0 ? 'Miễn phí' : Utils.number_format(fee, '.', '.') + ' đ';
        var total = Utils.number_format(parseInt(fee) + parseInt(this.props.games.amount), '.', '.');
        return (
            <Animated.View style={[styles.popupReceipt, { transform: [{ translateY: this.state.offset }] }]}>
                <View style={styles.popupReceiptDialog}>
                    <View style={styles.popupReceiptHeader}>
                        <Text style={styles.popupReceiptHeader_Text}>
                            {Lang.xac_nhan_giao_dich()}
                        </Text>
                        <Text style={styles.popupReceiptHeader_TextSub}>
                            {Lang.nap_game2()}
                        </Text>
                    </View>
                    <View style={styles.popupReceiptLine}>
                        <Image source={require('../../element/receipt/line-receipt-blue.png')} style={styles.popupReceiptLine_Img} />
                    </View>
                    <ScrollView style={styles.popupReceiptBody}>
                        <View style={styles.ViewReceipt}>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>Game</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.games.game_name}</Text>
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>Server</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.games.server_name}</Text>
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.tai_khoan()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.games.appota_id}</Text>
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.nhan_vat()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.games.role_name}</Text>
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.goi_nap()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{this.props.games.packageValue} {this.props.games.gameCurrency}</Text>
                            </View>
                            <View style={styles.ViewReceipt_LineDot}>
                                <Image source={require('../../element/receipt/line-receipt-dot.png')} style={styles.ViewReceipt_LineDot_Img} />
                            </View>
                            {renderIf(this.props.games.payment_method == 'card')(
                                <View>
                                    <View style={styles.ViewReceipt_Item}>
                                        <Text style={styles.ViewReceipt_Title}>{Lang.nha_mang()}</Text>
                                        <Text style={styles.ViewReceipt_Info}>{this.props.games.card_name}</Text>
                                    </View>
                                    <View style={styles.ViewReceipt_Item}>
                                        <Text style={styles.ViewReceipt_Title}>Serial</Text>
                                        <Text style={styles.ViewReceipt_Info}>{this.props.games.card_serial}</Text>
                                    </View>
                                    <View style={styles.ViewReceipt_Item}>
                                        <Text style={styles.ViewReceipt_Title}>{Lang.ma_the()}</Text>
                                        <Text style={styles.ViewReceipt_Info}>{this.props.games.card_code}</Text>
                                    </View>
                                    <View style={styles.ViewReceipt_LineDot}>
                                        <Image source={require('../../element/receipt/line-receipt-dot.png')} style={styles.ViewReceipt_LineDot_Img} />
                                    </View>
                                </View>
                            )}
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.nguon_tien()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{nguon_tien}</Text>
                            </View>
                            <View style={styles.ViewReceipt_Item}>
                                <Text style={styles.ViewReceipt_Title}>{Lang.phi()}</Text>
                                <Text style={styles.ViewReceipt_Info}>{transaction_fee}</Text>
                            </View>
                            {renderIf(this.props.games.payment_method == 'wallet' && parseInt(this.props.games.amount) >= 50000)(
                                <View style={styles.ViewReceipt_Item}>
                                    <Text style={styles.ViewReceipt_Title}>{Lang.hoan_tien()}</Text>
                                    <Text style={styles.ViewReceipt_Info}>{Utils.number_format((parseInt(fee) + parseInt(this.props.games.amount) * CASHBACK_PERCENT.GAME_TOPUP_WALLET / 100), '.', '.')}đ</Text>
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
                        <TouchableOpacity style={styles.popupReceiptFooter_TouchLeft} onPress={this.closeModal.bind(this)}>
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

export default connect(mapStateToProps)(Game_Receipt)