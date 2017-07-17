import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Platform,
    AsyncStorage,
    ScrollView,
    TextInput,
    Image,
    Keyboard
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import TimerMixin from 'react-timer-mixin';
import renderIf from '../Common/renderIf';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ImagePicker from 'react-native-image-picker';
import Toast from '@remobile/react-native-toast';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Loading = require('../Common/Loading');
var Utils = require('../Common/Utils');
var styles = require('../Common/style.js');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop()
    setTimeout(() => {
        Actions.refresh()
    }, 10);
}

const hideKeyboard = () => {
    Keyboard.dismiss()
}

class AppotaView extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    state = {
        isLoading: false,
        isFocused: false,
        text: '',
        fullname: this.props.user_infor.fullname,
        phone_number: this.props.user_infor.phone_number,
        email: this.props.user_infor.email ? this.props.user_infor.email : '',
        cmnd_number: this.props.user_infor.cmnd_number ? this.props.user_infor.cmnd_number : '',
        address: this.props.user_infor.address,
        username: this.props.user_infor.username,
        avatar: this.props.user_infor.avatar.length == 0 ? require('../../element/profile/avatar-default.png') : { uri: this.props.user_infor.avatar }
    }


    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_profile');
        appsFlyer.trackEvent('af_profile', {}, () => { }, () => { })
        AppEventsLogger.logEvent(`fb_profile`, 1);
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    UpdateProfile() {
        Keyboard.dismiss()
        this.setState({ isLoading: true });
        let { dispatch, access_token, user_infor } = this.props
        RequestHelper.UpdateProfile(access_token, this.state.email, this.state.cmnd_number, this.state.fullname, this.state.address, '')
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    GoogleAnalytics.trackEvent('ga_profile', 'Update profile');
                    appsFlyer.trackEvent('af_profile_update', {}, () => { }, () => { });
                    AppEventsLogger.logEvent(`fb_profile_update`, 1);
                    var user = user_infor
                    user.fullname = this.state.fullname
                    user.email = this.state.email
                    user.cmnd_number = this.state.cmnd_number
                    user.address = this.state.address
                    dispatch(taskActionCreators.change_user(user))
                    popToRoot()
                    Toast.showToast(Lang.cap_nhat_thong_tin_thanh_cong(), "short", "center");
                }
                else {
                    if (data.status == 401) access_token = '';
                    Utils.onRequestEnd(data);
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                Utils.onNetworkError(error.toString());
            })
            .done();
    }

    displayImagePicker() {
        var options = {
            title: Lang.chon_anh_dai_dien(),
            cancelButtonTitle: Lang.button_huy(),
            takePhotoButtonTitle: Lang.chup_anh(),
            chooseFromLibraryButtonTitle: Lang.chon_anh_thu_vien(),
            cameraType: 'front',
            mediaType: 'photo',
            videoQuality: 'high',
            maxWidth: 200,
            maxHeight: 200,
            quality: 1,
            allowsEditing: false,
            noData: false,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            isSwitchOn: false
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else if (response.customButton) {
            }
            else {
                const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatar: source
                });
                var photo = {
                    uri: response.uri,
                    type: 'image/jpeg',
                    name: 'photo.jpg',
                };
                var body = new FormData();
                body.append('avatar', photo);
                let { dispatch, access_token, user_infor } = this.props
                RequestHelper.UserUpdateAvatar(access_token, body)
                    .then((_response) => {
                        var data = JSON.parse(_response._bodyText)
                        if (data.status_code == 200) {
                            GoogleAnalytics.trackEvent('ga_profile', 'Update avatar');
                            appsFlyer.trackEvent('af_update_avatar', {}, () => { }, () => { });
                            AppEventsLogger.logEvent(`fb_update_avatar`, 1);

                            Toast.showToast(Lang.cap_nhat_avt_thanh_cong(), "short", "center");
                            var user = user_infor
                            user.avatar = 'data:image/jpeg;base64,' + response.data
                            dispatch(taskActionCreators.change_user(user))
                        }
                        else {
                            Actions.popup({ title: Lang.thong_bao(), content: Lang.cap_nhat_avt_that_bai(), flag: 'error' });
                        }
                    })
                    .catch((error) => {
                        Utils.onNetworkError(error.toString());
                    })
                    .done();
            }
        });
    }

    _onBlur(e) {
        this.setState({ isFocused: false })
    }
    _onFocus(e) {
        this.setState({ isFocused: true })
    }

    focusNextField(nextField) {
        this.refs[nextField].focus();
    }

    clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            fullname: fieldName == 'fullname' ? '' : this.state.fullname,
            phone_number: fieldName == 'phone_number' ? '' : this.state.phone_number,
            email: fieldName == 'email' ? '' : this.state.email,
            cmnd_number: fieldName == 'cmnd_number' ? '' : this.state.cmnd_number,
            address: fieldName == 'address' ? '' : this.state.address
        });
    }

    render() {
        var UserInfor = this.props.user_infor;
        UserInfor.email = UserInfor.email ? UserInfor.email : '';
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
                                {Lang.thong_tin()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                            {renderIf(this.state.isFocused == true)(
                                <TouchableOpacity onPress={() => hideKeyboard()}>
                                    <Text style={styles.navTitle_TextRight}>
                                        {Lang.button_huy()}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView style={styles.FormControl_Scroll} keyboardShouldPersistTaps='always'>
                        <View style={styles.FormControl_Avatar}>
                            <TouchableOpacity onPress={this.displayImagePicker.bind(this)}>
                                <Image source={this.state.avatar} style={styles.Personal_Header_InfoCover_Img} />
                                <Image style={{ position: 'absolute', bottom: 8, right: 8 }} source={require('../../element/profile/edit-photo.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.FormControl_Inner}>
                            <View style={styles.FormControl_Profile}>
                                {renderIf(UserInfor.phone_number != UserInfor.username)(
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ height: 64, flex: 1, justifyContent: 'center' }}>
                                                {renderIf(this.state.username != '')(
                                                    <Text style={styles.FormControl_Active}>{Lang.ten_dang_nhap()}</Text>
                                                )}
                                                <TextInput
                                                    ref={'username'}
                                                    editable={false}
                                                    value={this.state.username}
                                                    style={styles.FormControl_Input_Field}
                                                    underlineColorAndroid='rgba(255,255,255,0)'
                                                />
                                            </View>
                                            <View style={{ width: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                                <Image source={require('../../element/profile/ic-ok.png')} />
                                            </View>
                                        </View>
                                        <View style={styles.FormControl_Line}></View>
                                    </View>
                                )}
                                {renderIf(UserInfor.email.length > 0)(
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ height: 64, flex: 1, justifyContent: 'center' }}>
                                                {renderIf(this.state.email != '')(
                                                    <Text style={styles.FormControl_Active}>Email</Text>
                                                )}
                                                <TextInput
                                                    ref={'email'}
                                                    editable={false}
                                                    value={this.state.email}
                                                    style={styles.FormControl_Input_Field}
                                                    underlineColorAndroid='rgba(255,255,255,0)'
                                                />
                                            </View>
                                            <View style={{ width: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                                <Image source={require('../../element/profile/ic-ok.png')} />
                                            </View>
                                        </View>
                                        <View style={styles.FormControl_Line}></View>
                                    </View>
                                )}
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ height: 64, flex: 1, justifyContent: 'center' }}>
                                        {renderIf(this.state.phone_number != '')(
                                            <Text style={styles.FormControl_Active}>{Lang.so_dien_thoai()}</Text>
                                        )}
                                        <TextInput
                                            ref={'phone_number'}
                                            editable={false}
                                            value={this.state.phone_number}
                                            style={styles.FormControl_Input_Field}
                                            underlineColorAndroid='rgba(255,255,255,0)'
                                        />
                                    </View>
                                    <View style={{ width: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        <Image source={require('../../element/profile/ic-ok.png')} />
                                    </View>
                                </View>
                                <View style={styles.FormControl_Line}></View>
                                <View style={styles.FormControl_Input_Form}>
                                    {renderIf(this.state.fullname != '')(
                                        <Text style={styles.FormControl_Active}>{Lang.ten_day_du()}</Text>
                                    )}
                                    <TextInput
                                        ref={'fullname'}
                                        autoCapitalize="none"
                                        placeholder={Lang.ten_day_du()}
                                        value={this.state.fullname}
                                        placeholderTextColor="#c7c7cd"
                                        autoCorrect={false}
                                        returnKeyType={"next"}
                                        onBlur={this._onBlur.bind(this)}
                                        onFocus={this._onFocus.bind(this)}
                                        onSubmitEditing={() => this.focusNextField('email')}
                                        onChangeText={(text) => this.setState({ fullname: text })}
                                        style={styles.FormControl_Input_Field}
                                        underlineColorAndroid='rgba(255,255,255,0)'
                                    />
                                    {renderIf(this.state.fullname != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this.clearText('fullname')} style={styles.FormControl_Clear}>
                                            <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_ClearIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <View style={styles.FormControl_Line}></View>
                                {renderIf(UserInfor.email.length == 0)(
                                    <View>
                                        <View style={styles.FormControl_Input_Form}>
                                            {renderIf(this.state.email != '')(
                                                <Text style={styles.FormControl_Active}>Email</Text>
                                            )}
                                            <TextInput
                                                ref={'email'}
                                                autoCapitalize="none"
                                                placeholder="Email"
                                                value={this.state.email}
                                                placeholderTextColor="#c7c7cd"
                                                autoCorrect={false}
                                                returnKeyType={"next"}
                                                onBlur={this._onBlur.bind(this)}
                                                onFocus={this._onFocus.bind(this)}
                                                onSubmitEditing={() => this.focusNextField('cmnd_number')}
                                                onChangeText={(email) => this.setState({ email })}
                                                style={styles.FormControl_Input_Field}
                                                underlineColorAndroid='rgba(255,255,255,0)'
                                            />
                                            {renderIf(this.state.email != '' && this.state.isFocused == true)(
                                                <TouchableOpacity onPress={() => this.clearText('email')} style={styles.FormControl_Clear}>
                                                    <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_ClearIcon} />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        <View style={styles.FormControl_Line}></View>
                                    </View>
                                )}
                                <View style={styles.FormControl_Input_Form}>
                                    {renderIf(this.state.cmnd_number != '')(
                                        <Text style={styles.FormControl_Active}>{Lang.cmnd()}</Text>
                                    )}
                                    <TextInput
                                        ref={'cmnd_number'}
                                        autoCapitalize="none"
                                        placeholder={Lang.cmnd()}
                                        value={this.state.cmnd_number}
                                        placeholderTextColor="#c7c7cd"
                                        autoCorrect={false}
                                        returnKeyType={"next"}
                                        onBlur={this._onBlur.bind(this)}
                                        onFocus={this._onFocus.bind(this)}
                                        onSubmitEditing={() => this.focusNextField('address')}
                                        onChangeText={(cmnd_number) => this.setState({ cmnd_number })}
                                        style={styles.FormControl_Input_Field}
                                        underlineColorAndroid='rgba(255,255,255,0)'
                                    />
                                    {renderIf(this.state.cmnd_number != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this.clearText('cmnd_number')} style={styles.FormControl_Clear}>
                                            <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_ClearIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <View style={styles.FormControl_Line}></View>
                                <View style={styles.FormControl_Input_Form}>
                                    {renderIf(this.state.address != '')(
                                        <Text style={styles.FormControl_Active}>{Lang.dia_chi()}</Text>
                                    )}
                                    <TextInput
                                        ref={'address'}
                                        autoCapitalize="none"
                                        placeholder={Lang.dia_chi()}
                                        value={this.state.address}
                                        placeholderTextColor="#c7c7cd"
                                        autoCorrect={false}
                                        returnKeyType={"done"}
                                        onBlur={this._onBlur.bind(this)}
                                        onFocus={this._onFocus.bind(this)}
                                        onSubmitEditing={() => this.UpdateProfile()}
                                        onChangeText={(address) => this.setState({ address })}
                                        style={styles.FormControl_Input_Field}
                                        underlineColorAndroid='rgba(255,255,255,0)'
                                    />
                                    {renderIf(this.state.address != '' && this.state.isFocused == true)(
                                        <TouchableOpacity onPress={() => this.clearText('address')} style={styles.FormControl_Clear}>
                                            <Image source={require('../../element/form/ic-clear.png')} style={styles.FormControl_ClearIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.FormControl_Button}>
                        <TouchableOpacity style={styles.FormControl_ButtonTouch} onPress={this.UpdateProfile.bind(this)}>
                            <Text style={styles.FormControl_ButtonText}>
                                {Lang.cap_nhat().toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {renderIf(Platform.OS == 'ios')(
                    <KeyboardSpacer />
                )}
                {renderIf(this.state.isLoading)(
                    <Loading />
                )}
            </View>
        );
    }
};


const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
})

export default connect(mapStateToProps)(AppotaView)
