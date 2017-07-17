import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage,
    Platform,
    ScrollView,
    TextInput,
    ListView,
    Keyboard,
    RefreshControl
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import moment from 'moment';
import vi from 'moment/locale/vi.js';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop()
}

var contact_data = [];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isFirst: true,
            isFocused: false,
            refreshing: false,
            isLoading: false,
            text: '',
            contact_number: props.contact_number ? props.contact_number : '',
            amount: '',
            sAmount: '',
            message: '',
            height: 0,
            isGroup: 'no',
            dataSource: ds.cloneWithRows(props.ds_history_transfer)
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_transfer');
        appsFlyer.trackEvent('af_transfer', {}, () => { }, () => { });
        AppEventsLogger.logEvent(`fb_transfer`, 1);

        setTimeout(() => {
            if (this.props.ds_history_transfer.length == 0)
                this.GetHistory();
        }, 200);
    }

    componentWillReceiveProps() {
        if (!this.state.isFirst)
            AsyncStorage.getItem("contact_number").then((value) => {
                if (value != null && value.length != 0) {
                    var data = JSON.parse(value);
                    var contacts = '';
                    if (data.isGroup == 'yes') {
                        var obj = JSON.parse(data.contact_number);
                        var args = Object.keys(obj).map(function (k) { return obj[k] });
                        contacts = args.join(',');
                    }

                    this.setState({
                        receivers: data.contact_number,
                        contact_number: data.isGroup == 'no' ? data.contact_number : contacts,
                        isGroup: data.isGroup
                    });
                }
            }).done();
    }

    GetHistory() {
        var start = moment().format('YYYYMM') + '01';
        var end = moment().format('YYYYMMDD');
        let { dispatch, access_token } = this.props
        this.setState({ isLoading: true });
        RequestHelper.ListHistory(access_token, 5, 0, start, end, 'transfer')
            .then((respone) => {
                if (respone.status == 200) {
                    var data = JSON.parse(respone._bodyText).data;
                    dispatch(taskActionCreators.update_ds_history_transfer(data))
                    this.setState({
                        isLoading: false,
                        refreshing: false,
                        dataSource: ds.cloneWithRows(data)
                    });
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false, refreshing: false, });
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
            message: fieldName == 'textMessage' ? '' : this.state.message,
            contact_number: fieldName == 'ContactNumber' ? '' : this.state.contact_number,
            sAmount: fieldName == 'textMoney' ? '' : this.state.sAmount,
            amount: fieldName == 'textMoney' ? '' : this.state.amount
        })
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    onPressChuyenTien() {
        Keyboard.dismiss()
        if (this.state.contact_number.length < 9) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.nhap_so_dien_thoai(), flag: 'error' });
            return;
        }
        if (this.state.amount.length == 0) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.nhap_so_tien(), flag: 'error' });
            return;
        }
        if (this.state.message.length == 0) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.nhap_noi_dung(), flag: 'error' });
            return;
        }
        if (parseInt(this.state.amount) < 10000) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.nhap_so_tien_min(10), flag: 'error' });
            return;
        }
        if (parseInt(this.state.amount) > parseInt(this.props.user_infor.balance, '.', '')) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.khong_du_tien(), flag: 'error' });
            return;
        }
        this.RequestTransfer();
    }

    RequestTransfer() {
        this.setState({ isLoading: true });
        let { access_token, user_infor } = this.props
        if (this.state.isGroup == 'no') {
            RequestHelper.RequestTransfer(access_token, this.state.contact_number, parseInt(this.state.amount), this.state.message)
                .then((data) => {
                    this.setState({ isLoading: false });
                    if (data.status == 200) {
                        var trans = JSON.parse(data._bodyText)
                        if (user_infor.pay_verify_method == 'NONE')
                            Actions.protected({ transaction_id: trans.transaction_id, transaction_type: 'transfer' })
                        else
                            Actions.transfer_otp({ transaction_id: trans.transaction_id, transaction_type: 'transfer' })
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
        else {
            RequestHelper.RequestTransferGroup(access_token, this.state.receivers, parseInt(this.state.amount), this.state.message)
                .then((data) => {
                    this.setState({ isLoading: false });
                    if (data.status == 200) {
                        var trans = JSON.parse(data._bodyText)
                        if (user_infor.pay_verify_method == 'NONE')
                            Actions.protected({ transaction_id: trans.transaction_id, transaction_type: 'transfer' })
                        else
                            Actions.transfer_otp({ transaction_id: trans.transaction_id, transaction_type: 'transfer' })
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
    }

    onTextChange(text) {
        var _amount = Utils.replaceAll(text, '.', '');
        this.setState({
            amount: _amount,
            sAmount: Utils.toDotString(parseInt(_amount)).toString() == 'NaN' ? '0' : Utils.toDotString(parseInt(_amount))
        })
    }

    onPressRecent(data) {
        var extra_info = JSON.parse(data.extra_info);
        this.setState({
            contact_number: extra_info.receiver_phone_number,
            amount: data.amount < 0 ? -data.amount : data.amount,
            sAmount: Utils.number_format(data.amount < 0 ? -data.amount : data.amount, '.', '.')
        })
    }

    onContactChange(text) {
        this.setState({
            contact_number: text
        })
    }

    filterContact(item, keyword) {
        var number = item.number;
        var keyword = keyword;
        return (number.indexOf(keyword, 0) == -1) ? false : true;
    }

    onPressContactFilter(data) {
        this.setState({
            contact_number: data.number
        });
    }

    renderRowRecent(data, sectionID, rowID) {
        var day = moment.unix(data.timestamp);
        day.locale(Lang.getLanguage());
        var time = day.fromNow();

        var extra_info = JSON.parse(data.extra_info);
        return (
            <View style={styles.ListRecent_Row}>
                <View style={styles.ListRecent_Item}>
                    <TouchableOpacity onPress={this.onPressRecent.bind(this, data)} style={styles.ListRecent_ItemTouch}>
                        <View style={styles.ListRecent_Info}>
                            <Text style={styles.ListRecent_InfoPhone}>
                                {extra_info.receiver_phone_number}
                            </Text>
                            <Text style={styles.ListRecent_InfoDate}>
                                {time}
                            </Text>
                        </View>
                        <View style={styles.ListRecent_Money}>
                            <Text style={styles.ListRecent_MoneyText}>
                                {Utils.number_format(-data.amount, '.', '.')} VNĐ
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.ListRecent_More}>
                    <View style={styles.ListContact_MoreTouch}>
                        <Image style={styles.ListContact_MoreImg} source={require('../../element/form/ic-more-white.png')} />
                    </View>
                </View>
            </View>
        );
    }

    _onRefresh() {
        let { dispatch } = this.props
        dispatch(taskActionCreators.update_ds_history_transfer([]))
        this.setState({ refreshing: true });
        this.GetHistory();
    }

    goToContact = () => {
        this.setState({
            isFirst: false
        }, () => {
            Actions.contact({ isGroup: true })
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
                                {Lang.chuyen_tien()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                            <TouchableOpacity onPress={() => Actions.history_balance({ balance: this.props.user_infor.balance, balance_type: 'transfer' })}>
                                <Image source={require('../../element/nav-bar/nav-history.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />} style={styles.FormControl_Scroll} keyboardShouldPersistTaps='always' >
                        <View style={styles.FormControl_Group}>
                            <View style={styles.FormControl_Title}>
                                <Text style={styles.FormControl_TitleText}>
                                    {Lang.thong_tin().toUpperCase()}
                                </Text>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_Input}>
                                    <TextInput
                                        ref={'ContactNumber'}
                                        autoCapitalize="none"
                                        autoFocus={false}
                                        keyboardType='phone-pad'
                                        placeholder={Lang.so_dien_thoai()}
                                        placeholderTextColor="rgba(0,0,0,0.3)"
                                        value={this.state.contact_number}
                                        autoCorrect={false}
                                        returnKeyType={"next"}
                                        onBlur={() => this._onBlur()}
                                        onFocus={() => this._onFocus()}
                                        onChangeText={(text) => this.onContactChange(text)}
                                        style={styles.FormControl_Input_Enter}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                    />
                                    {renderIf(this.state.contact_number != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this._clearText('ContactNumber')} style={styles.Input_Clear}>
                                            <Image source={require('../../element/form/ic-clear.png')} style={styles.Input_ClearIcon} />
                                        </TouchableOpacity>
                                    )}
                                    {renderIf(this.state.contact_number == '' || this.state.isFocused == false)(
                                        <TouchableOpacity onPress={this.goToContact} style={styles.FormControl_Addon}>
                                            <Image source={require('../../element/form/ic-contact.png')} style={styles.FormControl_AddonIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <View style={styles.FormControl_Line}></View>
                                <View style={styles.FormControl_Input}>
                                    <TextInput
                                        ref={'textMoney'}
                                        autoCapitalize="none"
                                        autoFocus={false}
                                        keyboardType='phone-pad'
                                        placeholder={Lang.so_tien()}
                                        placeholderTextColor="rgba(0,0,0,0.3)"
                                        value={this.state.sAmount}
                                        autoCorrect={false}
                                        returnKeyType={"next"}
                                        onBlur={() => this._onBlur()}
                                        onFocus={() => this._onFocus()}
                                        onChangeText={(text) => this.onTextChange(text)}
                                        style={styles.FormControl_Input_Enter}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                    />
                                    {renderIf(this.state.amount != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this._clearText('textMoney')} style={styles.FormControl_Addon}>
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
                                <View style={styles.FormControl_Line}></View>
                                <View style={styles.FormControl_TextArea}>
                                    <TextInput
                                        ref={'textMessage'}
                                        editable={true}
                                        autoCapitalize="none"
                                        maxLength={80}
                                        autoFocus={false}
                                        placeholder={Lang.noi_dung()}
                                        placeholderTextColor="rgba(0,0,0,0.3)"
                                        value={this.state.message}
                                        multiline={true}
                                        autoCorrect={false}
                                        returnKeyType={"done"}
                                        onSubmitEditing={() => this.onPressChuyenTien()}
                                        onBlur={() => this._onBlur()}
                                        onFocus={() => this._onFocus()}
                                        onChangeText={(message) => this.setState({ message })}
                                        style={[styles.default, styles.FormControl_Textarea_Enter, { height: Math.max(44, this.state.height) }]}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        onChange={(event) => {
                                            this.setState({
                                                message: event.nativeEvent.message,
                                                height: event.nativeEvent.contentSize.height,
                                            });
                                        }}
                                    />
                                    {renderIf(this.state.message != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this._clearText('textMessage')} style={styles.FormControl_Addon}>
                                            <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_AddonIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                        <View style={styles.FormControl_Group}>
                            <View style={styles.FormControl_Title}>
                                <Text style={styles.FormControl_TitleText}>
                                    {Lang.gan_day().toUpperCase()}
                                </Text>
                            </View>
                            <View style={styles.ListRecentEvent}>
                                <ListView
                                    showsVerticalScrollIndicator={false}
                                    initialListSize={5}
                                    keyboardShouldPersistTaps='always'
                                    enableEmptySections={true}
                                    dataSource={this.state.dataSource}
                                    renderRow={this.renderRowRecent.bind(this)}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.FormControl_Button}>
                        {renderIf(this.state.contact_number != '' && this.state.amount != '')(
                            <TouchableOpacity onPress={() => this.onPressChuyenTien()} style={styles.FormControl_ButtonTouch} >
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.chuyen_tien().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {renderIf(this.state.contact_number == '' || this.state.amount == '')(
                            <View style={styles.FormControl_ButtonTouchDisable}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.chuyen_tien().toUpperCase()}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
                {renderIf(Platform.OS == 'ios')(
                    <KeyboardSpacer />
                )}
                {renderIf(this.state.isLoading)(
                    <Loading />
                )}
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
    ds_history_transfer: state.taskState.ds_history_transfer,
})

export default connect(mapStateToProps)(AppotaView)
