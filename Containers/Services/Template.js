/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import renderIf from '../Common/renderIf'
import RowData from './RowData'
import Toast from '@remobile/react-native-toast'
import GoogleAnalytics from 'react-native-google-analytics-bridge'
import appsFlyer from 'react-native-appsflyer'
import { AppEventsLogger } from 'react-native-fbsdk'
import TimerMixin from 'react-timer-mixin'
import * as Requests from '../Helpers/Requests'

var styles = require('../Common/style.js')
var Lang = require('../Common/Lang')
var Loading = require('../Common/Loading')

class AppotaView extends Component {
    state = {
    }

    componentDidMount() {

    }

    render() {
        return (
            <View {...this.props} style={styles.container}>
                <View style={styles.headerNavInner}>
                    <View style={styles.navLeft}>
                        <TouchableOpacity onPress={popToRoot}>
                            <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navTitle}>
                        <Text style={styles.navTitle_Text}>
                            {Lang.nap_game2()}
                        </Text>
                    </View>
                    <View style={styles.navRight}>
                        <TouchableOpacity >
                            <Image source={require('../../element/nav-bar/nav-history.png')} style={styles.headerNav_Img} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.FormContránol}>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
})

export default connect(mapStateToProps)(AppotaView)
