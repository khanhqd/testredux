import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform,
    Animated,
    Easing,
    StatusBar,
    WebView,
    Image
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import renderIf from '../Common/renderIf'
import * as Animatable from 'react-native-animatable';
import TimerMixin from 'react-timer-mixin';
import LinearGradient from 'react-native-linear-gradient';
import Toast from '@remobile/react-native-toast';
import { LINK } from '../Helpers/constString'

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang')
var Loading = require('../Common/Loading')

const popToRoot = () => {
    Actions.home({ type: 'reset' })
    setTimeout(() => {
        Actions.refresh()
    }, 10);
}

class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            web_title: '',
        }
        Text.defaultProps.allowFontScaling=false;
    }

    onNavigationStateChange = (navState) => {
        Toast.showToast('title=' + navState.title, 'short', 'top')
        if (navState.title == '') {
            // TH mặc định
            this.setState({
                web_title: ''
            })
        }
        else {
            //luôn ẩn button native
            //nếu là otp thì gọi UserInfor, mặc định là popup
            // this.setState({
            //     web_title: navState.title
            // })
            if (navState.title == 'otp' || navState.title == 'gift') {
                this.GetUserInfo()
            }
        }
    }

    GetUserInfo() {
        let { dispatch, access_token } = this.props
        RequestHelper.UserInfo(access_token)
            .then((data) => {
                if (data.status == 200) {
                    var info = JSON.parse(data._bodyText);
                    dispatch(taskActionCreators.change_user(info))
                    Actions.refresh()
                }
                else if (data.status == 401) {
                    Toast.showToast(Lang.token_het_han(), "short", "center");
                    Actions.login();
                }
            })
            .catch((error) => {
            })
            .done();
    }

    render() {
        return (
            <View style={[styles.container, styles.tabSpin]}>
                <StatusBar hidden={true} />
                <View style={styles.SpinScreen}>
                    <Image source={require('../../element/spin/bg_casino.jpg')} style={styles.Spin_Bg} />
                    <View style={styles.SpinScreen_Inner}>
                        <WebView
                            source={{ uri: `${LINK.SPIN}${this.props.access_token}&lang=${Lang.getLanguage()}` }}
                            style={styles.SpinScreen_WebView}
                            scrollEnabled={false}
                            javaScriptEnabled={true}
                            allowsInlineMediaPlayback={true}
                            mediaPlaybackRequiresUserAction={true}
                            startInLoadingState={true}
                            renderLoading={() => <Loading color={'white'} backgroundColor={'transparent'} />} />
                        <Animatable.View style={styles.Spin_Header_Top}>
                            <TouchableOpacity style={styles.Spin_Header_Top_Touch} onPress={()=>this.props.nomeHome ? Actions.pop() : popToRoot()}>
                                <Image source={require('../../element/spin/btn-close.png')} style={styles.Spin_Header_Img} />
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
})

export default connect(mapStateToProps)(AppotaView)
