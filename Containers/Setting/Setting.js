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
import renderIf from '../Common/renderIf';

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');
var Utils = require('../Common/Utils')
import { LINK, VERSION } from '../Helpers/constString'

class AppotaView extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    render() {
        return (
            <View style={styles.Personal}>
                <View style={styles.Personal_Setting}>
                    <View style={styles.FormControl_Group}>
                        <View style={styles.FormControl_Title}>
                        </View>
                        {renderIf(this.props.isUser)(
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_Setting}>
                                    <View style={styles.FormControl_Setting_Group}>
                                        <TouchableOpacity onPress={() => Actions.profile()} style={styles.FormControl_Setting_Touch}>
                                            <View style={styles.FormControl_Setting_Touch_Info}>
                                                <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                    {Lang.tai_khoan()}
                                                </Text>
                                            </View>
                                            <View style={styles.FormControl_Setting_Touch_Point}>
                                                <Image source={require('../../element/RutTien/ic-point.png')} style={styles.FormControl_Setting_Touch_PointImg} />
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.FormControl_Setting_Line}></View>
                                    </View>
                                    <View style={styles.FormControl_Setting_Group}>
                                        <TouchableOpacity onPress={() => Actions.security_setting()} style={styles.FormControl_Setting_Touch}>
                                            <View style={styles.FormControl_Setting_Touch_Info}>
                                                <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                    {Lang.cai_dat_bao_mat()}
                                                </Text>
                                            </View>
                                            <View style={styles.FormControl_Setting_Touch_Point}>
                                                <Image source={require('../../element/RutTien/ic-point.png')} style={styles.FormControl_Setting_Touch_PointImg} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                        <View style={styles.FormControl_Title}>
                            <Text style={styles.FormControl_TitleText}>
                                {Lang.ngon_ngu().toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.FormControl_Content}>
                            <View style={styles.FormControl_Setting}>
                                <View style={styles.FormControl_Setting_Group}>
                                    <TouchableOpacity style={styles.FormControl_Setting_Touch} onPress={() => Actions.language({ language: this.props.language })}>
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                {Lang.ngon_ngu()}
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_Setting_Touch_InfoRight}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitleRight} numberOfLines={1}>
                                                {this.props.language == 'vi' ? Lang.tieng_viet() : Lang.tieng_anh()}
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_Setting_Touch_Point}>
                                            <Image source={require('../../element/RutTien/ic-point.png')} style={styles.FormControl_Setting_Touch_PointImg} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.FormControl_Title}>
                            <Text style={styles.FormControl_TitleText}>
                                {Lang.thong_tin().toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.FormControl_Content}>
                            <View style={styles.FormControl_Setting}>
                                <View style={styles.FormControl_Setting_Group}>
                                    <TouchableOpacity style={styles.FormControl_Setting_Touch}>
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                {Lang.phien_ban()}
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_Setting_Touch_InfoRight}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitleRight} numberOfLines={1}>
                                                {VERSION.NAME} {VERSION.BUILD}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.FormControl_Setting_Line}></View>
                                </View>
                                <View style={styles.FormControl_Setting_Group}>
                                    <TouchableOpacity onPress={() => Actions.webview2({ title: Lang.gioi_thieu(), url: LINK.ABOUT })} style={styles.FormControl_Setting_Touch}>
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                {Lang.gioi_thieu()}
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_Setting_Touch_Point}>
                                            <Image source={require('../../element/RutTien/ic-point.png')} style={styles.FormControl_Setting_Touch_PointImg} />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.FormControl_Setting_Line}></View>
                                </View>
                                <View style={styles.FormControl_Setting_Group}>
                                    <TouchableOpacity onPress={() => Actions.webview2({ title: Lang.chinh_sach(), url: LINK.PRIVACY })} style={styles.FormControl_Setting_Touch}>
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                {Lang.chinh_sach()}
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_Setting_Touch_Point}>
                                            <Image source={require('../../element/RutTien/ic-point.png')} style={styles.FormControl_Setting_Touch_PointImg} />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.FormControl_Setting_Line}></View>
                                </View>
                                <View style={styles.FormControl_Setting_Group}>
                                    <TouchableOpacity onPress={() => Actions.webview2({ title: Lang.dieu_kien_tham_gia(), url: LINK.CONDITIONS })} style={styles.FormControl_Setting_Touch}>
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                {Lang.dieu_kien_tham_gia()}
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_Setting_Touch_Point}>
                                            <Image source={require('../../element/RutTien/ic-point.png')} style={styles.FormControl_Setting_Touch_PointImg} />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.FormControl_Setting_Line}></View>
                                </View>
                                <View style={styles.FormControl_Setting_Group}>
                                    <TouchableOpacity onPress={() => Actions.webview2({ title: Lang.cac_cam_ket(), url: LINK.COMMITMENT })} style={styles.FormControl_Setting_Touch}>
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                {Lang.cac_cam_ket()}
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_Setting_Touch_Point}>
                                            <Image source={require('../../element/RutTien/ic-point.png')} style={styles.FormControl_Setting_Touch_PointImg} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.FormControl_Title}>
                            <Text style={styles.FormControl_TitleText}>
                                {Lang.ho_tro().toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.FormControl_Content}>
                            <View style={styles.FormControl_Setting}>
                                <View style={styles.FormControl_Setting_Group}>
                                    <TouchableOpacity onPress={() => Actions.webview2({ title: Lang.cua_hang(), url: LINK.SUPPORT_MERCHANT })} style={styles.FormControl_Setting_Touch}>
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                {Lang.cua_hang()}
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_Setting_Touch_Point}>
                                            <Image source={require('../../element/RutTien/ic-point.png')} style={styles.FormControl_Setting_Touch_PointImg} />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.FormControl_Setting_Line}></View>
                                </View>
                                <View style={styles.FormControl_Setting_Group}>
                                    <TouchableOpacity onPress={() => Actions.webview2({ title: Lang.nguoi_dung(), url: LINK.SUPPORT_USER })} style={styles.FormControl_Setting_Touch}>
                                        <View style={styles.FormControl_Setting_Touch_Info}>
                                            <Text style={styles.FormControl_Setting_Touch_InfoTitle} numberOfLines={1}>
                                                {Lang.nguoi_dung()}
                                            </Text>
                                        </View>
                                        <View style={styles.FormControl_Setting_Touch_Point}>
                                            <Image source={require('../../element/RutTien/ic-point.png')} style={styles.FormControl_Setting_Touch_PointImg} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    {renderIf(this.props.isUser)(
                        <View style={styles.FormControl_Group}>
                            <View style={styles.FormControl_Title}>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_SettingLogout}>
                                    <View style={styles.FormControl_SettingLogout_Inner}>
                                        <TouchableOpacity style={styles.FormControl_SettingLogout_Touch} onPress={this.props.confirmLogout.bind(this)}>
                                            <Text style={styles.FormControl_SettingLogout_Title}>
                                                {Lang.dang_xuat()}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    {renderIf(!this.props.isUser)(
                        <View style={styles.FormControl_Group}>
                            <View style={styles.FormControl_Title}>
                            </View>
                            <View style={styles.FormControl_Content}>
                                <View style={styles.FormControl_SettingLogout}>
                                    <View style={styles.FormControl_SettingLogout_Inner}>
                                        <TouchableOpacity style={styles.FormControl_SettingLogout_Touch} onPress={() => Actions.login()}>
                                            <Text style={styles.FormControl_SettingLogout_Title}>
                                                {Lang.dang_nhap()}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

module.exports = AppotaView;
