import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import CardSection from './CardSection';

const Input = ({ label, value, onChangeText, placeholder}) => {
  return(
    <View style={styles.container}>
      <Text style={styles.label}>{label}
      </Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}/>
    </View>
  )
}
const styles = {
  input: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize:15,
    lineHeight:25,
    flex:3
  },
  label: {
    fontSize: 15,
    paddingLeft: 10,
    flex:1,
    color:'#000'
  },
  container: {
    height:40,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start'
  }
}
export { Input };
