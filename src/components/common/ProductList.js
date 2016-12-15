import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import ProductDetail from './ProductDetail.js';
import Input from './Input';
import Card from './Card';
import CardSection from './CardSection';

var data = [
  {imgUrl:require('../../../img/combo1.png'), tenBanh:'Combo 1', thanhPhan:'1 Pizza bất kỳ, 1 Mỳ bất kỳ, 1 nước ngọt (+20k khi chọn bánh Hải Sản)', gia:'190.000đ'},
  {imgUrl:require('../../../img/combo2.png'), tenBanh:'Combo 2', thanhPhan:'2 Pizza bất kỳ (+20k khi chọn bánh Hải Sản)', gia:'210.000đ'},
  {imgUrl:require('../../../img/pizzabo.png'), tenBanh:'Bò nướng BBQ', thanhPhan:'Bò băm, sốt BBQ, ngô hạt, sốt cà', gia:'120.000đ'},
  {imgUrl:require('../../../img/pizzaga.png'), tenBanh:'Gà xào Tacos', thanhPhan:'Gà thái hạt lựu, hành tây, ớt chuông, sốt cà', gia:'120.000đ'},
  {imgUrl:require('../../../img/pizzahawai.png'), tenBanh:'Dăm bông dứa', thanhPhan:'Dăm bông, dứa tươi, sốt hawaiian', gia:'120.000đ'},
  {imgUrl:require('../../../img/pizzahaisan.png'), tenBanh:'Hải sản', thanhPhan:'Mực, thanh cua bể, nấm, sốt ớt chua ngọt', gia:'140.000đ'},
  {imgUrl:require('../../../img/mybo.png'), tenBanh:'Mỳ bò băm', thanhPhan:'Bò băm, sốt cà, trứng ', gia:'90.000đ'},
  {imgUrl:require('../../../img/mynam.png'), tenBanh:'Mỳ nấm sốt kem', thanhPhan:'Nấm, Ham, kem, trứng ', gia:'90.000đ'},
  {imgUrl:require('../../../img/mythit.png'), tenBanh:'Mỳ thịt nguội sốt kem', thanhPhan:'Bacon, kem, trứng', gia:'90.000đ'},
];

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: data
    }
  };
  renderMenu(){
    return this.state.menu.map(data =>
      <ProductDetail key={data.tenBanh} data={data} />
    )
  }
  render(){
    return(
      <ScrollView
        horizontal="true"
        style={{ height:210}}>
        {this.renderMenu()}
      </ScrollView>
      )
    };
}

export default ProductList;
