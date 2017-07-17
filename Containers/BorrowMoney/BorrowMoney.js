import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage,
    Platform,
    ScrollView,
    TextInput,
    Keyboard
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import renderIf from '../Common/renderIf';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import TimerMixin from 'react-timer-mixin';
import Toast from '@remobile/react-native-toast';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import * as Requests from '../Helpers/Requests'

var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');


const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop();
}

class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isFocused: false,
            isLoading: false,
            contact_number: '',
            amount: '',
            sAmount: '',
            message: ''
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_borrow_money')
    }

    componentWillReceiveProps() {
        AsyncStorage.getItem("contact_number").then((value) => {
            if (value != null && value.length != 0) {
                var data = JSON.parse(value);
                this.setState({
                    contact_number: data.contact_number,
                });
            }
        }).done();
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
            amount: fieldName == 'textMoney' ? '' : this.state.amount,
        })
    }

    onPressMuonTien() {
        Keyboard.dismiss()

        if (this.state.contact_number.length < 9) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.nhap_so_dien_thoai(), flag: 'error' });
            return;
        }
        if (this.state.amount.length == 0) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.nhap_so_tien(), flag: 'error' });
            return;
        }
        if (parseInt(this.state.amount) < 10000) {
            Actions.popup({ title: Lang.thong_bao(), content: Lang.nhap_so_tien_min(), flag: 'error' });
            return;
        }
        this.RequestBorrow();
    }

    RequestBorrow() {
        this.setState({ isLoading: true })
        let { access_token } = this.props
        Requests.Request_Borrow(access_token, this.state.contact_number, parseInt(this.state.amount), this.state.message)
            .then((data) => {
                this.setState({ isLoading: false })
                GoogleAnalytics.trackEvent('ga_borrow_money', 'Request success')
                appsFlyer.trackEvent('af_borrow_money', {}, () => { }, () => { })
                AppEventsLogger.logEvent('fb_borrow_money', 1)
                Actions.popup({
                    title: Lang.thong_bao(),
                    content: Lang.muon_tien_thanh_cong(),
                    flag: 'success'
                })
            })
            .catch((error) => {
                this.setState({ isLoading: false })
            })
    }

    onTextChange(text) {
        var _amount = Utils.replaceAll(text, '.', '');
        this.setState({
            amount: _amount,
            sAmount: Utils.toDotString(parseInt(_amount)).toString() == 'NaN' ? '0' : Utils.toDotString(parseInt(_amount))
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
                                {Lang.muon_tien()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                            <TouchableOpacity onPress={() => Actions.history_balance({ balance: this.props.user_infor.balance, balance_type: 'borrow_money' })}>
                                <Image source={require('../../element/nav-bar/nav-history.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView
                        keyboardShouldPersistTaps='always'
                    >
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
                                        onChangeText={(contact_number) => this.setState({ contact_number })}
                                        style={styles.FormControl_Input_Enter}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                    />
                                    {renderIf(this.state.contact_number != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this._clearText('ContactNumber')} style={styles.Input_Clear}>
                                            <Image source={require('../../element/form/ic-clear.png')} style={styles.Input_ClearIcon} />
                                        </TouchableOpacity>
                                    )}
                                    {renderIf(this.state.contact_number == '' || this.state.isFocused == false)(
                                        <TouchableOpacity onPress={() => Actions.contact({ isGroup: false })} style={styles.FormControl_Addon}>
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
                                <View style={styles.FormControl_Input}>
                                    <TextInput
                                        ref={'textMessage'}
                                        autoCapitalize="none"
                                        autoFocus={false}
                                        placeholder={Lang.noi_dung()}
                                        maxLength={80}
                                        placeholderTextColor="rgba(0,0,0,0.3)"
                                        value={this.state.message}
                                        multiline={true}
                                        autoCorrect={false}
                                        returnKeyType={"done"}
                                        onSubmitEditing={() => this.onPressMuonTien()}
                                        onBlur={() => this._onBlur()}
                                        onFocus={() => this._onFocus()}
                                        onChangeText={(message) => this.setState({ message })}
                                        style={styles.FormControl_Input_Enter}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                    />
                                    {renderIf(this.state.message != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this._clearText('textMessage')} style={styles.FormControl_Addon}>
                                            <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_AddonIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.FormControl_Button}>
                        {renderIf(this.state.contact_number != '' && this.state.amount != '')(
                            <TouchableOpacity onPress={() => this.onPressMuonTien()} style={styles.FormControl_ButtonTouch} >
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.muon_tien().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {renderIf(this.state.contact_number == '' || this.state.amount == '')(
                            <View style={styles.FormControl_ButtonTouchDisable}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.muon_tien().toUpperCase()}
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
})

export default connect(mapStateToProps)(AppotaView)

