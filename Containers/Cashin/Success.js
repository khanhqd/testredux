import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    Dimensions,
    TouchableOpacity,
    BackAndroid,
    Platform
} from "react-native";
import { Actions, Modal } from "react-native-router-flux";
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import * as Requests from '../Helpers/Requests'
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"

var {
    height: deviceHeight
} = Dimensions.get("window");
var styles = require('../Common/style.js');

import renderIf from '../Common/renderIf'
import TimerMixin from 'react-timer-mixin';
var Lang = require('../Common/Lang');


class CashinSuccess extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackAndroid = this.handleBackAndroid.bind(this);
        this.state = {
            offset: new Animated.Value(-deviceHeight)
        };
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
        AppEventsLogger.logEvent('fb_cashin_ac_success', 1);
        appsFlyer.trackEvent('af_cashin_ac_success', {}, () => { }, () => { });
        GoogleAnalytics.trackScreenView('ga_cashin_ac_success');
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start()
        setTimeout(() => {
            this.GetUserInfo()
        }, 200)
    }

    GetUserInfo() {
        let { dispatch, access_token } = this.props
        Requests.User_Infor(access_token)
            .then((data) => {
                dispatch(taskActionCreators.change_user(data))
            })
            .catch((error) => {
            })
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);
        TimerMixin.clearTimeout(this.timer);
    }

    handleBackAndroid() {
        try {
            this.closeModal();
            return true;
        } catch (err) {
            return false;
        }
    }

    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.pop);
    }

    onPress() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.pop);
        setTimeout(() => {
            Actions.home({ type: 'reset' })
        }, 200);
    }

    render() {
        var flag = this.props.flag;
        return (

            <Animated.View style={[styles.popup, { transform: [{ translateY: this.state.offset }] }]}>
                <View style={styles.popupDialog}>
                    {renderIf(Platform.OS == 'ios')(
                        <View style={styles.popupIcon}>
                            <View style={styles.popupIcon_Pic}>
                                <Image source={require('../../element/alert/alert-success.png')} style={styles.popupIcon_Img} />
                            </View>
                        </View>
                    )}
                    <View style={[styles.popupHeader, { marginBottom: 10, marginTop: -10 }]}>
                        <Text style={styles.popupHeader_Text}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={styles.popupBody}>
                        <Text style={styles.popupBody_Text}>
                            {Lang.nap_vi_bang_card(this.props.card_vendor.toLowerCase())} <Text style={{ fontWeight: 'bold' }}>{this.props.value}đ</Text>, {Lang.thuc_linh().toLowerCase()} <Text style={{ fontWeight: 'bold' }}>{this.props.net_wage}đ</Text>, {Lang.phi().toLowerCase()} <Text style={{ fontWeight: 'bold' }}>{this.props.fee}đ</Text>
                        </Text>
                    </View>
                    <View style={styles.popupFooter}>
                        <TouchableOpacity style={styles.popupFooter_Touch} onPress={this.onPress.bind(this)}>
                            <Text style={styles.popupFooter_Text} >
                                {Lang.button_ok()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
})

export default connect(mapStateToProps)(CashinSuccess)