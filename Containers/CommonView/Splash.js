import React, { Component } from 'react';
import { PropTypes } from "react";
import { View, Text, ActivityIndicator, TextInput, Image, StyleSheet, AsyncStorage, ScrollView, Alert, Platform, StatusBar } from "react-native";
import { Actions } from "react-native-router-flux";
var styles = require('../Common/style.js');
import renderIf from '../Common/renderIf'
import TimerMixin from 'react-timer-mixin';
var codePush = require('react-native-code-push');
import * as Progress from 'react-native-progress';
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils')
var RequestHelper = require('../Common/RequestHelper');
import Toast from '@remobile/react-native-toast';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"

const popToRoot = () => {
    Actions.popTo("root");
}

class Splash extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            PIN: 'pin',
            progress: 0,
            needDownload: true
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentWillMount() {
        AsyncStorage.getItem("PIN").then((value) => {
            if (value != null && value.length != 0) {
                this.setState({
                    PIN: value
                });
            }
        }).done();
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    componentDidMount() {
        if (this.state.needDownload) {
            this.DownloadData()
        }
        else {
            this.showApp()
        }
    }

    DownloadData() {
        codePush.allowRestart();
        codePush.sync({ updateDialog: false, installMode: codePush.InstallMode.IMMEDIATE },
            (status) => {
                switch (status) {
                    case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                        break;
                    case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                        break;
                    case codePush.SyncStatus.INSTALLING_UPDATE:
                        break;
                    case codePush.SyncStatus.UP_TO_DATE:
                        codePush.notifyApplicationReady();
                        this.showApp();
                        break;
                    case codePush.SyncStatus.UPDATE_INSTALLED:
                        setTimeout(() => {
                            this.showApp();
                        }, 500)
                        break;
                    case codePush.SyncStatus.UNKNOWN_ERROR:
                        this.showApp();
                        break;
                }
            },
            ({ receivedBytes, totalBytes, }) => {
                if (parseInt(receivedBytes * 100 / totalBytes) == 100) {

                }
                else {
                    if (this.refs.myRef)
                        this.setState({
                            progress: parseInt(receivedBytes * 100 / totalBytes)
                        });
                }
            }
        );
    }

    showApp() {
        setTimeout(() => {
            this.state.PIN == this.props.access_token ? Actions.pin({ fromSplash: true }) : Actions.tabbar();
        }, 200);
    }

    render() {
        return (
            <View {...this.props} ref="myRef" style={[styles.container, styles.tabSplash]}>
                {renderIf(Platform.OS === 'ios')(
                    <StatusBar barStyle={'light-content'} />
                )}
                {renderIf(Platform.OS === 'android')(
                    <StatusBar backgroundColor="#1b6614" animated={true} />
                )}
                <View style={styles.SplashScreen}>
                    <View style={styles.SplashScreen_Inner}>
                        <Image source={require('../../element/splash/Appota.png')} style={styles.SplashScreen_Img} />
                    </View>
                    {renderIf(this.state.progress > 0)(
                        <View>
                            <Text style={styles.LoadingProgress_Title}>{Lang.tai_du_lieu()} {this.state.progress}%</Text>
                            <Progress.Bar color={'white'} progress={this.state.progress / 100} width={200}></Progress.Bar>
                        </View>
                    )}
                    {renderIf(this.state.progress == 0)(
                        <ActivityIndicator color='white' animating={true} style={[styles.centering, { height: 80 }]} size={Platform.OS == 'ios' ? 1 : 35} />
                    )}
                </View>
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
})

export default connect(mapStateToProps)(Splash)
