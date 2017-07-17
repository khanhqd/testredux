import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    StatusBar,
    Platform,
    AsyncStorage,
    Vibration,
} from "react-native";
import { Actions } from "react-native-router-flux"
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
var styles = require('../Common/style.js');
import renderIf from '../Common/renderIf'
import Toast from '@remobile/react-native-toast';
import TouchID from 'react-native-touch-id';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import * as Requests from '../Helpers/Requests'
import { COLOR } from '../Helpers/constStyle'

var Lang = require('../Common/Lang');
var RequestHelper = require('../Common/RequestHelper');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

const MAX_LENGTH = 4;

function makeDots(num) {
    let ret = '';
    while (num > 0) {
        ret += '  ○  ';
        num--;
    }
    return ret;
}

function makeDots2(num) {
    let ret = '';
    while (num > 0) {
        ret += '  ●  ';
        num--;
    }
    return ret;
}

class Pin extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            value: '',
            pin: '',
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentWillMount() {
        AsyncStorage.getItem("access_token").then((value) => {
            if (value != null && value.length != 0) {
                AsyncStorage.getItem(value).then((value) => {
                    if (value != null && value.length != 0) {
                        this.setState({
                            pin: value
                        })
                    }
                }).done()
            }
        }).done();
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_none_otp')
        if (Platform.OS == 'ios') {
            AsyncStorage.getItem("TouchID").then((value) => {
                setTimeout(() => {
                    if (value != null && value.length != 0) {
                        if (value == 'true') {
                            TouchID.authenticate(Lang.confirm_touch_id())
                                .then(success => {
                                    this.VerifyTransaction()
                                })
                                .catch(error => { });
                        }
                    }
                }, 200);
            }).done();
        }
    }

    gotoHome() {
        Actions.home({ type: 'reset' })
        setTimeout(() => {
            Actions.refresh();
        }, 10)
    }

    gotoRoot() {
        if (this.props.fromHome)
            Actions.home({ type: 'reset' })
        else
            Actions.merchant({ type: 'reset' })
    }

    VerifyTransaction() {
        this.setState({ isLoading: true })
        Requests.Verify_transaction(this.props.access_token, this.props.transaction_id, '999999', 'NONE')
            .then((data) => {
                this.setState({ isLoading: false })
                GoogleAnalytics.trackEvent('ga_none_otp', 'Verify transaction');
                appsFlyer.trackEvent('af_none_otp', {}, () => { }, () => { });
                AppEventsLogger.logEvent(`fb_none_otp`, 1)

                if (this.props.transaction_type == 'buy_card') {
                    Actions.buy_cards_success({ cards: JSON.stringify(data) })
                }
                else {
                    this.GetUserInfo()
                    Actions.pop()
                    setTimeout(() => {
                        Actions.popup({
                            title: Lang.thong_bao(),
                            content: Lang.giao_dich_thanh_cong(),
                            flag: 'success',
                            onPress_Ok: () => this.gotoRoot()
                        })
                    }, 200)
                }

            })
            .catch((e) => {
                this.setState({ isLoading: false })
            })
    }

    GetUserInfo() {
        Requests.User_Infor(this.props.access_token)
            .then((data) => {
                this.props.dispatch(taskActionCreators.change_user(data))
            })
            .catch((error) => {
            })
    }

    openTouchID(isOpen) {
        AsyncStorage.setItem("TouchID", isOpen ? 'true' : 'false').then(() => {
            if (isOpen) {
                TouchID.authenticate(Lang.confirm_touch_id())
                    .then(success => {
                        this.VerifyTransaction()
                    })
                    .catch(error => { });
            }
        }).done();
    }

    handleClear() {
        this.setState({ value: '' });
    }

    handlePress(num) {
        let { value } = this.state;
        value += num
        this.setState({ value });
        if (value.length == MAX_LENGTH) {
            if (this.state.pin == '') {
                setTimeout(() => {
                    this.VerifyPin(value);
                }, 100);
            }
            else {
                if (this.state.pin == value) {
                    setTimeout(() => {
                        this.VerifyTransaction()
                    }, 200);
                }
                else {
                    setTimeout(() => {
                        this.handleClear();
                        Toast.showToast(Lang.pin_khong_dung(), "short", "bottom");
                        Vibration.vibrate();
                    }, 200);
                }
            }
        }
    }

    VerifyPin(value) {
        this.setState({ isLoading: true })
        RequestHelper.VerifyPin(this.props.access_token, value)
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    var dataa = JSON.parse(data._bodyText);
                    if (dataa.valid) {
                        AsyncStorage.setItem(this.props.access_token, value)
                        this.VerifyTransaction()
                    }
                    else {
                        Toast.showToast(Lang.pin_khong_dung(), "short", "bottom");
                        this.handleClear();
                        Vibration.vibrate();
                    }
                }
                else if (data.status == 401) {
                    Toast.showToast(Lang.token_het_han(), "short", "center");
                    Actions.login();
                }
                else {
                    Utils.onRequestEnd(data);
                }
            })
            .catch((error) => {
                this.handleClear();
                Vibration.vibrate();
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    handleRemove() {
        const { value } = this.state;
        this.setState({ value: value.substr(0, value.length - 1) });
    }
    renderButton(num) {
        num = num.toString()
        return (
            <TouchableOpacity
                style={styles.btnPin}
                underlayColor={'rgba(255,255,255,0.3)'}
                onPress={() => this.handlePress(num)}>
                <Text style={styles.btnPin_Text}>{num}</Text>
            </TouchableOpacity>
        );
    }

    renderView() {
        const { value } = this.state;
        const marks = value.length > 4 ? makeDots2(4) : value.replace(/./g, '  ●  ');
        const dots = makeDots(MAX_LENGTH - value.length);

        return (
            <ScrollView keyboardShouldPersistTaps='always'>
                <View style={[styles.headerPin, { marginTop: 20 }]}>
                    <Text style={styles.headerPin_Text} >
                        {Lang.nhap_ma_pin()}
                    </Text>
                </View>

                <View style={styles.Pin} >
                    <Text style={styles.Pin_Pin} >{marks}{dots}</Text>
                </View>

                <View style={[styles.rowPin, { marginTop: -10 }]} >
                    {this.renderButton(1)}
                    {this.renderButton(2)}
                    {this.renderButton(3)}
                </View>

                <View style={styles.rowPin} >
                    {this.renderButton(4)}
                    {this.renderButton(5)}
                    {this.renderButton(6)}
                </View>

                <View style={styles.rowPin} >
                    {this.renderButton(7)}
                    {this.renderButton(8)}
                    {this.renderButton(9)}
                </View>

                <View style={styles.rowPin} >
                    {this.renderButton(0)}
                </View>
                <View style={styles.btnPin_Bottom}>
                    {renderIf(Platform.OS == 'ios')(
                        <View style={styles.touchID} >
                            <TouchableOpacity onPress={this.openTouchID.bind(this)} style={styles.touchID_Touch}>
                                <Image style={styles.touchID_Img} source={require('../../element/form/ic-touch.png')} />
                                <Text style={styles.touchID_Txt}>{Lang.mo_khoa_bang_van_tay()}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <View style={styles.rowPin} >
                        <TouchableOpacity onPress={() => this.handleClear()} style={styles.btnTouch_Left}>
                            <Text style={styles.btnText_Left}>{Lang.lam_moi()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleRemove()} style={styles.btnTouch_Right}>
                            <Text style={styles.btnText_Right}>{Lang.xoa()}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.forgotPin} >
                        <TouchableOpacity onPress={() => Actions.change_pin()} style={styles.forgotPin_Touch}>
                            <Text style={styles.btnText_Center}>{Lang.quen_ma_pin()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {renderIf(Platform.OS === 'ios')(
                    <StatusBar barStyle={'light-content'} />
                )}
                {renderIf(Platform.OS === 'android')(
                    <StatusBar backgroundColor="#1b6614" animated={true} />
                )}
                <View style={{ width: width, flexDirection: 'row', height: 50, backgroundColor: COLOR.PRIMARY }}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{ paddingTop: Platform.OS == 'ios' ? 25 : 0, paddingLeft: 10 }}>
                        <Image source={require('../../element/nav-bar/nav-close.png')} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                </View>
                <View style={styles.padPin} >
                    {this.renderView()}
                    {renderIf(this.state.isLoading)(
                        <Loading />
                    )}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
})

export default connect(mapStateToProps)(Pin)