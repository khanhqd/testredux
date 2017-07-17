import React from 'react';
import {
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    TextInput,
    Platform, 
    StatusBar,
    Keyboard
} from "react-native";
import {Actions} from "react-native-router-flux";
import appsFlyer from 'react-native-appsflyer';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { AppEventsLogger } from 'react-native-fbsdk';

import renderIf from '../Common/renderIf'
var Lang = require('../Common/Lang');
var styles = require('../Common/style.js');

class Register_Step_Password extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isFocused: true,
            text: ''
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_pin_update_password');
        appsFlyer.trackEvent('af_pin_update_password', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_pin_update_password', 1);
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

    render() {
        return (
            <View style={[styles.container, styles.tabAccount, this.props.style]}>
                {renderIf(Platform.OS === 'ios')(
                    <StatusBar barStyle={'default'} />
                )}
                {renderIf(Platform.OS === 'android')(
                    <StatusBar backgroundColor="#1b6614" animated={true} />
                )}
                <View style={styles.RegisterForm}>
                    <View style={styles.RegisterForm_Inner}>
                        <View style={styles.RegisterForm_Field}>
                            <View style={styles.RegisterForm_FieldTitle}>
                                <Text style={styles.RegisterForm_FieldTitle_Text}>
                                    {Lang.mat_khau_la_gi()}
                                </Text>
                            </View>
                            <View style={styles.RegisterForm_FieldInfo}>
                                <Text style={styles.RegisterForm_FieldInfo_Text}>
                                    
                                </Text>
                            </View>
                            <View style={styles.RegisterForm_FieldEnter}>
                                <TextInput
                                    ref={'textSearch'}
                                    autoCapitalize="none"
                                    autoFocus = {true}
                                    secureTextEntry={true}
                                    placeholder={Lang.mat_khau()}
                                    placeholderTextColor = "#c7c7cd"
                                    autoCorrect={false}
                                    returnKeyType = {"done"}
                                    onSubmitEditing={() => Actions.new_pin({step: 1, password: this.state.text})}
                                    onBlur={this._onBlur.bind(this)}
                                    onFocus={this._onFocus.bind(this) }
                                    onChangeText={(text) => this.setState({ text }) }
                                    style={styles.RegisterForm_FieldEnter_Input}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    />
                                {renderIf(this.state.text != '')(
                                    <TouchableOpacity onPress={() => this._clearText('textSearch') } style={styles.Input_Clear}>
                                        <Image source={require('../../element/form/ic-clear.png') } style={styles.Input_ClearIcon}/>
                                    </TouchableOpacity>
                                ) }
                            </View>

                        </View>
                    </View>
                    <View style={styles.RegisterForm_Button}>
                        {renderIf(this.state.text != '')(
                            <TouchableOpacity style={styles.RegisterForm_ButtonTouch} onPress={() => Actions.new_pin({step: 1, password: this.state.text}) }>
                                <Text style={styles.RegisterForm_ButtonText}>
                                    {Lang.tiep_tuc().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        ) }
                        {renderIf(this.state.text == '')(
                            <View style={styles.RegisterForm_ButtonTouchDisable}>
                                <Text style={styles.RegisterForm_ButtonText}>
                                    {Lang.tiep_tuc().toUpperCase()}
                                </Text>
                            </View>
                        ) }
                    </View>
                    {renderIf(Platform.OS == 'ios')(
                        <KeyboardSpacer />
                    )}
                </View>
                <View style={styles.headerTransparent}>
                    <View style={styles.headerTransparentInner}>
                        <View style={styles.headerTransparent_Left}>
                            <TouchableOpacity onPress={() => {Actions.pop(); Keyboard.dismiss() }}>
                                <Image source={require('../../element/nav-bar/nav-back-gray.png') } style={styles.headerNav_Img}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerTransparent_Title}>
                        </View>
                        <View style={styles.headerTransparent_Right}>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

module.exports = Register_Step_Password;