/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import renderIf from '../Common/renderIf'
//import RowData from './RowData'
import Toast from '@remobile/react-native-toast'
import GoogleAnalytics from 'react-native-google-analytics-bridge'
import appsFlyer from 'react-native-appsflyer'
import { AppEventsLogger } from 'react-native-fbsdk'
import TimerMixin from 'react-timer-mixin'
import * as Requests from '../Helpers/Requests'
import KeyboardSpacer from 'react-native-keyboard-spacer';

var styles = require('../Common/style.js')
var Lang = require('../Common/Lang')
var Loading = require('../Common/Loading')

const popToRoot = () => {
    Actions.pop();
}

class AppotaView extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isFocused: true,
            text: ''
        }
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
            text: '',
            isFocused: true
        })
    }

    onGetBillInfo = () => {
        let { dispatch, access_token } = this.props
        Requests.getBillInfo(access_token, 'abc', this.state.text)
            .then((data) => {
                console.log('BILL=' + JSON.stringify(data))
            })
            .catch((e) => {
              
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
                                VNPT Hà Nội
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-history.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
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
                                    MÃ KHÁCH HÀNG
                                </Text>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_Input}>
                                    <TextInput
                                        ref={'textClear'}
                                        autoCapitalize="none"
                                        autoFocus={true}
                                        keyboardType='default'
                                        placeholder="Nhập mã khách hàng"
                                        placeholderTextColor="rgba(0,0,0,0.3)"
                                        value={this.state.text}
                                        autoCorrect={false}
                                        returnKeyType={"done"}
                                        onBlur={this._onBlur.bind(this)}
                                        onFocus={this._onFocus.bind(this)}
                                        onChangeText={(text) => this.setState({ text })}
                                        style={styles.FormControl_Input_Enter}
                                    />
                                    {renderIf(this.state.text != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this._clearText('textClear')} style={styles.FormControl_Addon}>
                                            <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_AddonIcon} />
                                        </TouchableOpacity>
                                    )}

                                </View>
                            </View>
                            <View style={styles.FormControl_Title}>
                                <Text style={styles.FormControl_TitleText}>
                                    MẪU HÓA ĐƠN
                                </Text>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_Sample}>
                                    <Image source={require('../../element/service/Internet/bill/hoadon-internet.jpg')} style={styles.FormControl_Sample_Img} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.FormControl_Button}>
                        {renderIf(this.state.text != '')(
                            <TouchableOpacity onPress={this.onGetBillInfo} style={styles.FormControl_ButtonTouch} >
                                <Text style={styles.FormControl_ButtonText}>
                                    TIẾP TỤC
                                </Text>
                            </TouchableOpacity>
                        )}
                        {renderIf(this.state.text == '')(
                            <View style={styles.LoginForm_ButtonTouchDisable}>
                                <Text style={styles.FormControl_ButtonText}>
                                    TIẾP TỤC
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
                <KeyboardSpacer />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
})

export default connect(mapStateToProps)(AppotaView)
