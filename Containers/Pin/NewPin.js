import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar,
    Platform,
    AsyncStorage,
    Vibration
} from "react-native";
import { Actions } from "react-native-router-flux";
var styles = require('../Common/style.js');
import renderIf from '../Common/renderIf'
import Toast from '@remobile/react-native-toast';
var Lang = require('../Common/Lang');
var RequestHelper = require('../Common/RequestHelper');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
import appsFlyer from 'react-native-appsflyer';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import { AppEventsLogger } from 'react-native-fbsdk';
import { COLOR } from '../Helpers/constStyle'
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

export default class Pin extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            value: '',
            step: props.step,
            pin: props.pin,
            access_token: props.access_token
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentWillMount() {
        AsyncStorage.getItem("access_token").then((value) => {
            if (value != null && value.length != 0) {
                this.setState({
                    access_token: value
                })
            }
        }).done();
    }

    componentDidMount(){
        GoogleAnalytics.trackScreenView('ga_pin_update');
    }

    handleClear() {
        this.setState({ value: '' });
    }

    handlePress(num) {
        let { value } = this.state;
        value += num;

        this.setState({ value });

        if (value.length == MAX_LENGTH) {
            if (this.state.step == 1) {
                setTimeout(() => {
                    Actions.new_pin({
                        step: 2,
                        pin: this.state.value,
                        access_token: this.state.access_token,
                        password: this.props.password
                    });
                }, 100);
            } else {
                if (this.state.pin != value) {
                    setTimeout(() => {
                        Toast.showToast(Lang.pin_khong_khop(), "short", "bottom");
                        Vibration.vibrate();
                        this.handleClear();
                    }, 200);
                }
                else {
                    setTimeout(() => {
                        this.UpdatePin(value);
                    }, 200);
                }
            }
        }
    }

    UpdatePin(value) {
        this.setState({ isLoading: true });
        RequestHelper.UpdatePin(this.state.access_token, value, this.props.password)
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    var dataa = JSON.parse(data._bodyText);
                    if (dataa.success) {
                        appsFlyer.trackEvent('af_pin_update', {}, () => { }, () => { });
                        AppEventsLogger.logEvent('fb_pin_update', 1);

                        Actions.tabbar();
                        AsyncStorage.setItem('PIN', this.state.access_token);
                        Toast.showToast(Lang.cap_nhat_pin_thanh_cong(), "short", "bottom");
                    }
                    else {
                        Toast.showToast(Lang.cap_nhat_pin_that_bai(), "short", "bottom");
                        this.handleClear();
                        Vibration.vibrate();
                    }
                }
                else {
                    var err = JSON.parse(data._bodyText);
                    Toast.showToast(err.error.message, "short", "bottom");
                    Actions.popTo('password_pin');
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
            <TouchableHighlight
                style={styles.btnPin}
                underlayColor={'rgba(255,255,255,0.3)'}
                onPress={() => this.handlePress(num)}
            >
                <Text style={styles.btnPin_Text}>{num}</Text>
            </TouchableHighlight>
        );
    }

    render() {
        const { value } = this.state;
        const marks = value.replace(/./g, '  ●  ');
        const dots = makeDots(MAX_LENGTH - value.length);

        return (
            <View style={styles.padPin} >
                {renderIf(Platform.OS === 'ios')(
                    <StatusBar barStyle={'light-content'} />
                )}
                {renderIf(Platform.OS === 'android')(
                    <StatusBar backgroundColor={'#1b6614'} />
                )}
                <View style={{ width: width, flexDirection: 'row', height: 50, backgroundColor: COLOR.PRIMARY,position: 'absolute',top: 12,left:12, }}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{ paddingTop: Platform.OS == 'ios' ? 25 : 0, paddingLeft: 10 }}>
                        <Image source={require('../../element/nav-bar/nav-close.png')} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                </View>
                <View style={[styles.headerPin, { marginTop: 20 }]}>
                    <Text style={styles.headerPin_Text} >
                        {this.state.step == 1 ? Lang.ma_pin_moi() : Lang.nhap_lai_ma_pin()}
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
                    <View style={styles.rowPin} >
                        <TouchableOpacity onPress={() => this.handleClear()} style={styles.btnTouch_Left}>
                            <Text style={styles.btnText_Left}>{Lang.lam_moi()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleRemove()} style={styles.btnTouch_Right}>
                            <Text style={styles.btnText_Right}>{Lang.xoa()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {renderIf(this.state.isLoading)(
                    <Loading />
                )}
            </View>
        );
    }
}