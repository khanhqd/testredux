import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    Clipboard,
    Image
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import Toast from '@remobile/react-native-toast'
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import moment from 'moment';
import * as Requests from '../Helpers/Requests'
import * as Utils from '../Helpers/Utility'
import * as Utility from './Utility'

var Lang = require('../Common/Lang')
var Loading = require('../Common/Loading')
var styles = require('../Common/style.js')


const popToRoot = () => {
    Actions.pop();
}

class Extra extends React.Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling = false;
    }
    onPressCopy(data) {
        Toast.showToast(Lang.da_copy(), "short", "center");
        Clipboard.setString(data);
    }

    renderPhone(type) {
        switch (type) {
            case 'transfer':
                return this.props.receiver_phone_number
            case 'topup':
                return this.props.topup_phone_number
            case 'cashback':
                return this.props.receiver_phone_number
            case 'receive_cashback':
                return this.props.payer_phone_number
            case 'receive_transfer':
                return this.props.payer_phone_number
            case 'receive_orders_money':
                return this.props.merchant_store_phone_number
            case 'payment_orders':
                return this.props.merchant_store_phone_number
            case 'paymentorders':
                return this.props.merchant_store_phone_number
            case 'payment':
                return this.props.merchant_store_phone_number
            case 'lend_money':
                return this.props.borrower_phone_number
            case 'borrow_money':
                return this.props.scrivener_phone_number
            default:
                return ''

        }
    }

    render() {
        var currency = '';
        if (this.props.currency == 'VND') {
            currency = 'đ';
        }
        else {
            currency = this.props.currency;
        }
        var fee = this.props.fee == 0 ? Lang.mien_phi() : (this.props.fee + ' ' + currency);
        if (this.props.history_type == 'topup' ||
            this.props.history_type == 'transfer' ||
            this.props.history_type == 'cashback' ||
            this.props.history_type == 'receive_cashback' ||
            this.props.history_type == 'receive_transfer' ||
            this.props.history_type == 'receive_orders_money' ||
            this.props.history_type == 'payment_orders' ||
            this.props.history_type == 'paymentorders' ||
            this.props.history_type == 'payment' ||
            this.props.history_type == 'lend_money' ||
            this.props.history_type == 'borrow_money'
        ) {
            return (
                <View style={styles.FormControl_Group}>
                    <View style={styles.FormControl_Title}>
                        <Text style={styles.FormControl_TitleText}>
                            {Lang.chi_tiet_lich_su().toUpperCase()}{': '}{Utility.renderHistoryType(this.props.history_type).toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.FormControl_Inner}>
                        <View style={styles.FormControl_Profile}>
                            <View style={styles.FormControl_Input_Form2}>
                                <TouchableOpacity style={styles.FormControl_Input_Form2Col}>
                                    <Text style={styles.FormControl_Active}>{Lang.so_dien_thoai()}</Text>
                                    <Text style={styles.FormControl_Text_Field}>{this.renderPhone(this.props.history_type)}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.FormControl_Input_Form2Col}>
                                    <Text style={styles.FormControl_Active}>{Lang.so_tien()}</Text>
                                    <Text style={styles.FormControl_Text_Field}>{this.props.amount} {currency}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.FormControl_Line}></View>
                            <View style={styles.FormControl_Input_Form}>
                                <Text style={styles.FormControl_Active}>{Lang.ma_giao_dich()}</Text>
                                <Text style={styles.FormControl_Text_Field}>{this.props.transaction_id}</Text>
                            </View>
                            <View style={styles.FormControl_Line}></View>
                            <View style={styles.FormControl_Input_Form}>
                                <Text style={styles.FormControl_Active}>{Lang.thoi_gian()}</Text>
                                <Text style={styles.FormControl_Text_Field}>{this.props.time}</Text>
                            </View>
                            <View style={styles.FormControl_Line}></View>
                            <View style={styles.FormControl_Input_Form}>
                                <Text style={styles.FormControl_Active}>{Lang.phi()}</Text>
                                <Text style={styles.FormControl_Text_Field}>{fee}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
        else if (this.props.history_type == 'buy_card') {
            var vendor = this.props.cards.length > 0 ? this.props.cards[0].vendor.charAt(0).toUpperCase() + this.props.cards[0].vendor.slice(1).toLowerCase() : '';
            return (
                <View style={styles.FormControl_Group}>
                    <View style={styles.FormControl_Title}>
                        <Text style={styles.FormControl_TitleText}>
                            {Lang.chi_tiet_lich_su().toUpperCase()}{': '}{Lang.mua_the2().toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.FormControl_Inner}>
                        <View style={styles.FormControl_RowContent}>

                            <View style={styles.FormControl_Input_Form2}>
                                <View style={styles.FormControl_Input_Form2Col}>
                                    <Text style={styles.FormControl_Active}>{Lang.loai_the()}</Text>
                                    <Text style={styles.FormControl_Text_Field}>{vendor}</Text>
                                </View>
                                <View style={styles.FormControl_Input_Form2Col}>
                                    <Text style={styles.FormControl_Active}>{Lang.so_tien()}</Text>
                                    <Text style={styles.FormControl_Text_Field}>{this.props.amount} {currency}</Text>
                                </View>
                            </View>
                        </View>
                        <View >

                            {this.props.cards.map((item, i) => {
                                var expiry_date = item.expiry_date.toString()
                                var expiry = (expiry_date.slice(6) + '/' + expiry_date.slice(4).slice(0, 2) + '/' + expiry_date.slice(0, 4))
                                return (
                                    <View key={i} style={{}}>
                                        {renderIf(i === 0)(
                                            <View style={styles.FormControl_RowContent}>
                                                <View style={styles.FormControl_Input_Form2}>
                                                    <View style={styles.FormControl_Input_Form2Col}>
                                                        <Text style={styles.FormControl_Active}>{Lang.menh_gia()}</Text>
                                                        <Text style={styles.FormControl_Text_Field}>{Utils.numberFormat(item.value)} {currency}</Text>
                                                    </View>
                                                    <View style={styles.FormControl_Input_Form2Col}>
                                                        <Text style={styles.FormControl_Active}>{Lang.han_dung()}</Text>
                                                        <Text style={styles.FormControl_Text_Field}>{expiry}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )}
                                        <View style={styles.FormControl_RowContent}>
                                            <View style={styles.FormControl_Input_Form}>
                                                <TouchableOpacity style={styles.FormControl_Input} onPress={this.onPressCopy.bind(this, item.serial.trim())}>
                                                    <Text style={styles.FormControl_Active}>Serial {i + 1}</Text>
                                                    <Text style={styles.FormControl_Text_Field} numberOfLines={2}>{item.serial.trim()}</Text>
                                                    <Image source={require('../../element/form/ic-copy.png')} style={styles.FormControl_Copy} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.FormControl_Line}></View>
                                            <View style={styles.FormControl_Input_Form}>
                                                <TouchableOpacity style={styles.FormControl_Input} onPress={this.onPressCopy.bind(this, item.code.trim())}>
                                                    <Text style={styles.FormControl_Active}>{Lang.ma_the()} {i + 1}</Text>
                                                    <Text style={styles.FormControl_Text_Field}>{item.code.trim()}</Text>
                                                    <Image source={require('../../element/form/ic-copy.png')} style={styles.FormControl_Copy} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                        <View style={styles.FormControl_RowContent}>
                            <View style={styles.FormControl_Input_Form}>
                                <Text style={styles.FormControl_Active}>{Lang.ma_giao_dich()}</Text>
                                <Text style={styles.FormControl_Text_Field}>{this.props.transaction_id}</Text>
                            </View>
                            <View style={styles.FormControl_Line}></View>
                            <View style={styles.FormControl_Input_Form}>
                                <Text style={styles.FormControl_Active}>{Lang.thoi_gian()}</Text>
                                <Text style={styles.FormControl_Text_Field}>{this.props.time}</Text>
                            </View>
                            <View style={styles.FormControl_Line}></View>
                            <View style={styles.FormControl_Input_Form}>
                                <Text style={styles.FormControl_Active}>{Lang.phi()}</Text>
                                <Text style={styles.FormControl_Text_Field}>{fee}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
        else if (
            this.props.history_type == 'game_ewallet_charging' ||
            this.props.history_type == 'game_card_charging' ||
            this.props.history_type == 'game_bank_charging'
        ) {
            return (
                <View style={styles.FormControl_Group}>
                    <View style={styles.FormControl_Title}>
                        <Text style={styles.FormControl_TitleText}>
                            {Lang.chi_tiet_lich_su().toUpperCase()}{': '}{Utility.renderHistoryType(this.props.history_type).toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.FormControl_Inner}>
                        <View style={styles.FormControl_RowContent}>
                            <View style={styles.FormControl_Input_Form2}>
                                <View style={styles.FormControl_Input_Form2Col}>
                                    <Text style={styles.FormControl_Active}>Game</Text>
                                    <Text style={styles.FormControl_Text_Field}>{this.props.game_name}</Text>
                                </View>
                                <View style={styles.FormControl_Input_Form2Col}>
                                    <Text style={styles.FormControl_Active}>{Lang.so_tien()}</Text>
                                    <Text style={styles.FormControl_Text_Field}>{this.props.amount} {currency}</Text>
                                </View>
                            </View>
                            <View style={styles.FormControl_Input_Form2}>
                                <View style={styles.FormControl_Input_Form2Col}>
                                    <Text style={styles.FormControl_Active}>Server</Text>
                                    <Text style={styles.FormControl_Text_Field}>{this.props.server_name}</Text>
                                </View>
                                <View style={styles.FormControl_Input_Form2Col}>
                                    <Text style={styles.FormControl_Active}>{Lang.nhan_vat()}</Text>
                                    <Text style={styles.FormControl_Text_Field}>{this.props.role_name}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.FormControl_RowContent}>
                            <View style={styles.FormControl_Input_Form}>
                                <Text style={styles.FormControl_Active}>{Lang.ma_giao_dich()}</Text>
                                <Text style={styles.FormControl_Text_Field}>{this.props.transaction_id}</Text>
                            </View>
                            <View style={styles.FormControl_Line}></View>
                            <View style={styles.FormControl_Input_Form}>
                                <Text style={styles.FormControl_Active}>{Lang.thoi_gian()}</Text>
                                <Text style={styles.FormControl_Text_Field}>{this.props.time}</Text>
                            </View>
                            <View style={styles.FormControl_Line}></View>
                            <View style={styles.FormControl_Input_Form}>
                                <Text style={styles.FormControl_Active}>{Lang.phi()}</Text>
                                <Text style={styles.FormControl_Text_Field}>{fee}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.FormControl_Group}>
                    <View style={styles.FormControl_Title}>
                        <Text style={styles.FormControl_TitleText}>
                            {Lang.chi_tiet_lich_su().toUpperCase()}{': '}{Utility.renderHistoryType(this.props.history_type).toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.FormControl_Inner}>
                        <View style={styles.FormControl_Profile}>
                            <View style={styles.FormControl_Input_Form}>
                                <Text style={styles.FormControl_Active}>{Lang.ma_giao_dich()}</Text>
                                <Text style={styles.FormControl_Text_Field}>{this.props.transaction_id}</Text>
                            </View>
                            <View style={styles.FormControl_Line}></View>
                            <View style={styles.FormControl_Input_Form}>
                                <Text style={styles.FormControl_Active}>{Lang.thoi_gian()}</Text>
                                <Text style={styles.FormControl_Text_Field}>{this.props.time}</Text>
                            </View>
                            <View style={styles.FormControl_Line}></View>
                            <View style={styles.FormControl_Input_Form}>
                                <Text style={styles.FormControl_Active}>{Lang.phi()}</Text>
                                <Text style={styles.FormControl_Text_Field}>{fee}</Text>
                            </View>
                            <View style={styles.FormControl_Line}></View>
                            <View style={styles.FormControl_Input_Form}>
                                <Text style={styles.FormControl_Active}>{Lang.so_tien()}</Text>
                                <Text style={styles.FormControl_Text_Field}>{this.props.amount} {currency}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }
}

class HistoryDetail extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: true,
            phone_number: '',
            payer_phone_number: '',
            receiver_phone_number: '',
            borrower_phone_number: '',
            scrivener_phone_number: '',
            topup_phone_number: '',
            transaction_id: '',
            amount: '',
            fee: '',
            currency: '',
            time: '',
            cards: [],
            game_name: '',
            server_name: '',
            role_name: ''
        }
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_history_detail');
        appsFlyer.trackEvent('af_history_detail', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_history_detail', 1);
        setTimeout(() => {
            this.getTransactionDetail()
        }, 200)
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    getTransactionDetail = () => {
        let { access_token } = this.props
        Requests.transacionDetail(access_token, this.props.transaction_id, this.props.history_type)
            .then((data) => {
                console.log('history=' + JSON.stringify(data))
                this.setState({
                    isLoading: false,
                    amount: JSON.stringify(data).indexOf('amount') > -1 ? Utils.numberFormat(data.amount, '.') : '',
                    fee: JSON.stringify(data).indexOf('fee') > -1 ? Utils.numberFormat(data.fee, '.') : '',
                    currency: JSON.stringify(data).indexOf('currency') > -1 ? data.currency : 'đ',
                    transaction_id: JSON.stringify(data).indexOf('transaction_id') > -1 ? data.transaction_id : '',
                    time: JSON.stringify(data).indexOf('time') > -1 ? data.time : '',
                    payer_phone_number: JSON.stringify(data).indexOf('payer_phone_number') > -1 ? data.payer_phone_number : '',
                    receiver_phone_number: JSON.stringify(data).indexOf('receiver_phone_number') > -1 ? data.receiver_phone_number : '',
                    topup_phone_number: JSON.stringify(data).indexOf('topup_phone_number') > -1 ? data.topup_phone_number : '',
                    phone_number: JSON.stringify(data).indexOf('phone_number') > -1 ? data.phone_number : '',
                    cards: JSON.stringify(data).indexOf('card_data') > -1 ? data.card_data : [],
                    borrower_phone_number: JSON.stringify(data).indexOf('borrower_phone_number') > -1 ? data.borrower_phone_number : '',
                    scrivener_phone_number: JSON.stringify(data).indexOf('scrivener_phone_number') > -1 ? data.scrivener_phone_number : '',
                    merchant_store_phone_number: JSON.stringify(data).indexOf('merchant_store_phone_number') > -1 ? data.merchant_store_phone_number : '',
                    game_name: JSON.stringify(data).indexOf('game_name') > -1 ? data.game_name : '',
                    server_name: JSON.stringify(data).indexOf('server_name') > -1 ? data.server_name : '',
                    role_name: JSON.stringify(data).indexOf('role_name') > -1 ? data.role_name : '',
                });
            })
            .catch((e) => {
                this.setState({ isLoading: false })
            })
    }

    render() {
        return (
            <View {...this.props} style={[styles.container, styles.tabHome]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.chi_tiet_lich_su()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView  >
                        <Extra history_type={this.props.history_type}
                            transaction_id={this.state.transaction_id}
                            time={this.state.time}
                            payer_phone_number={this.state.payer_phone_number}
                            receiver_phone_number={this.state.receiver_phone_number}
                            topup_phone_number={this.state.topup_phone_number}
                            borrower_phone_number={this.state.borrower_phone_number}
                            scrivener_phone_number={this.state.scrivener_phone_number}
                            phone_number={this.state.phone_number}
                            merchant_store_phone_number={this.state.merchant_store_phone_number}
                            fee={this.state.fee}
                            amount={this.state.amount}
                            currency={this.state.currency}
                            cards={this.state.cards}
                            game_name={this.state.game_name}
                            server_name={this.state.server_name}
                            role_name={this.state.role_name}
                        />
                    </ScrollView>
                    {renderIf(this.state.isLoading)(
                        <Loading />
                    )}
                </View>
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
})

export default connect(mapStateToProps)(HistoryDetail)
