import React from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Platform,
    Keyboard
} from "react-native";
import { Actions } from "react-native-router-flux";

var styles = require('../Common/style.js');
import KeyboardSpacer from 'react-native-keyboard-spacer';
import renderIf from '../Common/renderIf'
var RequestHelper = require('../Common/RequestHelper');
import Toast from '@remobile/react-native-toast';
var Utils = require('../Common/Utils');
var Loading = require('../Common/Loading');
var Lang = require('../Common/Lang');
import PhoneNumberPicker from '../../custom_modules/react-native-country-code-telephone-input';
import appsFlyer from 'react-native-appsflyer';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import { AppEventsLogger } from 'react-native-fbsdk';

const popToRoot = () => {
    Actions.pop();
}
class Register_Step_Phone extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isFocused: true,
            isLoading: false,
            text: '',
            countryName: 'Vietnam',
            callingCode: '84',
            phoneNo: '',
            verify: props.verify,
            password: props.password
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_verify_appota_phone');
        appsFlyer.trackEvent('af_verify_appota_phone', {}, () => { }, () => { });
    }

    ValidateRegister(phone) {
        Keyboard.dismiss()
        if (this.state.countryName == 'Vietnam') {
            if (phone.length < 9 || phone.length > 11 || (phone.length == 9 && phone.charAt(0) != '9') || (phone.length == 10 && phone.charAt(0) != '0' && phone.charAt(0) != '1') || (phone.length == 11 && phone.charAt(1) != '1' && phone.charAt(0) != '0')) {
                Actions.popup({ title: Lang.thong_bao(), content: Lang.nhap_so_dien_thoai(), flag: 'error' });
                return;
            }

            if (phone.length == 9 || (phone.length == 10 && phone.charAt(0) != '0'))
                phone = '0' + phone;
        }
        else {
            phone = this.state.callingCode + phone
        }
        this.setState({ isLoading: true });
        RequestHelper.ValidateRegister(phone, '', '')
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    Actions.verify_otp({
                        phone: phone,
                        verify: this.state.verify,
                        password: this.state.password,
                        isMerge: false
                    })
                }
                else {
                    var err = JSON.parse(data._bodyText);
                    if (err.error.errors.can_merge) {
                        Actions.popup({
                            title: Lang.thong_bao(),
                            content: Lang.lien_ket_appota(),
                            onPress_Cancel: () => { },
                            onPress_Ok: () => {
                                Actions.verify_otp({
                                    phone: phone,
                                    verify: this.state.verify,
                                    password: this.state.password,
                                    isMerge: true
                                })
                            },
                        });
                    }
                    else {
                        Toast.showToast(err.error.message, "short", "center");
                    }
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
        this.setState({ text: '' })
    }
    PhoneNumberPickerChanged(country, callingCode, phoneNumber) {
        this.setState({ countryName: country.name, callingCode: callingCode, phoneNo: phoneNumber });
    }
    render() {
        return (
            <View style={[styles.container, styles.tabAccount, this.props.style]}>
                <View style={styles.RegisterForm}>
                    <View style={styles.RegisterForm_Inner}>
                        <View style={styles.RegisterForm_Field}>
                            <View style={styles.RegisterForm_FieldTitle}>
                                <Text style={styles.RegisterForm_FieldTitle_Text}>
                                    {Lang.so_dien_thoai_la_gi()}
                                </Text>
                            </View>
                            <View style={styles.RegisterForm_FieldInfo}>
                                <Text style={styles.RegisterForm_FieldInfo_Text}>
                                    {Lang.des_so_dien_thoai()}
                                </Text>
                            </View>
                            <View style={styles.RegisterForm_FieldSelect}>
                                <PhoneNumberPicker
                                    countryHint={{ name: 'Vietnam', cca2: 'VN', callingCode: "84" }}
                                    onChange={this.PhoneNumberPickerChanged.bind(this)} />
                            </View>
                            <View style={styles.RegisterForm_FieldEnter}>
                                <TextInput
                                    ref={'textSearch'}
                                    autoCapitalize="none"
                                    autoFocus={true}
                                    keyboardType='phone-pad'
                                    placeholder={Lang.so_dien_thoai()}
                                    placeholderTextColor="#c7c7cd"
                                    autoCorrect={false}
                                    returnKeyType={"next"}
                                    onBlur={this._onBlur.bind(this)}
                                    onFocus={this._onFocus.bind(this)}
                                    onChangeText={(text) => this.setState({ text })}
                                    style={styles.RegisterForm_FieldEnter_Input}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                />
                                {renderIf(this.state.text != '')(
                                    <TouchableOpacity onPress={() => this._clearText('textSearch')} style={styles.Input_Clear}>
                                        <Image source={require('../../element/form/ic-clear.png')} style={styles.Input_ClearIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>

                        </View>
                    </View>
                    <View style={styles.RegisterForm_Button}>
                        {renderIf(this.state.text.length > 0)(
                            <TouchableOpacity style={styles.RegisterForm_ButtonTouch} onPress={() => this.ValidateRegister(this.state.text)}>
                                <Text style={styles.RegisterForm_ButtonText}>
                                    {Lang.tiep_tuc().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {renderIf(this.state.text.length == 0)(
                            <View style={styles.RegisterForm_ButtonTouchDisable}>
                                <Text style={styles.RegisterForm_ButtonText}>
                                    {Lang.tiep_tuc().toUpperCase()}
                                </Text>
                            </View>
                        )}
                    </View>
                    {renderIf(Platform.OS == 'ios')(
                        <KeyboardSpacer />
                    )}
                </View>
                <View style={styles.headerTransparent}>
                    <View style={styles.headerTransparentInner}>
                        <View style={styles.headerTransparent_Left}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-close-gray.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerTransparent_Title}>
                        </View>
                        <View style={styles.headerTransparent_Right}>
                        </View>
                    </View>
                    {renderIf(this.state.isLoading)(
                        <Loading />
                    )}
                </View>
            </View>
        );
    }
}

module.exports = Register_Step_Phone;
