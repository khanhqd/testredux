import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    ListView,
    TextInput,
    Image,
    Keyboard
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Actions.pop()
}

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: false,
            isFocused: false,
            bank_name: '',
            dataSource: ds.cloneWithRows(props.ds_bank_fee),
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_bank');
    }

    SumTransactionFee(amount, transaction_fee, transaction_percent_fee) {
        return (amount * transaction_percent_fee / 100 + transaction_fee);
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    onPressBankItem(rowData) {
        Keyboard.dismiss()
        GoogleAnalytics.trackEvent('ga_bank', 'Bank item ' + rowData.name);
        appsFlyer.trackEvent(`af_bank_${rowData.name}`, {}, () => { }, () => { });
        AppEventsLogger.logEvent(`fb_bank_${rowData.name}`, 1);

        if (this.props.page == 'cashout') {
            var fee = this.SumTransactionFee(this.props.amount, parseInt(rowData.transaction_fee), parseInt(rowData.transaction_percent_fee));
            Actions.cashout_bank_acc({
                method: this.props.method,
                bank_name: rowData.name,
                bank_code: rowData.code,
                amount: this.props.amount,
                balance: this.props.balance,
                sAmount: Utils.number_format(this.props.amount, '.', '.'),
                transaction_fee: fee == 0 ? Lang.mien_phi() : Utils.number_format(fee, '.', '.') + ' đ',
                total: Utils.number_format(parseInt(fee) + parseInt(this.props.amount), '.', '.'),
            });
        }
        else if (this.props.page == 'topup') {
            var fee = this.SumTransactionFee(this.props.amount, parseInt(rowData.topup_transaction_fee), parseInt(rowData.topup_transaction_percent_fee));
            Actions.mobile_topup_receipt({
                method: 'topup_bank',
                bank_name: rowData.name,
                bank_code: rowData.code,
                amount: this.props.amount,
                contact_number: this.props.contact_number,
                cashback_percent: this.props.cashback_percent,
                sAmount: Utils.number_format(this.props.amount, '.', '.'),
                transaction_fee: fee == 0 ? Lang.mien_phi() : Utils.number_format(fee, '.', '.') + ' đ',
                total: Utils.number_format(parseInt(fee) + parseInt(this.props.amount), '.', '.'),
            });
        }
        else if (this.props.page == 'cashin') {
            var fee = this.SumTransactionFee(this.props.amount, parseInt(rowData.cashin_transaction_fee), parseInt(rowData.cashin_transaction_percent_fee));
            Actions.cashin_receipt({
                method: 'bank',
                bank_name: rowData.name,
                bank_code: rowData.code,
                amount: this.props.amount,
                sAmount: Utils.number_format(this.props.amount, '.', '.'),
                transaction_fee: fee == 0 ? Lang.mien_phi() : Utils.number_format(fee, '.', '.') + ' đ',
                total: Utils.number_format(parseInt(fee) + parseInt(this.props.amount), '.', '.'),
            });
        }
        else if (this.props.page == 'games') {
            var games = this.props.games;
            games.transaction_fee = rowData.game_transaction_fee;
            games.transaction_percent_fee = rowData.game_transaction_percent_fee;
            games.bank_code = rowData.code;
            games.bank_name = rowData.name;
            Actions.games_topup_receipt({ games: games });
        }
        else if (this.props.page == 'cards') {
            var cards = this.props.cards;
            cards.transaction_fee = rowData.transaction_fee;
            cards.transaction_percent_fee = rowData.transaction_percent_fee;
            cards.bank_code = rowData.code;
            cards.bank_name = rowData.name;
            Actions.buy_cards_receipt({ cards: cards });
        }
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={this.onPressBankItem.bind(this, rowData)} style={styles.ViewBank_ListTouch}>
                <View style={styles.ViewBank_ListTouch_Inner}>
                    <View style={styles.ViewBank_ListPic}>
                        <Image source={{ uri: rowData.icon }} style={styles.ViewBank_ListImg} />
                    </View>
                </View>
            </TouchableOpacity>);
    }

    onSearchBank(keyword) {
        var data = this.props.ds_bank_fee.filter((item) => this.filterBankName(item, keyword));
        this.setState({ bank_name: keyword, dataSource: ds.cloneWithRows(data) });
    }

    filterBankName(item, keyword) {
        return (item.name.toLowerCase().indexOf(keyword.toLowerCase(), 0) == -1) ? false : true;
    }

    _onBlur(e) {
        this.setState({ isFocused: false })
    }

    _onFocus(e) {
        this.setState({ isFocused: true })
    }

    _clearAll(fieldName) {
        Keyboard.dismiss()
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({ bank_name: '', dataSource: ds.cloneWithRows(this.props.ds_bank_fee) })
    }

    _clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            bank_name: '',
            isFocused: true,
            dataSource: ds.cloneWithRows(this.props.ds_bank_fee)
        })
    }

    render() {
        return (
            <View style={[styles.container, styles.tabExplore]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {this.props.title}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl_Search}>
                    <View style={styles.FormControl_Search_Inner}>
                        <TextInput
                            ref={'textClear'}
                            autoCapitalize="none"
                            autoFocus={false}
                            placeholder={Lang.tim_kiem()}
                            placeholderTextColor="#8E8E93"
                            value={this.state.bank_name}
                            autoCorrect={false}
                            returnKeyType={"done"}
                            onBlur={this._onBlur.bind(this)}
                            onFocus={this._onFocus.bind(this)}
                            onChangeText={(text) => this.onSearchBank(text)}
                            style={styles.FormControl_SearchInput}
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <Image source={require('../../element/explore/ic-search-gray.png')} style={styles.FormControl_SearchIcon} />
                        {renderIf(this.state.bank_name != '' && this.state.isFocused == true)(
                            <TouchableOpacity onPress={() => this._clearText('textClear')} style={styles.FormControl_SearchClear}>
                                <Image source={require('../../element/form/ic-clear-search.png')} style={styles.FormControl_SearchClearIcon} />
                            </TouchableOpacity>
                        )}
                        {renderIf(this.state.isFocused == true)(
                            <View style={styles.FormControl_SearchClose}>
                                <TouchableOpacity onPress={() => this._clearAll('textClear')}>
                                    <Text style={styles.FormControl_SearchCloseText}>
                                        {Lang.button_huy()}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.ViewBank}>
                    <View style={styles.ViewBank_List}>
                        <View style={styles.ViewBank_ListScroll_Inner}>
                            <ListView
                                showsVerticalScrollIndicator={false}
                                initialListSize={this.props.ds_bank_fee.length}
                                enableEmptySections={true}
                                keyboardShouldPersistTaps='always'
                                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRow.bind(this)} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
    ds_bank_fee: state.taskState.ds_bank_fee,
})

export default connect(mapStateToProps)(AppotaView)
