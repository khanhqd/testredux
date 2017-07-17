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

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');
var Utils = require('../Common/Utils');

class AppotaView extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    render() {
        return (
            <View style={styles.updateProfile}>
                <TouchableOpacity style={styles.updateProfile_Touch} onPress={() => Actions.login()}>
                    <Image style={styles.updateProfile_Icon} source={require('../../element/profile/UpdateProfile.png')} />
                    <View style={styles.updateProfile_Content}>
                        <Text style={styles.updateProfile_Title}>{Lang.chua_dang_nhap()}</Text>
                        <Text style={styles.updateProfile_Sub}>{Lang.moi_ban_dang_nhap()}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

module.exports = AppotaView;
