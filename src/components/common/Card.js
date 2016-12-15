import React, { Component } from 'react';
import { View, Text } from 'react-native';

const Card = (props) => {
  // const { cardStyle } = styles;
  return (
      <View style={styles.container}>
        {props.children}
      </View>
  )
}
const styles={
  container: {
    borderWidth:1,
    borderRadius:3,
    borderColor:'#ddd',
    shadowColor:'#000',
    shadowOffset: {width:0, height:2},
    shadowOpacity:0.2,
    shadowRadius: 2,
    elevation:1,
    marginLeft: 5,
    marginRight:5,
    marginTop:10,
  }
}

export { Card };
