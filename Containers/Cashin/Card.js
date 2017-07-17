import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    TextInput,
    Image,
    Keyboard,
    Platform
} from "react-native";
import { Actions } from 'react-native-router-flux';
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import { PRICE } from '../Helpers/constString'
import * as Animatable from 'react-native-animatable';

var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop();
}

const popToHome = () => {
    Actions.home()
    setTimeout(() => {
        Actions.refresh();
    }, 10);
}

const hideKeyboard = () => {
    Keyboard.dismiss()
}

export default class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: false,
            isFocused: true,
            text: '',
            textSeri: '',
            textCode: '',
            card_vendor: 'viettel',
        }
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_cashin_by_ac');
        appsFlyer.trackEvent('af_cashin_by_ac', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_cashin_by_ac', 1);
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    _onBlur(e) {
        this.setState({ isFocused: false })
    }

    _onFocus(e) {
        this.setState({ isFocused: true })
    }

    _focusNextField(nextField) {
        this.refs[nextField].focus()
    }

    clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            textSeri: fieldName == 'textSeri' ? '' : this.state.textSeri,
            textCode: fieldName == 'textCode' ? '' : this.state.textCode
        });
    }

    onCashinAC() {
        Keyboard.dismiss()
        Actions.cashin_receipt({
            method: 'ac',
            bank_name: this.state.card_vendor.toUpperCase(),
            card_vendor: this.state.card_vendor,
            serial: this.state.textSeri,
            code: this.state.textCode,
            transaction_fee: PRICE.CASHIN_CARD,
            onPress_Ok: () => popToHome()
        });
    }

    render() {
        return (
            <View style={[styles.container, styles.tabAccount, this.props.style]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.thu_mua_the2()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                            {renderIf(this.state.isFocused == true)(
                                <TouchableOpacity onPress={() => hideKeyboard()}>
                                    <Text style={styles.navTitle_TextRight}>
                                        {Lang.button_huy()}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
                <View style={styles.AlertFull}>
                    <Animatable.Text style={styles.AlertFull_Title} animation="flash" easing="ease-out" iterationCount="infinite" >{Lang.phi()}: {PRICE.CASHIN_CARD}</Animatable.Text>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView style={styles.FormControl_Scroll} keyboardShouldPersistTaps='always'>
                        <View style={styles.FormControl_TitleBorder}>
                            <Text style={styles.FormControl_TitleText}>
                                {Lang.chon_loai_the().toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.FormControl_Inner}>
                            <View style={styles.FormControl_Card}>
                                <ScrollView style={styles.FormControl_CardScroll} horizontal={true} keyboardShouldPersistTaps={'always'} showsHorizontalScrollIndicator={false}>
                                    <View style={styles.FormControl_CardScroll_Inner}>
                                        <TouchableOpacity onPress={() => this.setState({ card_vendor: 'viettel' })} style={this.state.card_vendor == 'viettel' ? styles.FormControl_CardTouch_Active : styles.FormControl_CardTouch}>
                                            <Image source={this.state.card_vendor == 'viettel' ? require('../../element/logo-cards/card-viettel.png') : require('../../element/logo-cards/card-viettel-gray.png')} style={this.state.card_vendor == 'viettel' ? styles.FormControl_CardTouch_Img_Active : styles.FormControl_CardTouch_Img} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({ card_vendor: 'mobifone' })} style={this.state.card_vendor == 'mobifone' ? styles.FormControl_CardTouch_Active : styles.FormControl_CardTouch}>
                                            <Image source={this.state.card_vendor == 'mobifone' ? require('../../element/logo-cards/card-mobifone.png') : require('../../element/logo-cards/card-mobifone-gray.png')} style={this.state.card_vendor == 'mobifone' ? styles.FormControl_CardTouch_Img_Active : styles.FormControl_CardTouch_Img} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({ card_vendor: 'vinaphone' })} style={this.state.card_vendor == 'vinaphone' ? styles.FormControl_CardTouch_Active : styles.FormControl_CardTouch}>
                                            <Image source={this.state.card_vendor == 'vinaphone' ? require('../../element/logo-cards/card-vinaphone.png') : require('../../element/logo-cards/card-vinaphone-gray.png')} style={this.state.card_vendor == 'vinaphone' ? styles.FormControl_CardTouch_Img_Active : styles.FormControl_CardTouch_Img} />
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                        <View style={styles.FormControl_Title}>
                            <Text style={styles.FormControl_TitleText}>
                                {Lang.thong_tin_the_cao().toUpperCase()}: {(this.state.card_vendor).toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.FormControl_Inner}>
                            <View style={styles.FormControl_Profile}>

                                <View style={styles.FormControl_Input_Form}>
                                    {renderIf(this.state.textSeri != '')(
                                        <Text style={styles.FormControl_Active}>Serial</Text>
                                    )}
                                    <TextInput
                                        ref={'textSeri'}
                                        autoCapitalize="none"
                                        placeholder={Lang.nhap_serial()}
                                        autoFocus={true}
                                        value={this.state.textSeri}
                                        placeholderTextColor="#c7c7cd"
                                        autoCorrect={false}
                                        returnKeyType={"next"}
                                        onBlur={this._onBlur.bind(this)}
                                        onFocus={this._onFocus.bind(this)}
                                        onChangeText={(textSeri) => this.setState({ textSeri })}
                                        style={styles.FormControl_Input_Field}
                                        onSubmitEditing={() => this._focusNextField('textCode')}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                    />
                                    {renderIf(this.state.textSeri != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this.clearText('textSeri')} style={styles.FormControl_Clear}>
                                            <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_ClearIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <View style={styles.FormControl_Line}></View>
                                <View style={styles.FormControl_Input_Form}>
                                    {renderIf(this.state.textCode != '')(
                                        <Text style={styles.FormControl_Active}>{Lang.ma_the()}</Text>
                                    )}
                                    <TextInput
                                        ref={'textCode'}
                                        autoCapitalize="none"
                                        placeholder={Lang.nhap_ma_the()}
                                        value={this.state.textCode}
                                        placeholderTextColor="#c7c7cd"
                                        autoCorrect={false}
                                        returnKeyType={"done"}
                                        onBlur={this._onBlur.bind(this)}
                                        onFocus={this._onFocus.bind(this)}
                                        onChangeText={(textCode) => this.setState({ textCode })}
                                        style={styles.FormControl_Input_Field}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                    />
                                    {renderIf(this.state.textCode != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this.clearText('textCode')} style={styles.FormControl_Clear}>
                                            <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_ClearIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.FormControl_Button}>
                        {renderIf(this.state.textSeri != '' && this.state.textCode != '')(
                            <TouchableOpacity style={styles.FormControl_ButtonTouch} onPress={this.onCashinAC.bind(this)}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.nap_vi2().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {renderIf(this.state.textSeri == '' || this.state.textCode == '')(
                            <View style={styles.FormControl_ButtonTouchDisable}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.nap_vi2().toUpperCase()}
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
}
