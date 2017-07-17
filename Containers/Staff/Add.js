import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Navigator,
    Platform,
    Image,
    AsyncStorage,
    Keyboard
} from "react-native";
import { Actions } from "react-native-router-flux";
import appsFlyer from 'react-native-appsflyer';
import renderIf from '../Common/renderIf'
import KeyboardSpacer from 'react-native-keyboard-spacer';

var styles = require('../Common/style.js');
var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Utils = require('../Common/Utils');
var Loading = require('../Common/Loading');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop();
}

class Home_MuonTien extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isFocused: true,
            text: '',
            textName: '',
            access_token: '',
            contact_number: '',
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

    componentWillReceiveProps() {
        AsyncStorage.getItem("contact_number").then((value) => {
            if (value != null && value.length != 0) {
                var data = JSON.parse(value);
                this.setState({
                    contact_number: data.contact_number,
                    textName: data.contact_name
                });
            }
        }).done();
    }

    onPressAddStaff() {
        if (this.state.textName.length == 0 || this.state.contact_number.length == 0) {
            Actions.popup({
                title: Lang.thong_bao(),
                content: Lang.nhap_day_du_thong_tin(),
                flag: 'error'
            });
            return;
        }

        this.setState({ isLoading: true });
        Keyboard.dismiss()
        RequestHelper.RequestAddStaff(this.state.access_token, this.state.contact_number, this.state.textName, '')
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    const eventName = "af_staff_add";
                    appsFlyer.trackEvent(eventName, {}, () => { }, () => { });
                    var trans = JSON.parse(data._bodyText);
                    if (trans.success)
                        Actions.staff_otp({ access_key: trans.access_key, staff_phone_number: this.state.contact_number, access_token: this.state.access_token });
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

    _onBlur(e) {
        this.setState({ isFocused: false })
    }
    _onFocus(e) {
        this.setState({ isFocused: true })
    }
    _focusNextField(nextField) {
        this.refs[nextField].focus()
    }
    _clearTextName(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            text: '',
            textName: ''
        })
    }
    _clearcontact_number(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            text: '',
            contact_number: ''
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
                                {Lang.them_nhan_vien()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView
                        style={styles.FormControl_Scroll}
                        keyboardShouldPersistTaps='always'
                    >
                        <View style={styles.FormControl_Group}>
                            <View style={styles.FormControl_Title}>
                                <Text style={styles.FormControl_TitleText}>
                                    {Lang.nhan_vien()}
                                </Text>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_Input}>
                                    <TextInput
                                        ref={'contact_number'}
                                        autoCapitalize="none"
                                        autoFocus={true}
                                        keyboardType='phone-pad'
                                        placeholder={Lang.so_dien_thoai()}
                                        placeholderTextColor="rgba(0,0,0,0.3)"
                                        value={this.state.contact_number}
                                        autoCorrect={false}
                                        returnKeyType={"next"}
                                        onBlur={this._onBlur.bind(this)}
                                        onFocus={this._onFocus.bind(this)}
                                        onChangeText={(text) => this.setState({ contact_number: text })}
                                        style={styles.FormControl_Input_Enter}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                    />
                                    {renderIf(this.state.contact_number != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this._clearcontact_number('contact_number')} style={styles.Input_Clear}>
                                            <Image source={require('../../element/form/ic-clear.png')} style={styles.Input_ClearIcon} />
                                        </TouchableOpacity>
                                    )}
                                    {renderIf(this.state.contact_number == '' || this.state.isFocused == false)(
                                        <TouchableOpacity onPress={() => Actions.contact_personal({ isGroup: false })} style={styles.FormControl_Addon}>
                                            <Image source={require('../../element/form/ic-contact.png')} style={styles.FormControl_AddonIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <View style={styles.FormControl_Line}></View>
                                <View style={styles.FormControl_Input}>
                                    <TextInput
                                        ref={'textName'}
                                        autoCapitalize="none"
                                        autoFocus={false}
                                        placeholder={Lang.ten_nhan_vien()}
                                        placeholderTextColor="rgba(0,0,0,0.3)"
                                        value={this.state.textName}
                                        autoCorrect={false}
                                        returnKeyType={"done"}
                                        onBlur={this._onBlur.bind(this)}
                                        onFocus={this._onFocus.bind(this)}
                                        onChangeText={(textName) => this.setState({ textName })}
                                        style={styles.FormControl_Input_Enter}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                    />
                                    {renderIf(this.state.textName != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this._clearTextName('textName')} style={styles.FormControl_Addon}>
                                            <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_AddonIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                    <View style={styles.FormControl_Button}>
                        {renderIf(this.state.textName != '' && this.state.contact_number != '')(
                            <TouchableOpacity style={styles.FormControl_ButtonTouch} onPress={this.onPressAddStaff.bind(this)}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.them_nhan_vien().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {renderIf(this.state.textName == '' || this.state.contact_number == '')(
                            <TouchableOpacity style={styles.FormControl_ButtonTouchDisable}>
                                <Text style={styles.FormControl_ButtonText}>
                                    {Lang.them_nhan_vien().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                {renderIf(Platform.OS == 'ios')(
                    <KeyboardSpacer />
                )}
            </View>
        );
    }
}

module.exports = Home_MuonTien;
