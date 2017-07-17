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
import * as Animatable from '../../custom_modules/react-native-animatable';
import GoogleAnalytics from 'react-native-google-analytics-bridge';

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');

checkToken = (access_token, flag) => {
    if (access_token.length == 0) {
        Actions.login();
    }
    else {
        switch (flag) {
            case 'internet':
                GoogleAnalytics.trackEvent('ga_home', 'internet');
                Actions.internet()
                break;
            default:
                GoogleAnalytics.trackEvent('ga_home', 'login');
                Actions.login()
                break
        }
    }
}

class AppotaView extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling = false;
    }
    render() {
        return (
            <View style={styles.ViewList}>
                <View style={styles.ViewList_List}>
                    <ScrollView style={styles.ViewList_ListScroll}>
                        <View style={styles.ViewList_ListScroll_Inner}>
                            <View style={styles.ViewList_ListScroll_Row}>
                                <TouchableOpacity
                                    style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image
                                            source={require('../../element/homepage/ic-TruyenHinh.png')}
                                            style={styles.ViewList_ListImg}/>
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                Cước{'\n'}Truyền hình
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image
                                            source={require('../../element/homepage/ic-TTDien.png')}
                                            style={styles.ViewList_ListImg}/>
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                Thanh toán{'\n'}điện
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image
                                            source={require('../../element/homepage/ic-TTNuoc.png')}
                                            style={styles.ViewList_ListImg}/>
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                Thanh toán{'\n'}nước
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.ViewList_ListTouch}
                                    onPress={() => checkToken(this.props.access_token, 'internet')}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image
                                            source={require('../../element/homepage/ic-Internet.png')}
                                            style={styles.ViewList_ListImg}/>
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                Cước{'\n'}Internet
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.ViewList_ListScroll_Row}>
                                <TouchableOpacity
                                    style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image
                                            source={require('../../element/homepage/ic-NapThe.png')}
                                            style={styles.ViewList_ListImg}/>
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                Nạp thẻ
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image
                                            source={require('../../element/homepage/ic-DienThoaiCoDinh.png')}
                                            style={styles.ViewList_ListImg}/>
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                Điện thoại{'\n'}Cố định
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image
                                            source={require('../../element/homepage/ic-DienThoai.png')}
                                            style={styles.ViewList_ListImg}/>
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                Di động{'\n'}Trả sau
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image
                                            source={require('../../element/homepage/ic-BaoHiem.png')}
                                            style={styles.ViewList_ListImg}/>
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                Bảo hiểm
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.ViewList_ListScroll_Row}>
                                <TouchableOpacity
                                    style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image
                                            source={require('../../element/homepage/ic-TieuDung.png')}
                                            style={styles.ViewList_ListImg}/>
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                Vay{'\n'}Tiêu dùng
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image
                                            source={require('../../element/homepage/ic-MayBay.png')}
                                            style={styles.ViewList_ListImg}/>
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                Vé{'\n'}Máy bay
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image
                                            source={require('../../element/homepage/ic-TauHoa.png')}
                                            style={styles.ViewList_ListImg}/>
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                Vé{'\n'}Tầu hoả
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.ViewList_ListTouch}>
                                    <View style={styles.ViewList_ListTouch_Inner}>
                                        <Image
                                            source={require('../../element/homepage/ic-TauThuy.png')}
                                            style={styles.ViewList_ListImg}/>
                                        <View style={styles.ViewList_ListName}>
                                            <Text style={styles.ViewList_ListName_Title} numberOfLines={2}>
                                                Vé{'\n'}Tầu thuỷ
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

module.exports = AppotaView;
