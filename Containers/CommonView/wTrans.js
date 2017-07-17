import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Alert,
    TouchableOpacity,
    WebView,
    AsyncStorage,
    Keyboard
} from "react-native";
import { Actions, Modal } from "react-native-router-flux";
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import Toast from '@remobile/react-native-toast';
import * as Requests from '../Helpers/Requests'

var Lang = require('../Common/Lang');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop()
}

class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            web_title: '',
        }
        Text.defaultProps.allowFontScaling=false;
    }

    popToPrev() {
        if (this.state.web_title != 'AppotaPay') {
            Actions.popup({
                title: Lang.thong_bao(),
                content: Lang.giao_dich_chua_thanh_cong(),
                onPress_Ok: () => popToRoot(),
                onPress_Cancel: () => { }
            });
        }
        else {
            Actions.tabbar({ type: 'reset' })
            setTimeout(() => {
                Actions.refresh()
            }, 10)
        }
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_webview_trans');
        appsFlyer.trackEvent('af_webview_trans', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_webview_trans', 1);
    }

    onNavigationStateChange = (navState) => {
        if (navState.title == 'AppotaPay') {
            Toast.showToast(Lang.giao_dich_thanh_cong(), 'short', 'bottom')
            this.setState({
                web_title: 'AppotaPay'
            })
            if (this.props.method == 'cashin')
                this.GetUserInfo()
        }
        else {
            this.setState({
                web_title: navState.title
            })
        }
    }

    GetUserInfo() {
        let {dispatch, access_token} = this.props
        Requests.User_Infor(access_token)
            .then((data) => {
                dispatch(taskActionCreators.change_user(data))
                Actions.tabbar({ type: 'reset' })
                setTimeout(() => {
                    Actions.refresh()
                }, 10)
            })
            .catch((error) => {
            })
    }

    render() {
        return (
            <View {...this.props} style={[styles.container, styles.tabHome]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={this.popToPrev.bind(this)}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {this.props.title}
                            </Text>
                        </View>
                        <View style={styles.navRight}>

                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <WebView
                        ref={'webview'}
                        automaticallyAdjustContentInsets={false}
                        source={{ uri: this.props.url }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        onNavigationStateChange={this.onNavigationStateChange}
                        decelerationRate="normal"
                        startInLoadingState={true}
                        renderError={(e) => {
                            return (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 14, color: 'black', marginTop: 20, textAlign: 'center' }}>
                                        {Lang.loi_ket_noi()}
                                    </Text>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
})

export default connect(mapStateToProps)(AppotaView)