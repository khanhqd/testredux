import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Platform
} from "react-native";
import { Actions } from "react-native-router-flux";
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build();
var styles = require('../Common/style.js');
import renderIf from '../Common/renderIf'
import ProgressImage from 'react-native-progress/CircleSnail';
var Utils = require('../Common/Utils');
import TimerMixin from 'react-timer-mixin';

const popToRoot = () => {
    Actions.popTo("root");
}

class Temp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            size: Platform.OS == 'ios' ? 1 : 35
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.LoadingPage}>
                <View style={[styles.LoadingPage_Inner, { marginBottom: 150 }]}>
                    <ActivityIndicator animating={true} style={[styles.centering, { height: 80 }]} size={this.state.size} />
                </View>
            </View>
        );
    }
}

module.exports = Temp;