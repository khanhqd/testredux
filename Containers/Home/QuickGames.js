import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    TextInput,
    ListView,
    Image
} from "react-native";
import { Actions } from "react-native-router-flux";
var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');
import TimerMixin from 'react-timer-mixin';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk';

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class QuickPurchase extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            hasData: false,
            resData: []
        }
    }

    componentDidMount() {
        this.GetListCards();
    }

    GetListCards() {
        if (this.props.ds_games.length == 0) {
            AsyncStorage.getItem("list_game").then((value) => {
                if (value != null && value.length != 0) {
                    this.parseData(JSON.parse(value))
                }
            }).done();
        }
        else {
            this.parseData(this.props.ds_games)
        }
    }

    parseData(_resData) {
        var data = [];
        for (var i = 0; i < _resData.length; i++) {
            if (i < (_resData.length > 5 ? 5 : _resData.length))
                data.push({
                    id: _resData[i].id,
                    name: _resData[i].name,
                    icon: _resData[i].icon
                });
        }
        this.setState({
            hasData: data.length == 0 ? false : true,
            resData: data
        });
    }

    onPressItem(data) {
        GoogleAnalytics.trackScreenView('ga_quick_games');
        AppEventsLogger.logEvent('fb_quick_games', 1);
        appsFlyer.trackEvent('af_quick_games', {}, () => { }, () => { });

        Actions.games_topup_detail({
            game_name: data.name,
            game_id: data.id
        })
    }

    render() {
        if (!this.state.hasData) return null;
        return (
            <View style={styles.ListPayGame}>
                <View style={styles.ListPayGame_Header}>
                    <Image
                        source={require('../../element/homepage/ic-Games.png')}
                        style={styles.ListPayGame_Header_Img} />
                    <View style={styles.ListPayGame_Title}>
                        <Text style={styles.ListPayGame_Title_Name}>{Lang.nap_game_nhanh1()}</Text>
                        <Text style={styles.ListPayGame_Title_Sub}>{Lang.nap_game_nhanh2()}</Text>
                    </View>
                </View>
                <ScrollView style={styles.ItemPayGame_Scroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        this.state.resData.map((item, i) => {
                            return (
                                <View key={i} style={styles.ItemPayGame}>
                                    <TouchableOpacity onPress={this.onPressItem.bind(this, item)} style={styles.ItemPayGame_Touch}>
                                        <View style={styles.ItemPayGame_Thumb}>
                                            <Image source={{ uri: item.icon }} style={styles.ItemPayGame_Thumb_Img} />
                                        </View>
                                        <View style={styles.ItemPayGame_Title}>
                                            <Text style={styles.ItemPayGame_Title_Name} numberOfLines={2}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    }
                    <View style={styles.ItemPayGame}>
                        <TouchableOpacity style={styles.ItemPayGame_Touch} onPress={() => Actions.games_topup()}>
                            <View style={styles.ItemPayGame_More}>
                                <Text style={styles.ItemPayGame_More_Txt}>{Lang.nap_game_khac()}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
module.exports = QuickPurchase;
