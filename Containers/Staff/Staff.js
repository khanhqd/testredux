import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Platform,
    ListView,
    AsyncStorage,
    Image,
    Keyboard
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import Icon from 'react-native-vector-icons/Ionicons';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import renderIf from '../Common/renderIf'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { AppEventsLogger } from 'react-native-fbsdk';

var styles = require('../Common/style.js');
var RequestHelper = require('../Common/RequestHelper');
var Lang = require('../Common/Lang');
var Utils = require('../Common/Utils');
var Loading = require('../Common/Loading');

const popToRoot = () => {
    Keyboard.dismiss()
    Actions.pop();
}

class Staff_Not extends React.Component {
    render() {
        return (
            <View style={styles.Page_404}>
                <Image source={require('../../element/form/not-people.png')} style={styles.Page_404_Img} />
                <Text style={styles.Page_404_Text} >{Lang.khong_co_nhan_vien()}</Text>
            </View>
        );
    }
}


var resData = [];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: true,
            hasData: false,
            dataSource: ds.cloneWithRows([]),
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_staff');
        appsFlyer.trackEvent('af_staff', {}, () => { }, () => { });
        setTimeout(() => {
            this.GetListStaff();
        }, 200);
    }

    componentWillReceiveProps() {
        this.GetListStaff();
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={() => Actions.staff_detail({ staff: rowData, access_token: this.props.access_token })} style={[styles.FormControl_TouchWidthPic, styles.FormControl_Touch1Col]}>
                <View style={styles.FormControl_TouchRowSelect}>
                    <View style={styles.FormControl_TouchInfo}>
                        <Text style={styles.FormControl_TouchTitleName} numberOfLines={1}>{rowData.name}</Text>
                        <Text style={styles.FormControl_TouchTitleNumber} numberOfLines={1}>{rowData.phone_number}</Text>
                    </View>
                    <View style={styles.FormControl_TouchRowCC}>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    GetListStaff() {
        let {access_token} = this.props
        RequestHelper.ListStaff(access_token)
            .then((data) => {
                this.setState({ isLoading: false });
                if (data.status == 200) {
                    var cards = JSON.parse(data._bodyText);
                    this.setState({
                        hasData: cards.data.length == 0 ? false : true,
                        dataSource: ds.cloneWithRows(cards.data)
                    });
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

    render() {
        return (
            <View {...this.props} style={[styles.container, styles.tabHome]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                {Lang.quan_ly_nhan_vien()}
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl}>
                    <ScrollView style={{ flex: 1 }}>
                        {renderIf(!this.state.hasData && !this.state.isLoading)(
                            <Staff_Not />
                        )}
                        {renderIf(this.state.hasData || this.state.isLoading)(
                            <View style={styles.FormControl_Group}>
                                <View style={styles.FormControl_Title}>
                                    <Text style={styles.FormControl_TitleText}>
                                        {Lang.danh_sach_nhan_vien().toUpperCase()}
                                    </Text>
                                </View>
                                <View style={styles.FormControl_Content}>
                                    <View style={styles.FormControl_Select}>
                                        <View style={styles.FormControl_SelectGroup}>
                                            <ListView
                                                showsVerticalScrollIndicator={false}
                                                keyboardShouldPersistTaps='always'
                                                enableEmptySections={true}
                                                dataSource={this.state.dataSource}
                                                renderRow={this.renderRow.bind(this)} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        <View style={styles.FormControl_ButtonRadius}>
                            <TouchableOpacity style={styles.FormControl_ButtonRadius_Touch} onPress={() => Actions.staff_add()}>
                                <Text style={styles.FormControl_ButtonRadius_Text}>
                                    {Lang.them_nhan_vien().toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
})

export default connect(mapStateToProps)(AppotaView)
