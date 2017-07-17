/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import renderIf from '../Common/renderIf'
//import RowData from './RowData'
import Toast from '@remobile/react-native-toast'
import GoogleAnalytics from 'react-native-google-analytics-bridge'
import appsFlyer from 'react-native-appsflyer'
import { AppEventsLogger } from 'react-native-fbsdk'
import TimerMixin from 'react-timer-mixin'
import * as Requests from '../Helpers/Requests'

var styles = require('../Common/style.js')
var Lang = require('../Common/Lang')
var Loading = require('../Common/Loading')

const popToRoot = () => {
    Actions.pop();
}

class ViewService extends Component {
    render() {
        return (
        <View {...this.props} >
            <View  style={styles.ViewService_Group}>
                <TouchableOpacity style={styles.ViewService_Touch} onPress={()=>Actions.row_input()}>
                    <View style={styles.ViewService_Touch_Thumb}>
                        <Image source={require('../../element/service/Internet/spt.png')} style={styles.ViewService_Touch_ThumbImg}/>
                    </View>
                    <View style={styles.ViewService_Touch_Info}>
                        <Text style={styles.ViewService_Touch_InfoTitle} numberOfLines={2}>
                            ADSL STC - SPT
                        </Text>
                        <Text style={styles.ViewService_Touch_InfoSub} numberOfLines={2}>
                            Internet/Điện thoại cố định
                        </Text>
                    </View>
                    <View style={styles.ViewService_Touch_Point}>
                        <Image source={require('../../element/form/ic-point.png') } style={styles.ViewService_Touch_PointImg}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.ViewService_Line}></View>
            </View>
            <View  style={styles.ViewService_Group}>
                <TouchableOpacity style={styles.ViewService_Touch} >
                    <View style={styles.ViewService_Touch_Thumb}>
                        <Image source={require('../../element/service/Internet/sst.png')} style={styles.ViewService_Touch_ThumbImg}/>
                    </View>
                    <View style={styles.ViewService_Touch_Info}>
                        <Text style={styles.ViewService_Touch_InfoTitle} numberOfLines={2}>
                            SST - Nam Sài Gòn
                        </Text>
                        <Text style={styles.ViewService_Touch_InfoSub} numberOfLines={2}>
                            Internet/Điện thoại cố định
                        </Text>
                    </View>
                    <View style={styles.ViewService_Touch_Point}>
                        <Image source={require('../../element/form/ic-point.png') } style={styles.ViewService_Touch_PointImg}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.ViewService_Line}></View>
            </View>
            <View  style={styles.ViewService_Group}>
                <TouchableOpacity style={styles.ViewService_Touch} >
                    <View style={styles.ViewService_Touch_Thumb}>
                        <Image source={require('../../element/service/Internet/fpttelecom.png')} style={styles.ViewService_Touch_ThumbImg}/>
                    </View>
                    <View style={styles.ViewService_Touch_Info}>
                        <Text style={styles.ViewService_Touch_InfoTitle} numberOfLines={2}>
                            ADSL FPT
                        </Text>
                        <Text style={styles.ViewService_Touch_InfoSub} numberOfLines={2}>
                            Internet
                        </Text>
                    </View>
                    <View style={styles.ViewService_Touch_Point}>
                        <Image source={require('../../element/form/ic-point.png') } style={styles.ViewService_Touch_PointImg}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.ViewService_Line}></View>
            </View>
            <View  style={styles.ViewService_Group}>
                <TouchableOpacity style={styles.ViewService_Touch} >
                    <View style={styles.ViewService_Touch_Thumb}>
                        <Image source={require('../../element/service/Internet/vnpt.png')} style={styles.ViewService_Touch_ThumbImg}/>
                    </View>
                    <View style={styles.ViewService_Touch_Info}>
                        <Text style={styles.ViewService_Touch_InfoTitle} numberOfLines={2}>
                            VNPT Hà Nội
                        </Text>
                        <Text style={styles.ViewService_Touch_InfoSub} numberOfLines={2}>
                            Internet/Điện thoại cố định
                        </Text>
                    </View>
                    <View style={styles.ViewService_Touch_Point}>
                        <Image source={require('../../element/form/ic-point.png') } style={styles.ViewService_Touch_PointImg}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.ViewService_Line}></View>
            </View>
            <View  style={styles.ViewService_Group}>
                <TouchableOpacity style={styles.ViewService_Touch} >
                    <View style={styles.ViewService_Touch_Thumb}>
                        <Image source={require('../../element/service/Internet/vnpt.png')} style={styles.ViewService_Touch_ThumbImg}/>
                    </View>
                    <View style={styles.ViewService_Touch_Info}>
                        <Text style={styles.ViewService_Touch_InfoTitle} numberOfLines={2}>
                            VNPT TP.HCM
                        </Text>
                        <Text style={styles.ViewService_Touch_InfoSub} numberOfLines={2}>
                            Internet/Điện thoại cố định
                        </Text>
                    </View>
                    <View style={styles.ViewService_Touch_Point}>
                        <Image source={require('../../element/form/ic-point.png') } style={styles.ViewService_Touch_PointImg}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.ViewService_Line}></View>
            </View>
        </View>
        );
    }
}

class AppotaView extends Component {
    render() {
        return (
            <View {...this.props}  style={[styles.container, styles.tabService]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png') } style={styles.headerNav_Img}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                Thanh toán Internet
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.FormControl_TitleBorder}>
                        <Text  style={styles.FormControl_TitleText}>
                            CHỌN NHÀ CUNG CẤP
                        </Text>
                    </View>
                    <View style={styles.ViewService}>
                        <View style={styles.ViewService_Inner}>
                            <ViewService/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
})

export default connect(mapStateToProps)(AppotaView)
