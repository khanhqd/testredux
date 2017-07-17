import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ListView,
    AsyncStorage,
    Platform,
    ScrollView,
    TextInput,
    Modal,
    Image,
    Keyboard
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import moment from 'moment'
import vi from 'moment/locale/vi.js'
import { CASHBACK_PERCENT } from '../Helpers/constString'

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');


const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop();
}

var games = {
    game_id: '',
    game_name: '',
    appota_id: '',
    server_id: '',
    server_name: '',
    role_id: '',
    role_name: '',
    packageId: '',
    packageValue: '',
    gameCurrency: '',
    amount: '',
    payment_method: '',
    transaction_fee: '',
    transaction_percent_fee: '',
    bank_code: ''
};

class Games_ThongTin extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            modalVisible: false,
            modalVisibleRole: false,
        }
        Text.defaultProps.allowFontScaling=false;
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setModalVisibleRole(visible) {
        this.setState({ modalVisibleRole: visible });
    }

    _onPressServer(item) {
        GoogleAnalytics.trackEvent('ga_games_topup', `Select server ${item.server_name}`);
        this.setState({
            modalVisible: false,
        });
        games.server_name = item.server_name,
            games.server_id = item.server_id;
        games.role_name = ''; // sau khi chọn lại server thì reset nhân vật (get lại nhân vật của server đó)
        games.role_id = '';
        this.props.onPressServer();
    }

    _onPressRole(item) {
        GoogleAnalytics.trackEvent('ga_games_topup', `Select role ${item.role_name}`);
        this.setState({
            modalVisibleRole: false
        });
        games.role_name = item.role_name;
        games.role_id = item.role_id;
    }

    render() {
        var _server_name = games.server_name.length == 0 ? (this.props.server_games.length > 0 ? this.props.server_games[0].server_name : '') : games.server_name;
        var _role_name = games.role_name.length == 0 ? (this.props.user_games.length > 0 ? this.props.user_games[0].role_name : '') : games.role_name;
        return (
            <View style={styles.Personal}>
                <View style={styles.Personal_Setting}>
                    <View style={styles.FormControl_Group}>
                        <View style={styles.FormControl_Title}>
                            <Text style={styles.FormControl_TitleText}>
                                {Lang.thong_tin()}
                            </Text>
                        </View>
                        <View style={styles.FormControl_Content}>
                            <View style={styles.FormControl_Setting}>
                                <View style={styles.FormControl_Setting_Group}>
                                    <View style={styles.FormControl_Setting_Touch}>
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                Server
                                            </Text>
                                        </View>
                                        {renderIf(this.props.server_games.length <= 1)(
                                            <View style={styles.FormControl_Setting_Touch_InfoRight}>
                                                <Text style={styles.FormControl_Setting_Touch_InfoTitleRight} numberOfLines={1}>
                                                    {_server_name}
                                                </Text>
                                            </View>
                                        )}
                                        {renderIf(this.props.server_games.length > 1)(
                                            <TouchableOpacity onPress={() => this.setModalVisible(true)} style={styles.FormControl_Setting_Touch_InfoRight}>
                                                <Text style={styles.FormControl_Setting_Touch_InfoTitleRight} numberOfLines={1}>
                                                    {_server_name}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                        <View style={styles.FormControl_Setting_Touch_Point}>
                                            <Image source={require('../../element/form/ic-point.png')} style={styles.FormControl_Setting_Touch_PointImg} />
                                        </View>
                                    </View>
                                    <View style={styles.FormControl_Setting_Line}></View>
                                </View>
                                <View style={styles.FormControl_Setting_Group}>
                                    <View style={styles.FormControl_Setting_Touch}>
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                {Lang.nhan_vat()}
                                            </Text>
                                        </View>
                                        {renderIf(this.props.user_games.length <= 1)(
                                            <View style={styles.FormControl_Setting_Touch_InfoRight}>
                                                <Text style={styles.FormControl_Setting_Touch_InfoTitleRight} numberOfLines={1}>
                                                    {_role_name}
                                                </Text>
                                            </View>
                                        )}
                                        {renderIf(this.props.user_games.length > 1)(
                                            <TouchableOpacity onPress={() => this.setModalVisibleRole(true)} style={styles.FormControl_Setting_Touch_InfoRight}>
                                                <Text style={styles.FormControl_Setting_Touch_InfoTitleRight} numberOfLines={1}>
                                                    {_role_name}
                                                </Text>
                                            </TouchableOpacity>
                                        )}

                                        <View style={styles.FormControl_Setting_Touch_Point}>
                                            <Image source={require('../../element/form/ic-point.png')} style={styles.FormControl_Setting_Touch_PointImg} />
                                        </View>
                                    </View>
                                    <View style={styles.FormControl_Setting_Line}></View>
                                </View>
                                <View style={styles.FormControl_Setting_Group}>
                                    <View style={styles.FormControl_Setting_Touch}>
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                Game
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_Setting_Touch_InfoRight}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitleRight} numberOfLines={1}>
                                                {games.game_name}
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_Setting_Touch_Point} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Modal onRequestClose={() => { }} animationType={"slide"} transparent={true} visible={this.state.modalVisible} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={styles.popupDialog}>
                            <View style={styles.popupHeader}>
                                <Text style={styles.popupHeader_Text}>
                                    {Lang.chon_server()}
                                </Text>
                                <Text style={styles.popupHeader_TextSub}>
                                    Game: {games.game_name}
                                </Text>
                            </View>
                            <ScrollView style={{ height: this.props.server_games.length < 3 ? 120 : 270, marginTop: 15, }}>
                                {this.props.server_games.map((item, i) => {
                                    return (
                                        <View style={styles.popupFooterList} key={i} >
                                            <TouchableOpacity style={styles.popupFooter_Touch} key={i} onPress={() => this._onPressServer(item)}>
                                                <Text style={styles.popupFooter_Text} >
                                                    {item.server_name}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <Modal onRequestClose={() => { }} animationType={"slide"} transparent={true} visible={this.state.modalVisibleRole}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={styles.popupDialog}>
                            <View style={styles.popupHeader}>
                                <Text style={styles.popupHeader_Text}>
                                    {Lang.chon_nhan_vat()}
                                </Text>
                                <Text style={styles.popupHeader_TextSub}>
                                    Server: {_server_name}
                                </Text>
                            </View>
                            <ScrollView style={{ height: this.props.user_games.length <= 2 ? 90 : 180, marginTop: 15, }}>
                                {this.props.user_games.map((item, i) => {
                                    return (
                                        <View style={styles.popupFooterList} key={i} >
                                            <TouchableOpacity style={styles.popupFooter_Touch} key={i} onPress={() => this._onPressRole(item)}>
                                                <Text style={styles.popupFooter_Text} >
                                                    {item.role_name}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

class Games_HinhThuc extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            payment_method: '',
            visa_fee: {
                transaction_fee: 0,
                transaction_percent_fee: 0,
                bank_code: ''
            }
        }
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

    onPressPaymentMethod(flag) {
        GoogleAnalytics.trackEvent('ga_games_topup', `Select payment method ${flag}`)
        games.payment_method = flag;
        if (flag == 'cc') {
            games.transaction_fee = this.props.visa_fee.game_transaction_fee;
            games.transaction_percent_fee = this.props.visa_fee.game_transaction_percent_fee;
            games.bank_code = this.props.visa_fee.bank_code;
        }
        else if (flag == 'wallet' || flag == 'cashback') {
            games.transaction_fee = 0;
            games.transaction_percent_fee = 0;
        }

        this.setState({
            payment_method: flag
        });
        Actions.games_topup_package({
            games: games
        });
        this.props.onPress()
    }


    render() {
        return (
            <View style={styles.FormControl_Group}>
                <View style={styles.FormControl_Title}>
                    <Text style={styles.FormControl_TitleText}>
                        {Lang.hinh_thuc_thanh_toan().toUpperCase()}
                    </Text>
                </View>
                <View style={styles.FormControl_Content}>
                    <View style={styles.FormControl_Select}>
                        <View style={styles.FormControl_SelectGroup}>
                            <TouchableOpacity onPress={() => this.onPressPaymentMethod('wallet')} style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                                <View style={this.renderBgMethod('wallet')}>
                                    <Image source={require('../../element/form/pay-payhub.png')} style={styles.FormControl_TouchRowImg} />
                                    <Text style={this.renderTxtMethod('wallet')}>{Lang.tk_vi()}</Text>
                                    <Text style={this.state.payment_method == 'wallet' ? styles.FormControl_TouchSale_Active : styles.FormControl_TouchSale}>
                                        <Text style={{ fontSize: 14, letterSpacing: -0.16, fontWeight: '600', }}>{Lang.co_loi()}</Text> {CASHBACK_PERCENT.GAME_TOPUP_WALLET}
                                        <Text style={this.state.payment_method == 'wallet' ? styles.FormControl_TouchSale_Icon_Active : styles.FormControl_TouchSale_Icon}>%</Text></Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onPressPaymentMethod('cashback')} style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                                <View style={this.renderBgMethod('cashback')}>
                                    <Image source={require('../../element/form/pay-payhub.png')} style={styles.FormControl_TouchRowImg} />
                                    <Text style={this.renderTxtMethod('cashback')}>{Lang.tk_cashback()}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onPressPaymentMethod('card')} style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                                <View style={this.renderBgMethod('card')}>
                                    <Image source={require('../../element/form/pay-phone-card.png')} style={styles.FormControl_TouchRowImg} />
                                    <Text style={this.renderTxtMethod('card')}>{Lang.the_cao()}/AC</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onPressPaymentMethod('bank')} style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                                <View style={this.renderBgMethod('bank')}>
                                    <Image source={require('../../element/form/pay-atm-ibanking.png')} style={styles.FormControl_TouchRowImg} />
                                    <Text style={this.renderTxtMethod('bank')}>ATM/iBanking</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onPressPaymentMethod('cc')} style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                                <View style={this.renderBgMethod('cc')}>
                                    <Image source={require('../../element/form/pay-credit-card.png')} style={styles.FormControl_TouchRowImg} />
                                    <Text style={this.renderTxtMethod('cc')}>{Lang.the_tin_dung()}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl_Note}>
                    <Text style={styles.FormControl_NoteText}>
                        {Utils.Description_ThanhToan()}
                    </Text>
                </View>
            </View>
        );
    }
};

class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        games = {
            game_id: props.game_id,
            game_name: props.game_name,
            appota_id: props.user_infor.phone_number == props.user_infor.username ? '' : props.user_infor.username,
            server_id: '',
            server_name: '',
            role_id: '',
            role_name: '',
            packageId: '',
            packageValue: '',
            gameCurrency: '',
            amount: '',
            payment_method: '',
            transaction_fee: 0,
            transaction_percent_fee: 0,
            bank_code: ''
        }
        this.state = {
            isLoading: false,
            isAppotaId: false,
            isFocused: false,
            server_games: [],
            user_games: [],
            recent_id: []
        }
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_games_topup_detail');
        AppEventsLogger.logEvent('fb_games_topup_detail', 1);
        appsFlyer.trackEvent('af_games_topup_detail', {}, () => { }, () => { });
    }

    componentWillMount() {
        AsyncStorage.getItem(`recent_game_${games.game_id}`).then((value) => {
            if (value != null && value.length != 0) {
                this.setState({ recent_id: JSON.parse(value) })
            }
        }).done()
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    onPressMethod() {
        var new_recent = JSON.parse(JSON.stringify(this.state.recent_id))
        new_recent.push({
            game_id: games.game_id,
            appota_id: games.appota_id,
            server_id: games.server_id,
            server_name: games.server_name,
            role_id: games.role_id,
            role_name: games.role_name,
            timestamp: moment().valueOf()
        })
        AsyncStorage.setItem(`recent_game_${games.game_id}`, JSON.stringify(this.removeDuplicateArr(new_recent)))
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
            return 0;
        });
        return arr.filter((item, index, self) => self.findIndex((t) => { return t.appota_id === item.appota_id && t.server_id == item.server_id && t.role_id == item.role_id }) === index && index < 6)
    }

    GetListGamesServer() {
        Keyboard.dismiss()
        this.setState({ isLoading: true });
        let { access_token } = this.props
        RequestHelper.ListServerGame(access_token, games.game_id, games.appota_id)
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    var servers = JSON.parse(data._bodyText);
                    if (servers.data.length == 0) {
                        Actions.popup({ title: Lang.thong_bao(), content: Lang.tai_khoan() + ' "' + games.appota_id + '" ' + Lang.khong_ton_tai().toLowerCase(), flag: 'error' });
                        this.setState({ isAppotaId: false });
                    }
                    else {
                        games.server_id = games.server_id.length == 0 ? servers.data[0].server_id : games.server_id;
                        games.server_name = games.server_name.length == 0 ? servers.data[0].server_name : games.server_name;
                        this.GetListGamesRole();
                        this.setState({
                            isAppotaId: true,
                            server_games: servers.data,
                            user_games: []
                        });
                    }
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

    GetListGamesRole() {
        this.setState({ isLoading: true });
        let { access_token } = this.props
        RequestHelper.ListServerRole(access_token, games.game_id, games.appota_id, games.server_id)
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    var users = JSON.parse(data._bodyText);
                    if (users.data.length == 0) {
                        //Alert.alert('Tài khoản "' + games.appota_id + '" không chơi game "' + games.game_name + '"!');
                        games.role_id = '';
                        this.setState({
                            user_games: []
                        });
                    }
                    else {
                        games.role_id = games.role_id.length == 0 ? users.data[0].role_id : games.role_id;
                        games.role_name = games.role_name.length == 0 ? users.data[0].role_name : games.role_name;
                        this.setState({
                            isAppotaId: true,
                            user_games: users.data
                        });
                    }
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

    _onBlur(e) {
        this.setState({ isFocused: false })
    }

    _onFocus(e) {
        this.setState({ isFocused: true })
    }

    _clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        games.appota_id = '';
        games.role_id = '';
        games.role_name = '';
        games.server_id = '';
        games.server_name = '';
        this.setState({
            isFocused: true,
            isAppotaId: false,
            server_games: [],
            user_games: []
        })
    }

    onTextAppotaIdChange(text) {
        games.appota_id = text;
        games.role_id = '';
        games.role_name = '';
        games.server_id = '';
        games.server_name = '';
        this.setState({
            isAppotaId: false,
            server_games: [],
            user_games: []
        });
    }

    onPressRecentGame(item) {
        games.appota_id = item.appota_id;
        games.role_id = item.role_id;
        games.role_name = item.role_name;
        games.server_id = item.server_id;
        games.server_name = item.server_name;
        this.setState({
            isAppotaId: true,
        });
        this.GetListGamesServer()
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
                                {Lang.nap_game2()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView keyboardShouldPersistTaps='always' >
                        <View style={styles.FormControl_Group}>
                            <View style={styles.FormControl_Title}>
                                <Text style={styles.FormControl_TitleText}>
                                    APPOTA ID
                                </Text>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_Input}>
                                    <TextInput
                                        ref={'textClear'}
                                        autoCapitalize="none"
                                        autoFocus={true}
                                        placeholder={Lang.nhap_appota_id()}
                                        placeholderTextColor="rgba(0,0,0,0.3)"
                                        value={games.appota_id}
                                        autoCorrect={false}
                                        returnKeyType={"done"}
                                        onBlur={() => this._onBlur()}
                                        onFocus={() => this._onFocus()}
                                        onSubmitEditing={() => this.GetListGamesServer()}
                                        onChangeText={(text) => this.onTextAppotaIdChange(text)}
                                        style={styles.FormControl_Input_Enter}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                    />
                                    {renderIf(games.appota_id != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this._clearText('textClear')} style={styles.FormControl_Addon}>
                                            <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_AddonIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                        {renderIf(!this.state.isAppotaId && this.state.recent_id.length > 0)(
                            <View style={styles.FormControl_Group}>
                                <View style={styles.FormControl_Title}>
                                    <Text style={styles.FormControl_TitleText}>
                                        {Lang.gan_day().toUpperCase()}
                                    </Text>
                                </View>
                                <View style={styles.ListRecentEvent}>
                                    {this.state.recent_id.map((item, i) => {
                                        var day = moment(item.timestamp);
                                        day.locale(Lang.getLanguage())
                                        var time = day.fromNow()
                                        return (
                                            <View key={i} style={[styles.ListRecent_Row, { borderBottomColor: '#e3e3e3', borderBottomWidth: 1 }]}>
                                                <View style={styles.ListRecent_Item}>
                                                    <TouchableOpacity onPress={this.onPressRecentGame.bind(this, item)} style={styles.ListRecent_ItemTouch}>
                                                        <View style={styles.ListRecent_Info}>
                                                            <Text style={styles.ListRecent_InfoPhone}>
                                                                {item.appota_id}
                                                            </Text>
                                                            <Text style={styles.ListRecent_InfoDate}>
                                                                {item.server_name} · {item.role_name} · {time}
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
                        {renderIf(this.state.user_games.length == 0 && this.state.isAppotaId && !this.state.isLoading)(
                            <View>
                                <Games_ThongTin
                                    appota_id={this.state.isAppotaId ? games.appota_id : ''}
                                    server_games={this.state.server_games}
                                    user_games={this.state.user_games}
                                    onPressServer={() => this.GetListGamesRole()} />
                                <View style={styles.Alert}>
                                    <Text style={styles.Alert_Title}>{Lang.thong_bao()}</Text>
                                    <Text style={styles.Alert_Content}>
                                        {Lang.khong_co_nv_game()} {games.server_name}
                                    </Text>
                                </View>
                            </View>
                        )}
                        {renderIf(this.state.user_games.length > 0 && !this.state.isLoading)(
                            <View>
                                <Games_ThongTin
                                    appota_id={this.state.isAppotaId ? games.appota_id : ''}
                                    server_games={this.state.server_games}
                                    user_games={this.state.user_games}
                                    onPressServer={() => this.GetListGamesRole()} />
                                <Games_HinhThuc visa_fee={this.props.visa_fee} onPress={this.onPressMethod.bind(this)} />
                            </View>
                        )}
                    </ScrollView>

                    {renderIf(games.appota_id.length == 0)(
                        <View style={styles.FormControl_Button}>
                            <View style={styles.FormControl_ButtonTouchDisable}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.lay_thong_tin_game().toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    )}
                    {renderIf(!this.state.isAppotaId && games.appota_id.length != 0)(
                        <View style={styles.FormControl_Button}>
                            <TouchableOpacity style={styles.FormControl_ButtonTouch} onPress={() => this.GetListGamesServer()}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.lay_thong_tin_game().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
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
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
    visa_fee: state.taskState.visa_fee,
})

export default connect(mapStateToProps)(AppotaView)
