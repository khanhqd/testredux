import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Navigator,
    StatusBar,
    CameraRoll,
    Platform,
    AsyncStorage,
    Vibration
} from "react-native";
import { Actions } from "react-native-router-flux";
import renderIf from '../Common/renderIf'
import Toast from '@remobile/react-native-toast';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');
var RequestHelper = require('../Common/RequestHelper');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
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
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_set_pin');
    }

    handleClear() {
        this.setState({ value: '' });
    }

    handlePress(num) {
        let { value } = this.state;
        value += num
        this.setState({ value });

        if (value.length == MAX_LENGTH) {
            if (this.state.step == 1) {
                setTimeout(() => {
                    Actions.set_pin({
                        step: 2,
                        pin: this.state.value,
                        access_token: this.props.access_token
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
                        this.SetPin(value);
                    }, 200);
                }
            }
        }
    }

    SetPin(value) {
        this.setState({ isLoading: true });
        RequestHelper.SetPin(this.props.access_token, value)
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    var dataa = JSON.parse(data._bodyText);
                    if (dataa.success) {
                        appsFlyer.trackEvent('af_set_pin', {}, () => { }, () => { });
                        AppEventsLogger.logEvent('fb_set_pin', 1);

                        Actions.tabbar();
                        AsyncStorage.setItem('PIN', this.props.access_token);
                        Toast.showToast(Lang.tao_pin_thanh_cong(), "short", "bottom");
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
                <View style={[styles.headerPin, { marginTop: 20 }]}>
                    <Text style={styles.headerPin_Text} >
                        {this.state.step == 1 ? Lang.tao_ma_pin() : Lang.nhap_lai_ma_pin()}
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