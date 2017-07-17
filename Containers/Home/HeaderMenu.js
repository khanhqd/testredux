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
import GoogleAnalytics from 'react-native-google-analytics-bridge';

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');

class AppotaView extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    onPressMenu(btn) {
        if (this.props.access_token.length == 0) {
            Actions.login();
        }
        else {
            switch (btn) {
                case 'scan':
                    GoogleAnalytics.trackEvent('ga_home', 'scan');
                    Actions.scan();
                    break;
                case 'checkin':
                    GoogleAnalytics.trackEvent('ga_home', 'checkin');
                    Actions.checkin();
                    break;
                case 'nearby':
                    GoogleAnalytics.trackEvent('ga_home', 'nearby');
                    Actions.explore_map();
                    break;
                case 'my_bag':
                    GoogleAnalytics.trackEvent('ga_home', 'my_bag');
                    Actions.my_bag();
                    break;    
                case 'bank_cards':
                    GoogleAnalytics.trackEvent('ga_home', 'bank_cards');
                    Actions.comingsoon();
                    break;
                default:
                    GoogleAnalytics.trackEvent('ga_home', 'coming_soon');
                    Actions.comingsoon()
                    break
            }
        }
    }

    render() {
        return (
            <View style={styles.ViewListHeader}>
                <View style={styles.ViewListHeader_List}></View>
                <View style={styles.ViewListHeader_Bottom}></View>
                <View style={styles.ViewListHeader_ListScroll} >
                    <View style={styles.ViewListHeader_ListScroll_Inner}>
                        <View style={styles.ViewListHeader_ListScroll_Row}>
                            <TouchableOpacity onPress={this.onPressMenu.bind(this, 'scan')} style={styles.ViewListHeader_ListTouch}>
                                <View style={styles.ViewListHeader_ListTouch_Inner}>
                                    <View style={styles.ViewListHeader_ListIcon}>
                                        <Image source={require('../../element/homepage/ic-QRCode.png')} style={styles.ViewListHeader_ListImg} />
                                    </View>
                                    <View style={styles.ViewListHeader_ListName}>
                                        <Text style={styles.ViewListHeader_ListName_Title} numberOfLines={2}>
                                            {Lang.quet_ma()}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressMenu.bind(this, 'checkin')} style={styles.ViewListHeader_ListTouch}>
                                <View style={styles.ViewListHeader_ListTouch_Inner}>
                                    <View style={styles.ViewListHeader_ListIcon}>
                                        <Image source={require('../../element/homepage/ic-Checkin.png')} style={styles.ViewListHeader_ListImg} />
                                    </View>
                                    <View style={styles.ViewListHeader_ListName}>
                                        <Text style={styles.ViewListHeader_ListName_Title} numberOfLines={2}>
                                            Check-in
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressMenu.bind(this, 'my_bag')} style={styles.ViewListHeader_ListTouch}>
                                <View style={styles.ViewListHeader_ListTouch_Inner}>
                                    <View style={styles.ViewListHeader_ListIcon}>
                                        <Image source={require('../../element/homepage/ic-Bag.png')} style={styles.ViewListHeader_ListImg} />
                                    </View>
                                    <View style={styles.ViewListHeader_ListName}>
                                        <Text style={styles.ViewListHeader_ListName_Title} numberOfLines={2}>
                                            {Lang.tui_do()}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressMenu.bind(this, 'bank_cards')} style={styles.ViewListHeader_ListTouch}>
                                <View style={styles.ViewListHeader_ListTouch_Inner}>
                                    <View style={styles.ViewListHeader_ListIcon}>
                                        <Image source={require('../../element/homepage/ic-LienKet.png')} style={styles.ViewListHeader_ListImg} />
                                    </View>
                                    <View style={styles.ViewListHeader_ListName}>
                                        <Text style={styles.ViewListHeader_ListName_Title} numberOfLines={2}>
                                            {Lang.lien_ket_the()}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

module.exports = AppotaView;
