import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from "react-native";

import { Actions } from 'react-native-router-flux';
var Lang = require('../Common/Lang');
import GoogleAnalytics from 'react-native-google-analytics-bridge';

var styles = require('../Common/style.js');

const popToRoot = () => {
    Actions.pop();
}

class ComingSoon extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_coming_soon');
    }

    render() {
        return (
            <View {...this.props} style={[styles.container, this.props.sceneStyle]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                Coming Soon
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <View style={styles.ComingSoom}>
                    <Image source={require('../../element/coming-soom/coming-soom.png')} style={styles.ComingSoom_Img} />
                    <Text style={styles.ComingSoom_Title}>
                        {Lang.dang_phat_trien()}
                    </Text>
                    <Text style={styles.ComingSoom_TitleSub}>
                        {Lang.des_dang_phat_trien()}
                    </Text>
                </View>
            </View>
        );
    }
};


export default ComingSoon;
