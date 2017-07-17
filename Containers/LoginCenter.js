/* @flow */

import React, { Component } from 'react'
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import loginModule from 'react-native-login-center'

export default class LoginCenter extends React.Component {
  onPressANgoc = () => {
      loginModule.passDataResult('Hello a Ngọc')
    }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: 'red' }} onPress={this.onPressANgoc}>
          <Text>A Ngọc đây</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
