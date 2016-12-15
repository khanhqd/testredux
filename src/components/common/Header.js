import React, { Component } from 'react';
import { View, Text } from 'react-native';

const Header = ({title}) => {
  return (
  <View style={styles.header}>
    <Text style={styles.title}>{title}
    </Text>
  </View>
)
}

const styles = {
  header:{
    backgroundColor:'#336600',
    height:100,
    borderBottomWidth:1,
    borderColor:'#eee',
    elevation:1,
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    color: '#ddd',
    fontSize: 18,
    fontWeight:'bold'
  }
}

export { Header };
