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
import * as Animatable from 'react-native-animatable';

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
            <View style={styles.BannerSpin}>
                <TouchableOpacity style={styles.BannerSpin_Touch} onPress={()=>Actions.spin()}>
                    <Animatable.Image  animation="rotate" iterationCount="infinite" delay={0} easing="linear" style={styles.BannerSpin_IconLeft} source={require('../../element/spin/Spin_Wheel.png')}/>
                    <Image style={styles.BannerSpin_IconRight} source={require('../../element/spin/Spin_Right.png')}/>
                    <View style={styles.BannerSpin_Content}>
                        <Text style={styles.BannerSpin_Title} numberOfLines={1}>{Lang.vong_quay_may_man()}</Text>
                        <Text style={styles.BannerSpin_Sub} numberOfLines={3}>{Lang.des_vong_quay_may_man()}</Text>
                    </View>
                </TouchableOpacity>
          </View>
        );
    }
}

module.exports = AppotaView;
