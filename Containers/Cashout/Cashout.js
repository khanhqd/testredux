import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    ListView,
    AsyncStorage,
    TextInput,
    Platform,
    Image,
    Keyboard
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RowData from './RowData';
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import Toast from '@remobile/react-native-toast';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk'
import * as Requests from '../Helpers/Requests';

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop()
}

const popToHome = () => {
    Actions.home({ type: 'reset' })
    setTimeout(() => {
        Actions.refresh();
    }, 10);
}

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
var list_method = '';
class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isFocused: false,
            isLoading: false,
            amount: '',
            sAmount: '',
            banks_acc: [],
            dataSource_method: ds.cloneWithRows(props.ds_cashout_method),
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_cashout');
        AppEventsLogger.logEvent('fb_cashout', 1)
        setTimeout(() => {
            let { ds_cashout_method, cashout_acc } = this.props
            if (ds_cashout_method.length == 0)
                this.GetCashoutMethods()
            if (cashout_acc.length == 0)
                this.GetCashoutAcc()
            // this.GetBankAccount();
        }, 200);
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    GetCashoutMethods() {
        let { dispatch, access_token } = this.props
        this.setState({ isLoading: true })
        RequestHelper.CashoutMethods(access_token)
            .then((data) => {
                this.setState({ isLoading: false })
                if (data.status == 200) {
                    var methods = JSON.parse(data._bodyText);
                    dispatch(taskActionCreators.update_ds_cashout_method(methods.data))
                    this.setState({
                        dataSource_method: ds.cloneWithRows(methods.data)
                    });
                }
                else {
                    if (data.status == 401) access_token = '';
                    Utils.onRequestEnd(data, '');
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    GetCashoutAcc = () => {
        let { dispatch, access_token } = this.props
        Requests.Cashout_Account(access_token)
            .then((res) => {
                console.log('ACC=' + JSON.stringify(res))
                dispatch(taskActionCreators.cashout_bank_account(res.data))
            })
            .catch((e) => {
                console.log('ACC=' + e)
            })
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
            isFocused: true,
        })
    }

    SumTransactionFee = (amount, transaction_fee, transaction_percent_fee) => {
        return (amount * transaction_percent_fee / 100 + transaction_fee);
    }

    onPressMethod(data) {
        Keyboard.dismiss()
        var type = data.type;
        GoogleAnalytics.trackEvent('ga_cashout', 'Method ' + type);
        AppEventsLogger.logEvent('fb_cashout_press_method', 1);
        if (type == 'cashback') {
            if (this.state.amount.length == 0) {
                Toast.showToast(Lang.nhap_so_tien(), "long", "center");
            }
            else if (parseInt(this.state.amount) > parseInt(this.props.user_infor.cashback_balance))
                Toast.showToast(Lang.tk_khong_du(), "short", "center");
            else if (parseInt(this.state.amount) < 100000)
                Toast.showToast(Lang.nhap_so_tien_min(Utils.number_format(100000, '.', '.')), "short", "center");
            else
                Actions.popup({ title: Lang.thong_bao(), content: Lang.xac_nhan_doi_tien(Utils.number_format(this.state.amount, '.', '.')), onPress_Cancel: () => { }, onPress_Ok: () => this.CashbackExchange() });
        }
        else {
            if (this.state.amount.length == 0) {
                Toast.showToast(Lang.nhap_so_tien(), "long", "center");
            }
            else if (parseInt(this.state.amount) < 100000)
                Toast.showToast(Lang.nhap_so_tien_min(Utils.number_format(100000, '.', '.')), "short", "center");
            else if (parseInt(this.state.amount) > parseInt(this.props.user_infor.balance))
                Toast.showToast(Lang.tk_khong_du(), "short", "center");
            else if (parseInt(this.state.amount) % 10000 != 0)
                Toast.showToast(Lang.so_tien_la_boi_so10(), "short", "center");
            else {
                if (this.props.cashout_acc.length == 0)
                    Actions.bank({
                        page: 'cashout',
                        title: Lang.rut_tien(),
                        method: type,
                        balance: Utils.number_format(parseInt(this.props.user_infor.balance) - parseInt(this.state.amount), '.', '.'),
                        amount: this.state.amount
                    })
                else {
                    var fee = 0//this.SumTransactionFee(this.state.amount, parseInt(rowData.transaction_fee), parseInt(rowData.transaction_percent_fee));
                    Actions.cashout_bank_acc({
                        method: 'account',
                        amount: this.state.amount,
                        balance: Utils.number_format(parseInt(this.props.user_infor.balance) - parseInt(this.state.amount), '.', '.'),
                        sAmount: Utils.number_format(this.state.amount, '.', '.'),
                        transaction_fee: fee == 0 ? Lang.mien_phi() : Utils.number_format(fee, '.', '.') + ' đ',
                        total: Utils.number_format(parseInt(fee) + parseInt(this.state.amount), '.', '.'),
                        bank_name: this.props.cashout_acc[0].bank_name,
                        bank_code: this.props.cashout_acc[0].bank_code,
                        account_number: this.props.cashout_acc[0].account_number,
                        holder_name: this.props.cashout_acc[0].holder_name,
                        branch: this.props.cashout_acc[0].branch,
                    })
                }
            }
        }
    }

    CashbackExchange() {
        this.setState({ isLoading: true });
        let { dispatch, access_token } = this.props
        RequestHelper.CashbackExchange(access_token, this.state.amount)
            .then((data) => {
                this.setState({ isLoading: false });
                GoogleAnalytics.trackEvent('ga_cashout', 'Cashback exchange');
                appsFlyer.trackEvent('af_cashback_exchange', {}, () => { }, () => { });
                if (data.status == 200) {
                    Toast.showToast(Lang.doi_tien_thanh_cong(), "short", "center");
                    popToHome();
                }
                else {
                    if (data.status == 401) access_token = '';
                    Utils.onRequestEnd(data, '');
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    GetBankAccount() {
        let { dispatch, access_token } = this.props
        RequestHelper.BankAccount(access_token)
            .then((data) => {
                if (data.status == 200) {
                    var cards = JSON.parse(data._bodyText);
                    this.setState({
                        banks_acc: cards.data,
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

    onTextChange(text) {
        var _amount = Utils.replaceAll(text, '.', '');
        this.setState({
            amount: _amount,
            sAmount: Utils.toDotString(parseInt(_amount)).toString() == 'NaN' ? '0' : Utils.toDotString(parseInt(_amount))
        })
    }

    onPressBankAcc(item) {
        Keyboard.dismiss()
        if (this.state.amount.length == 0) {
            Toast.showToast(Lang.nhap_so_tien(), "short", "center");
        }
        else if (parseInt(this.state.amount) > parseInt(this.props.user_infor.balance))
            Toast.showToast(Lang.tk_khong_du(), "short", "center");
        else {
            Actions.popup({
                title: Lang.thong_bao(),
                content: 'Đồng ý rút ' + Utils.toDotString(this.state.amount) + 'đ tới tài khoản •••• ' + item.account_number.substr(12, 4) + ' ở ngân hàng ' + item.bank_name,
                onPress_Ok: () => this.Cashout(item),
                onPress_Cancel: () => { }
            })
        }
    }

    Cashout(item) {
        this.setState({ isLoading: true });
        var account_info = {
            account_id: item.id
        };
        let { dispatch, access_token, user_infor } = this.props
        RequestHelper.CashoutBank(access_token, this.state.amount, item.bank_code, 'mapped_account', JSON.stringify(account_info))
            .then((data) => {
                this.setState({ isLoading: false });
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
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
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
                                {Lang.rut_tien()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                            <TouchableOpacity onPress={() => Actions.history_balance({ balance: this.props.user_infor.balance, balance_type: 'cashout' })}>
                                <Image source={require('../../element/nav-bar/nav-history.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView keyboardShouldPersistTaps='always' >
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
                                        placeholder={Lang.so_tien()}
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
                        {renderIf(this.state.banks_acc.length > 0)(
                            <View style={styles.FormControl_Group}>
                                <View style={styles.FormControl_Title}>
                                    <Text style={styles.FormControl_TitleText}>
                                        {Lang.ngan_hang().toUpperCase()}
                                    </Text>
                                </View>
                                <View style={[styles.FormControl_Content, { justifyContent: 'center', alignItems: 'center' }]}>
                                    {
                                        this.state.banks_acc.map((item, i) => {
                                            return (
                                                <TouchableOpacity key={i} onPress={this.onPressBankAcc.bind(this, item)} style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                                                    <View style={styles.FormControl_TouchRowSelect}>
                                                        <View style={[styles.FormControl_TouchRowBank, { borderWidth: 0.5, borderColor: '#808080' }]}>
                                                            <Image source={require('../../element/logo-bank/oceanbank.png')} style={[styles.FormControl_TouchRowBankImg]} />
                                                        </View>
                                                        <View style={styles.FormControl_TouchInfo}>
                                                            <Text style={styles.FormControl_TouchTitleBank} numberOfLines={1}>{item.bank_name}</Text>
                                                            <Text style={styles.FormControl_TouchTitleNumber} numberOfLines={1}>•••• {item.account_number.substr(item.account_number.length - 4, 4)}</Text>
                                                            <Text style={styles.FormControl_TouchTitleFullName} numberOfLines={1}>{item.holder_name} • {item.account_type}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        )}
                        <View style={styles.FormControl_Group}>
                            <View style={styles.FormControl_Title}>
                                <Text style={styles.FormControl_TitleText}>
                                    {Lang.chon_hinh_thuc_rut().toUpperCase()}
                                </Text>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_Row} >
                                    <ListView
                                        showsVerticalScrollIndicator={false}
                                        keyboardShouldPersistTaps='always'
                                        enableEmptySections={true}
                                        dataSource={this.state.dataSource_method}
                                        renderRow={(data, sectionID, rowID) => <RowData {...data} onPressRow={this.onPressMethod.bind(this, data)} />}
                                    />
                                </View>
                            </View>
                            <View style={styles.FormControl_Note}>
                                <Text style={styles.FormControl_NoteText}>
                                    {Lang.des_rut_tien()}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                    {renderIf(this.state.isLoading)(
                        <Loading />
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
    ds_cashout_method: state.taskState.ds_cashout_method,
    cashout_acc: state.taskState.cashout_acc,
})

export default connect(mapStateToProps)(AppotaView)
