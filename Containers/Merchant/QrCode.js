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
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RNQRCode from 'react-native-qrcode';
import appsFlyer from 'react-native-appsflyer';

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading2');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

class QRCode extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isFocused: false,
            textMoneyQRCODE: '',
        }
        Text.defaultProps.allowFontScaling=false;
    }

    _clearTextMoneyQRCODE(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            text: '',
            textMoneyQRCODE: '',
            amount: '',
            isQrcode: false,
        })
    }

    _onBlur(e) {
        this.setState({ isFocused: false })
    }

    _onFocus(e) {
        this.setState({ isFocused: true })
    }

    genQrCode() {
        Keyboard.dismiss()
        const eventName = "af_merchant_qrcode";
        appsFlyer.trackEvent(eventName, {}, () => { }, () => { });

        var _amount = Utils.replaceAll(this.state.textMoneyQRCODE, '.', '');
        var obj = {
            type: "order",
            merchant_phone: this.props.user_phone,
            amount: _amount
        };

        this.setState({
            amount: JSON.stringify(obj),
            isQrcode: true
        });
    }

    onTextChange(text) {
        var _amount = Utils.replaceAll(text, '.', '');
        this.setState({
            isQrcode: false,
            textMoneyQRCODE: Utils.toDotString(parseInt(_amount)).toString() == 'NaN' ? '0' : Utils.toDotString(parseInt(_amount))
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.FormControl_Scroll} keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
                    <View style={styles.FormControl_Title}>
                        <Text style={styles.FormControl_TitleText}>
                            {Lang.so_tien().toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.FormControl_Content}>
                        <View style={styles.FormControl_Input}>
                            <TextInput
                                ref={'textMoneyQRCODE'}
                                autoCapitalize="none"
                                autoFocus={false}
                                keyboardType='phone-pad'
                                placeholder={Lang.so_tien()}
                                placeholderTextColor="rgba(0,0,0,0.3)"
                                value={this.state.textMoneyQRCODE}
                                autoCorrect={false}
                                returnKeyType={"done"}
                                onBlur={() => this._onBlur()}
                                onFocus={() => this._onFocus()}
                                onChangeText={(textMoneyQRCODE) => this.onTextChange(textMoneyQRCODE)}
                                style={styles.FormControl_Input_Enter}
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                            {renderIf(this.state.textMoneyQRCODE != '' && this.state.isFocused == true)(
                                <TouchableOpacity onPress={() => this._clearTextMoneyQRCODE('textMoneyQRCODE')} style={styles.FormControl_Addon}>
                                    <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_AddonIcon} />
                                </TouchableOpacity>
                            )}
                            {renderIf(this.state.textMoneyQRCODE == '' || this.state.isFocused == false)(
                                <View style={styles.FormControl_Addon}>
                                    <Text style={styles.FormControl_AddonText}>
                                        VNĐ
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.FormControl_Note}>
                        <Text style={styles.FormControl_NoteText}>
                            {Lang.note_cashback_3()}
                        </Text>
                    </View>
                    {renderIf(this.state.isQrcode)(
                        <View>
                            <View style={styles.FormControl_Title}>
                                <Text style={styles.FormControl_TitleText}>
                                    QRCODE
                                </Text>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_QRCode}>
                                    <RNQRCode
                                        value={this.state.amount}
                                        size={200}
                                        bgColor='#449D47'
                                        fgColor='white' />
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>
                <View style={styles.FormControl_Button}>
                    {renderIf(this.state.textMoneyQRCODE != '')(
                        <TouchableOpacity style={styles.FormControl_ButtonTouch} onPress={() => this.genQrCode()}>
                            <Text style={styles.FormControl_ButtonText}>
                                QRCODE
                                </Text>
                        </TouchableOpacity>
                    )}
                    {renderIf(this.state.textMoneyQRCODE == '')(
                        <View style={styles.FormControl_ButtonTouchDisable} >
                            <Text style={styles.FormControl_ButtonText}>
                                QRCODE
                                </Text>
                        </View>
                    )}
                </View>
            </View>
        );
    }
};

export default QRCode;
