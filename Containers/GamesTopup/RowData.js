import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from "react-native";
import { Actions } from 'react-native-router-flux';
var styles = require('../Common/style.js');
import * as Animatable from 'react-native-animatable';
import renderIf from '../Common/renderIf';

class RowData extends Component {
    render() {
        return (
            <View style={styles.ViewGames_Group}>
                <TouchableOpacity style={styles.ViewGames_Touch} onPress={this.props.onPressRow.bind(this)}>
                    <View style={styles.ViewGames_Touch_Thumb}>
                        <Image source={{ uri: this.props.icon }} style={styles.ViewGames_Touch_ThumbImg} />
                    </View>
                    <View style={styles.ViewGames_Touch_Info}>
                        <Text style={styles.ViewGames_Touch_InfoTitle} numberOfLines={1}>
                            {this.props.name}
                        </Text>
                        {renderIf(this.props.rowID < 2)(
                            <Animatable.View animation="flash" easing="ease-out" iterationCount="infinite" style={styles.Badge_New}><Text style={styles.Badge_New_Txt}>NEW</Text></Animatable.View>
                        )}
                        {renderIf(this.props.rowID == 2)(
                            <Animatable.View animation="flash" easing="ease-out" iterationCount="infinite" style={styles.Badge_New}><Text style={styles.Badge_New_Txt}>HOT</Text></Animatable.View>
                        )}
                    </View>
                    <View style={styles.ViewGames_Touch_Point}>
                        <Image source={require('../../element/form/ic-point.png')} style={styles.ViewGames_Touch_PointImg} />
                    </View>
                </TouchableOpacity>
                <View style={styles.ViewGames_Line}></View>
            </View>
        );
    }
};


export default RowData
