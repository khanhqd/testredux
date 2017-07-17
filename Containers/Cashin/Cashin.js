import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    TextInput,
    Platform,
    Keyboard
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import TimerMixin from 'react-timer-mixin';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Toast from '@remobile/react-native-toast';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Utils = require('../Common/Utils');
var Loading = require('../Common/Loading');
import renderIf from '../Common/renderIf';
var styles = require('../Common/style.js');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop()
}

class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isFocused: false,
            isLoading: false,
            amount: '',
            sAmount: '',
            payment_method: '',
            bank_code: '',
            account_id: '',
            banks_acc: [],
        }
        Text.defaultProps.allowFontScaling = false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_cashin');
        appsFlyer.trackEvent('af_cashin', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_cashin', 1);
    }

    GetBankAccount() {
        let { access_token } = this.props
        RequestHelper.BankAccount(access_token)
            .then((data) => {
                if (data.status == 200) {
                    var cards = JSON.parse(data._bodyText);
                    this.setState({
                        banks_acc: cards.data,
                        payment_method: cards.data.length > 0 ? 'bank_add' : 'bank',
                        bank_code: cards.data.length > 0 ? cards.data[0].bank_code : '',
                        account_id: cards.data.length > 0 ? cards.data[0].id : '',
                    });
                }
                else {
                    if (data.status == 401) access_token = '';
                    Utils.onRequestEnd(data);
                }
            })
            .catch((error) => {
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    _onBlur(e) {
        this.setState({ isFocused: false })
    }
    _onFocus(e) {
        this.setState({ isFocused: true })
    }
    _clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            amount: '',
            sAmount: '',
            isFocused: true
        })
    }

    onPressPaymentMethod(flag, bank_code, account_id) {
        if (flag == 'card') {
            Actions.cashin_card()
        }

        this.setState({
            payment_method: flag,
            bank_code: bank_code ? bank_code : '',
            account_id: account_id ? account_id : '',
        });
    }

    renderRow_Payment(flag) {
        var style_bg_payment;
        var style_txt_payment;
        var icon;
        if (this.state.payment_method == flag) {
            style_bg_payment = styles.FormControl_TouchRowSelect_Active;
            style_txt_payment = styles.FormControl_TouchTitle_Active;
            style_txt_bank = styles.FormControl_TouchTitleBank_Active;
            style_txt_number = styles.FormControl_TouchTitleNumber_Active;
            style_txt_name = styles.FormControl_TouchTitleFullName_Active;
            icon = flag == 'bank' ? require('../../element/form/ic-atm-active.png') : require('../../element/form/ic-cc-active.png');
        }
        else {
            style_bg_payment = styles.FormControl_TouchRowSelect;
            style_txt_payment = styles.FormControl_TouchTitle;
            style_txt_bank = styles.FormControl_TouchTitleBank;
            style_txt_number = styles.FormControl_TouchTitleNumber;
            style_txt_name = styles.FormControl_TouchTitleFullName;
            icon = flag == 'bank' ? require('../../element/form/ic-atm.png') : require('../../element/form/ic-cc.png');
        }
        switch (flag) {
            case 'bank_add':
                return (
                    <TouchableOpacity style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                        <View style={styles.FormControl_TouchRowSelect}>
                            <View style={styles.FormControl_TouchRowBank}>
                                <Image source={require('../../element/logo-bank/oceanbank.png')} style={styles.FormControl_TouchRowBankImg} />
                            </View>
                            <View style={styles.FormControl_TouchInfo}>
                                <Text style={styles.FormControl_TouchTitleBank} numberOfLines={1}>Oceanbank</Text>
                                <Text style={styles.FormControl_TouchTitleNumber} numberOfLines={1}>•••• 6789</Text>
                                <Text style={styles.FormControl_TouchTitleFullName} numberOfLines={1}>Dang Dinh Khanh • 08/18</Text>
                            </View>
                            <View style={styles.FormControl_TouchRowCC}>
                                <Image source={require('../../element/logo-creditcard/visa.png')} style={styles.FormControl_TouchRowCCImg} />
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            case 'card':
                return (
                    <TouchableOpacity style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]} onPress={() => this.onPressPaymentMethod('card')}>
                        <View style={style_bg_payment}>
                            <View style={styles.FormControl_TouchRowBank}>
                                <Image source={require('../../element/form/pay-phone-card.png')} style={styles.FormControl_TouchRowBankImg} />
                            </View>
                            <View style={styles.FormControl_TouchInfo}>
                                <Text style={style_txt_bank} numberOfLines={1}>{Lang.the_cao()}</Text>
                                <Text style={style_txt_name} numberOfLines={2}>Mobifone - Viettel - Vinaphone</Text>
                            </View>
                            <View style={styles.FormControl_TouchRowPoint}>
                                <Image source={require('../../element/form/ic-point.png')} style={styles.FormControl_TouchRowPointImg} />
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            case 'bank':
                return (
                    <TouchableOpacity style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]} onPress={() => this.onPressPaymentMethod('bank')}>
                        <View style={style_bg_payment}>
                            <View style={styles.FormControl_TouchRowBank}>
                                <Image source={require('../../element/form/pay-atm-ibanking.png')} style={styles.FormControl_TouchRowBankImg} />
                            </View>
                            <View style={styles.FormControl_TouchInfo}>
                                <Text style={style_txt_bank} numberOfLines={1}>{Lang.the_atm_ibanking()}</Text>
                                <Text style={style_txt_name} numberOfLines={2}>{Lang.ngan_hang_noi_dia()}</Text>
                            </View>
                            <View style={styles.FormControl_TouchRowPoint}>
                                <Image source={require('../../element/form/ic-point.png')} style={styles.FormControl_TouchRowPointImg} />
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            case 'cc':
                return (
                    <TouchableOpacity style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]} onPress={() => this.onPressPaymentMethod('cc')}>
                        <View style={style_bg_payment}>
                            <View style={styles.FormControl_TouchRowBank}>
                                <Image source={require('../../element/form/pay-credit-card.png')} style={styles.FormControl_TouchRowBankImg} />
                            </View>
                            <View style={styles.FormControl_TouchInfo}>
                                <Text style={style_txt_bank} numberOfLines={1}>{Lang.the_tin_dung()}</Text>
                                <Text style={style_txt_name} numberOfLines={2}>Visa - Master - JCB</Text>
                            </View>
                            <View style={styles.FormControl_TouchRowPoint}>
                                <Image source={require('../../element/form/ic-point.png')} style={styles.FormControl_TouchRowPointImg} />
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            case 'add_card':
                return (
                    <TouchableOpacity onPress={() => Actions.add_cards()} style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                        <View style={style_bg_payment}>
                            <Image source={require('../../element/form/add-cards.png')} style={styles.FormControl_TouchRowImg} />
                            <Text style={style_txt_payment}>{Lang.lien_ket_the()}</Text>
                        </View>
                    </TouchableOpacity>
                );
        }
    }

    SumTransactionFee(amount, transaction_fee, transaction_percent_fee) {
        return (amount * transaction_percent_fee / 100 + transaction_fee);
    }
    onPressNapTien() {
        Keyboard.dismiss()
        if (this.state.amount.length == 0 && this.state.payment_method != 'card') {
            Toast.showToast(Lang.nhap_so_tien(), "long", "center");
        }
        else if (parseInt(this.state.amount) < 20000 && this.state.payment_method != 'card') {
            Toast.showToast(Lang.nhap_so_tien_min(20), "long", "center");
        }
        else {
            let { visa_fee } = this.props
            if (this.state.payment_method == 'bank')
                Actions.bank({
                    page: 'cashin',
                    title: Lang.nap_vi2(),
                    method: this.state.payment_method,
                    amount: this.state.amount,
                })
            else if (this.state.payment_method == 'cc') {
                var fee = this.SumTransactionFee(this.state.amount, parseInt(visa_fee.cashin_transaction_fee), parseInt(visa_fee.cashin_transaction_percent_fee));
                Actions.cashin_receipt({
                    method: 'cc',
                    bank_name: Lang.the_tin_dung(),
                    bank_code: visa_fee.bank_code,
                    amount: this.state.amount,
                    sAmount: Utils.number_format(this.state.amount, '.', '.'),
                    transaction_fee: fee == 0 ? Lang.mien_phi() : Utils.number_format(fee, '.', '.') + ' đ',
                    total: Utils.number_format(parseInt(fee) + parseInt(this.state.amount), '.', '.'),
                });
            }
            else if (this.state.payment_method == 'bank_add') {
                Actions.cashin_receipt({
                    method: 'bank_add',
                    bank_name: 'Oceanbank',
                    account_id: this.state.account_id,
                    bank_code: this.state.bank_code,
                    amount: this.state.amount,
                    sAmount: Utils.number_format(this.state.amount, '.', '.'),
                    transaction_fee: Lang.mien_phi(),
                    total: Utils.number_format(this.state.amount, '.', '.'),
                });
            }

        }
    }
    onTextChange(text) {
        var _amount = Utils.replaceAll(text, '.', '');
        this.setState({
            amount: _amount,
            sAmount: Utils.toDotString(parseInt(_amount)).toString() == 'NaN' ? '0' : Utils.toDotString(parseInt(_amount))
        })
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
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
                                {Lang.nap_vi2()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                            <TouchableOpacity onPress={() => Actions.history_balance({ balance: this.props.user_infor.balance, balance_type: 'cashin' })}>
                                <Image source={require('../../element/nav-bar/nav-history.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView style={styles.FormControl_Scroll} keyboardShouldPersistTaps='always' >
                        {renderIf(this.state.payment_method != 'card' && this.state.payment_method.length > 0)(
                            <View style={styles.FormControl_Group}>
                                <View style={styles.FormControl_Title}>
                                    <Text style={styles.FormControl_TitleText}>
                                        {Lang.so_tien().toUpperCase()}
                                    </Text>
                                </View>
                                <View style={styles.FormControl_Content}>
                                    <View style={styles.FormControl_Input}>
                                        <TextInput
                                            ref={'textClear'}
                                            autoCapitalize="none"
                                            autoFocus={true}
                                            keyboardType='phone-pad'
                                            placeholder={Lang.nhap_so_tien()}
                                            placeholderTextColor="rgba(0,0,0,0.3)"
                                            value={this.state.sAmount}
                                            autoCorrect={false}
                                            returnKeyType={"done"}
                                            onBlur={this._onBlur.bind(this)}
                                            onFocus={this._onFocus.bind(this)}
                                            onChangeText={(text) => this.onTextChange(text)}
                                            style={styles.FormControl_Input_Enter}
                                            underlineColorAndroid='rgba(0,0,0,0)'
                                        />
                                        {renderIf(this.state.amount != '' && this.state.isFocused == true)(
                                            <TouchableOpacity onPress={() => this._clearText('textClear')} style={styles.FormControl_Addon}>
                                                <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_AddonIcon} />
                                            </TouchableOpacity>
                                        )}
                                        {renderIf(this.state.amount == '' || this.state.isFocused == false)(
                                            <View style={styles.FormControl_Addon}>
                                                <Text style={styles.FormControl_AddonText}>
                                                    VNĐ
                                            </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        )}
                        <View style={styles.FormControl_Group}>
                            <View style={styles.FormControl_Title}>
                                <Text style={styles.FormControl_TitleText}>
                                    {Lang.hinh_thuc_thanh_toan().toUpperCase()}
                                </Text>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_Select}>
                                    <View style={styles.FormControl_SelectGroup}>
                                        {
                                            this.state.banks_acc.map((item, i) => {
                                                var style_bg_payment;
                                                var style_txt_bank;
                                                var style_txt_number;
                                                var style_txt_name;
                                                if (this.state.payment_method == 'bank_add') {
                                                    style_bg_payment = styles.FormControl_TouchRowSelect_Active;
                                                    style_txt_bank = styles.FormControl_TouchTitleBank_Active;
                                                    style_txt_number = styles.FormControl_TouchTitleNumber_Active;
                                                    style_txt_name = styles.FormControl_TouchTitleFullName_Active;
                                                }
                                                else {
                                                    style_bg_payment = styles.FormControl_TouchRowSelect;
                                                    style_txt_bank = styles.FormControl_TouchTitleBank;
                                                    style_txt_number = styles.FormControl_TouchTitleNumber;
                                                    style_txt_name = styles.FormControl_TouchTitleFullName;
                                                }
                                                return (
                                                    <TouchableOpacity key={i} onPress={() => this.onPressPaymentMethod('bank_add', item.bank_code, item.id)} style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                                                        <View style={style_bg_payment}>
                                                            <View style={[styles.FormControl_TouchRowBank, { borderWidth: 0.5, borderColor: '#808080' }]}>
                                                                <Image source={require('../../element/logo-bank/oceanbank.png')} style={[styles.FormControl_TouchRowBankImg]} />
                                                            </View>
                                                            <View style={styles.FormControl_TouchInfo}>
                                                                <Text style={style_txt_bank} numberOfLines={1}>{item.bank_name}</Text>
                                                                <Text style={style_txt_number} numberOfLines={1}>•••• {item.account_number.substr(item.account_number.length - 4, 4)}</Text>
                                                                <Text style={style_txt_name} numberOfLines={1}>{item.holder_name} • {item.account_type}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                        {this.renderRow_Payment('card')}
                                        {this.renderRow_Payment('bank')}
                                        {this.renderRow_Payment('cc')}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.FormControl_Note}>
                                <Text style={styles.FormControl_NoteText}>
                                    {Lang.des_nap_tien()}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                    {renderIf(this.state.payment_method != 'card' && this.state.payment_method.length > 0)(
                        <View style={styles.FormControl_Button}>
                            <TouchableOpacity onPress={() => this.onPressNapTien()} style={styles.FormControl_ButtonTouch}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.nap_tien().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                {renderIf(Platform.OS == 'ios')(
                    <KeyboardSpacer />
                )}
            </View>
        );
    }
};


const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
    visa_fee: state.taskState.visa_fee,
    ds_bank_fee: state.taskState.ds_bank_fee,
})

export default connect(mapStateToProps)(AppotaView)
