/**
 * Appota Wallet
 */

'use strict';
//var React = require('react-native');
//var {StyleSheet, Dimensions} = React;
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Animated,
  PixelRatio,
  Platform
} from "react-native";
var deviceWidth = Dimensions.get('window').width;
var { height, width } = Dimensions.get('window');
var screen = Dimensions.get('window');
// Map
const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = screen.width - (2 * ITEM_SPACING) - (2 * ITEM_PREVIEW);
const SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;
const ITEM_PREVIEW_HEIGHT = 150;
const SCALE_END = screen.width / ITEM_WIDTH;
const BREAKPOINT1 = 246;
const BREAKPOINT2 = 350;
const ONE = new Animated.Value(1);

import EStyleSheet from 'react-native-extended-stylesheet';

if (PixelRatio.get() < 3) {
  var LINE_WIDTH = 0.5;
}
if (PixelRatio.get() >= 3) {
  var LINE_WIDTH = 1;
}
if (PixelRatio.get() <= 1) {
  var LINE_WIDTH = 1;
}
if (Platform.OS == 'ios') {
  var HEIGHT_INPUT = 28;
  var HEIGHT_INPUT_BORDER = 36;
  var HEIGHT_EXPLORE_INPUT = 28;
  var HEIGHT_SEARCH = 28;
  var TOP_ICON = 8;
  var TOP_CLEAR = 8;
  var TOP_EXPLORE_ICON = 0;
  var TOP_EXPLORE_CLEAR = 0;
  var NAVBAR = 64;
  var NAVBAR_TITLE = 17;
  var TOP_NAVBAR = 20;
}
if (Platform.OS == 'android') {
  var HEIGHT_INPUT = 44;
  var HEIGHT_INPUT_BORDER = 44;
  var HEIGHT_SEARCH = 38;
  var HEIGHT_EXPLORE_INPUT = 38;
  var TOP_ICON = 12;
  var TOP_CLEAR = 12;
  var TOP_EXPLORE_ICON = 4;
  var TOP_EXPLORE_CLEAR = 4;
  var NAVBAR = 56;
  var NAVBAR_TITLE = 20;
  var TOP_NAVBAR = 0;
}
module.exports = EStyleSheet.create({
  $colorBg: '#F4F3F9',
  $colorLiXiBg: '#CE3A40',
  $colorLiXiTitle: '#EFCB8F',
  $colorPrimary: '#449D47', //#0069ff',
  $colorButton: '#449D47',
  $colorGray: '#808080',
  $colorGrayDark: '#73767A',
  $colorGrayLight: '#C7C7CD',
  $colorLine: '#E3E3E3',
  $colorTitleBox: '#6D6D72',
  $colorText: '#000',
  colorWhite: {
    color: '#ffffff',
  },
  colorBlack: {
    color: '#2B3751',
  },
  colorPrimary: {
    color: '#449D47',
  },
  ParallaxScrollView: {
    height: 64,
  },
  //Main
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  tabHome: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '$colorBg',
  },
  tabLiXi: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '$colorLiXiBg',
  },
  tabWhite: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '#fff'
  },
  tabService: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '#fff'
  },
  tabExplore: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '#fff'
  },
  tabNews: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '#fff'
  },
  tabAccount: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  tabMyQRCode: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '$colorPrimary',
  },
  tabBetting: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '$colorBg',
  },
  tabSpin: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '#000',
  },
  tabMerchant: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '$colorBg',
  },
  tabHistory: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  tabGames: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '#fff'
  },
  tabQRCode: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '#000',
  },
  tabSplash: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '$colorPrimary',
  },
  tabView: {
    flex: 1,
  },
  tabScroll: {
    flex: 1,
  },
  // Corner
  Corner_Center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Corner_Center_Img: {
    width: 240,
    height: 240,
  },
  Corner_Center_Text: {
    color: '$colorLiXiTitle',
    textAlign: 'center',
    fontSize: 17,
    padding: 15,
  },
  Corner_Left: {
    position: 'absolute',
    left: 0,
    top: -45,
    width: 90,
    height: 90,
  },
  Corner_Left2: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 90,
    height: 90,
  },
  Corner_Left_Img: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
  },
  Corner_Right: {
    position: 'absolute',
    right: 0,
    top: -45,
    width: 90,
    height: 90,
  },
  Corner_Right2: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 90,
    height: 90,
  },
  Corner_Right_Img: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
  },
  CornerHome_Center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CornerHome_Center_Img: {
    width: width,
  },
  Topup_ContactSuggest:{
    position: 'absolute',
    top: 85,
    width: width,
    left: 0,
    backgroundColor: '#F4F3F9',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD'
  },
  //Tab bar
  tabBarStyle: {
    backgroundColor: '#fff',
    borderTopWidth: LINE_WIDTH,
    borderTopColor: '$colorLine',
  },
  tabBarSelectedItemStyle: {

  },

  tabBar: {
    minHeight: 49,
    backgroundColor: "#171717",
    borderTopWidth: LINE_WIDTH,
    borderTopColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row'
  },
  tabBar_Item: {
    flex: 1 / 4,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBar_Item_Active: {
  },
  tabBar_Title: {
    fontSize: 10,
    color: '#929292',
  },
  tabBar_Title_Active: {
    fontSize: 10,
    color: '$colorPrimary',
  },
  //Loading
  LoadingPage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(255,255,255,0)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoadingPage_Inner: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    borderColor: 'rgba(0,0,0,0.03)',
    borderWidth: 1,
    shadowColor: 'black',
    shadowRadius: 12,
    shadowOpacity: 0.06,
    shadowOffset: { height: 1, width: 0 },
    borderRadius: 10,
  },

  LoadingProgress: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
    backgroundColor: '$colorPrimary',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoadingProgress_Inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoadingProgress_Logo: {
    marginBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: height / 5,
  },
  LoadingProgress_Title: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  // Navigator
  navigationBarStyle: {
    backgroundColor: '$colorPrimary',
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
  },
  titleStyle: {
    color: '#fff'
  },
  headerNav: {
    minHeight: NAVBAR,
    margin: 0,
    backgroundColor: '$colorPrimary',
    borderBottomWidth: 0,
    borderBottomColor: '$colorLine',
  },
  headerNavWhite: {
    minHeight: 64,
    margin: 0,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    borderBottomColor: '$colorLine',
  },
  headerNav_Transparent: {
    minHeight: 64,
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerNavInner: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: TOP_NAVBAR,
    backgroundColor: 'transparent',
  },
  headerNav_Img: {
    width: 24,
    height: 24,
    margin: 10,
  },
  navTouch_Cricle: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  navLeft: {
    flex: 1 / 4,
    padding: 0,
  },
  navLeftText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '500',
  },
  navLeftTextWhite: {
    color: '$colorPrimary',
    fontSize: 17,
    fontWeight: '500',
  },
  navRight: {
    flex: 1 / 4,
    paddingRight: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  navRight_Text: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'right',
    letterSpacing: -0.21,
  },
  navRight_TextWhite: {
    color: '$colorPrimary',
    fontSize: 15,
    textAlign: 'right',
  },
  navTouch: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerNav2017: {
    minHeight: 64,
    margin: 0,
    backgroundColor: '$colorLiXiBg',
    borderBottomWidth: 0,
    borderBottomColor: '$colorLine',
  },
  navLeftText2017: {
    color: '$colorLiXiTitle',
    fontSize: 17,
    fontWeight: '500',
  },
  navRight_Text2017: {
    color: '$colorLiXiTitle',
    fontSize: 15,
    textAlign: 'right',

  },
  navTitle_Text2017: {
    color: '$colorLiXiTitle',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: -0.21,
  },
  navClose: {
    width: 60,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 5,
    alignItems: 'flex-end'
  },
  navLocation: {
    width: 60,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 15,
    alignItems: 'flex-end'
  },
  navClose_Text: {
    color: '#fff'
  },
  navTitle: {
    flex: 2 / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle_Tab: {
    height: 29,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
  },
  navTitle_Touch: {
    flex: 1 / 2,
    height: 29,
  },
  navTitle_TouchLeft: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle_TouchLeft_Active: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle_TouchRight: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle_TouchRight_Active: {
    backgroundColor: '#fff',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle_TabText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: -0.08,
    backgroundColor: 'transparent',
  },
  navTitle_TabText_Active: {
    color: '$colorPrimary',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: -0.08,
    backgroundColor: 'transparent',
  },

  navTitleWhite_TouchLeft: {
    borderWidth: 1,
    borderColor: '$colorPrimary',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitleWhite_TouchLeft_Active: {
    backgroundColor: '$colorPrimary',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitleWhite_TouchRight: {
    borderWidth: 1,
    borderColor: '$colorPrimary',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitleWhite_TouchRight_Active: {
    backgroundColor: '$colorPrimary',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitleWhite_TabText: {

    color: '$colorPrimary',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: -0.08,
    backgroundColor: 'transparent',
  },
  navTitleWhite_TabText_Active: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: -0.08,
    backgroundColor: 'transparent',
  },
  // Tab Header
  headerTab: {
    backgroundColor: '$colorPrimary',

  },
  headerTab_Inner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 2,
  },
  headerTab_Touch: {
    width: (width-24)/3,
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTab_Touch2Col: {
    width: (width-24)/2,
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTab_Text: {
    fontSize: 12,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '600',
  },
  headerTab_Touch_Active: {
    width: (width-24)/3,
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$colorPrimary',
  },
  headerTab_Touch2Col_Active: {
    width: (width-24)/2,
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$colorPrimary',
  },
  headerTab_Text_Active: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },

  navSearch: {
    flex: 1,
    height: HEIGHT_EXPLORE_INPUT,
    marginLeft: 15,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  navTitle_Text: {
    color: '#ffffff',
    fontSize: NAVBAR_TITLE,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: -0.21,
  },
  navTitle_TextWhite: {
    color: '$colorPrimary',
    fontSize: NAVBAR_TITLE,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: -0.21,
  },
  navTitle_TextRight: {
    color: '#ffffff',
    fontSize: NAVBAR_TITLE,
    textAlign: 'right',
    letterSpacing: -0.21,
  },
  navTitle_Img: {
    height: 24,
  },
  navSearch_Icon: {
    position: 'absolute',
    top: TOP_EXPLORE_ICON,
    left: 0,
    width: 28,
    height: 28,
    backgroundColor: 'transparent'
  },
  navSearch_Clear: {
    position: 'absolute',
    top: TOP_EXPLORE_CLEAR,
    right: 0,
    backgroundColor: 'transparent',
    width: 28,
    height: 28,
  },
  navSearch_ClearIcon: {
    width: 28,
    height: 28,
  },
  navSearch_Input: {
    flex: 1,
    height: HEIGHT_EXPLORE_INPUT,
    fontSize: 14,
    paddingLeft: 26,
    paddingRight: 5,
    color: '#fff',
  },
  // End Navigator

  // Nav Popup
  headerTransparent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    margin: 0,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderBottomColor: '$colorLine',
  },
  headerTransparentInner: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  headerTransparent_Img: {
    width: 24,
    height: 24,
  },
  headerTransparent_Left: {
    flex: 1 / 4,
    padding: 0,
  },
  headerTransparent_LeftText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '500',
  },
  headerTransparent_Right: {
    flex: 1 / 4,
    padding: 10,
    alignItems: 'flex-end'
  },
  headerTransparent_Title: {
    flex: 2 / 4,
  },
  headerTransparent_TitleText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Navigator
  viewStatus: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  topNav: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    margin: 0,
    //backgroundColor: '$colorPrimary',
  },
  topNav_Bg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: 64,
  },
  topNavInner: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',

  },
  topNav_linearGradient: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',

  },
  topNav_Img: {
    width: 24,
    height: 24,
  },
  topNav_Left: {
    flex: 1 / 4,
    padding: 10,
    marginTop: 10,
  },
  topNav_LeftText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '500',
  },
  topNav_Right: {
    flex: 1 / 4,
    padding: 10,
    alignItems: 'flex-end',
    marginTop: 10,
  },
  topNav_Title: {
    flex: 2 / 4,
    marginTop: 10,
  },
  topNav_TitleText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  // End Navigator
  // Pin

  padPin: {
    flex: 1,
    backgroundColor: '$colorPrimary',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerPin: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  headerPin_Text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
  Pin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
  },
  Pin_Pin: {
    fontSize: 15,
    color: '#fff',
  },
  rowPin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    width: 300,
  },
  forgotPin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    width: 300,
  },
  btnPin: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderColor: 'rgba(255,255,255,0.3)',
    //backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderRadius: 30,
  },
  btnPin_Text: {
    fontSize: 30,
    fontWeight: '300',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  btnPin_Bottom: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText_Left: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    padding: 10,
  },
  btnText_Right: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    padding: 10,
  },
  btnTouch_Left: {
    width: 150,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 0.5
  },
  btnTouch_Right: {
    width: 150,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 0.5,
  },
  btnText_Center: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    padding: 10,
  },
  forgotPin_Touch: {
    width: 300,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 0,
    borderRadius: 10,
  },
  touchID: {
    marginTop: 5,
    marginBottom: 5,
    maxWidth: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchID_Touch: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: 'row',
  },
  touchID_Img: {
    width: 26,
    height: 26,
    marginRight: 10,
  },
  touchID_Txt: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
  // 404
  Page_404: {
    padding: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Page_404_Img: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  Page_404_Text: {
    textAlign: 'center',
    fontSize: 17,
  },
  // Contact
  FormControl_ScrollContact: {
    flex: 1,
  },
  ListContact: {
    flex: 1,
  },
  ListContact_List: {
    flex: 1,
  },
  ListContact_View: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  ListContact_Touch: {
    flex: 1,
  },
  ListContact_Favorite: {
    width: 44,
    position: 'absolute',
    right: 0,
    top: 6,
  },
  ListContact_Favorite_Img: {
    width: 44,
    height: 44,
  },
  ListContact_Item: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ListContact_Selection: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  ListContact_SelectionTouch: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListContact_SelectionImg: {
    width: 22,
    height: 22,
  },
  ListContact_Avatar: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: '$colorPrimary',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 12,
  },
  ListContact_AvatarText: {
    color: '#fff',
    fontSize: 17,
    backgroundColor: 'transparent',
  },
  ListContact_Info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
    height: 56,
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
  },
  ListContact_Suggest: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
    height: 56
  },
  ListContact_InfoName: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: -0.21,
    marginBottom: 2,
  },
  ListContact_InfoPhone: {
    fontSize: 11,
    color: '$colorGray'
  },
  // Recent
  ListRecent: {
  },
  ListRecent_Touch: {
    flex: 1,
  },
  ListRecent_Row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
    marginLeft: 15,
  },
  ListRecent_Item: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ListRecent_ItemTouch: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ListRecent_Selection: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  ListRecent_SelectionTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListRecent_SelectionImg: {
    width: 22,
    height: 22,
  },
  ListRecent_Avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '$colorPrimary',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 15,
  },
  ListRecent_AvatarText: {
    color: '#fff',
    fontSize: 17,
    backgroundColor: 'transparent',
  },
  ListRecent_Info: {
    flex: 1,
    justifyContent: 'center',
    height: 56,
  },
  ListRecent_InfoPhone: {
    fontSize: 15,
    letterSpacing: -0.21,
    marginBottom: 2,
  },
  ListRecent_InfoName: {
    fontSize: 12,
    letterSpacing: -0.2,
  },
  ListRecent_InfoDate: {
    fontSize: 11,
    letterSpacing: -0.2,
    color: '$colorGray',
  },
  ListRecent_Money: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  ListRecent_MoneyText: {
    fontSize: 15,
    letterSpacing: -0.15,
    fontWeight: '600',
    textAlign: 'right',
  },
  ListRecent_More: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  ListRecent_MoreTouch: {
    width: 32,
    height: 32,
  },
  ListRecent_MoreImg: {
    width: 32,
    height: 32,
  },
  // Recent Event
  ListRecentEvent: {
  },
  ListRecentEvent_Touch: {
    flex: 1,
  },
  ListRecentEvent_Row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopColor: 'rgba(239,203,143,0.3)',
    borderTopWidth: LINE_WIDTH,
    marginLeft: 15,
  },
  ListRecentEvent_Item: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ListRecentEvent_ItemTouch: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ListRecentEvent_Selection: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  ListRecentEvent_SelectionTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListRecentEvent_SelectionImg: {
    width: 22,
    height: 22,
  },
  ListRecentEvent_Avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '$colorPrimary',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 15,
  },
  ListRecentEvent_AvatarText: {
    color: '#fff',
    fontSize: 17,
    backgroundColor: 'transparent',
  },
  ListRecentEvent_Info: {
    flex: 1,
    justifyContent: 'center',
    height: 56,
  },
  ListRecentEvent_InfoPhone: {
    fontSize: 15,
    letterSpacing: -0.21,
    marginBottom: 2,
    color: '#fff',
  },
  ListRecentEvent_InfoName: {
    fontSize: 12,
    letterSpacing: -0.2,
  },
  ListRecentEvent_InfoDate: {
    fontSize: 11,
    letterSpacing: -0.2,
    color: 'rgba(255,255,255,0.5)',
  },
  ListRecentEvent_Money: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  ListRecentEvent_MoneyText: {
    fontSize: 13,
    letterSpacing: -0.15,
    fontWeight: '600',
    textAlign: 'right',
    color: '#fff',
  },
  ListRecentEvent_More: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  ListRecentEvent_MoreTouch: {
    width: 32,
    height: 32,
  },
  ListRecentEvent_MoreImg: {
    width: 32,
    height: 32,
  },
  // Tag
  ListTag: {
    backgroundColor: '$colorBg',
  },
  ListTag_Scroll: {
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  ListTag_Touch: {
    backgroundColor: '#rgba(0,0,0,0.1)',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 5,
    borderRadius: 3,
  },
  ListTag_Touch_Active: {
    backgroundColor: '$colorPrimary',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 5,
    borderRadius: 3,
  },
  ListTag_Text: {
    fontSize: 12,
    color: '$colorGray',
  },
  ListTag_Text_Active: {
    fontSize: 12,
    color: '#fff',
  },
  // Checkin
  ListCheckin: {
    flex: 1,
  },
  ListCheckint_Touch: {
    flex: 1,
  },
  ListCheckin_Item: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ListCheckin_Avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '$colorPrimary',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 10,
  },
  ListCheckin_AvatarText: {
    color: '#fff',
    fontSize: 17,
    backgroundColor: 'transparent',
  },
  ListCheckin_AvatarImg: {
    width: 49,
    height: 32,
  },
  ListCheckin_Info: {
    flex: 1,
    marginLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    height: 70,
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
  },
  ListCheckin_InfoName: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 2,
  },
  ListCheckin_InfoAddress: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ListCheckin_InfoAddress_Text: {
    fontSize: 12,
    color: '#808080',
    flex: 5 / 6,
  },
  ListCheckin_InfoAddress_Location: {
    fontSize: 12,
    color: '$colorPrimary',
    justifyContent: 'flex-end',
    textAlign: 'right',
    flex: 1 / 6,
  },
  //Transaction
  headerTransaction: {
    backgroundColor: '$colorPrimary',
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTransaction_Inner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTransaction_Title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '300',
    letterSpacing: -0.24
  },
  headerTransaction_Option: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '300',
  },
  headerTransaction_Sub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '600',
  },
  // History
  ListHistory: {
    flex: 1,
    paddingLeft: 15,
    borderTopColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
    backgroundColor: '#fff',
  },
  ListHistory_Row: {
    flex: 1,
  },
  ListHistory_Touch: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListHistory_Item: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 12,
    padding: 0,
  },
  ListHistory_Line: {
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    height: LINE_WIDTH,
  },

  ListHistory_InfoPoint: {
    width: 12,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListHistory_InfoPoint_Img: {
    width: 12,
    height: 24,
  },
  ListHistory_InfoMoneyStatus: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ListHistory_Avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '$colorPrimary',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 15,
  },
  ListHistory_AvatarText: {
    color: '#fff',
    fontSize: 17,
    backgroundColor: 'transparent',
  },
  ListHistory_Info: {
    flex: 1,
    justifyContent: 'center',
    height: 70,
  },
  ListHistory_InfoLeft: {
    flex: 2 / 3,
    justifyContent: 'center',
    height: 70,
  },
  ListHistory_InfoRight: {
    flex: 1 / 3,
    justifyContent: 'center',
    height: 70,
  },
  ListHistory_InfoName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    letterSpacing: -0.41
  },
  ListHistory_InfoMoney: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'right',
    marginLeft: 3,
    letterSpacing: -0.41
  },
  ListHistory_InfoID: {
    fontSize: 11,
  },
  ListHistory_InfoTime: {
    fontSize: 11,
    color: '$colorGray',
    textAlign: 'right',
  },
  //ListPurchase
  ListPurchase: {
    backgroundColor: '#fff',
    borderTopColor: '$colorLine',
    borderBottomColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
    borderBottomWidth: LINE_WIDTH,
    marginBottom: 10,
  },
  ListPurchase_Header: {
    paddingTop: 2,
    paddingLeft: 2,
    paddingRight: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListPurchase_Header_Img: {

  },
  ListPurchase_Title: {
    flex: 1,
  },
  ListPurchase_Title_Name: {
    fontSize: 13,
    fontWeight: '500',
  },
  ListPurchase_Title_Sub: {
    fontSize: 12,
    color: '$colorGray',
  },
  ItemPurchase_Scroll: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: -4,
  },
  ItemPurchase: {
    marginTop: 4,
    marginRight: 10,
    marginBottom: 15,
    width: 154,
    minHeight: 110,
    borderWidth: LINE_WIDTH,
    borderColor: '$colorLine',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: { height: 1, width: 0 },
  },
  ItemPurchase_Touch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ItemPurchase_Img: {
    width: 90,
    height: 60,
    marginTop: 2,
    marginBottom: 2,

  },
  ItemPurchase_More: {
    width: 154,
    minHeight: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$colorPrimary',
    borderRadius: 5,
    margin: 0,
  },
  ItemPurchase_More_Txt: {
    fontSize: 17,
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: -0.2,
    margin: 10,
    color: '#fff',
  },
  ItemPurchase_Title: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
    paddingRight: 2,
    marginBottom: 10,
  },

  ItemPurchase_Title_Name: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  ItemPurchase_Title_Sale: {
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  //ListPurchase Game
  ListPayGame: {
    backgroundColor: '#fff',
    borderTopColor: '$colorLine',
    borderBottomColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
    borderBottomWidth: LINE_WIDTH,
    marginBottom: 10,
  },
  ListPayGame_Header: {
    paddingTop: 2,
    paddingLeft: 2,
    paddingRight: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListPayGame_Header_Img: {

  },
  ListPayGame_Title: {
    flex: 1,
  },
  ListPayGame_Title_Name: {
    fontSize: 13,
    fontWeight: '500',
  },
  ListPayGame_Title_Sub: {
    fontSize: 12,
    color: '$colorGray',
  },
  ItemPayGame_Scroll: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: -4,
  },
  ItemPayGame: {
    marginTop: 4,
    marginBottom: 15,
    marginRight: 10,
    width: 72,
    justifyContent: 'center',
  },
  ItemPayGame_Touch: {
    flex: 1,
    alignItems: 'center',
  },
  ItemPayGame_Thumb: {
    width: 72,
    height: 72,
    marginTop: 2,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: { height: 1, width: 0 },
    borderWidth: LINE_WIDTH,
    borderColor: '$colorLine',
    borderRadius: 15,
  },
  ItemPayGame_Thumb_Img: {
    width: 72,
    height: 72,
    borderRadius: 15,
  },
  ItemPayGame_More: {
    width: 72,
    height: 72,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$colorPrimary',
    borderRadius: 15,
    margin: 0,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: { height: 1, width: 0 },
  },
  ItemPayGame_More_Txt: {
    fontSize: 17,
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: -0.2,
    margin: 10,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  ItemPayGame_Title: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
    paddingRight: 2,
  },

  ItemPayGame_Title_Name: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: -0.2,
    marginBottom: 2,
    backgroundColor: 'transparent',
  },
  ItemPayGame_Title_Sale: {
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  // Form Search
  FormControl_Search: {
    height: 45
  },
  FormControl_Search_Inner: {
    backgroundColor: '#F2F2F2',
    padding: 8,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
  },
  FormControl_SearchIcon: {
    position: 'absolute',
    left: 8,
    top: TOP_ICON,
    width: 30,
    height: 30,
  },
  FormControl_SearchClear: {
    position: 'absolute',
    right: 70,
    width: 28,
    top: TOP_CLEAR,
  },
  FormControl_SearchClearIcon: {
    width: 28,
    height: 28,
  },
  FormControl_SearchClose: {
    width: 60,
    padding: 5,
  },
  FormControl_SearchCloseText: {
    fontSize: 14,
    color: '$colorPrimary',
    textAlign: 'right',
  },
  FormControl_SearchInput: {
    flex: 1,
    height: HEIGHT_SEARCH,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingLeft: 30,
    paddingRight: 10,
    fontSize: 14,
  },

  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filmAvatar: {
    marginTop: 10,
    marginLeft: 10,
    width: 140,
    height: 80,
  },
  titleView: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    marginTop: 10,
  },
  filmDescription: {
    flexDirection: 'row',
    height: 20,
    fontSize: 12,
    textAlign: 'left',
    color: '#555555',
  },
  //end rowdata

  // Form
  FormControl: {
    flex: 1
  },
  FormControl2017: {
    flex: 1,
  },
  FormControl_Line: {
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    height: LINE_WIDTH,
    marginTop: 0,
  },
  FormControl_Line2017: {
    borderBottomColor: '$colorLiXiTitle',
    borderBottomWidth: LINE_WIDTH,
    height: LINE_WIDTH,
    marginTop: 0,
  },
  FormControl_Scroll: {
    marginBottom: 50,
  },
  FormControl_Group: {

  },
  FormControl_Addon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  FormControl_AddonIcon: {
    width: 44,
    height: 44,
  },
  FormControl_AddonText: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    color: '$colorPrimary',
  },
  FormControl_AddonText2017: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    color: '$colorLiXiBg',
  },
  FormControl_Active: {
    fontSize: 11,
    lineHeight: 14,
    color: '$colorPrimary',
    marginBottom: -2,
    backgroundColor: 'transparent',
  },
  FormControl_Clear: {
    position: 'absolute',
    top: 10,
    right: 15,
    backgroundColor: 'transparent',
    width: 44,
    height: 44,
  },
  FormControl_ClearIcon: {
    width: 44,
    height: 44,
  },
  FormControl_Contact: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
    width: 44,
    height: 44,
  },
  FormControl_ContactIcon: {
    width: 44,
    height: 44,
  },
  FormControl_Title: {
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: '$colorBg',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  FormControl_TitleBorder: {
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: '$colorBg',
    borderTopColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  FormControl_TitleText: {
    color: '$colorTitleBox',
    fontSize: 12,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  FormControl_Title2017: {
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: '$colorLiXiBg',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  FormControl_TitleBorder2017: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '$colorLiXiBg',
    borderTopColor: '$colorLine',
    borderTopWidth: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  FormControl_TitleText2017: {
    color: 'rgba(239,203,143,0.5)',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  FormControl_TitleRightText: {
    color: '$colorTitleBox',
    fontSize: 12,
    marginLeft: 15,
    textAlign: 'right',
  },
  FormControl_TitleRight: {
    height: 40,
    position: 'absolute',
    top: 10,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  FormControl_TitleRight_Img: {
    marginLeft: 3,
  },
  FormControl_Tab: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    borderTopColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
  },
  FormControl_TabTouch: {
    flex: 1 / 3,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_TabTouch_Active: {
    flex: 1 / 3,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$colorPrimary',
  },
  FormControl_TabTouch_Text: {
    fontSize: 17,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  FormControl_TabTouch_Text_Active: {
    fontSize: 17,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  FormControl_Card: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    borderTopColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
    height: 80,
  },
  FormControl_CardScroll: {
    height: 80,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  FormControl_CardScroll_Inner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 10,
  },
  FormControl_CardTouch: {
    width: 90,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '$colorLine',
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 5,
    opacity: 1,
  },
  FormControl_CardTouch_Active: {
    width: 90,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '$colorPrimary',
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 5,
    opacity: 1,
  },
  FormControl_CardTouch_Img: {
    width: 90,
    height: 60,
    opacity: 0.5,
  },
  FormControl_CardTouch_Img_Active: {
    opacity: 1,
    width: 90,
    height: 60,
  },
  FormControl_Avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  FormControl_Profile: {
    backgroundColor: '#fff',
    borderBottomColor: '$colorLine',
    borderBottomWidth: 0,
    borderTopColor: '$colorLine',
    borderTopWidth: 0,
    paddingLeft: 15,
  },
  FormControl_RowContent: {
    backgroundColor: '#fff',
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    borderTopColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
    paddingLeft: 15,
    marginBottom: 15,
  },
  FormControl_Content: {
    backgroundColor: '#fff',
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    borderTopColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
  },
  FormControl_ContentNoBorder: {
    backgroundColor: '#fff',
    borderTopColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
  },
  FormControl_Content2017: {
    backgroundColor: '$colorLiXiBg',
    borderBottomColor: '$colorLiXiTitle',
    borderBottomWidth: 0,
    borderTopColor: '$colorLiXiTitle',
    borderTopWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  FormControl_Select: {
    marginTop: 11,
    marginBottom: 11,
  },
  FormControl_SelectGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 11,
    marginRight: 11,
  },
  FormControl_Touch: {
    height: 70,
    width: width / 3 - 8,
  },
  FormControl_TouchWidthText: {
    height: 70,
    width: width / 3 - 8,
  },
  FormControl_TouchWidthPic: {
    height: 110,
  },
  FormControl_Touch3Col: {
    width: width / 3 - 8,
  },
  FormControl_Touch2Col: {
    width: width / 2 - 12,
  },
  FormControl_Touch1Col: {
    height: 70,
    width: width - 22,
  },
  FormControl_QRCode: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    height: width,
  },
  FormControl_QRCode_Img: {
    width: 260,
    height: 260,
  },
  FormControl_MyQRCode: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 64,
    //minHeight: height,
  },
  FormControl_MyQRCode_Scroll: {
    flex: 1,
  },
  FormControl_MyQRCode_Inner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    width: 260,
    height: 260,
    marginBottom: 10,
  },
  FormControl_MyQRCode_Button: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  FormControl_MyQRCode_ButtonTouch: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 8,
    marginLeft: 5,
    marginRight: 5,
    width: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_MyQRCode_ButtonText: {
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  FormControl_MyQRCode_Img: {
    width: 200,
    height: 200,
  },
  FormControl_MyQRCode_Note: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_MyQRCode_Text: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontSize: 13,
  },
  FormControl_Input_Form: {
    height: 64,
    width: width,
    justifyContent: 'center',
  },

  FormControl_Input_Form2: {
    flexDirection: 'row',
    height: 64,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_Input_Form2Col: {
    flex: 1 / 2,
  },
  FormControl_Input: {
    height: 44,
    width: width,
    justifyContent: 'center',
  },
  FormControl_TextArea: {
    minHeight: 44,
    width: width,
    justifyContent: 'center',
  },
  FormControl_Input2017: {
    minHeight: 44,
    marginBottom: 15,
    width: width - 30,
  },
  FormControl_Input_Text: {
    fontSize: 17,
  },
  FormControl_Input_Enter: {
    height: 44,
    paddingLeft: 15,
    paddingRight: 40,
    fontSize: 17,
    width: null,
  },
  FormControl_Textarea_Enter: {
    height: 32,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 40,
    fontSize: 17,
    width: null,
  },
  FormControl_Input_Enter2017: {
    height: 44,
    paddingLeft: 15,
    paddingRight: 40,
    fontSize: 17,
    width: null,
    color: '#4B1119',
    backgroundColor: '$colorLiXiTitle',
    borderRadius: 5,
  },
  FormControl_Textarea_Enter2017: {
    height: 32,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 40,
    fontSize: 17,
    width: null,
    color: '#4B1119',
    backgroundColor: '$colorLiXiTitle',
    borderRadius: 5,
  },
  FormControl_Input_Field: {
    height: HEIGHT_INPUT,
    lineHeight: HEIGHT_INPUT,
    paddingRight: 40,
    fontSize: 17,
    width: null,
  },
  FormControl_Text_Field: {
    height: 28,
    lineHeight: 28,
    paddingRight: 40,
    fontSize: 17,
    width: null,
    backgroundColor: 'transparent',
  },
  FormControl_Text_Sub: {
    paddingRight: 40,
    fontSize: 12,
    width: null,
    backgroundColor: 'transparent',
  },
  FormControl_Copy: {
    position: 'absolute',
    right: 15,
    top: 10,
    width: 32,
    height: 32,
  },
  FormControl_CheckImg: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 24,
    height: 24,
  },
  FormControl_TouchSelect: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: '$colorLine',
    borderWidth: 1,
    margin: 4,
    paddingTop: 15,
    paddingBottom: 15,
    height: 40,
  },
  FormControl_TouchSelect_Active: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '$colorPrimary',
    margin: 4,
    paddingTop: 15,
    paddingBottom: 15,
    height: 40,
  },
  FormControl_TouchRowSelect: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '$colorLine',
    borderWidth: 1,
    margin: 4,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    minHeight: 60,
  },
  FormControl_TouchRowSelect_Active: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '$colorPrimary',
    borderColor: '$colorPrimary',
    borderWidth: 1,
    margin: 4,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    height: 60,
  },
  FormControl_TouchImg: {
    marginBottom: 4,
  },
  FormControl_TouchRowImg: {
    marginRight: 10,
    width: 40,
    height: 40,
  },
  FormControl_TouchBankImg: {
    marginBottom: 4,
  },
  FormControl_TouchRowBank: {
    marginRight: 10,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_TouchRowBankImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  FormControl_TouchRowCard: {
    marginRight: 10,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_TouchRowCardImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  FormControl_TouchRowGame: {
    marginRight: 10,
    width: 46,
    height: 46,
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_TouchRowGameImg: {
    width: 46,
    height: 46,
    resizeMode: 'contain',
  },
  FormControl_TouchRowPrice: {
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_TouchRowPrice_Txt: {
    fontWeight: '600',
    letterSpacing: -0.2,
    fontSize: 17,
    color: '#f43530',
  },
  FormControl_TouchRowCC: {
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_TouchRowCCImg: {
    width: 40,
    height: 30,
  },
  FormControl_TouchRowPoint: {
    width: 16,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_TouchRowPointImg: {
    width: 12,
    height: 24,
  },
  FormControl_TouchInfo: {
    flex: 1,
  },
  FormControl_TouchTitle: {
    fontSize: 14,
    letterSpacing: -0.16,
    fontWeight: '600',
    textAlign: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    color: '$colorText',
    backgroundColor: 'transparent',
    marginBottom: 2,
  },

  FormControl_TouchSale: {
    position: 'absolute',
    right: 10,
    top: 15,
    fontSize: 21,
    letterSpacing: -0.16,
    fontWeight: '600',
    textAlign: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FF4848',
    backgroundColor: 'transparent',
  },
  FormControl_TouchSale_Active: {
    position: 'absolute',
    right: 10,
    top: 15,
    fontSize: 21,
    letterSpacing: -0.16,
    fontWeight: '600',
    textAlign: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FAE965',
    backgroundColor: 'transparent',
  },
  FormControl_TouchSale_Icon: {
    fontSize: 14,
    letterSpacing: -0.16,
    fontWeight: '600',
    textAlign: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FF4848',
    backgroundColor: 'transparent',
  },
  FormControl_TouchSale_Icon_Active: {
    fontSize: 14,
    letterSpacing: -0.16,
    fontWeight: '600',
    textAlign: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FAE965',
    backgroundColor: 'transparent',
  },
  FormControl_TouchTitleInfo: {
    flex: 1,
  },
  FormControl_TouchTitleBank: {
    fontSize: 14,
    letterSpacing: -0.16,
    fontWeight: '600',
    color: '$colorText',
    backgroundColor: 'transparent',
    marginBottom: 2,
  },
  FormControl_TouchTitleBank_Active: {
    fontSize: 14,
    letterSpacing: -0.16,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  FormControl_TouchTitleCard: {
    fontSize: 14,
    letterSpacing: -0.16,
    fontWeight: '600',
    color: '$colorText',
    backgroundColor: 'transparent',
    marginBottom: 2,
  },
  FormControl_TouchTitleCard_Active: {
    fontSize: 14,
    letterSpacing: -0.16,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  FormControl_TouchTitleNumber: {
    fontSize: 12,
    letterSpacing: -0.16,
    color: '$colorText',
    backgroundColor: 'transparent',
  },
  FormControl_TouchTitleNumber_Active: {
    fontSize: 12,
    letterSpacing: -0.16,
    color: 'rgba(255,255,255,1)',
    backgroundColor: 'transparent',
  },
  FormControl_TouchTitleName: {
    fontSize: 14,
    letterSpacing: -0.16,
    fontWeight: '600',
    color: '$colorText',
    backgroundColor: 'transparent',
    marginBottom: 2,
  },
  FormControl_TouchTitleFullName: {
    fontSize: 12,
    letterSpacing: -0.16,
    color: '$colorGray',
    backgroundColor: 'transparent',
  },
  FormControl_TouchTitleFullName_Active: {
    fontSize: 12,
    letterSpacing: -0.16,
    color: 'rgba(255,255,255,0.8)',
    backgroundColor: 'transparent',
  },
  FormControl_TouchTitle_Active: {
    fontSize: 14,
    letterSpacing: -0.16,
    fontWeight: '600',
    textAlign: 'center',
    borderRadius: 4,
    color: '#fff',
    backgroundColor: 'transparent',
    marginBottom: 2,
  },
  FormControl_TouchPrice: {
    fontSize: 12,
    letterSpacing: -0.16,
    fontWeight: '300',
    textAlign: 'center',
    color: '$colorText',
    backgroundColor: 'transparent',
  },
  FormControl_TouchPrice_Active: {
    fontSize: 12,
    letterSpacing: -0.16,
    fontWeight: '300',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  FormControl_Sample: {
    flex: 1,

  },
  FormControl_Sample_Img: {
    width: width,
    height: width,
    resizeMode: 'contain',
  },
  FormControl_Note: {
    margin: 15,
  },
  FormControl_NoteText: {
    fontSize: 12,
    color: '$colorGrayDark',
  },

  FormControl_Button: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  FormControl_Button_Left: {
    width: width / 2,
    paddingLeft: 5,
    paddingRight: 2.5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  FormControl_Button_Right: {
    width: width / 2,
    paddingLeft: 2.5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  FormControl_ButtonTouch: {
    backgroundColor: '$colorButton',
    height: 50,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_ButtonTouchDisable: {
    backgroundColor: '$colorGrayLight',
    height: 50,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_ButtonText: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  FormControl_ButtonTouch2017: {
    backgroundColor: '$colorLiXiTitle',
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_ButtonTouchDisable2017: {
    backgroundColor: 'rgba(239,203,143,0.5)',
    padding: 15,
    flex: 1,
  },
  FormControl_ButtonTextDisable2017: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: '$colorLiXiBg',
  },
  FormControl_ButtonText2017: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: '#4B1119',
  },
  FormControl_ButtonTouchBorder: {
    backgroundColor: '$colorPrimary',
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  FormControl_ButtonBorderText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  FormControl_ButtonRadius: {
    marginBottom: 10,
    padding: 15,
  },
  FormControl_ButtonRadius_Touch: {
    backgroundColor: '$colorButton',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_ButtonRadius_Text: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  // Form Numsber
  FormControl_Numsber: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  FormControl_NumsberInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  FormControl_NumsberInfo_Text: {
    fontSize: 17,
    fontWeight: '600',
  },
  FormControl_NumsberAdd: {
    borderColor: '$colorPrimary',
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    width: 80,
  },
  FormControl_NumsberAdd_Left: {
    flex: 1 / 2,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_NumsberAdd_Right: {
    flex: 1 / 2,
    height: 28,
    borderLeftColor: '$colorPrimary',
    borderLeftWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormControl_NumsberText: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '$colorPrimary',
  },
  FormControl_NumsberText_Icon: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '$colorPrimary',
  },
  // Form Setting
  FormControl_SettingAccount: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
  },
  FormControl_SettingAccount_Inner: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1 / 2,
  },
  FormControl_SettingAccount_Sub: {
    fontSize: 11,
    color: '$colorGray',
    fontWeight: '500',
    textAlign: 'center',
  },
  FormControl_SettingAccount_Title: {
    fontSize: 17,
    letterSpacing: -0.41,
    color: '#F43530',
    fontWeight: '500',
    textAlign: 'center',
  },
  FormControl_SettingLogout: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
  },
  FormControl_SettingLogout_Title: {
    fontSize: 17,
    letterSpacing: -0.41,
    color: '#FE3824',
    fontWeight: '500',
    textAlign: 'center',
  },
  FormControl_Setting: {},
  FormControl_Setting_Group: {},
  FormControl_Setting_Touch: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    paddingRight: 15,
  },
  FormControl_Setting_Touch_Thumb: {
    width: 44,
    height: 44,
    marginLeft: 15,
  },
  FormControl_Setting_Touch_ThumbImg: {
    width: 44,
    height: 44,
  },
  FormControl_Setting_Touch_Info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  FormControl_Setting_Touch_InfoRight: {
    flex: 1,
    justifyContent: 'center',
  },
  FormControl_Setting_Touch_InfoTitle: {
    fontSize: 17,
    letterSpacing: -0.41,
  },
  FormControl_Setting_Touch_InfoTitleRight: {
    fontSize: 17,
    letterSpacing: -0.41,
    textAlign: 'right',
    color: '$colorGray'
  },
  FormControl_Setting_Touch_InfoSub: {
    fontSize: 13,
    color: '$colorGray'
  },
  FormControl_Setting_Touch_Copy: {
    width: 32,
    justifyContent: 'center',
    marginLeft: 8,
  },
  FormControl_Setting_Touch_Point: {
    width: 12,
    justifyContent: 'center',
    marginLeft: 8,
  },
  FormControl_Setting_Touch_Swithch: {
    position: 'absolute',
    top: 8,
    right: 12,
    justifyContent: 'center',
  },
  FormControl_SettingTouch_PointImg: {
    width: 12,
    height: 24,
  },
  FormControl_Setting_Line: {
    height: LINE_WIDTH,
    flex: 1,
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    marginLeft: 15,
  },

  // Form Row
  FormControl_Row: {
    marginTop: 10,
    marginBottom: 10,
  },
  FormControl_RowGroup: {
    margin: 4,
  },
  FormControl_RowTouch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '$colorLine',
    borderWidth: 1,
    marginLeft: 11,
    marginRight: 11,
    paddingTop: 5,
    paddingBottom: 5,
    height: 60,
  },
  FormControl_RowTouch_Thumb: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  FormControl_RowTouch_ThumbImg: {
    width: 40,
    height: 40,
  },
  FormControl_RowTouch_Info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  FormControl_RowTouch_InfoTitle: {
    fontSize: 14,
    letterSpacing: -0.16,
    fontWeight: '500',
    backgroundColor: 'transparent',
    marginBottom: 2,
  },
  FormControl_RowTouch_InfoSub: {
    fontSize: 12,
    letterSpacing: -0.16,
    color: '$colorGray'
  },
  FormControl_RowTouch_Point: {
    width: 12,
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 10,
  },
  FormControl_RowTouch_PointImg: {
    width: 12,
    height: 24,
  },
  FormControl_RowLine: {
    height: LINE_WIDTH,
    flex: 1,
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    marginLeft: 90,
  },
  // Notification
  FormControl_RowSm: {},
  FormControl_RowSm_Group: {},
  FormControl_RowSm_Touch: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  FormControl_RowSm_Touch_Thumb: {
    width: 40,
    height: 40,
    marginLeft: 15,
  },
  FormControl_RowSm_Touch_ThumbImg: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  FormControl_RowSm_Touch_Content: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
  },
  FormControl_RowSm_Touch_Info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 2,
  },
  FormControl_RowSm_Touch_InfoTitle: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: -0.41,
    flex: 1,
    marginRight: 10,
  },
  FormControl_RowSm_Touch_InfoTime: {
    marginTop: 3,
    fontSize: 10,
    color: '$colorGray',
    textAlign: 'right',
  },
  FormControl_RowSm_Touch_InfoSub: {
    fontSize: 13,
    color: '$colorGray'
  },
  FormControl_RowSm_Touch_Point: {
    width: 12,
    justifyContent: 'center',
    marginLeft: 8,
  },
  FormControl_RowSm_Touch_PointImg: {
    width: 12,
    height: 24,
  },
  FormControl_RowSm_Botton: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 70,
  },
  FormControl_RowSm_BottonDone: {
    backgroundColor: '$colorPrimary',
    borderColor: '$colorPrimary',
    borderWidth: 1,
    borderRadius: 4,
    height: 28,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    minWidth: 90,
  },
  FormControl_RowSm_BottonDone_Text: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 13,
  },
  FormControl_RowSm_BottonCancel: {
    backgroundColor: 'transparent',
    borderColor: '$colorPrimary',
    borderWidth: 1,
    borderRadius: 4,
    height: 28,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 90,
  },
  FormControl_RowSm_BottonCancel_Text: {
    color: '$colorPrimary',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 13,
  },
  FormControl_RowSm_Line: {
    height: LINE_WIDTH,
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    marginLeft: 70,
  },
  //QRCode
  noCamera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCamera_Text: {
    color: '#fff',
    textAlign: 'center',
  },
  QRCode: {
    flex: 1,
  },
  camera: {
    flex: 1
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 0,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  },
  rectangleBorderTopLeft: {
    borderLeftColor: '#fff',
    borderLeftWidth: 2,
    borderTopColor: '#fff',
    borderTopWidth: 2,
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  rectangleBorderTopRight: {
    borderRightColor: '#fff',
    borderRightWidth: 2,
    borderTopColor: '#fff',
    borderTopWidth: 2,
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  rectangleBorderBottomLeft: {
    borderLeftColor: '#fff',
    borderLeftWidth: 2,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  rectangleBorderBottomRight: {
    borderRightColor: '#fff',
    borderRightWidth: 2,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  // Marker_Container
  Marker_Box: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  Marker_Box_Inner: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: LINE_WIDTH,
    width: 250,
    padding: 8,
    flex: 1,
    position: 'absolute',
    left: -94,
    top: -86,
  },
  Marker_Container: {
    backgroundColor: '#fff',
    width: 240,
    padding: 2,
    minHeight: 56,
  },
  Marker_Container_Touch: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  Marker_Container_Avatar: {
    width: 56,
    height: 56,
    marginRight: 10,
  },
  Marker_Container_Avatar_Img: {
    width: 56,
    height: 56,
  },
  Marker_Container_Name: {
    flex: 1,
    justifyContent: 'center',
  },
  Marker_Container_Name_Text: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  Marker_Container_Name_Sub: {
    fontSize: 12,
    color: '$colorGray',
  },
  //Update
  updateProfile: {
    backgroundColor: '#fff',
    borderTopColor: '$colorLine',
    borderBottomColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
    borderBottomWidth: LINE_WIDTH,
    padding: 10,
    marginBottom: 10,
  },
  updateProfile_Touch: {
    minHeight: 50,
    justifyContent: 'center',
  },
  updateProfile_Icon: {
    position: 'absolute',
    top: 0,
    left: 20,
  },
  updateProfile_Content: {
    paddingLeft: 90,
  },
  updateProfile_Title: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  updateProfile_Sub: {
    fontSize: 12,
    color: '$colorGray',
  },
  //Spin banner
  BannerSpin: {
    backgroundColor: '#FF9F00',
    borderTopColor: '$colorLine',
    borderBottomColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
    borderBottomWidth: LINE_WIDTH,
    padding: 0,
    marginBottom: 10,
  },
  BannerSpin_Touch: {
    minHeight: 72,
    justifyContent: 'center',
  },
  BannerSpin_Icon: {
    position: 'absolute',
    top: 0,
    left: 5,
  },
  BannerSpin_IconLeft: {
    position: 'absolute',
    top: 0,
    left: -36,
    width: 72,
    height: 72,
    resizeMode: 'cover',
  },
  BannerSpin_IconRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 114,
    height: 72,
    resizeMode: 'cover',
  },
  BannerSpin_Content: {
    paddingLeft: 54,
    paddingRight: 56,
  },
  BannerSpin_Title: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  BannerSpin_Sub: {
    fontSize: 12,
    //color: '$colorGray',
    color: 'rgba(255,255,255,1)',
    backgroundColor: 'transparent',
  },
  // Personal
  Personal: {},
  Personal_Header: {
    marginBottom: 10,
  },
  Personal_Header_Info: {
    marginBottom: 15,
  },
  Personal_Header_InfoBg: {
    backgroundColor: '$colorPrimary',
    height: 40,
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  Personal_Header_InfoCover: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  Personal_Header_InfoCover_Img: {
    width: 80,
    height: 80,
    backgroundColor: 'transparent',
    borderRadius: 40,
    borderColor: '#fff',
    borderWidth: 2,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  Personal_Header_InfoCover_Title: {
    fontSize: 21,
    textAlign: 'center',
    fontWeight: '500',
  },
  Personal_Header_InfoCover_Sub: {
    fontSize: 12,
    textAlign: 'center',
  },
  Personal_Header_Buttom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 30,
    marginRight: 30,
  },
  Personal_Header_ButtomTouch: {
    flex: 1 / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Personal_Header_ButtomImg: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  Personal_Header_ButtomText: {
    fontSize: 12,
    color: '$colorPrimary',
    fontWeight: '500',
    textAlign: 'center',
  },
  // My Personal
  MyPersonal: {},
  MyPersonal_Header: {
    marginBottom: 10,
  },
  MyPersonal_Header_Info: {
    marginBottom: 15,
  },
  MyPersonal_Header_InfoBg: {
    backgroundColor: '$colorPrimary',
    height: 40,
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  MyPersonal_Header_InfoCover: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  MyPersonal_Header_InfoCover_Img: {
    width: 80,
    height: 80,
    backgroundColor: 'transparent',
    borderRadius: 40,
    borderColor: '#fff',
    borderWidth: 2,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  MyPersonal_Header_InfoCover_Title: {
    fontSize: 21,
    textAlign: 'center',
    fontWeight: '500',
    color: '#fff',
  },
  MyPersonal_Header_InfoCover_Sub: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
  },
  Personal_Header_Info_Vip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Personal_Vip: {
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    paddingLeft: 4,
    paddingRight: 4,
    height: 14,
  },
  Personal_Vip1: {
    backgroundColor: '#FF4848'
  },
  Personal_Vip2: {
    backgroundColor: '#BD10E0'
  },
  Personal_Vip3: {
    backgroundColor: '#FF9600'
  },
  Personal_Vip_Title: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
    letterSpacing: -0.21,
    backgroundColor: 'transparent',
  },
  MyPersonal_Header_Buttom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 30,
    marginRight: 30,
  },
  MyPersonal_Header_ButtomTouch: {
    flex: 1 / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MyPersonal_Header_ButtomImg: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  MyPersonal_Header_ButtomText: {
    fontSize: 12,
    color: '$colorPrimary',
    fontWeight: '500',
    textAlign: 'center',
  },

  // Personal Popup
  popupPersonal_Dialog: {
    width: width - 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
  },
  popupPersonal_Body: {
  },
  popupPersonal_Body_Form: {
  },
  popupPersonal: {},
  popupPersonal_Header: {
    marginBottom: 10,
  },
  popupPersonal_Header_Info: {
    marginBottom: 15,
  },
  popupPersonal_Header_InfoBg: {
    backgroundColor: '$colorPrimary',
    height: 80,
    width: width - 60,
    top: 0,
    left: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  popupPersonal_Header_InfoCover: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: -40,
  },
  popupPersonal_Header_InfoCover_Img: {
    width: 80,
    height: 80,
    backgroundColor: 'transparent',
    borderRadius: 40,
    borderColor: '#fff',
    borderWidth: 2,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  popupPersonal_Header_InfoCover_Title: {
    fontSize: 21,
    textAlign: 'center',
    fontWeight: '500',
  },
  popupPersonal_Header_InfoCover_Sub: {
    fontSize: 12,
    textAlign: 'center',
  },
  popupPersonal_Header_Buttom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 60,
    marginRight: 60,
  },
  popupPersonal_Header_ButtomTouch: {
    flex: 1 / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupPersonal_Header_ButtomImg: {
    width: 50,
    height: 50,
  },
  popupPersonal_Header_ButtomText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  // View ComingSoom
  ComingSoom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  ComingSoom_Img: {
    width: 120,
    height: 124,
    marginBottom: 24,
  },
  ComingSoom_Title: {
    color: '$colorText',
    fontSize: 21,
    marginBottom: 4,
    textAlign: 'center',
  },
  ComingSoom_TitleSub: {
    color: '$colorText',
    fontSize: 15,
    textAlign: 'center',
  },

  // Line Header
  LineHeader: {
    backgroundColor: '#EFEFF4',
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    borderTopColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
    minHeight: 15,
  },
  // View Banner
  ViewBanner: {
    marginBottom: 15,
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    borderTopColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
  },
  ViewBanner_Inner: {
    width: width,
    height: 60,
  },
  ViewBanner_Item: {
  },
  ViewBanner_Touch: {
    flex: 1,
  },
  ViewBanner_ItemImg: {
    height: 60,
    width: width,
    backgroundColor: 'rgba(255,255,255,1)',
    resizeMode: 'cover',
  },
  // View Ads
  lineRow: {
    marginLeft: 15,
    width: null,
    height: 1,
    borderTopColor: '#3E3E3E',
    borderTopWidth: LINE_WIDTH,
  },
  ViewAds: {
    flex: 1,
    marginTop: 15,
  },
  ViewAds_Title: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  ViewAds_TitleTouchLeft: {
    flex: 2 / 3,
  },
  ViewAds_TitleTouchRight: {
    flex: 1 / 3,
  },
  ViewAds_TitleName: {
    fontSize: 17,
    fontWeight: '500',
    color: '#fff',
    letterSpacing: -1,
  },
  ViewAds_TitleMore: {
    fontSize: 11,
    fontWeight: '500',
    color: '#A4A4A4',
    textAlign: 'right',
  },
  ViewAds_List: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 15,
    paddingBottom: 15,
  },
  ViewAds_ListScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ViewAds_ListScroll_Inner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 15,
  },
  ViewAds_ListTouch: {
    width: 205,
    height: 100,
    marginLeft: 15,
  },
  ViewAds_ListImg: {
    width: 205,
    height: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  // View Slider
  ViewSlider: {
    marginBottom: 15,
  },
  ViewSlider_Title: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  ViewSlider_TitleTouchLeft: {
    flex: 2 / 3,
  },
  ViewSlider_TitleTouchRight: {
    flex: 1 / 3,
  },
  ViewSlider_TitleName: {
    fontSize: 17,
    fontWeight: '500',
    color: '#fff',
    letterSpacing: -1,
  },
  ViewSlider_TitleMore: {
    fontSize: 11,
    fontWeight: '500',
    color: '#A4A4A4',
    textAlign: 'right',
  },
  ViewSlider_List: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ViewSlider_ListScroll: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ViewSlider_ListScroll_Inner: {
    marginRight: 15,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ViewSlider_ListTouch: {
    width: 94,
    marginLeft: 15,
  },
  ViewSlider_ListImg: {
    width: 94,
    height: 142,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  ViewSlider_ListName: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  ViewSlider_ListName_VN: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 2,
  },
  ViewSlider_ListName_EN: {
    fontSize: 12,
    color: '#A4A4A4'
  },


  // View List Header
  ViewListHeader: {
    backgroundColor: '#fff',
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    marginBottom: 10,
    height: 120,
  },
  ViewListHeader_Bottom: {
    height: 64,
  },
  ViewListHeader_Title: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  ViewListHeader_TitleTouchLeft: {
    flex: 2 / 3,
  },
  ViewListHeader_TitleTouchRight: {
    flex: 1 / 3,
  },
  ViewListHeader_TitleName: {
    fontSize: 17,
    fontWeight: '500',
    color: '#fff',
    letterSpacing: -1,
  },
  ViewListHeader_TitleMore: {
    fontSize: 11,
    fontWeight: '500',
    color: '#A4A4A4',
    textAlign: 'right',
  },
  ViewListHeader_List: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '$colorPrimary',
    justifyContent: 'center',
  },
  ViewListHeader_ListScroll: {
    width: width - 20,
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: 10,
    position: 'absolute',
    left: 10,
    top: 0,
  },
  ViewListHeader_ListScroll_Inner: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  ViewListHeader_ListScroll_Row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '$colorLine',
    borderBottomWidth: 0,
  },
  ViewListHeader_ListTouch: {
    flex: 1 / 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: '$colorLine',
    borderLeftWidth: 0,

  },
  'ViewListHeader_ListTouch:first-child': {
    borderLeftWidth: 0,
  },
  ViewListHeader_ListTouch_Inner: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',

  },
  ViewListHeader_ListIcon: {
    backgroundColor: '#fff',
    borderRadius: 4,
    width: width / 4 - 20,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: { height: 1, width: 0 },
    borderColor: 'rgba(0,0,0,0.06)',
    borderWidth: 1,
  },
  ViewListHeader_ListImg: {
    width: 50,
    //width: '33.33333333%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  ViewListHeader_ListName: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: null
  },
  ViewListHeader_ListName_Title: {
    fontSize: 12,
    marginBottom: 12,
    fontWeight: '500',
    textAlign: 'center',
    width: null,
    backgroundColor: 'transparent',
  },
  // View Account
  ViewAccount: {
  },
  // View List
  ViewList: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    borderTopColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
  },
  ViewListCol: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderTopColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
  },
  ViewList_Title: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  ViewList_TitleTouchLeft: {
    flex: 2 / 3,
  },
  ViewList_TitleTouchRight: {
    flex: 1 / 3,
  },
  ViewList_TitleName: {
    fontSize: 17,
    fontWeight: '500',
    color: '#fff',
    letterSpacing: -1,
  },
  ViewList_TitleMore: {
    fontSize: 11,
    fontWeight: '500',
    color: '#A4A4A4',
    textAlign: 'right',
  },
  ViewList_List: {
    width: width,
    flexDirection: 'row',
  },
  ViewList_ListScroll: {
    width: width,
    flexDirection: 'column'
  },
  ViewList_ListScroll_Inner: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  ViewList_ListScroll_InnerCol: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewList_ListScroll_Row: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
  },
  ViewList_ListScroll_RowCol: {
    marginTop: 0,
    marginBottom: 0,
    flexDirection: 'row',
  },
  ViewList_ListTouch: {
    width: (width - 20) / 4,
    alignItems: 'center',
  },
  ViewList_ListTouch2Col: {
    width: width / 2,
    borderLeftWidth: LINE_WIDTH,
    borderLeftColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    borderBottomColor: '$colorLine',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  ViewList_ListTouch3Col: {
    width: width / 3,
    borderLeftWidth: LINE_WIDTH,
    borderLeftColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    borderBottomColor: '$colorLine',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  ViewList_ListTouch4Col: {
    width: width / 4,
    borderLeftWidth: LINE_WIDTH,
    borderLeftColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    borderBottomColor: '$colorLine',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  'ViewList_ListTouch:first-child': {
    borderLeftWidth: 0,
  },
  ViewList_Alert: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  ViewList_Alert_Img: {
    width: 45,
    height: 45,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  ViewList_Alert_Text: {
    width: 45,
    textAlign: 'center',
    color: '#fff',
    transform: [{ rotate: '45deg' }],
    backgroundColor: 'transparent',
    fontSize: 12,
    fontWeight: '600',
    position: 'absolute',
    top: 8,
    right: -6,
    letterSpacing: -0.42,
  },

  ViewList_Badge: {
    width: (width - 20) / 4,
    position: 'absolute',
    top: -5,
    right: 0,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewList_Badge_P3: {
    right: (width - 20) / 4
  },
  ViewList_Badge2Col: {
    width: width / 2,
    position: 'absolute',
    top: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewList_Badge3Col: {
    width: width / 3,
  },
  ViewList_Badge4Col: {
    width: width / 4,
  },
  ViewList_Badge_Inner: {
    width: 60,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewList_Badge_Img: {
    width: 60,
    height: 20,
  },
  ViewList_Badge_Text: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
    lineHeight: 16,
    width: 60,
  },
  //Alert
  Alert: {
    margin: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#f2dede',
    borderWidth: 1,
    borderColor: '#ebcccc',
    borderRadius: 5,
  },
  Alert_Title: {
    fontWeight: '600',
    color: '#a94442',
    fontSize: 15,
    marginBottom: 2,
  },
  Alert_Content: {
    color: '#a94442',
    fontSize: 13,
  },
  AlertFull: {
    padding: 6,
    backgroundColor: '#468B39',
  },
  AlertFull_Title: {
    color: '#F8E71C',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //QuickAction
  QuickAction: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 80,
    height: 80,
  },
  QuickAction_Touch: {},
  QuickAction_Img: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  // Badge
  Tutorial_Badge: {
    width: 100,
    position: 'absolute',
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Tutorial_TopRight: {
    top: 84,
    right: 17,
  },
  Tutorial_Badge2Col: {
    width: width / 2,
    position: 'absolute',
    top: 5,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Tutorial_Badge3Col: {
    width: width / 3,
  },
  Tutorial_Badge4Col: {
    width: width / 4,
  },
  Tutorial_Badge_Inner: {
    width: 100,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Tutorial_Badge_Img: {
    width: 100,
    height: 28,
  },
  Tutorial_Badge_Text: {
    position: 'absolute',
    top: 3,
    backgroundColor: 'transparent',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
    lineHeight: 24,
    width: 100,

  },

  ViewList_ListTouch_Inner: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewList_ListImg: {
    width: 50,
    //width: '33.33333333%',
    height: 50,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  ViewList_ListImgCard: {
    width: 90,
    //width: '33.33333333%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  ViewList_ListName: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: null,
  },
  ViewList_ListName_Title: {
    fontSize: 12,
    fontWeight: '500',
    color: '$colorText',
    textAlign: 'center',
    width: null,
    backgroundColor: 'transparent',
  },
  ViewList_ListName_Sub: {
    fontSize: 12,
    color: '$colorGray',
    textAlign: 'center',
    width: null,
  },

  // View List Bank
  ViewBank: {
    flex: 1,
  },
  ViewBank_Title: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  ViewBank_TitleTouchLeft: {
    flex: 2 / 3,
  },
  ViewBank_TitleTouchRight: {
    flex: 1 / 3,
  },
  ViewBank_TitleName: {
    fontSize: 17,
    fontWeight: '500',
    color: '#fff',
    letterSpacing: -1,
  },
  ViewBank_TitleMore: {
    fontSize: 11,
    fontWeight: '500',
    color: '#A4A4A4',
    textAlign: 'right',
  },
  ViewBank_List: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  ViewBank_ListScroll: {
    flexWrap: 'wrap',
  },
  ViewBank_ListScroll_Inner: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 8,
    marginLeft: 4,
    marginRight: 4,
  },
  ViewBank_ListTouch: {
    width: (width - 8) / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  ViewBank_ListTouch_Inner: {
    width: (width - 8) / 3 - 8,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewBank_ListPic: {
    width: (width - 8) / 3 - 8,
    //width: '33.33333333%',
    height: 80,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '$colorLine',
    borderRadius: 3,
  },
  ViewBank_ListImg: {
    width: 80,
    height: 60,
    resizeMode: 'cover',
  },
  ViewBank_ListName: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: (width - 8) / 3 - 8,
  },
  ViewBank_ListName_VN: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 2,
    width: (width - 8) / 3 - 8,
  },
  ViewBank_ListName_EN: {
    fontSize: 12,
    color: '#A4A4A4',
    width: (width - 8) / 3 - 8,
  },

  // View Explore Category
  ViewExploreCategory: {
    backgroundColor: '$colorPrimary',
    height: 56,
  },
  ViewExploreCategory_Scroll: {},
  ViewExploreCategory_Touch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 68,
  },
  ViewExploreCategory_TouchActive: {
    borderBottomColor: '#F8E71C',
    borderBottomWidth: 2,
  },
  ViewExploreCategory_Img: {
    marginBottom: 2,
    width: 49,
    height: 32,
  },
  ViewExploreCategory_Text: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  // ViewGames
  ViewGames: {
    flex: 1,
  },
  ViewGames_Inner: {
    flex: 1,
  },
  ViewGames_Group: {},
  ViewGames_Touch: {
    //flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  ViewGames_Touch_Thumb: {
    width: 60,
    height: 60,
    marginLeft: 15,
  },
  ViewGames_Touch_ThumbImg: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 14,
  },
  ViewGames_Touch_Info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    //flexDirection: 'row',
  },
  ViewGames_Touch_InfoTitle: {
    fontSize: 17,
    letterSpacing: -0.41,
    marginBottom: 4,
    fontWeight: '500',
  },
  ViewGames_Touch_InfoSub: {
    fontSize: 13,
    color: '$colorGray'
  },
  ViewGames_Touch_Desc: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  ViewGames_Touch_DescInfo: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.21,
  },
  ViewGames_Event: {
    backgroundColor: 'red',
    padding: 15,
  },
  ViewGames_Event_Inner: {},
  ViewGames_Event_Text: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
  },
  ViewGames_Touch_Badge: {
    minWidth: 50,
    justifyContent: 'center',
    marginLeft: 8,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    paddingLeft: 8,
    paddingRight: 8,
  },
  ViewGames_Touch_Badge_Text: {
    fontSize: 11,
    lineHeight: 16,
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  ViewGames_Touch_Point: {
    width: 12,
    justifyContent: 'center',
    marginLeft: 8,
  },
  ViewGames_Touch_PointImg: {
    width: 12,
    height: 24,
  },
  ViewGames_Touch_Price: {
    marginLeft: 8,
    borderRadius: 16,
    //borderWidth: 1,
    //borderColor: '$colorPrimary',
    paddingLeft: 8,
    paddingRight: 8,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F1F6',
  },
  ViewGames_Touch_Price_Txt: {
    color: '$colorPrimary',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    fontSize: 13,
  },
  ViewGames_Line: {
    height: LINE_WIDTH,
    flex: 1,
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    marginLeft: 90,
  },
  ViewGames_LineFull: {
    height: LINE_WIDTH,
    flex: 1,
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    marginLeft: 15,
  },
  // ViewService
  ViewService: {
    flex: 1,
    borderTopColor: '$colorLine',
    borderTopWidth: LINE_WIDTH,
  },
  ViewService_Inner: {
    flex: 1,
  },
  ViewService_Group: {},
  ViewService_Touch: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  ViewService_Touch_Thumb: {
    width: 40,
    height: 40,
    marginLeft: 20,
  },
  ViewService_Touch_ThumbImg: {
    width: 40,
    height: 40,
    //backgroundColor: 'rgba(0,0,0,0.1)',
    resizeMode: 'contain',
  },
  ViewService_Touch_Info: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    //flexDirection: 'row',
  },
  ViewService_Touch_InfoTitle: {
    fontSize: 17,
    letterSpacing: -0.41,
    marginBottom: 4,
  },
  ViewService_Touch_InfoSub: {
    fontSize: 13,
    color: '$colorGray'
  },
  ViewService_Event: {
    backgroundColor: 'red',
    padding: 15,
  },
  ViewService_Event_Inner: {},
  ViewService_Event_Text: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
  },
  ViewService_Touch_Badge: {
    minWidth: 50,
    justifyContent: 'center',
    marginLeft: 8,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    paddingLeft: 8,
    paddingRight: 8,
  },
  ViewService_Touch_Badge_Text: {
    fontSize: 11,
    lineHeight: 16,
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  ViewService_Touch_Point: {
    width: 12,
    justifyContent: 'center',
    marginLeft: 8,
  },
  ViewService_Touch_PointImg: {
    width: 12,
    height: 24,
  },
  ViewService_Touch_Price: {
    marginLeft: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '$colorPrimary',
    paddingLeft: 8,
    paddingRight: 8,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewService_Touch_Price_Txt: {
    color: '$colorPrimary',
    fontWeight: '600',
    backgroundColor: 'transparent',
    fontSize: 12,
  },
  ViewService_Line: {
    height: LINE_WIDTH,
    flex: 1,
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    marginLeft: 90,
  },
  // ViewBetting
  ViewBetting: {
    flex: 1,
  },
  ViewBetting_Inner: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15,
  },
  ViewBetting_Header: {
    alignItems: 'center',
    backgroundColor: '$colorPrimary',
    paddingBottom: 15,
  },
  ViewBetting_Item: {
    marginBottom: 15,
  },
  ViewBetting_Group: {
    width: width - 30,
    height: 120,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: { height: 1, width: 0 },
    borderColor: '$colorLine',
    borderWidth: LINE_WIDTH,
  },
  ViewBetting_Group_Room: {
    width: width - 30,
    height: 120,
    shadowColor: 'black',
    shadowRadius: 4,
  },
  ViewBetting_Group_Header: {
    backgroundColor: '$colorPrimary',
    width: width - 30,
    height: 40,
    borderRadius: 4,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  ViewBetting_Group_Body: {
    width: width - 30,
    height: 95,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 25,
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ViewBetting_Group_Corner: {
    width: 160,
    height: 20,
  },
  ViewBetting_Group_Content: {

  },
  ViewBetting_Nums: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  ViewBetting_Nums_Title1: {
    backgroundColor: 'transparent',
    fontSize: 10,
    fontWeight: '500',
    color: '#fff',
    letterSpacing: -0.24,
  },
  ViewBetting_Nums_Title2: {
    backgroundColor: 'transparent',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: -0.48,
  },
  ViewBetting_Touch: {
    flex: 1,
  },
  ViewBetting_Info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 3,
  },
  ViewBetting_Info_Start: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  ViewBetting_Info_Start_Nums: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewBetting_Info_Start_Nums_Title: {
    fontSize: 32,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  ViewBetting_Info_Start_VS: {
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewBetting_Info_Start_Game: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.29,
    color: '$colorGray',
    backgroundColor: 'transparent',
    marginTop: 8,
  },
  ViewBetting_Info_Team: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewBetting_Info_TeamA: {},
  ViewBetting_Info_TeamB: {},
  ViewBetting_Info_Team_Avatar: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginBottom: 2,
  },
  ViewBetting_Info_Team_Name: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: -0.34,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  ViewBetting_Team: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 15,
  },
  ViewBetting_TeamA: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: 1/2,
    borderRightWidth: LINE_WIDTH,
    borderRightColor: '#EBEBEB',
  },
  ViewBetting_TeamB: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: 1/2,
    borderLeftWidth: LINE_WIDTH,
    borderLeftColor: '#EBEBEB',
  },

  ViewBetting_Team_Item: {
    paddingLeft: 30,
    height: 60,
    justifyContent: 'center',
  },
  ViewBetting_Team_Status: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: 16,
    left: 6,
  },
  ViewBetting_Team_Phone: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: -0.25,
  },
  ViewBetting_Team_Name: {
    fontSize: 12,
    color: '$colorGray',
    letterSpacing: -0.25,
  },
  ViewBetting_Footer: {
    padding: 15,
  },
  ViewBetting_Footer_Touch: {
    backgroundColor: '$colorPrimary',
    width: width-30,
    height: 50,
    borderRadius: 4,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewBetting_Footer_TouchCancel: {
    backgroundColor: '#E53935',
  },
  ViewBetting_Footer_TouchDone: {
    backgroundColor: '$colorPrimary',
  },
  ViewBetting_Footer_Touch_Title: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  ViewBetting_Change: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 60,
    position: 'absolute',
    left: 0,
    top: -26,
  },
  ViewBetting_Change_Touch: {
    width: 60,
    height: 60,
  },
  ViewBetting_Change_Img: {
    width: 60,
    height: 60,
  },
  //Badge
  Badge_New: {
    backgroundColor: 'red',
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 3,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    position: 'absolute',
    top: 5,
    right: 0,
  },
  Badge_New_Txt: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 14,
  },
  // View Explore
  ViewExplore: {
    flex: 1,
    backgroundColor: '#fff'
  },
  ViewExplore_Row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  ViewExplore_Cover: {
    width: 100,
    height: 100,
  },
  ViewExplore_CoverImg: {
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderColor: 'rgba(0,0,0,0.06)',
    borderWidth: LINE_WIDTH,
    resizeMode: 'cover',
  },
  ViewExplore_Info: {
    flex: 1,
    marginLeft: 10,
  },
  ViewExplore_InfoSale: {
    backgroundColor: '#7ED321',
    borderRadius: 3,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 3,
    paddingRight: 3,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  ViewExplore_InfoSaleText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    letterSpacing: -LINE_WIDTH,
  },
  ViewExplore_InfoSaleTextSub: {
    fontSize: 12,
    color: '#fff'
  },
  ViewExplore_InfoTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    marginRight: 44,
    backgroundColor: 'transparent',
  },
  ViewExplore_InfoCategory: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  ViewExplore_InfoAddress: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ViewExplore_InfoAddress_Text: {
    fontSize: 12,
    color: '#808080',
    flex: 3 / 4,
  },
  ViewExplore_InfoAddress_Location: {
    fontSize: 12,
    color: '$colorPrimary',
    justifyContent: 'flex-end',
    textAlign: 'right',
    flex: 1 / 4,
  },
  ViewExplore_InfoRate: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  ViewExplore_InfoRate_Img: {
    width: 13,
    height: 13,
    marginRight: 2,
  },
  ViewExplore_InfoRate_Text: {
    fontSize: 12,
    color: '#808080',
    marginLeft: 4,
  },
  // View Explore Detail
  ViewExploreDetail: {
    backgroundColor: '#fff',
    minHeight: '100%',
    height: null,
  },
  ViewExploreDetail_Row: {
  },
  ViewExploreDetail_Cover: {
    width: 100,
    height: 100,
  },
  ViewExploreDetail_CoverImg: {
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderColor: 'rgba(0,0,0,0.06)',
    borderWidth: LINE_WIDTH,
    resizeMode: 'cover',
  },
  ViewExploreDetail_Info: {
    flex: 1,
    margin: 15,
  },
  ViewExploreDetail_InfoSale: {
    backgroundColor: 'rgba(254,63,53,0.9)',
    height: 80,
    width: 80,
    borderRadius: 80,
    position: 'absolute',
    top: (width * 0.5626) / 2 - 40,
    left: -40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
  },
  ViewExploreDetail_InfoSaleText: {
    textAlign: 'center',
    fontSize: 32,
    color: '#fff',
    fontWeight: '600',
    letterSpacing: -LINE_WIDTH,
    backgroundColor: 'transparent'
  },
  ViewExploreDetail_InfoSaleTextSub: {
    fontSize: 17,
    color: '#fff'
  },
  ViewExploreDetail_InfoTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  ViewExploreDetail_InfoCategory: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  ViewExploreDetail_InfoAddress: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0,
  },
  ViewExploreDetail_InfoAddress_Text: {
    fontSize: 12,
    color: '#808080',
    flexWrap: 'wrap',
    textAlign: 'center',
    maxWidth: width - 120,
  },
  ViewExploreDetail_InfoAddress_LocationSm: {
    marginLeft: 10,
    width: 14,
    height: 14,
  },
  ViewExploreDetail_InfoAddress_Location: {
    fontSize: 12,
    color: '$colorPrimary',

  },
  ViewExploreDetail_InfoRate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewExploreDetail_InfoRate_Img: {
    width: 13,
    height: 13,
    marginRight: 2,
  },

  ViewExploreDetail_InfoRate_Text: {
    fontSize: 12,
    color: '#808080',
    marginLeft: 4,
  },
  ViewExploreDetail_Buttom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  ViewExploreDetail_ButtomTouch: {
    flex: 1 / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewExploreDetail_ButtomImg: {
    width: 36,
    height: 36,
    marginBottom: 8,
  },
  ViewExploreDetail_ButtomText: {
    fontSize: 11,
    color: '$colorPrimary',
    fontWeight: '500',
    textAlign: 'center',
  },
  ViewExploreDetail_Content: {
    padding: 15,
  },
  ViewExploreDetail_ContentText: {
    fontSize: 14,
  },
  ViewExploreDetail_Tab: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  ViewExploreDetail_TabHeader: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: '#000',
    borderWidth: 1,
  },
  ViewExploreDetail_TabHeader_Touch: {
    flex: 1 / 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  ViewExploreDetail_TabHeader_TouchActive: {

    backgroundColor: '#000',
    borderRadius: 30,
  },
  ViewExploreDetail_TabHeader_Text: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
  },
  ViewExploreDetailTab_Content: {
    marginLeft: 15,
    marginRight: 15,
  },
  ViewExploreDetailTab_ContentText: {
    fontSize: 13,
  },
  // View Explore Detail Picture
  ViewExplore_DetailPicture: {
    margin: 0,
  },
  ViewExplore_DetailPicture_Inner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 2,
    width: width - 4,
  },
  ViewExplore_DetailPicture_Touch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (width - 4) / 3,
    height: (width - 4) / 3,
  },
  ViewExplore_DetailPicture_Img: {
    width: (width - 4) / 3 - 4,
    height: (width - 4) / 3 - 4,
    resizeMode: 'cover',
  },
  Gallery_Wrapper: {
    backgroundColor: '#fff',
    top: 0,
    right: 4,
    bottom: 0,
    left: 0,
  },
  Gallery_Slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Gallery_SlideTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Gallery_Photo: {
    width: width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Gallery_Text: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold'
  },
  Gallery_ThumbWrap: {
    marginTop: 100,
    borderWidth: 5,
    borderColor: '#000',
    flexDirection: 'row'
  },
  Gallery_Thumb: {
    width: 50,
    height: 50
  },
  // View Detail
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  ViewDetail: {
    flex: 1,
    height: height,
  },
  ViewDetailScroll: {
    flex: 1,
  },
  ViewDetail_Nav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
  },
  ViewDetail_NavBg: {
    width: null,
    height: 127,
  },
  ViewDetail_linearGradient: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    width: '100%',
  },
  ViewDetail_Cover: {
    flex: 1,
  },
  ViewDetail_CoverImg: {
    width: null,
    height: width * 0.5625,
    resizeMode: 'cover',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  ViewDetail_NavTouchLeft: {
    position: 'absolute',
    top: 20,
    left: 0,
    padding: 10,
  },
  ViewDetail_NavTouch_Img: {
    width: 24,
    height: 24,
  },
  ViewDetail_NavTouchRight: {
    position: 'absolute',
    top: 20,
    right: 0,
    padding: 10,
  },
  ViewDetail_NavTouchRight_Inner: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 12,
  },
  ViewDetail_NavTouchRight_Text: {
    color: '#FFEC00',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'right',
    letterSpacing: -0.24,

  },
  ViewDetail_CoverTouch: {
    position: 'absolute',
    top: (width * 0.5625) / 2 - 35,
    left: 0,
    right: 0,
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewDetail_CoverTouch_Img: {
    width: 70,
    height: 70,
  },
  //Header info
  headerInfo: {
    backgroundColor: '$colorPrimary',
    alignItems: 'center',
  },
  headerInfo_Inner: {
    width: width - 30,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    marginTop: 0,
    marginBottom: 5,
  },
  headerInfo_Avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '$colorPrimary',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerInfo_Ac_Img: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerInfo_Ac: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1 / 2,
  },
  headerInfo_Ac_Sub: {
    fontSize: 11,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  headerInfo_Ac_Title: {
    fontSize: 17,
    letterSpacing: -0.41,
    color: '#F8E81C',
    fontWeight: '500',
    textAlign: 'center',
  },
  // Account
  ViewAccount_Header: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewAccount_HeaderAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  ViewAccount_HeaderAvatarImg: {
    width: 70,
    height: 70,
  },
  ViewAccount_HeaderTitle: {
    fontSize: 21,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
    marginLeft: 15,
    marginRight: 15,
  },
  ViewAccount_HeaderSub: {
    fontSize: 13,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 15,
  },
  ViewAccount_HeaderButtom: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  ViewAccount_HeaderButtom_Touch: {
    flex: 1,
    borderColor: '#fff',
    borderRadius: 4,
    borderWidth: 1.5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  ViewAccount_HeaderButtom_Text: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },

  //
  ViewCashback: {
    flex: 1,
  },
  ViewCashback_Inner: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  ViewCashback_Item: {
    width: (width - 40) / 2,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderWidth: LINE_WIDTH,
    borderColor: '$colorLine',
    borderRadius: 4,
    height: 210,
  },
  ViewCashback_Touch: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  ViewCashback_Cover: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  ViewCashback_Cover_Img: {
    width: null,
    height: 100,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  ViewCashback_Logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
  },
  ViewCashback_Logo_Img: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#fff',

  },
  ViewCashback_Info: {
    padding: 5,
  },
  ViewCashback_Info_Title: {
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 4,
  },
  ViewCashback_Info_Address: {
    fontSize: 12,
    color: '#808080',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  ViewCashback_Info_Cashback: {
    fontSize: 11,
    textAlign: 'center',
    backgroundColor: '$colorPrimary',
    color: '#fff',
    padding: 4,
    fontWeight: '500',
    position: 'absolute',
    top: 10,
    left: -2,
  },
  // Cai Dat
  ViewSetting_About: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,

    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewSetting_AboutImg: {
    width: 150,
    height: 150,
  },
  ViewSetting_AboutTitle: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 15,
  },
  ViewSetting_AboutText: {
    fontSize: 13,
    color: '#A4A4A4',
    lineHeight: 18,
    textAlign: 'center',
  },
  ViewSetting_WebView: {
    flex: 1,
    flexWrap: 'wrap',
  },
  ViewSetting_Ver: {
    padding: 15,
  },
  ViewSetting_VerText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#A4A4A4'
  },
  controller_linearGradient: {
    flexWrap: 'wrap',
    width: null,
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
  },
  // Video
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#171717'
  },


  // Search
  searchBar: {
    marginTop: 0,
    height: 28,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  ViewSuggest: {

  },
  ViewSuggest_Header: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 0,
    borderBottomColor: '$colorLine',
  },
  ViewSuggest_HeaderText: {
    fontSize: 11,
    color: '#A4A4A4',
  },
  ViewSuggest_List: {},
  ViewSuggest_ListItem: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: LINE_WIDTH,
    borderTopColor: '$colorLine',
  },
  ViewSuggest_ListItem_Pic: {
    width: 21,
    height: 32,
  },
  ViewSuggest_ListItem_PicImg: {
    width: 21,
    height: 32,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  ViewSuggest_ListItem_Title: {
    marginLeft: 10,
  },
  ViewSuggest_ListItem_TitleText: {
    fontSize: 15,
    color: '#fff'
  },
  //Splash
  SplashScreen: {
    backgroundColor: '$colorPrimary',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  SplashScreen_Inner: {
    width: 120,
    height: 120,
  },
  SplashScreen_Img: {
    width: 120,
    height: 120,
  },
  //Banner
  BannerScreen: {
    backgroundColor: '#000',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 450,
  },
  BannerScreen_Touch: {
    width: 300,
    height: 445,
    padding: 4,
    borderColor: '#fff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BannerScreen_Img: {
    width: 290,
    height: 435,
    resizeMode: 'contain',
  },
  //Close
  CloseScreen: {
    width: 44,
    height: 44,
    position: 'absolute',
    left: 10,
    top: 20,
  },
  CloseScreen_Touch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CloseScreen_Img: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
  },
  // Spin
  SpinScreen: {
    flex: 1,
  },
  SpinScreen_Inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Spin_Bg: {
    width: width,
    height: height,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  SpinScreen_WebView: {
    width: width,
    height: height,
    backgroundColor: 'transparent',
  },
  Spin_Time: {
    width: width,
    height: 36,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Spin_Time_Img: {
    width: width,
    height: 45,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  Spin_Time_Txt: {
    textAlign: 'center',
    color: '#F8E81C',
    fontWeight: 'bold',
    fontSize: 17,
    backgroundColor: 'transparent',
    textShadowColor:'rgba(0,0,0,0.8)',
    textShadowOffset:{width: 0, height: 1},
    textShadowRadius:1,
  },
  Spin_Box: {
    width: 292,
    height: 292,
  },
  Spin_Border: {
    width: 292,
    height: 292,
    position: 'absolute',
    resizeMode: 'cover',
    left: 0,
    top: 0,
  },
  Spin_Coin: {
    width: width,
    height: width,
    resizeMode: 'cover',
    position: 'absolute',
    top: height/2-width/2,
    left: 0,
  },
  Spin_Outer: {
    width: width,
    height: width,
    resizeMode: 'cover',
    position: 'absolute',
    top: height/2-width/2,
    left: 0,
    opacity: 0.5,
  },
  Spin_Light: {
    width: 292,
    height: 292,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  Spin_Cricle: {
    width: 292,
    height: 292,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Spin_Point: {
    width: 30,
    height: 44,
    position: 'absolute',
    top: -5,
    left: 292/2 - 15
  },
  Spin_Arrow: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 127,
    height: 120,
  },
  Spin_Gift: {
    width: 292,
    height: 292,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  Spin_Gift_View: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  Spin_Gift_Img: {
    width: 60,
    height: 60,
    position: 'absolute',
    resizeMode: 'cover',
  },
  Spin_Gift_Txt: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: -0.21,
    backgroundColor: 'transparent',
    textShadowColor:'rgba(0,0,0,0.8)',
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:1,
  },
  Spin_Gift_1: {
    right:80,
    top: 35,
    transform: [{ rotate: '-245deg'}]
  },
  Spin_Gift_2: {
    right: 35,
    top: 80,
    transform: [{ rotate: '-205deg'}]
  },
  Spin_Gift_3: {
    right: 33,
    top: 150,
    transform: [{ rotate: '-160deg'}]
  },
  Spin_Gift_4: {
    right: 80,
    top: 197,
    transform: [{ rotate: '-110deg'}]
  },
  Spin_Gift_5: {
    left: 80,
    top: 197,
    transform: [{ rotate: '-65deg'}]
  },
  Spin_Gift_6: {
    left: 33,
    top: 150,
    transform: [{ rotate: '-20deg'}]
  },
  Spin_Gift_7: {
    left: 35,
    top: 80,
    transform: [{ rotate: '25deg'}]
  },
  Spin_Gift_8: {
    left: 80,
    top: 35,
    transform: [{ rotate: '65deg'}]
  },
  Spin_Btn: {
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 292,
    height: 292,
  },
  Spin_Btn_Touch: {
    width: 125,
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Spin_Btn_Img: {
    width: 125,
    height: 125,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  Spin_Btn_Txt: {
    width: 125,
    height: 125,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  Spin_Btn_Nums_Note: {
    textAlign: 'center',
    color: '#F8E81C',
    fontWeight: 'bold',
    fontSize: 13,
    backgroundColor: 'transparent',
    textShadowColor:'rgba(0,0,0,0.8)',
    textShadowOffset:{width: 0, height: 1},
    textShadowRadius:1,
    marginTop: -5,
  },
  Spin_Btn_Nums_Title: {
    textAlign: 'center',
    color: '#F8E81C',
    fontWeight: 'bold',
    fontSize: 36,
    backgroundColor: 'transparent',
    textShadowColor:'rgba(0,0,0,0.8)',
    textShadowOffset:{width: 0, height: 1},
    textShadowRadius:1,
    marginTop: -10,
  },
  Spin_Play: {
    height: 77,
    margin: 0,
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
  },
  Spin_Play_Inner: {},
  Spin_Play_Touch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Spin_Play_Img: {
    width: 170,
    height: 77,
  },

  Spin_Header: {
    margin: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: width,
    height: height,
  },
  Spin_Header_Gradient: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: width,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  Spin_Header_Left: {
    position: 'absolute',
    top: 5,
    left: 0,
    width: 70,
  },
  Spin_Header_Right: {
    position: 'absolute',
    top: 5,
    right: 0,
    width: 70,
  },
  Spin_Header_Top: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 70,
  },
  Spin_Header_Bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: width,
    height: 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Spin_Header_Touch: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Spin_Header_Top_Touch: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Spin_Header_Bottom_Touch: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  Spin_Header_Img: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
  },
  Spin_Header_Txt: {
    textAlign: 'center',
    color: '#F8E81C',
    fontWeight: 'bold',
    fontSize: 13,
    backgroundColor: 'transparent',
    textShadowColor:'rgba(0,0,0,0.8)',
    textShadowOffset:{width: 0, height: 1},
    textShadowRadius:1,
    marginTop: -10,
  },
  Spin_Footer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width,
  },
  Spin_Footer_Inner: {
    flexDirection: 'row',
  },
  Spin_Footer_Coin: {
    width: width,
    resizeMode: 'contain',
  },
  // News
  NewsHeader: {
    flex: 1,
  },
  NewsHeader_Inner: {
    width: width,
    height: width * 0.5625,
  },
  NewsHeader_Touch: {},
  NewsHeader_Img: {
    width: width,
    height: width * 0.5625,
    resizeMode: 'cover'
  },
  NewsHeader_Title: {
    position: 'absolute',
    bottom: 0,
    width: width,
  },
  NewsHeader_Text: {
    fontSize: 21,
    fontWeight: '500',
    color: '#fff',
    backgroundColor: 'transparent',
    width: width - 30,

  },
  NewsHeader_linearGradient: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 15,
    width: '100%',
  },
  NewsList: {
    flex: 1,
  },
  NewsList_Inner: {
    flex: 1,

  },
  NewsList_Touch: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    padding: 15,
  },
  NewsList_Thumb: {
    width: 160,
    height: 90,
    marginRight: 10,
  },
  NewsList_ThumbImg: {
    width: 160,
    height: 90,
    backgroundColor: '#e3e3e3',
    resizeMode: 'cover',
  },
  NewsList_Info: {
    flex: 1,
  },
  NewsList_InfoText: {
    fontSize: 14,
    fontWeight: '600'
  },
  NewsList_InfoTime: {
    fontSize: 12,
    color: '#9B9B9B',
    position: 'absolute',
    bottom: 0,
  },
  NewsDetail: {
    margin: 15,
  },
  NewsDetail_Inner: {
    flex: 1,
  },
  NewsDetail_Header: {
    marginBottom: 10,
  },
  NewsDetail_HeaderTitle: {
    fontSize: 21,
    fontWeight: '600',
    marginBottom: 10,
  },
  NewsDetail_HeaderTime: {
    fontSize: 12,
    color: '#9B9B9B',
  },
  NewsDetail_Content: {
    borderTopColor: '$colorLine',
    borderTopWidth: 0,
    height: "100%",
  },
  NewsDetail_ContentText: {
    fontSize: 15,
    lineHeight: 20,
    marginTop: 15,
  },
  //Intro
  IntroSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    paddingBottom: 140,
  },
  IntroSlide_Thumb: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  IntroSlide_ThumbImg: {
    width: 320,
    height: 320,
  },
  IntroSlide_Info: {
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  IntroSlide_InfoTitle: {
    color: '#fff',
    fontSize: 26,
    textAlign: 'center',
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  IntroSlide_InfoDesc: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  IntroAccept: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    height: 100,
    width: width - 60,
    position: 'absolute',
    bottom: 0,
  },
  IntroAccept_Touch: {
    flex: LINE_WIDTH,
    margin: 5,
    borderColor: '#fff',
    borderWidth: 1.5,
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IntroAccept_TouchText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  //Login
  LoginForm: {

    flex: 1,
    justifyContent: 'center',
  },
  LoginForm_Clear: {
    position: 'absolute',
    top: 10,
    right: 0,
    backgroundColor: 'transparent',
    width: 44,
    height: 44,
  },
  LoginForm_ClearIcon: {
    width: 44,
    height: 44,
  },
  LoginForm_Scroll: {
    flex: 1,
  },
  LoginForm_Inner: {
    marginTop: 60,
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    //paddingBottom: 200,
  },
  LoginForm_Logo: {

    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  LoginForm_LogoImg: {
    width: 120,
    height: 120,
  },
  LoginForm_Field: {
    marginLeft: 30,
  },
  LoginForm_FieldItem: {
    minHeight: 64,
    justifyContent: 'center',
  },
  LoginForm_FieldEnter_Active: {
    fontSize: 11,
    color: '$colorPrimary',
    marginBottom: -2,
    backgroundColor: 'transparent',
  },
  LoginForm_FieldEnter_Input: {
    borderRadius: 0,
    height: HEIGHT_INPUT,
    paddingRight: 30,
    fontSize: 17,
    width: null,
    backgroundColor: 'transparent',
  },

  LoginForm_Button: {
    left: 0,
    right: 0,
    width: '100%',
  },
  LoginForm_ButtonTouch: {
    backgroundColor: '$colorButton',
    height: 50,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginForm_ButtonTouchDisable: {
    backgroundColor: '$colorGrayLight',
    height: 50,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginForm_ButtonFacebook: {
    backgroundColor: '$colorPrimary',
    borderRadius: 5,
    padding: 13,
  },
  LoginForm_ButtonGoogle: {
    backgroundColor: '$colorPrimary',
    borderRadius: 5,
    padding: 13,
  },
  LoginForm_ButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  LoginForm_Social: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 25,
    marginRight: 25,
  },
  LoginForm_SocialTouch: {
    flex: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  LoginForm_SocialFacebook: {
    flex: 1,
    backgroundColor: '#4080ff',
    borderColor: 'rgba(255,255,255,0)',
    borderWidth: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  LoginForm_SocialGoogle: {
    flex: 1,
    backgroundColor: '#F54C2E',
    borderColor: 'rgba(255,255,255,0)',
    borderWidth: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  LoginForm_SocialImg: {
    width: 44,
    height: 44,
  },
  LoginForm_SocialText: {
    flex: 1,
    textAlign: 'left',
    color: 'rgba(255,255,255,1)',
    fontSize: 17,
    fontWeight: '500',
  },
  LoginForm_Extra: {
    //position: 'absolute',
    //bottom: 0,
    marginTop: 44,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginForm_Forgot: {
    padding: 10,
  },
  LoginForm_ForgotText: {
    fontSize: 12,
    color: '#4A4A4A',
    textAlign: 'center',
    textDecorationLine: 'underline',

  },
  LoginForm_Read: {
    fontSize: 12,
    color: '#9B9B9B',
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  LoginForm_ReadNone: {
    marginRight: 3,
  },
  LoginForm_ReadUnderline: {
    textDecorationLine: 'underline',
  },
  LoginForm_PressRegister: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  LoginForm_PressRegister_Info: {
    fontSize: 12,
    color: '#4A4A4A',
    marginRight: 5,
  },
  LoginForm_PressRegister_Btn: {
    fontSize: 12,
    fontWeight: '500',
    color: '$colorPrimary',
    textDecorationLine: 'underline',
  },
  LoginForm_Line: {
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    height: LINE_WIDTH,
  },
  // Update
  UpdateForm: {
  },
  UpdateForm_Inner: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  UpdateForm_FieldNone: {
    width: width - 60,
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,

  },
  UpdateForm_FieldTitle: {
    marginBottom: 10,
  },
  UpdateForm_FieldTitle_Text: {
    fontSize: 21,
    fontWeight: '600',
    textAlign: 'center',
  },
  UpdateForm_FieldInfo: {
    marginBottom: 15,
  },
  UpdateForm_FieldInfo_Text: {
    fontSize: 14,
    textAlign: 'center',
  },
  UpdateForm_FieldEnter: {
    marginBottom: 0,
    borderColor: '$colorLine',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  UpdateForm_FieldEnter_Input: {
    borderRadius: 0,
    height: HEIGHT_INPUT_BORDER,
    paddingRight: 30,
    fontSize: 17,
    width: null,
  },
  // Register
  RegisterForm: {
    flex: 1,
  },
  RegisterForm_Scroll: {
    flex: 1,
  },
  Input_Clear: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
    width: 44,
    height: 44,
  },
  Input_ClearIcon: {
    width: 44,
    height: 44,
  },
  RegisterForm_Inner: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  RegisterForm_Field: {
    width: '100%',
    paddingTop: 60,
    paddingLeft: 30,
    paddingRight: 30,

  },
  RegisterForm_FieldNone: {
    width: width - 60,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,

  },
  RegisterForm_FieldTitle: {
    marginBottom: 10,
  },
  RegisterForm_FieldTitle_Text: {
    fontSize: 21,
    fontWeight: '600',
    textAlign: 'center',
  },
  RegisterForm_FieldSelect: {
    marginBottom: 0,
  },
  RegisterForm_FieldSelect_Touch: {
    borderBottomColor: '$colorLine',
    borderBottomWidth: 1,
    borderRadius: 0,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  RegisterForm_FieldSelect_Text: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 17,
    backgroundColor: 'transparent',
  },
  RegisterForm_FieldSelect_TextLeft: {
    flex: 2 / 3,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 17,
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
  RegisterForm_FieldSelect_TextRight: {
    flex: 1 / 3,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 17,
    backgroundColor: 'transparent',
    textAlign: 'right',
  },
  RegisterForm_FieldEnter: {
    marginBottom: 15,
    borderBottomColor: '$colorLine',
    borderBottomWidth: 1,
  },
  RegisterForm_FieldEnter_Input: {
    borderRadius: 0,
    height: 44,
    paddingRight: 30,
    fontSize: 17,
    width: null,
  },

  RegisterForm_FieldInfo: {
    marginBottom: 30,
  },
  RegisterForm_FieldInfo_Text: {
    fontSize: 13,
    textAlign: 'center',
  },
  RegisterForm_Button: {
    //position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    //bottom: 0,
  },
  RegisterForm_ButtonTouch: {
    backgroundColor: '$colorButton',
    padding: 15,
  },
  RegisterForm_ButtonTouchDisable: {
    backgroundColor: '$colorGrayLight',
    padding: 15,
  },
  RegisterForm_ButtonText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
  RegisterForm_FieldAction: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  RegisterForm_FieldAction_Title: {
    fontSize: 12,
    textAlign: 'center',
  },
  RegisterForm_FieldAction_Time: {
    padding: 10,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginRight: 3,
  },
  RegisterForm_FieldAction_CountDown: {
    padding: 10,
    fontSize: 12,
    color: '$colorPrimary',
    fontWeight: '500',
    textAlign: 'center',
  },
  RegisterForm_FieldAction_Button: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  RegisterForm_ButtonAction: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  RegisterForm_ButtonActionText: {
    fontSize: 12,
    color: '$colorPrimary',
    fontWeight: '500',
    textAlign: 'center',
  },
  RegisterForm_ButtonAnother: {
    backgroundColor: 'transparent',
    padding: 15,
  },
  RegisterForm_ButtonAnotherText: {
    fontSize: 17,
    color: '$colorPrimary',
    fontWeight: '500',
    textAlign: 'center',
  },

  item: {
    width: ITEM_WIDTH,
    height: screen.height + (2 * ITEM_PREVIEW_HEIGHT),
    backgroundColor: 'red',
    marginHorizontal: ITEM_SPACING / 2,
    overflow: 'hidden',
    borderRadius: 3,
    borderColor: '#000',
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  // Modal
  popup: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(23,23,23,0.95)"
  },
  popupScroll: {

  },
  popupDialog: {
    width: width - 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
  },
  popupDialogBanner: {
    width: width - 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
  },
  popupDialog2017: {
    width: 270,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E53935",
    borderRadius: 12,
  },
  popupHeader2017_Img: {
    width: 270,
    height: 125,
  },
  popupBody2017: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  popupFooter2017: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  popupFooter_Touch2017: {
    backgroundColor: '#F8E71C',
    borderRadius: 8,
    padding: 2,
    flex: 1,
  },
  popupFooter_Text2017: {
    fontSize: 17,
    paddingTop: 12,
    paddingBottom: 12,
    fontWeight: '600',
    color: '#E53935',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  popupHeader: {

  },

  popupIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 60,
  },
  popupIcon_Pic: {
    width: 84,
    height: 84,
    marginTop: -40,
  },
  popupIcon_Img: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: 84,
    height: 84,
  },
  popupHeader_Text: {
    fontSize: 17,
    fontWeight: '500',
    color: '#030303',
    marginTop: 20,
    marginBottom: 4,
    textAlign: 'center',
  },
  popupBody: {
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  popupBody_Form: {
    marginLeft: 60,
    marginRight: 60,
  },
  popupBody_Text: {
    fontSize: 13,
    color: '#030303',
    textAlign: 'center'
  },
  popupBody_Text_Title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#F8E71C',
    marginBottom: 4,
  },
  popupBody_Text_Content: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  popupBody_Text_ContentNote: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  popupBody_Text_Money: {
    fontSize: 40,
    color: '#fff',
    letterSpacing: -0.41,
    textAlign: 'center',
  },
  popupFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopColor: 'rgba(77,77,77,0.23)',
    borderTopWidth: LINE_WIDTH,
  },
  popupFooterList: {
    width: width - 60,
    flexDirection: 'column',
    flexWrap: 'wrap',
    borderTopColor: 'rgba(77,77,77,0.23)',
    borderTopWidth: LINE_WIDTH,
  },
  popupFooter_Touch: {
    flex: 1,
  },
  popupFooter_TouchLeft: {
    flex: 1 / 2,
    borderRightColor: 'rgba(77,77,77,0.23)',
    borderRightWidth: LINE_WIDTH,
  },
  popupFooter_TouchRight: {
    flex: 1 / 2,
  },
  popupFooter_Text: {
    fontSize: 17,
    paddingTop: 12,
    paddingBottom: 12,
    fontWeight: '500',
    color: '$colorPrimary',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  popupFooter_TextLeft: {
    fontSize: 17,
    paddingTop: 12,
    paddingBottom: 12,
    color: '$colorPrimary',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  popupFooter_TextRight: {
    fontSize: 17,
    paddingTop: 12,
    paddingBottom: 12,
    fontWeight: '500',
    color: '$colorPrimary',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  // Spin
  popupSpin: {
    width: 270,
    height: 350,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 12,
  },
  popupSpin_Bg: {
    width: 270,
    height: 350,
    resizeMode: 'contain',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  popupSpin_Header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 270,
    height: 160,
    marginTop: -80,
  },
  popupSpin_Header_Win: {
    width: 210,
    height: 105,
    position: 'absolute',
    top: 30,
    left: 30,
  },
  popupSpin_Header_Light: {
    width: 270,
    height: 270,
    opacity: 0.8,
  },
  popupSpin_Body: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  popupSpin_Footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  popupSpin_Footer_Touch: {
    width: 141,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupSpin_Footer_Img: {
    width: 141,
    height: 38,
    position: 'absolute',
    left: 0,
    top: 0,
    resizeMode: 'contain',
  },
  popupSpin_Footer_Txt: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: 'transparent',
    textShadowColor:'rgba(0,0,0,0.6)',
    textShadowOffset:{width: 0, height: -1},
    textShadowRadius:1,
    lineHeight: 38,
  },
  // Rate
  viewRate: {
    marginTop: 15,
  },
  viewRate_Star: {},
  viewRate_StarText: {},

  // Receipt
  popupReceipt: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(23,23,23,0.75)"
  },
  popupReceiptDialog: {
    width: 310,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 3,
  },
  popupReceiptHeader: {
    backgroundColor: '$colorPrimary',
    width: 310,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  popupReceiptHeader_Thumb: {
    width: 310,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
  },
  popupReceiptHeader_Thumb_Img: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 14,
  },
  popupReceiptHeader_Text: {
    fontSize: 21,
    fontWeight: '600',
    color: '#fff',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 2,
    textAlign: 'center',
  },
  popupReceiptHeader_TextSub: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    textAlign: 'center',
  },

  popupReceiptBody: {
    margin: 15,
  },
  popupReceiptBody_Text: {
    fontSize: 13,
    color: '#030303',
    textAlign: 'center'
  },
  popupReceiptFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopColor: 'rgba(77,77,77,0.23)',
    borderTopWidth: 0,
  },
  popupReceiptFooter_Touch: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupReceiptFooter_TouchLeft: {
    flex: 1 / 2,
    borderRightColor: 'rgba(77,77,77,0.23)',
    borderRightWidth: 0,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupReceiptFooter_TouchRight: {
    flex: 1 / 2,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupReceiptFooter_Text: {
    fontSize: 17,
    fontWeight: '500',
    color: '$colorPrimary',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  popupReceiptFooter_TextLeft: {
    fontSize: 17,
    color: '$colorPrimary',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  popupReceiptFooter_TextRight: {
    fontSize: 17,
    paddingTop: 12,
    paddingBottom: 12,
    fontWeight: '500',
    color: '$colorPrimary',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  ViewReceipt: {
  },
  ViewReceipt_Item: {
    width: 280,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 30,
  },
  ViewReceipt_ItemBottom: {
    width: 280,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 30,
  },
  ViewReceipt_Note: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
  },
  ViewReceipt_Title: {
    flex: 1 / 2,
    textAlign: 'left',
    color: '$colorGray',
  },
  ViewReceipt_TitleBottom: {
    flex: 1 / 2,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  ViewReceipt_Info: {
    flex: 1 / 2,
    textAlign: 'right',
    fontWeight: '600',
  },
  ViewReceipt_InfoFull: {
    flex: 1,
    textAlign: 'left',
    fontWeight: '600',
  },
  ViewReceipt_InfoBottom: {
    flex: 1 / 2,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#FF1744',
  },
  ViewReceipt_Line: {
    borderBottomColor: '$colorLine',
    borderBottomWidth: LINE_WIDTH,
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  popupReceiptLine: {
    height: 8,
    width: 310,
  },
  popupReceiptLine_Img: {
    height: 8,
    width: 310,
    resizeMode: 'cover',
  },
  ViewReceipt_LineDot: {
    height: 1,
    width: 280,
    marginTop: 10,
    marginBottom: 10,
  },
  ViewReceipt_LineDot_Img: {
    height: 1,
    width: 280,
    resizeMode: 'cover',
  },
  ViewReceipt_LineDotBottom: {
    height: 5,
    width: 310,
  },
  ViewReceipt_LineDotBottom_Img: {
    height: 5,
    width: 310,
    resizeMode: 'cover',
  },

  ViewReceipt_LineDot_Vertical: {
    height: 44,
    width: 1,
  },

  ViewReceipt_LineDot_VerticalImg: {
    height: 44,
    width: 1,
    resizeMode: 'cover',
  },



  /* iPads */
  '@media (min-width : 768px)': {
    popupDialog: {
      width: 320,
    },
    popupPersonal_Dialog: {
      width: 320,
    },
    popupPersonal_Header_InfoBg: {
      width: 320,
      backgroundColor: '$colorPrimary',
      height: 120,
      top: 0,
      left: 0,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    LoginForm: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    LoginForm_Scroll: {

    },
    LoginForm_Inner: {
    },
    LoginForm_Field: {

    },
    RegisterForm: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    RegisterForm_Inner: {
      width: 640,
    },
    RegisterForm_Field: {
      width: 640,
    },
    ViewAccount: {
    },
    ViewAccount_Header: {
      width: 640,
    },
    // View Banner
    ViewBanner: {
      marginBottom: 10,
      borderBottomColor: '$colorLine',
      borderBottomWidth: LINE_WIDTH,
      borderTopColor: '$colorLine',
      borderTopWidth: LINE_WIDTH,
    },
    ViewBanner_Inner: {
      flex: 1,
      width: width,
      height: 120,
    },
    ViewBanner_Item: {
    },
    ViewBanner_Touch: {
      flex: 1,
    },
    ViewBanner_ItemImg: {
      flex: 1,
      height: 120,
      width: width,
      backgroundColor: 'rgba(255,255,255,1)',
      resizeMode: 'cover',
    },
    ViewList_ListTouch: {
      width: (width - 20) / 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ViewListHeader_ListImg: {
      width: 60,
      //width: '33.33333333%',
      height: 60,
      marginTop: 12,
      marginBottom: 8,
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'cover',
    },
    ViewListHeader_ListName: {
      flex: 1,
      flexDirection: 'column',
      flexWrap: 'wrap',
      width: null
    },
    ViewListHeader_ListName_Title: {
      fontSize: 14,
      marginBottom: 12,
      fontWeight: '500',
      textAlign: 'center',
      width: null,
      backgroundColor: 'transparent',
    },
    ViewList_ListImg: {
      width: 60,
      //width: '33.33333333%',
      height: 60,
      marginTop: 12,
      marginBottom: 8,
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'cover',
    },
    ViewList_ListImgCard: {
      width: 120,
      //width: '33.33333333%',
      height: 80,
      marginTop: 12,
      marginBottom: 2,
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'cover',
    },
    ViewList_ListName_Title: {
      fontSize: 14,
      fontWeight: '600',
      color: '$colorText',
      textAlign: 'center',
      width: null,
      backgroundColor: 'transparent',
    },
    ViewList_ListName_Sub: {
      fontSize: 14,
      color: '$colorGray',
      textAlign: 'center',
      width: null,
    },
  },
  // End iPad

  // Map
  container_map: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    height: height,
    width: width,
  },
  itemContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingHorizontal: (ITEM_SPACING / 2) + ITEM_PREVIEW,
    position: 'absolute',
    // top: screen.height - ITEM_PREVIEW_HEIGHT - 64,
    paddingTop: screen.height - ITEM_PREVIEW_HEIGHT - 64,
    // paddingTop: !ANDROID ? 0 : screen.height - ITEM_PREVIEW_HEIGHT - 64,
  },
});
