import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Platform,
    RefreshControl,
    ListView,
    Dimensions,
    Clipboard,
    StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
import renderIf from '../Common/renderIf'
import TimerMixin from 'react-timer-mixin';
import Communications from 'react-native-communications';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';
import Toast from '@remobile/react-native-toast';
import * as Requests from '../Helpers/Requests'
import Card from './Card'
import Giftcode from './Giftcode'

var styles = require('../Common/style.js');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils')
var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');

const popToRoot = () => {
    Actions.pop();
}


class AppotaView extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    state = {
        isLoadingMore: false,
        method: this.props.tab ? this.props.tab : 'card',
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_my_bag')
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    render_bg_method(method) {
        return this.state.method == method ? styles.headerTab_Touch2Col_Active : styles.headerTab_Touch2Col;
    }

    render_txt_method(method) {
        return this.state.method == method ? styles.headerTab_Text_Active : styles.headerTab_Text;
    }

    onPressTab = (method) => {
        this.setState({
            method: method,
        })
    }

    render() {
        
        return (
            <View {...this.props} style={[styles.container, styles.tabWhite]}>
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
                                {Lang.tui_do()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <View style={[styles.headerTab, { display: 'flex' }]}>
                    <View style={styles.headerTab_Inner}>
                        <TouchableOpacity onPress={() => this.onPressTab('card')} style={this.render_bg_method('card')}>
                            <Text style={this.render_txt_method('card')}>
                                {Lang.ma_the()}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onPressTab('game_giftcode')} style={this.render_bg_method('game_giftcode')}>
                            <Text style={this.render_txt_method('game_giftcode')}>
                                Giftcode
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    {renderIf(this.state.method == 'card')(
                        <Card />
                    )}  
                    {renderIf(this.state.method == 'game_giftcode')(
                        <Giftcode />
                    )}
                </View>
            </View>
        );
    }
}

export default AppotaView
