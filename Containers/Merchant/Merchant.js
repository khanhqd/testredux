import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    AsyncStorage,
    ScrollView,
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
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RNQRCode from 'react-native-qrcode';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading2');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

import QRCode from './QrCode';
import Cashback from './Cashback';
import ThanhToan from './Payment';

class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: false,
            method: 'thanhtoan',
            isStaff: props.user_infor.account_type == 'merchant_staff' ? true : false,
            merchant_phone: props.user_infor.phone_number,
            user_phone: props.user_infor.phone_number,
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_merchant');
        if (this.props.user_infor.account_type == 'merchant_staff')
            this.FindStaff(this.props.user_infor.phone_number)
        else
            this.FindMerchant(this.props.user_infor.phone_number)
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    FindMerchant(merchant_phone) {
        let { access_token } = this.props
        RequestHelper.FindMerchant(access_token, merchant_phone)
            .then((data) => {
                if (data.status == 200) {
                    var _data = JSON.parse(data._bodyText);
                    this.setState({ cashback_percent: (_data.cashback_percent == null) ? 0 : _data.cashback_percent });
                }
                else {
                    if (data.status == 401) access_token = '';
                    Utils.onRequestEnd(data);
                }
            })
            .catch((error) => {
            })
            .done();
    }

    FindStaff(phone) {
        let { access_token } = this.props
        RequestHelper.FindStaff(access_token, phone)
            .then((data) => {
                console.log(JSON.stringify(data))
                if (data.status == 200) {
                    var _data = JSON.parse(data._bodyText);
                    this.setState({
                        isStaff: true,
                        merchant_phone: _data.merchant_phone_number
                    });
                    this.FindMerchant(_data.merchant_phone_number);
                }
                else {
                    if (data.status == 401) access_token = '';
                    Utils.onRequestEnd(data);
                }
            })
            .catch((error) => {
            })
            .done();
    }

    render_bg_method(method) {
        return this.state.method == method ? styles.headerTab_Touch_Active : styles.headerTab_Touch;
    }

    render_txt_method(method) {
        return this.state.method == method ? styles.headerTab_Text_Active : styles.headerTab_Text;
    }

    render() {
        return (
            <View style={[styles.container, styles.tabMerchant, this.props.style]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            {renderIf(!this.state.isStaff)(
                                <TouchableOpacity onPress={() => Actions.staff()} style={{ marginLeft: 10 }}>
                                    <Image source={require('../../element/nav-bar/nav-staff.png')} style={styles.headerNav_Img} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.thanh_toan()} & {Lang.hoan_tien()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                            <TouchableOpacity onPress={() => Actions.history()}>
                                <Image source={require('../../element/nav-bar/nav-history.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.headerTab}>
                    <View style={styles.headerTab_Inner}>
                        <TouchableOpacity onPress={() => this.setState({ method: 'thanhtoan' })} style={this.render_bg_method('thanhtoan')}>
                            <Text style={this.render_txt_method('thanhtoan')}>
                                {Lang.thanh_toan()}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ method: 'cashback' })} style={this.render_bg_method('cashback')}>
                            <Text style={this.render_txt_method('cashback')}>
                                {Lang.hoan_tien()}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ method: 'qrcode' })} style={this.render_bg_method('qrcode')}>
                            <Text style={this.render_txt_method('qrcode')}>
                                QRCode
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    {renderIf(this.state.method == 'thanhtoan')(
                        <ThanhToan cashback_percent={this.state.cashback_percent} access_token={this.props.access_token}/>
                    )}
                    {renderIf(this.state.method == 'cashback')(
                        <Cashback cashback_percent={this.state.cashback_percent}/>
                    )}
                    {renderIf(this.state.method == 'qrcode')(
                        <QRCode merchant_phone={this.state.merchant_phone} user_phone={this.state.user_phone} />
                    )}
                </View>
                {renderIf(Platform.OS == 'ios')(
                    <KeyboardSpacer topSpacing={-50} />
                )}
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
})

export default connect(mapStateToProps)(AppotaView)
