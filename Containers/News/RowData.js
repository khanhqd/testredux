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
import moment from 'moment';

class ComingSoon extends Component {
    render() {
        if (this.props.is_hot == '1') return null;
        var fromNow = moment(this.props.created_at, 'YYYY-MM-DD HH:mm:ss').fromNow();
        return (
            <TouchableOpacity style={styles.NewsList_Touch} onPress={()=>Actions.news_detail({news_id: this.props.id})}>
                <View style={styles.NewsList_Thumb}>
                    <Image source={{ uri: this.props.avatar }} style={styles.NewsList_ThumbImg}/>
                </View>
                <View style={styles.NewsList_Info}>
                    <Text style={styles.NewsList_InfoText} numberOfLines={4}>
                        {this.props.title}
                    </Text>
                    <Text style={styles.NewsList_InfoTime} numberOfLines={1}>
                        {fromNow}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
};

export default ComingSoon;
