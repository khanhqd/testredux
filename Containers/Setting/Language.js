import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    AsyncStorage
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import renderIf from '../Common/renderIf'
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');

const popToRoot = () => {
    Actions.pop();
}

class AppotaView extends React.Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_language');
    }

    onSwitchLang(value) {
        GoogleAnalytics.trackEvent('ga_language', `Switch language ${value}`);
        appsFlyer.trackEvent(`af_language_${value}`, {}, () => { }, () => { });
        AppEventsLogger.logEvent(`fb_language_${value}`, 1);

        let { dispatch } = this.props
        Lang.initLang(value);
        AsyncStorage.setItem("lang", value);
        dispatch(taskActionCreators.change_lang(value))
        this.props.onChangeLang();
    }

    render() {
        return (
            <View style={[styles.container, styles.tabAccount, this.props.style]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.ngon_ngu()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView style={styles.FormControl_Scroll} keyboardShouldPersistTaps='always'>
                        <View style={styles.FormControl_TitleBorder}>
                            <Text style={styles.FormControl_TitleText}>
                                {Lang.chon_ngon_ngu().toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.FormControl_Inner}>
                            <View style={styles.FormControl_Profile}>
                                <TouchableOpacity style={styles.FormControl_Input_Form} onPress={this.onSwitchLang.bind(this, 'en')}>
                                    <Text style={styles.FormControl_Text_Field}>English</Text>
                                    <Text style={styles.FormControl_Text_Sub}>Tiếng Anh</Text>
                                    {renderIf(Lang.getLanguage() == 'en')(
                                        <Image style={styles.FormControl_CheckImg} source={require('../../element/profile/ic-ok.png')} />
                                    )}
                                </TouchableOpacity>
                                <View style={styles.FormControl_Line}></View>
                                <TouchableOpacity style={styles.FormControl_Input_Form} onPress={this.onSwitchLang.bind(this, 'vi')}>
                                    <Text style={styles.FormControl_Text_Field}>Tiếng Việt</Text>
                                    <Text style={styles.FormControl_Text_Sub}>Vietnamese</Text>
                                    {renderIf(Lang.getLanguage() == 'vi')(
                                        <Image style={styles.FormControl_CheckImg} source={require('../../element/profile/ic-ok.png')} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    lang: state.taskState.lang,
})

export default connect(mapStateToProps)(AppotaView)
