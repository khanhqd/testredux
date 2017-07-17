import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Image, 
    Animated, 
    Dimensions, 
    TouchableOpacity, 
    BackAndroid, 
    Platform 
} from "react-native";
import { Actions, Modal } from "react-native-router-flux";
import renderIf from '../Common/renderIf'
import TimerMixin from 'react-timer-mixin';

var styles = require('../Common/style.js');
var {
    height: deviceHeight
} = Dimensions.get("window");
var Lang = require('../Common/Lang');

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackAndroid = this.handleBackAndroid.bind(this);
        this.state = {
            offset: new Animated.Value(-deviceHeight)
        };
        Text.defaultProps.allowFontScaling=false;
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start();
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);
    }

    handleBackAndroid() {
        try {
            this.closeModal();
            return true;
        } catch (err) {
            return false;
        }
    }

    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.pop);
    }

    onPressOk() {
        Animated.timing(this.state.offset, {
            duration: 1,
            toValue: -deviceHeight
        }).start(Actions.pop);
        TimerMixin.setTimeout(() => {
            this.props.onPress_Ok();
        }, 100);
    }

    onPressCancel() {
        Animated.timing(this.state.offset, {
            duration: 1,
            toValue: -deviceHeight
        }).start(Actions.pop);
        TimerMixin.setTimeout(() => {
            this.props.onPress_Cancel();
        }, 100);
    }

    render() {
        var flag = this.props.flag;
        return (

            <Animated.View style={[styles.popup, { transform: [{ translateY: this.state.offset }] }]}>
                <View style={styles.popupDialog}>
                    {renderIf(flag == 'success' && Platform.OS == 'ios')(
                        <View style={styles.popupIcon}>
                            <View style={styles.popupIcon_Pic}>
                                <Image source={require('../../element/alert/alert-success.png')} style={styles.popupIcon_Img} />
                            </View>
                        </View>
                    )}
                    {renderIf(flag == 'error' && Platform.OS == 'ios')(
                        <View style={styles.popupIcon}>
                            <View style={styles.popupIcon_Pic}>
                                <Image source={require('../../element/alert/alert-error.png')} style={styles.popupIcon_Img} />
                            </View>
                        </View>
                    )}
                    {renderIf(flag != 'error' && flag != 'success' && Platform.OS == 'ios')(
                        <View style={{ height: 15 }} />
                    )}
                    <View style={[styles.popupHeader, { marginBottom: 10, marginTop: -10 }]}>
                        <Text style={styles.popupHeader_Text}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={styles.popupBody}>
                        <Text style={styles.popupBody_Text}>
                            {this.props.content}
                        </Text>
                    </View>
                    {renderIf(this.props.onPress_Ok == null && this.props.onPress_Cancel == null)(
                        <View style={styles.popupFooter}>
                            <TouchableOpacity style={styles.popupFooter_Touch} onPress={this.closeModal.bind(this)}>
                                <Text style={styles.popupFooter_Text} >
                                    {Lang.button_dong()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {renderIf(this.props.onPress_Ok != null && this.props.onPress_Cancel != null)(
                        <View style={styles.popupFooter}>
                            <TouchableOpacity style={styles.popupFooter_Touch} onPress={this.onPressCancel.bind(this)}>
                                <Text style={styles.popupFooter_Text} >
                                    {Lang.button_huy()}
                                </Text>
                            </TouchableOpacity>
                            <View style={{ width: 0.5, backgroundColor: '#dddddd' }} />
                            <TouchableOpacity style={styles.popupFooter_Touch} onPress={this.onPressOk.bind(this)}>
                                <Text style={styles.popupFooter_Text} >
                                    {Lang.button_ok()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {renderIf(this.props.onPress_Ok != null && this.props.onPress_Cancel == null)(
                        <View style={styles.popupFooter}>
                            <TouchableOpacity style={styles.popupFooter_Touch} onPress={this.onPressOk.bind(this)}>
                                <Text style={styles.popupFooter_Text} >
                                    {Lang.button_ok()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {renderIf(this.props.onPress_Ok == null && this.props.onPress_Cancel != null)(
                        <View style={styles.popupFooter}>
                            <TouchableOpacity style={styles.popupFooter_Touch} onPress={this.onPressCancel.bind(this)}>
                                <Text style={styles.popupFooter_Text} >
                                    {Lang.button_huy()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </Animated.View>
        );
    }
}

module.exports = Popup;