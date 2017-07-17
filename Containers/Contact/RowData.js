import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
var styles = require('../Common/style.js');
import renderIf from '../Common/renderIf'
import BaseComponent from '../BaseClass/BaseComponent';

class Temp extends BaseComponent {
    render() {
        var data = this.props;
        return (
            <View style={styles.ListContact_View}>
                <TouchableOpacity onPress={this.props.onPressContact.bind(this)} style={styles.ListContact_Touch} >
                    <View style={styles.ListContact_Item}>
                        {renderIf(this.props.isSelectt)(
                            <View style={styles.ListContact_Selection}>
                                <TouchableOpacity onPress={this.props.onSelect.bind(this)} style={styles.ListContact_SelectionTouch}>
                                    <Image style={styles.ListContact_SelectionImg} source={data.isSelect ? require('../../element/form/ic-selection-active.png') : require('../../element/form/ic-selection.png')} />
                                </TouchableOpacity>
                            </View>
                        )}
                        <View style={styles.ListContact_Avatar}>
                            <Text style={styles.ListContact_AvatarText}>
                                {data.first_character}
                            </Text>
                        </View>
                        <View style={styles.ListContact_Info}>
                            <Text style={styles.ListContact_InfoName}>
                                {data.name}
                            </Text>
                            <Text style={styles.ListContact_InfoPhone}>
                                {data.number}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onPressFavourite.bind(this)} style={styles.ListContact_Favorite}>
                    <Image source={data.isFavourite ? require('../../element/form/ic-favorite-active.png') : require('../../element/form/ic-favorite.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

module.exports = Temp;
