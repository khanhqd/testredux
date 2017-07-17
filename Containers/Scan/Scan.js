import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import TimerMixin from 'react-timer-mixin';
import Camera from 'react-native-camera';
import renderIf from '../Common/renderIf';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
const Permissions = require('react-native-permissions');
import { AppEventsLogger } from 'react-native-fbsdk';

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Actions.pop();
}

class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: false,
            isCamera: false
        }
    }

    componentWillMount() {
        Permissions.getPermissionStatus('camera')
            .then(response => {
                // Toast.showToast(response, 'short', 'top')
                //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
                if (response == 'denied') {
                    this.setState({
                        isCamera: false
                    })
                    Actions.popup({
                        title: Lang.thong_bao(),
                        content: 'Bạn cần vào phần cài đặt của device rồi cấp quyền truy cập Camera cho Ví Appota để tiếp tục sử dụng tính năng này',
                        flag: 'error',
                        onPress_Ok: Permissions.openSettings,
                        onPress_Cancel: () => { }
                    })
                }
                else {
                    this.setState({
                        isCamera: true
                    })
                }
            });
    }

    componentWillReceiveProps() {
        this.setState({
            isLoading: false
        })
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_scan');
        let { dispatch, location } = this.props
        if (location.lat == 0 || location.lon == 0) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    var _location = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    }
                    dispatch(taskActionCreators.change_location(_location))
                },
                (error) => { },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        }
    }

    componentWillUnmount() {

        TimerMixin.clearTimeout(this.timer);
    }

    onBarCodeRead(code) {
        this.setState({ isLoading: true })
        if (code.data.substr(0, 4).indexOf('1212') > -1) {
            try {
                var _phone = code.data.slice(4)
                Actions.popup({
                    title: Lang.thong_bao(),
                    content: Lang.confirm_chuyen_tien(_phone),
                    flag: 'success',
                    onPress_Ok: () => this.confirmTransfer(_phone),
                    onPress_Cancel: () => this.setState({ isLoading: false })
                })
            } catch (e) {
                Actions.popup({ title: Lang.thong_bao(), content: 'Barcode không đúng định dạng, vui lòng thử lại.', flag: 'error', onPress_Ok: () => Actions.pop() });
            }
        }
        else {
            try {
                var data = JSON.parse(code.data);
                GoogleAnalytics.trackEvent('ga_scan', `Qrcode read ${data.type}`);
                appsFlyer.trackEvent(`af_qrcode_${data.type}`, {}, () => { }, () => { });
                AppEventsLogger.logEvent(`fb_qrcode_${data.type}`, 1);

                if (data.type == 'checkin') {
                    this.Checkin(data.id, data.name, data.type);
                }
                else if (data.type == 'personal') {
                    Actions.popup({
                        title: Lang.thong_bao(),
                        content: Lang.confirm_chuyen_tien(data.phone),
                        flag: 'success',
                        onPress_Ok: () => this.confirmTransfer(data.phone),
                        onPress_Cancel: () => this.setState({ isLoading: false })
                    });
                }
                else if (data.type == 'payment_order') {
                    Actions.popup({
                        title: Lang.thong_bao(),
                        content: Lang.confirm_thanh_toan(data.phone),
                        flag: 'success',
                        onPress_Ok: () => this.confirmPayment(data.phone),
                        onPress_Cancel: () => this.setState({ isLoading: false })
                    });
                }
                else if (data.type == 'order') {
                    Actions.popup({
                        title: Lang.thong_bao(),
                        content: Lang.confirm_thanh_toan_hoa_don(Utils.number_format(parseInt(data.amount), 0, '.', '.'), data.merchant_phone),
                        flag: 'success',
                        onPress_Ok: () => this.confirmOrder(data.merchant_phone, data.amount),
                        onPress_Cancel: () => this.setState({ isLoading: false })
                    });
                }
                else {
                    Actions.popup({ title: Lang.thong_bao(), content: Lang.qrcode_khong_dung(), flag: 'error', onPress_Ok: () => Actions.pop() });
                }
            } catch (e) {
                Actions.popup({ title: Lang.thong_bao(), content: Lang.qrcode_khong_dung(), flag: 'error', onPress_Ok: () => Actions.pop() });
            }
        }
    }

    confirmTransfer(phone) {
        this.setState({ isLoading: false })
        setTimeout(() => {
            Actions.transfer({ contact_number: phone, balance: this.props.user_infor.balance })
        }, 10);
    }

    confirmPayment(phone) {
        this.setState({ isLoading: false })
        setTimeout(() => {
            Actions.payment_orders({ phone: phone, balance: this.props.user_infor.balance });
        }, 10);
    }

    confirmOrder(phone, amount) {
        this.setState({ isLoading: false })
        setTimeout(() => {
            Actions.qrcode_orders({ phone: phone, amount: amount, balance: this.props.user_infor.balance });
        }, 10);
    }

    Checkin(id, name, type) {
        RequestHelper.UserCheckin(this.props.access_token, id, this.props.location.lat, this.props.location.lon, type)
            .then((data) => {
                if (data.status == 200) {
                    if (type == 'checkin') {
                        AsyncStorage.setItem(id.toString(), new Date().getTime().toString());
                    }
                    else {
                        AsyncStorage.removeItem(id.toString());
                    }
                    Actions.refresh();
                    Actions.popup({ title: Lang.thong_bao(), content: Lang.checkin_thanh_cong('Checkin') + ' ' + name, flag: 'success' });
                }
                else {
                    Utils.onRequestEnd(data);
                }
                this.setState({ isLoading: false });
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    render() {
        let scanArea = (
            <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}>
                    <View style={styles.rectangleBorderTopLeft} />
                    <View style={styles.rectangleBorderTopRight} />
                    <View style={styles.rectangleBorderBottomLeft} />
                    <View style={styles.rectangleBorderBottomRight} />
                </View>
            </View>
        );

        return (
            <View {...this.props} style={[styles.container, styles.tabQRCode]}>
                <View style={styles.QRCode}>
                    <View style={{ flex: 1 }}>
                        {renderIf(!this.state.isLoading && this.state.isCamera)(
                            <Camera
                                onBarCodeRead={(code) => this.onBarCodeRead(code)}
                                captureAudio={false}
                                style={styles.camera}
                                defaultOnFocusComponent={true}
                                onFocusChanged={() => console.log('onFocusChanged')}
                                onZoomChanged={() => console.log('onZoomChanged')}
                                aspect={Camera.constants.Aspect.fill}>
                                {scanArea}
                            </Camera>
                        )}
                    </View>
                </View>
                <View style={[styles.headerNav, styles.headerNav_Transparent]}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                QR Code
                            </Text>
                        </View>
                        <View style={styles.navRight}>

                        </View>
                        {renderIf(this.state.isLoading)(
                            <Loading />
                        )}
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
    location: state.taskState.location,
})

export default connect(mapStateToProps)(AppotaView)
