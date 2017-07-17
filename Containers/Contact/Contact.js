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
    AsyncStorage,
    ListView,
    TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import Contacts from 'react-native-contacts'
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');
var Utils = require('../Common/Utils');
var Loading = require('../Common/Loading2');
import renderIf from '../Common/renderIf'
import RowData from './RowData';

const onBack = () => {
    Actions.pop();
}

var resData = []
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class AppotaView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            tab: 'all',
            isSelect: false,
            isLoading: false,
            isFocused: false,
            contact_name: '',
            isGroup: props.isGroup == null ? true : props.isGroup,
            dataSource: ds.cloneWithRows(props.ds_contacts),
            dataSource_favourite: ds.cloneWithRows(props.ds_contacts_favourite),
        }
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_contact');
        appsFlyer.trackEvent('af_contact', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_contact', 1);
        setTimeout(() => {
            let { dispatch, ds_contacts } = this.props
            if (ds_contacts.length == 0) {

                AsyncStorage.getItem("contact_favourite").then((value) => {
                    if (value != null && value.length != 0) {
                        var lsFavourite = JSON.parse(value);
                        this.setState({
                            dataSource_favourite: ds.cloneWithRows(lsFavourite)
                        })
                        dispatch(taskActionCreators.update_ds_contacts_favourite(lsFavourite))
                        this.checkContacts(lsFavourite);
                    }
                    else {
                        this.checkContacts([]);
                    }
                }).done();
            }
        }, 200);
    }

    checkContacts(lsFavourite) {
        Contacts.checkPermission((err, permission) => {
            // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
            if (permission === 'undefined') {
                Contacts.requestPermission((err, permission) => {
                    // ...
                    if (permission === 'authorized') {
                        // yay!
                        this.getContact(lsFavourite);
                    }
                })
            }
            else if (permission === 'authorized') {
                // yay!
                this.getContact(lsFavourite);
            }
        })
    }

    getContact(lsFavourite) {
        this.setState({ isLoading: true })
        Contacts.getAll((err, contacts) => {
            if (err && err.type === 'denied') {
                // x.x
            } else {
                this.parseContacts(contacts, lsFavourite);
                // this.addContact();
                // this.deleteContact(contacts);
            }
        })
    }

    addContact() {
        for (var i = 0; i < 2000; i++) {
            var newPerson = {
                emailAddresses: [{
                    label: "work",
                    email: "mrniet@example.com",
                }],
                familyName: "Appota " + (i + 1000),
                givenName: "tqh",
                phoneNumbers: [{
                    label: "mobile",
                    number: '09' + this.getRandom(8),
                }]
            }
            Contacts.addContact(newPerson, (err) => { /*...*/ })
            if (i == 1999) {
                this.setState({ isLoading: false });
            }
        }
    }

    deleteContact(contacts) {
        for (var i = 0; i < contacts.length; i++) {
            if (contacts[i].givenName == 'tqh') {
                Contacts.deleteContact(contacts[i], (err) => { /*...*/ })
            }
            if (i == contacts.length - 1) {
                this.setState({ isLoading: false });
            }
        }
    }

    getRandom(length) {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    }

    parseContacts(contacts, lsFavourite) {
        var allDataa = [];
        for (var i = 0; i < contacts.length; i++) {
            for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                var num = contacts[i].phoneNumbers[j].number.replace('-', '').replace('+84', '0').replace('(', '').replace(')', '').replace('-', '').replace(/[^\d]/g, '');
                var full_name;
                var given_name = (contacts[i].givenName == undefined) ? '' : contacts[i].givenName;
                var middle_name = (contacts[i].middleName == undefined) ? '' : contacts[i].middleName;
                var family_name = (contacts[i].familyName == undefined) ? '' : contacts[i].familyName;

                if (given_name.length == 0)
                    full_name = (middle_name.length == 0) ? family_name : (middle_name + ' ' + family_name);
                else
                    full_name = given_name + ' ' + ((middle_name.length == 0) ? family_name : (middle_name + ' ' + family_name));

                var isFavourite = false;
                for (var k = 0; k < lsFavourite.length; k++) {
                    if (Utils.replaceAll(lsFavourite[k].number, ' ', '') == Utils.replaceAll(num, ' ', '')) {
                        isFavourite = true;
                    }
                }
                allDataa.push({
                    isSelect: false,
                    isFavourite: isFavourite,
                    name: contacts[i].phoneNumbers.length == 1 ? full_name : (full_name + (j + 1)),
                    number: Utils.replaceAll(num, ' ', ''),
                    first_character: given_name.charAt(0)
                });
            }
        }

        allDataa.sort(function (a, b) {
            var nameA = a.first_character.toUpperCase(); // ignore upper and lowercase
            var nameB = b.first_character.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });

        let { dispatch } = this.props
        dispatch(taskActionCreators.update_ds_contacts(allDataa))
        this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(allDataa)
        });
    }

    onPressTab(tab) {
        Keyboard.dismiss()
        if (tab == 'all') {
            this.setState({
                tab: 'all',
                contact_name: '',
                isFocused: false,
                dataSource: ds.cloneWithRows(this.props.ds_contacts)
            })
        }
        else {
            this.setState({
                tab: 'favourite',
                contact_name: '',
                isFocused: false,
                dataSource_favourite: ds.cloneWithRows(this.props.ds_contacts_favourite)
            })
        }
    }

    onPressSelect() {
        if (this.state.isSelect) {
            lsReceivers = [];
        }
        if (this.state.isFocused) {
            resData = JSON.parse(JSON.stringify(resData));
        }
        else {
            if (this.state.tab == 'all') {
                resData = JSON.parse(JSON.stringify(allData));
            }
            else {
                resData = JSON.parse(JSON.stringify(lsFavourite));
            }
        }
        this.setState({
            isSelect: !this.state.isSelect,
            dataSource: ds.cloneWithRows(resData)
        })
    }

    onPressContact(data) {
        GoogleAnalytics.trackEvent('ga_contact', 'Select contact ' + data.number);
        Keyboard.dismiss()
        Actions.pop();
        var obj = {
            contact_number: data.number,
            contact_name: data.name,
            isGroup: 'no'
        }
        setTimeout(() => {
            Actions.refresh();
        }, 10);
        AsyncStorage.setItem('contact_number', JSON.stringify(obj));
    }

    onSelect(rowID) {
        // var data = resData;
        // if (data[rowID].isSelect) {
        //     for (var i = lsReceivers.length - 1; i >= 0; i--) {
        //         if (lsReceivers[i] === data[rowID].number) {
        //             lsReceivers.splice(i, 1);
        //         }
        //     }
        // }
        // else {
        //     lsReceivers.push(data[rowID].number);
        // }
        // data[rowID].isSelect = !data[rowID].isSelect;
        // // var test = ['abc','123'];
        // // var _test = [].concat(test);
        // // _test[0] = 'Appota';
        // this.setState({
        //     dataSource: ds.cloneWithRows(data)
        // })
    }

    onPressFavourite(data, rowID) {
        let { dispatch, ds_contacts, ds_contacts_favourite } = this.props
        var lsContacts = ds_contacts
        var lsContacts_favourite = ds_contacts_favourite
        var _data = JSON.parse(JSON.stringify(data))
        if (this.state.tab == 'all') {
            if (lsContacts[rowID].isFavourite) {
                lsContacts[rowID].isFavourite = !lsContacts[rowID].isFavourite
                for (var i = 0; i < lsContacts_favourite.length; i++) {
                    if (lsContacts_favourite[i].number == lsContacts[rowID].number)
                        lsContacts_favourite.splice(i, 1);
                }
            }
            else {
                lsContacts[rowID].isFavourite = !lsContacts[rowID].isFavourite
                lsContacts_favourite.push(lsContacts[rowID])
            }
        }
        else {
            lsContacts_favourite[rowID].isFavourite = !lsContacts_favourite[rowID].isFavourite
            lsContacts_favourite.splice(rowID, 1)
        }
        this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(lsContacts),
            dataSource_favourite: ds.cloneWithRows(lsContacts_favourite)
        })
        AsyncStorage.setItem('contact_favourite', JSON.stringify(lsContacts_favourite))
    }

    _onBlur(e) {
        this.setState({ isFocused: false })
    }

    _onFocus(e) {
        this.setState({ isFocused: true })
    }

    _clearAll(fieldName) {
        //this.setState({ autoFocus: false })
        Keyboard.dismiss()
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            contact_name: '',
            dataSource: ds.cloneWithRows(this.props.ds_contacts)
        })
    }

    _clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
        this.setState({
            contact_name: '',
            isFocused: true,
            dataSource: ds.cloneWithRows(this.props.ds_contacts)
        })
    }

    onSearchContact(keyword) {
        var data = [];
        if (this.state.tab == 'all') {
            data = this.props.ds_contacts.filter((item) => this.filterContactName(item, keyword));
            this.setState({
                contact_name: keyword,
                dataSource: ds.cloneWithRows(data)
            });
        }
        else {
            data = this.props.ds_contacts_favourite.filter((item) => this.filterContactName(item, keyword));
            this.setState({
                contact_name: keyword,
                dataSource_favourite: ds.cloneWithRows(data)
            });
        }
    }

    filterContactName(item, keyword) {
        var name = Utils.change_alias(item.name);
        var keyword = Utils.change_alias(keyword);
        return name.indexOf(keyword) !== -1;
    }

    render() {
        return (
            <View {...this.props} style={styles.container}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={onBack}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <View style={styles.navTitle_Tab}>
                                <TouchableOpacity onPress={this.onPressTab.bind(this, 'all')} style={[styles.navTitle_Touch, this.state.tab == 'all' ? styles.navTitle_TouchLeft_Active : styles.navTitle_TouchLeft]}>
                                    <Text style={this.state.tab == 'all' ? styles.navTitle_TabText_Active : styles.navTitle_TabText}>
                                        {Lang.danh_ba()}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onPressTab.bind(this, 'favourite')} style={[styles.navTitle_Touch, this.state.tab == 'all' ? styles.navTitle_TouchRight : styles.navTitle_TouchRight_Active]}>
                                    <Text style={this.state.tab != 'all' ? styles.navTitle_TabText_Active : styles.navTitle_TabText}>
                                        {Lang.yeu_thich()}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.navRight}>
                            {/*{renderIf(this.state.isGroup)(
                                <TouchableOpacity onPress={this.onPressSelect.bind(this)} style={[styles.navRight_Touch, { backgroundColor: 'transparent', padding: 5 }]}>
                                    <Text style={styles.navRight_Text}>
                                        {this.state.isSelect ? Lang.button_huy() : Lang.chon()}
                                    </Text>
                                </TouchableOpacity>
                            )}*/}
                        </View>
                    </View>
                </View>
                <View style={styles.FormControl_Search}>
                    <View style={styles.FormControl_Search_Inner}>
                        <TextInput
                            ref={'textClear'}
                            autoCapitalize="none"
                            autoFocus={false}
                            placeholder={Lang.tim_kiem()}
                            placeholderTextColor="#8E8E93"
                            value={this.state.contact_name}
                            autoCorrect={false}
                            returnKeyType={"done"}
                            onBlur={this._onBlur.bind(this)}
                            onFocus={this._onFocus.bind(this)}
                            onChangeText={(text) => this.onSearchContact(text)}
                            style={styles.FormControl_SearchInput}
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <Image source={require('../../element/explore/ic-search-gray.png')} style={styles.FormControl_SearchIcon} />
                        {renderIf(this.state.contact_name != '' && this.state.isFocused == true)(
                            <TouchableOpacity onPress={this._clearText.bind(this, 'textClear')} style={[styles.FormControl_SearchClear, { right: 65 }]}>
                                <Image source={require('../../element/form/ic-clear-search.png')} style={styles.FormControl_SearchClearIcon} />
                            </TouchableOpacity>
                        )}
                        {renderIf(this.state.isFocused == true)(
                            <View style={{ width: 55, padding: 5 }}>
                                <TouchableOpacity onPress={this._clearAll.bind(this, 'textClear')}>
                                    <Text style={styles.FormControl_SearchCloseText}>
                                        {Lang.button_huy()}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.ListContact}>
                    <View style={styles.ListContact_List}>
                        {renderIf(this.state.tab == 'all')(
                            <ListView
                                style={{ flex: 1 }}
                                showsVerticalScrollIndicator={false}
                                initialListSize={20}
                                enableEmptySections={true}
                                keyboardShouldPersistTaps='always'
                                dataSource={this.state.dataSource}
                                renderRow={(data, sectionID, rowID) => <RowData {...data} isSelectt={this.state.isSelect} onPressContact={this.onPressContact.bind(this, data)} onSelect={this.onSelect.bind(this, rowID)} onPressFavourite={this.onPressFavourite.bind(this, data, rowID)} />}
                            />
                        )}
                        {renderIf(this.state.tab == 'favourite')(
                            <ListView
                                style={{ flex: 1 }}
                                showsVerticalScrollIndicator={false}
                                initialListSize={20}
                                enableEmptySections={true}
                                keyboardShouldPersistTaps='always'
                                dataSource={this.state.dataSource_favourite}
                                renderRow={(data, sectionID, rowID) => <RowData {...data} isSelectt={this.state.isSelect} onPressContact={this.onPressContact.bind(this, data)} onSelect={this.onSelect.bind(this, rowID)} onPressFavourite={this.onPressFavourite.bind(this, data, rowID)} />}
                            />
                        )}
                    </View>
                    {renderIf(this.state.isLoading)(
                        <Loading />
                    )}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    ds_contacts: state.taskState.ds_contacts,
    ds_contacts_favourite: state.taskState.ds_contacts_favourite,
})

export default connect(mapStateToProps)(AppotaView)
