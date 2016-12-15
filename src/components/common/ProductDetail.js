import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

class ProductDetail extends Component {
  state = { quantity:0 }

  increase(){
    this.setState({
      quantity: this.state.quantity + 1
    })
  }
  decrease(){
    this.setState({
      quantity: this.state.quantity - 1
    })
  }
  render() {
    return(
      <Card>
        <CardSection>
          <Text style={styles.title}>{this.props.data.tenBanh}</Text>
        </CardSection>
        <Image
          style={{height:70,width:70, alignSelf:'center'}}
          source={this.props.data.imgUrl}/>
        <CardSection>
          <Text> Đơn giá: {this.props.data.gia}
          </Text>
        </CardSection>
        <View style={{flexDirection:'row'}}>
          <Button
            onPress={() => {this.increase()}}
            add="+"/>
          <Button
            onPress={() => {this.decrease()}}
            add="-"/>
        </View>
        <View>
          <Text style={{textAlign:'center', color:'rgb(231, 184, 63)'}}>{this.state.quantity}</Text>
        </View>
      </Card>
    )
  }
};
const styles ={
  title:{
    fontSize:15,
    fontWeight:'600',
    color:'#000'
  }
}
export default ProductDetail;
