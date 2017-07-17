import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import Carousel from 'react-native-looped-carousel';
import LinearGradient from 'react-native-linear-gradient';

var styles = require('../Common/style.js');
var Lang = require('../Common/Lang');

export default class AppotaView extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false;
    }
    render() {
        var resData_Hot = this.props.data.filter((item) => { return item.is_hot == '1' });
        // alert(JSON.stringify(resData_Hot))
        if (resData_Hot.length == 0) {
            return null
        }
        else if (resData_Hot.length == 1) {
            return (<View style={styles.NewsHeader}>
                <TouchableOpacity onPress={() => Actions.news_detail({ news_id: resData_Hot[0].id })} style={styles.NewsHeader_Touch}>
                    <Image source={{ uri: resData_Hot[0].avatar }} style={styles.NewsHeader_Img} />
                    <View style={styles.NewsHeader_Title}>
                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']} style={styles.NewsHeader_linearGradient}>
                            <Text style={styles.NewsHeader_Text} numberOfLines={3}>
                                {resData_Hot[0].title}
                            </Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>
            </View>)

        }

        return (
            <View style={styles.NewsHeader}>
                <Carousel style={styles.NewsHeader_Inner}>
                    {resData_Hot.map((item) => {
                        return (
                            <TouchableOpacity key={item.id} onPress={() => Actions.news_detail({ news_id: item.id })} style={styles.NewsHeader_Touch}>
                                <Image source={{ uri: item.avatar }} style={styles.NewsHeader_Img} />
                                <View style={styles.NewsHeader_Title}>
                                    <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']} style={styles.NewsHeader_linearGradient}>
                                        <Text style={styles.NewsHeader_Text} numberOfLines={3}>
                                            {item.title}
                                        </Text>
                                    </LinearGradient>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </Carousel>
            </View>
        );
    }
}

