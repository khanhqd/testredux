import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    Platform,
    TextInput,
    Image,
    Keyboard
} from "react-native";
import { Actions } from 'react-native-router-flux';
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop();
}
const hideKeyboard = () => {
    Keyboard.dismiss()
}

class ComingSoon extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: false,
            isFocused: true,
            text: '',
            textSeri: '',
            textCode: '',
            card_vendor: 'appota'
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_games_topup_card');
        AppEventsLogger.logEvent('fb_games_topup_card', 1);
        appsFlyer.trackEvent('af_games_topup_card', {}, () => { }, () => { });
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

    onPressNapGame() {
        Keyboard.dismiss()
        GoogleAnalytics.trackEvent('ga_games_topup', `Topup ${this.props.games.game_name} via card ${this.state.card_vendor}`);
        var games = this.props.games;
        games.card_code = this.state.textCode;
        games.card_serial = this.state.textSeri;
        games.card_vendor = this.state.card_vendor;
        games.card_name = this.state.card_vendor.charAt(0).toUpperCase() + this.state.card_vendor.slice(1).toLowerCase()

        setTimeout(() => {
            Actions.games_topup_receipt({ games: games });
        }, 10);
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
                                {Lang.the_cao()}
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
                                        <TouchableOpacity onPress={() => this.setState({ card_vendor: 'appota' })} style={this.state.card_vendor == 'appota' ? styles.FormControl_CardTouch_Active : styles.FormControl_CardTouch}>
                                            <Image source={this.state.card_vendor == 'appota' ? require('../../element/logo-cards/card-appotacard.png') : require('../../element/logo-cards/card-appotacard-gray.png')} style={this.state.card_vendor == 'appota' ? styles.FormControl_CardTouch_Img_Active : styles.FormControl_CardTouch_Img} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({ card_vendor: 'viettel' })} style={this.state.card_vendor == 'viettel' ? styles.FormControl_CardTouch_Active : styles.FormControl_CardTouch}>
                                            <Image source={this.state.card_vendor == 'viettel' ? require('../../element/logo-cards/card-viettel.png') : require('../../element/logo-cards/card-viettel-gray.png')} style={this.state.card_vendor == 'viettel' ? styles.FormControl_CardTouch_Img_Active : styles.FormControl_CardTouch_Img} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({ card_vendor: 'mobifone' })} style={this.state.card_vendor == 'mobifone' ? styles.FormControl_CardTouch_Active : styles.FormControl_CardTouch}>
                                            <Image source={this.state.card_vendor == 'mobifone' ? require('../../element/logo-cards/card-mobifone.png') : require('../../element/logo-cards/card-mobifone-gray.png')} style={this.state.card_vendor == 'mobifone' ? styles.FormControl_CardTouch_Img_Active : styles.FormControl_CardTouch_Img} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({ card_vendor: 'vinaphone' })} style={this.state.card_vendor == 'vinaphone' ? styles.FormControl_CardTouch_Active : styles.FormControl_CardTouch}>
                                            <Image source={this.state.card_vendor == 'vinaphone' ? require('../../element/logo-cards/card-vinaphone.png') : require('../../element/logo-cards/card-vinaphone-gray.png')} style={this.state.card_vendor == 'vinaphone' ? styles.FormControl_CardTouch_Img_Active : styles.FormControl_CardTouch_Img} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({ card_vendor: 'fpt' })} style={this.state.card_vendor == 'fpt' ? styles.FormControl_CardTouch_Active : styles.FormControl_CardTouch}>
                                            <Image source={this.state.card_vendor == 'fpt' ? require('../../element/logo-cards/card-gate.png') : require('../../element/logo-cards/card-gate-gray.png')} style={this.state.card_vendor == 'fpt' ? styles.FormControl_CardTouch_Img_Active : styles.FormControl_CardTouch_Img} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({ card_vendor: 'mega' })} style={this.state.card_vendor == 'mega' ? styles.FormControl_CardTouch_Active : styles.FormControl_CardTouch}>
                                            <Image source={this.state.card_vendor == 'mega' ? require('../../element/logo-cards/card-megacard.png') : require('../../element/logo-cards/card-megacard-gray.png')} style={this.state.card_vendor == 'mega' ? styles.FormControl_CardTouch_Img_Active : styles.FormControl_CardTouch_Img} />
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
                                        placeholder={Lang.nhap_serial() + " " + (this.state.card_vendor)}
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
                                        placeholder={Lang.nhap_ma_the() + " " + (this.state.card_vendor)}
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
                            <TouchableOpacity style={styles.FormControl_ButtonTouch} onPress={this.onPressNapGame.bind(this)}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.nap_game2().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {renderIf(this.state.textSeri == '' || this.state.textCode == '')(
                            <View style={styles.FormControl_ButtonTouchDisable}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.tiep_tuc().toUpperCase()}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
                {renderIf(Platform.OS == 'ios')(
                    <KeyboardSpacer />
                )}
            </View>
        );
    }
};


export default ComingSoon;
