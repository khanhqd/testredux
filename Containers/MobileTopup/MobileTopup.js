import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    Platform,
    ListView,
    ScrollView,
    TextInput,
    Image,
    Keyboard
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import Toast from '@remobile/react-native-toast';
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import appsFlyer from 'react-native-appsflyer';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import RowData from './RowData';
import { AppEventsLogger } from 'react-native-fbsdk';
import moment from 'moment'

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading2');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop()
}

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isFirst: true,
            isFocused: false,
            isLoading: false,
            contact_number: props.user_infor.phone_number == null ? '' : props.user_infor.phone_number,
            payment_method: 'wallet',
            percent: 0,
            value: 0,
            price: 0,
            rowID: 0,
            recent: [],
            dataSource: ds.cloneWithRows(props.ds_topup_package),
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_mobile_topup');
        appsFlyer.trackEvent('af_mobile_topup', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_mobile_topup', 1);

        setTimeout(() => {
            this.getRecent()
            if (this.props.ds_topup_package.length == 0)
                this.GetListTopup();
            else
                this.ParseData(this.props.ds_topup_package, this.state.contact_number, this.state.payment_method);
        }, 200);
    }

    getRecent() {
        AsyncStorage.getItem('recent_mobile').then((value) => {
            if (value != null && value.length != 0) {
                this.setState({ recent: JSON.parse(value) })
            }
        }).done()
    }

    remove(array, element) {
        return array.filter(e => e !== element)
    }

    removeDuplicateArr(arr) {
        arr.sort(function (a, b) {
            var timeA = a.timestamp;
            var timeB = b.timestamp;
            if (timeA > timeB) {
                return -1;
            }
            if (timeA < timeB) {
                return 1;
            }
            // names must be equal
            return 0
        })
        var _arr = arr.filter((item, index, self) => self.findIndex((t) => { return t.phone_number === item.phone_number }) === index)
        return new Promise((resole, reject) => {
            try {
                resole(_arr.filter((item, index, self) => index < 3))
            }
            catch (e) {
                reject(e)
            }
        })
    }

    handleRecent() {
        var item = [{
            timestamp: new Date().getTime(),
            phone_number: this.state.contact_number,
            amount: this.state.value
        }]
        var _recent = JSON.parse(JSON.stringify(this.state.recent))
        var _recent_data = _recent.concat(item)
        this.removeDuplicateArr(_recent_data)
            .then((data) => {
                AsyncStorage.setItem('recent_mobile', JSON.stringify(data))
                this.setState({ recent: data })
            })
            .catch((e) => { })
    }

    componentWillReceiveProps() {
        if (!this.state.isFirst) {
            AsyncStorage.getItem("contact_number").then((value) => {
                if (value != null && value.length != 0) {
                    var data = JSON.parse(value);
                    this.setState({
                        contact_number: data.contact_number
                    });
                    this.ParseData(this.props.ds_topup_package, data.contact_number, this.state.payment_method);
                }
            }).done()
        }
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    ParseData(_resData, contact_number, payment_method) {
        var percent = 0;
        if (_resData.length > 0) {
            var vendor = Utils.vendorHelper(contact_number);
            if (vendor == 'viettel') {
                percent = payment_method == 'wallet' ? _resData[this.state.rowID].viettel_ewallet_cashback_percent : _resData[this.state.rowID].viettel_bank_cashback_percent;
            }
            else if (vendor == 'vina') {
                percent = payment_method == 'wallet' ? _resData[this.state.rowID].vinaphone_ewallet_cashback_percent : _resData[this.state.rowID].vinaphone_bank_cashback_percent;
            }
            else if (vendor == 'mobi') {
                percent = payment_method == 'wallet' ? _resData[this.state.rowID].mobifone_ewallet_cashback_percent : _resData[this.state.rowID].mobifone_bank_cashback_percent;
            }
            else {
                percent = 0;
            }
        }
        this.setState({
            percent: Utils.toFixed(percent, 2),
            value: _resData.length > 0 ? _resData[this.state.rowID].value : 0,
            price: _resData.length > 0 ? _resData[this.state.rowID].price : 0,
            dataSource: ds.cloneWithRows(_resData)
        });
    }

    GetListTopup() {
        this.setState({ isLoading: true });
        let { dispatch, access_token } = this.props
        RequestHelper.ListTopup(access_token)
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    var topup = JSON.parse(data._bodyText);
                    dispatch(taskActionCreators.update_ds_topup_package(topup.data))
                    this.ParseData(topup.data, this.state.contact_number, this.state.payment_method)
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

    _onBlur(e) {
        this.setState({ isFocused: false })
    }

    _onFocus(e) {
        this.setState({ isFocused: true })
    }

    _clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            contact_number: '',
            isFocused: true
        })
    }

    onPressPaymentMethod(flag) {
        GoogleAnalytics.trackEvent('ga_mobile_topup', `Select payment method ${flag}`);
        this.setState({ payment_method: flag });
        this.ParseData(this.props.ds_topup_package, this.state.contact_number, flag)
    }

    SumTransactionFee(amount, transaction_fee, transaction_percent_fee) {
        return (amount * transaction_percent_fee / 100 + transaction_fee);
    }

    onPressNapTien() {
        Keyboard.dismiss()

        if (this.state.contact_number.length == 0) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.nhap_so_dien_thoai(), flag: 'error' });
            return;
        }
        if ((this.state.contact_number.length < 9 && this.state.contact_number.length > 0) || this.state.contact_number.length > 11) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.nhap_so_dien_thoai(), flag: 'error' });
            return;
        }
        this.handleRecent()
        if (this.state.payment_method == 'bank')
            Actions.bank({
                page: 'topup',
                title: Lang.nap_dienthoai2(),
                method: this.state.payment_method,
                amount: this.state.value,
                contact_number: this.state.contact_number,
                cashback_percent: this.state.percent,
            })
        else if (this.state.payment_method == 'cc') {
            var fee = this.SumTransactionFee(this.state.price, parseInt(this.props.visa_fee.topup_transaction_fee), parseInt(this.props.visa_fee.topup_transaction_percent_fee));
            Actions.mobile_topup_receipt({
                method: 'topup_cc',
                bank_name: Lang.the_tin_dung(),
                bank_code: this.props.visa_fee.bank_code,
                amount: this.state.value,
                contact_number: this.state.contact_number,
                cashback_percent: this.state.percent,
                sAmount: Utils.number_format(this.state.price, '.', '.'),
                transaction_fee: fee == 0 ? Lang.mien_phi() : Utils.number_format(fee, '.', '.') + ' đ',
                total: Utils.number_format(parseInt(fee) + parseInt(this.state.price), '.', '.'),
            });
        }
        else if (this.state.payment_method == 'wallet') {
            var total = parseInt(this.state.price);
            if (total > this.props.balance) {
                Actions.popup({
                    title: Lang.thong_bao(),
                    content: Lang.tk_khong_du(),
                    flag: 'error'
                });
            }
            else {
                Actions.mobile_topup_receipt({
                    method: 'topup_wallet',
                    bank_name: Lang.tk_vi(),
                    bank_code: '',
                    contact_number: this.state.contact_number,
                    amount: this.state.value,
                    cashback_percent: this.state.percent,
                    sAmount: Utils.number_format(this.state.price, '.', '.'),
                    transaction_fee: Lang.mien_phi(),
                    total: Utils.number_format(this.state.price, '.', '.'),
                });
            }
        }
    }

    onContactChange(text) {
        this.setState({
            contact_number: text
        })
        this.ParseData(this.props.ds_topup_package, text, this.state.payment_method);
    }

    renderBgMethod(flag) {
        if (this.state.payment_method == flag)
            return styles.FormControl_TouchRowSelect_Active;
        else
            return styles.FormControl_TouchRowSelect;
    }

    renderTxtMethod(flag) {
        if (this.state.payment_method == flag)
            return styles.FormControl_TouchTitle_Active;
        else
            return styles.FormControl_TouchTitle;
    }

    renderRow_PaymentMethod(flag) {
        var style_bg_payment;
        var style_txt_payment;
        var icon;
        if (this.state.payment_method == flag) {
            style_bg_payment = styles.FormControl_TouchRowSelect_Active;
            style_txt_payment = styles.FormControl_TouchTitle_Active;
        }
        else {
            style_bg_payment = styles.FormControl_TouchRowSelect;
            style_txt_payment = styles.FormControl_TouchTitle;
        }

        switch (flag) {
            case 'wallet':
                icon = this.state.payment_method == flag ? require('../../element/form/ic-wallet-active.png') : require('../../element/form/ic-wallet.png');
                return (

                    <TouchableOpacity onPress={() => this.onPressPaymentMethod('wallet')} style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                        <View style={this.renderBgMethod('wallet')}>
                            <Image source={require('../../element/form/pay-payhub.png')} style={styles.FormControl_TouchRowImg} />
                            <Text style={this.renderTxtMethod('wallet')}>{Lang.tk_vi()}</Text>
                        </View>
                    </TouchableOpacity>
                );
            case 'bank':
                icon = this.state.payment_method == flag ? require('../../element/form/ic-atm-active.png') : require('../../element/form/ic-atm.png');
                return (
                    <TouchableOpacity onPress={() => this.onPressPaymentMethod('bank')} style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                        <View style={this.renderBgMethod('bank')}>
                            <Image source={require('../../element/form/pay-atm-ibanking.png')} style={styles.FormControl_TouchRowImg} />
                            <Text style={this.renderTxtMethod('bank')}>ATM/iBanking</Text>
                        </View>
                    </TouchableOpacity>
                );
            case 'cc':
                icon = this.state.payment_method == flag ? require('../../element/form/ic-cc-active.png') : require('../../element/form/ic-cc.png');
                return (
                    <TouchableOpacity onPress={() => this.onPressPaymentMethod('cc')} style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                        <View style={this.renderBgMethod('cc')}>
                            <Image source={require('../../element/form/pay-credit-card.png')} style={styles.FormControl_TouchRowImg} />
                            <Text style={this.renderTxtMethod('cc')}>{Lang.the_tin_dung()}</Text>
                        </View>
                    </TouchableOpacity>
                );
        }
    }

    onPressPackage(data, rowID) {
        var percent = 0;
        var vender = Utils.vendorHelper(this.state.contact_number);
        if (vender == 'viettel') {
            percent = this.state.payment_method == 'wallet' ? data.viettel_ewallet_cashback_percent : data.viettel_bank_cashback_percent;
        }
        else if (vender == 'vina') {
            percent = this.state.payment_method == 'wallet' ? data.vinaphone_ewallet_cashback_percent : data.vinaphone_bank_cashback_percent;
        }
        else if (vender == 'mobi') {
            percent = this.state.payment_method == 'wallet' ? data.mobifone_ewallet_cashback_percent : data.mobifone_bank_cashback_percent;
        }
        else {
            percent = 0;
        }

        this.setState({
            value: data.value,
            price: data.price,
            rowID: rowID,
            percent: Utils.toFixed(percent, 2),
            dataSource: ds.cloneWithRows(this.props.ds_topup_package)
        })
    }

    goToContact = () => {
        this.setState({
            isFirst: false
        }, () => {
            Actions.contact({ isGroup: false })
        })
    }

    onPressRecent = (item) => {
        this.setState({
            contact_number: item.phone_number
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
                                {Lang.nap_dienthoai2()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                            <TouchableOpacity onPress={() => Actions.history_balance({ balance: this.props.user_infor.balance, balance_type: 'topup' })}>
                                <Image source={require('../../element/nav-bar/nav-history.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView style={styles.FormControl_Scroll} keyboardShouldPersistTaps='always' >
                        <View style={styles.FormControl_Group}>
                            <View style={styles.FormControl_Title}>
                                <Text style={styles.FormControl_TitleText}>
                                    {Lang.so_dien_thoai().toUpperCase()}
                                </Text>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_Input}>
                                    <TextInput
                                        ref={'textClear'}
                                        autoCapitalize="none"
                                        autoFocus={false}
                                        keyboardType='phone-pad'
                                        placeholder={Lang.so_dien_thoai()}
                                        placeholderTextColor="rgba(0,0,0,0.3)"
                                        value={this.state.contact_number}
                                        autoCorrect={false}
                                        returnKeyType={"done"}
                                        onBlur={() => this._onBlur()}
                                        onFocus={() => this._onFocus()}
                                        onChangeText={(text) => this.onContactChange(text)}
                                        style={styles.FormControl_Input_Enter}
                                        underlineColorAndroid='rgba(0,0,0,0)'

                                    />
                                    {renderIf(this.state.contact_number != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this._clearText('textClear')} style={styles.FormControl_Addon}>
                                            <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_AddonIcon} />
                                        </TouchableOpacity>
                                    )}
                                    {renderIf(this.state.contact_number == '' || this.state.isFocused == false)(
                                        <TouchableOpacity onPress={this.goToContact} style={styles.FormControl_Addon}>
                                            <Image source={require('../../element/form/ic-contact.png')} style={styles.FormControl_AddonIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                        {renderIf(this.state.recent.length > 0)(
                            <View style={styles.FormControl_Group}>
                                <View style={styles.FormControl_Title}>
                                    <Text style={styles.FormControl_TitleText}>
                                        {Lang.gan_day().toUpperCase()}
                                    </Text>
                                </View>
                                <View style={styles.FormControl_Content}>
                                    {this.state.recent.map((item, i) => {
                                        var day = moment(item.timestamp);
                                        day.locale(Lang.getLanguage())
                                        var time = day.fromNow()
                                        return (
                                            <View key={i} style={[styles.ListRecent_Row]}>
                                                <View style={styles.ListRecent_Item}>
                                                    <TouchableOpacity onPress={() => this.onPressRecent(item)} style={styles.ListRecent_ItemTouch}>
                                                        <View style={styles.ListRecent_Info}>
                                                            <Text style={styles.ListRecent_InfoPhone}>
                                                                {item.phone_number}
                                                            </Text>
                                                            <Text style={[styles.ListRecent_InfoDate, { fontSize: 13 }]}>
                                                                {Utils.number_format(item.amount, 0, '.', '.')} đ · {time}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        )}
                        <View style={styles.FormControl_Group}>
                            <View style={styles.FormControl_Title}>
                                <Text style={styles.FormControl_TitleText}>
                                    {Lang.menh_gia().toUpperCase()}
                                </Text>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_Select}>
                                    <ListView
                                        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 10 }}
                                        showsVerticalScrollIndicator={false}
                                        keyboardShouldPersistTaps='always'
                                        enableEmptySections={true}
                                        dataSource={this.state.dataSource}
                                        renderRow={(data, sectionID, rowID) => <RowData data={data} value={this.state.value} payment_method={this.state.payment_method} contact_number={this.state.contact_number} onPress={this.onPressPackage.bind(this, data, rowID)} />}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.FormControl_Group}>
                            <View style={styles.FormControl_Title}>
                                <Text style={styles.FormControl_TitleText}>
                                    {Lang.hinh_thuc_thanh_toan().toUpperCase()}
                                </Text>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_Select}>
                                    <View style={styles.FormControl_SelectGroup}>
                                        {this.renderRow_PaymentMethod('wallet')}
                                        {this.renderRow_PaymentMethod('bank')}
                                        {this.renderRow_PaymentMethod('cc')}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.FormControl_Note}>
                                <Text style={styles.FormControl_NoteText}>
                                    {Utils.Description_ThanhToan()}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.FormControl_Button}>
                        {renderIf(this.props.ds_topup_package.length > 0 && this.state.contact_number.length > 0)(
                            <TouchableOpacity style={styles.FormControl_ButtonTouch} onPress={() => this.onPressNapTien()}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.thanh_toan().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {renderIf(this.props.ds_topup_package.length == 0 || this.state.contact_number.length == 0)(
                            <View style={styles.FormControl_ButtonTouchDisable}>
                                <Text style={styles.FormControl_ButtonTextDisable}>
                                    {Lang.thanh_toan().toUpperCase()}
                                </Text>
                            </View>
                        )}
                    </View>
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
    visa_fee: state.taskState.visa_fee,
    ds_topup_package: state.taskState.ds_topup_package,
})

export default connect(mapStateToProps)(AppotaView)
