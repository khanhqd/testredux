import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Button = ({ props, onPress, add }) => {
  return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.button}>
        <Text style={styles.text}>{add}
        </Text>
      </TouchableOpacity>
  )
}
const styles={
  button: {
    flex:1,
    alignSelf:'stretch',
    backgroundColor:'#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#1C2436',
    marginLeft:5,
    marginRight:5,
  },
  text:{
    alignSelf:'center',
    color:'#1C2436',
    fontSize:16,
    fontWeight:'600',
    paddingTop:10,
    paddingBottom:10
  }
}

export default Button ;
