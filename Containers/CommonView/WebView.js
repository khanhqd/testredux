import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    WebView,
    AsyncStorage,
    Keyboard,
    StatusBar
} from "react-native";
import { Actions, Modal } from "react-native-router-flux";
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var Lang = require('../Common/Lang');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop()
}

class AppotaView extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_webview');
        appsFlyer.trackEvent('af_webview', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_webview', 1);
    }

    render() {
        return (
            <View {...this.props} style={[styles.container, styles.tabHome]}>
                <StatusBar hidden={false} />
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
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

module.exports = AppotaView;