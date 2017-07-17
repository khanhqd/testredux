import React, { Component } from 'react';
import {
      Platform,
      Alert
} from "react-native";
import { Actions } from "react-native-router-flux";
import { VERSION } from '../Helpers/constString'

var crypto = require("crypto-js/sha256");
var DeviceInfo = require('react-native-device-info');
var Lang = require('./Lang');
var Utils = require('./Utils');

// const host = 'https://api.test.ewallet.appotapay.com';
const host = 'https://api.gw.ewallet.appotapay.com';
// const host = 'https://api.gw.dev.ewallet.appotapay.com/'
const API_LOGIN = host + '/v1/auth/login';
const API_REGISTER = host + '/v1/auth/register';
const API_LOGOUT = host + '/v1/auth/logout';
const API_UPDATE = host + '/v1/users/update';
const API_VERIFY = host + '/v1/auth/verify_first_login';
const API_MERGE = host + '/v1/auth/merge_appota_user';
const API_USERINFO = host + '/v1/users/info';
const API_CASHIN_BANK = host + '/v1/transaction/cashin/by_bank';
const API_CASHIN_VISA = host + '/v1/transaction/cashin/by_visa';
const API_LISTBANK = host + '/v1/banks';
const API_CASHIN_DETAIL = host + '/v1/transaction/cashin/detail/';
const API_CASHOUT_METHODS = host + '/v1/transaction/cashout/methods';
const API_CASHOUT_DETAIL = host + '/v1/transaction/cashout/detail/';
const API_CASHBACK = host + '/v1/merchants/request_cashback';
const API_CASHBACK_DETAIL = host + '/v1/transaction/cashback/detail/';
const API_LIST_MERCHANT = host + '/v1/merchants';
const API_MERCHANT_DETAIL = host + '/v1/merchants/detail/';
const API_MERCHANT_CATE = host + '/v1/merchants/categories';
const API_MERCHANT_CATE_DETAIL = host + '/v1/merchants/categories/detail/';
const API_MERCHANT_STORES = host + '/v1/merchants/stores';
const API_MERCHANT_STORES_DETAIL = host + '/v1/merchants/stores/detail/';
const API_FIND_MERCHANT_STORES = host + '/v1/merchants/stores/find_near';
const API_FIND_USER = host + '/v1/users/find';
const API_LIST_NEWS = host + '/v1/news';
const API_NEWS_DETAIL = host + '/v1/news/detail/';
const API_LIST_HISTORY = host + '/v1/transaction/user_transactions';
const API_CONFIRM_CASHOUT = host + '/v1/transaction/cashout/confirm';
const API_CONFIRM_CASHBACK = host + '/v1/merchants/confirm_cashback';
const API_CONFIRM_VERIFY = host + '/v1/auth/verify_register';
const API_CONFIRM_TOPUP = host + '/v1/transaction/topup/by_ewallet/confirm';
const API_FIND_MERCHANT = host + '/v1/merchants/find?phone_number=';
const API_FIND_STORES = host + '/v1/merchants/stores/find?phone_number=';
const API_FIND_BY_MERCHANT = host + '/v1/merchants/stores/find_by_merchant';
const API_TOPUP_BANK = host + '/v1/transaction/topup/by_bank';
const API_TOPUP_VISA = host + '/v1/transaction/topup/by_visa';
const API_LIST_TOPUP = host + '/v1/topup/denominations';
const API_TOPUP_EWALLET = host + '/v1/transaction/topup/by_ewallet/request';
const API_TOPUP_DETAIL = host + '/v1/transaction/topup/detail/';
const API_GETCONFIG_PAYMENT = host + '/v1/payment/methods';
const API_MERCHANT_RATE = host + '/v1/merchants/stores/rate';
const API_TRACK_CLIENT = host + '/v1/track/client';
const API_FORGOT_PASSWORD = host + '/v1/users/forgot_password';
const API_RESET_PASSWORD = host + '/v1/users/reset_password';
const API_VALIDATE_REGISTER = host + '/v1/users/check_valid_fields';
const API_GET_OTP = host + '/v1/auth/get_verify_code';
const API_UPDATE_PROFILE = host + '/v1/users/update';
const API_NOTIFICATION = host + '/v1/users/notifications';
const API_DELETE_NOTIFICATION = host + '/v1/users/notifications/delete';
const API_LIST_ATM = host + '/v1/banks/atm';
const API_LIST_VISA = host + '/v1/banks/visa';
const API_STORE_ATM = host + '/v1/banks/atm/store';
const API_STORE_VISA = host + '/v1/banks/visa/store';
const API_CASHBACK_EXCHANGE = host + '/v1/transaction/cashout/cashback_money';
const API_CASHOUT_CASHBACK_DETAIL = host + '/v1/transaction/cashout_cashback/detail/';
const API_LIST_GAMES = host + '/v1/games';
const API_GAME_CONFIG = host + '/v1/games/get_config';
const API_LIST_GAMES_SERVER = host + '/v1/games/get_list_server';
const API_LIST_GAME_ROLE = host + '/v1/games/get_list_role';
const API_REQUEST_CHARGING_EWALLET = host + '/v1/games/payment/ewallet_charging/request';
const API_CONFIRM_GAME_EWALLET = host + '/v1/games/payment/ewallet_charging/confirm';
const API_CHARGING_BANK = host + '/v1/games/payment/bank_charging';
const API_CHARGING_CARD = host + '/v1/games/payment/card_charging';
const API_GAME_DETAIL = host + '/v1/games/transaction/bank/detail/';
const API_LIST_CARDS = host + '/v1/shop/cards';
const API_REQUEST_BUY_CARDS_EWALLET = host + '/v1/shop/buy_cards/by_ewallet/request';
const API_BUY_CARDS_BANK = host + '/v1/shop/buy_cards/by_bank';
const API_BUY_CARDS_DETAIL = host + '/v1/transaction/buy_card/detail/';
const API_CONFIRM_CARD = host + '/v1/shop/buy_cards/by_ewallet/confirm';
const API_TRANSFER_REQUEST = host + '/v1/transaction/transfer/request';
const API_TRANSFER_REQUEST_GROUP = host + '/v1/transaction/transfer_group/request';
const API_TRANSFER_CONFIRM = host + '/v1/transaction/transfer/confirm';
const API_TRANSFER_DETAIL = host + '/v1/transaction/transfer/detail/';
const API_BORROW_REQUEST = host + '/v1/transaction/borrow_money/request';
const API_BORROW_ACCEPT = host + '/v1/transaction/borrow_money/accept';
const API_BORROW_CONFIRM = host + '/v1/transaction/borrow_money/confirm';
const API_BORROW_DETAIL = host + '/v1/transaction/borrow_money/detail/';
const API_CHANGE_PASSWORD = host + '/v1/users/change_password';
const API_USER_CHECKIN_MERCHANT = host + '/v1/merchants/stores/checkin';
const API_USER_CHECKOUT_MERCHANT = host + '/v1/merchants/stores/checkout';
const API_USER_UPDATE_AVATAR = host + '/v1/users/change_avatar';
const API_MERCHANT_CREATE_PAYMENT = host + '/v1/merchants/orders/create';
const API_USER_ACEPT_PAYMENT = host + '/v1/merchants/orders/payment/by_ewallet/accept';
const API_USER_CONFIRM_PAYMENT = host + '/v1/merchants/orders/payment/by_ewallet/confirm';
const API_PAYMENT_ORDER_DETAIL = host + '/v1/transaction/borrow_money/detail/';
const API_REQUEST_PAYMENT_ORDER = host + '/v1/merchants/orders/payment/by_ewallet/request';
const API_OTP_NEW = host + '/v1/ewallet/transaction/verify';
const API_PAYMENT_ORDERS_DETAIL = host + '/v1/merchants/orders/transaction/detail/';
const API_SET_PIN = host + '/v1/users/set_pincode';
const API_VERIFY_PIN = host + '/v1/users/verify_pincode';
const API_UPDATE_PIN = host + '/v1/users/update_pincode';
const API_LIST_BANK_ACCOUNT = host + '/v1/accounts/bank/atm';
const API_MAPPING_BANK_ACCOUNT = host + '/v1/accounts/bank/mapping/request';
const API_CONFIRM_BANK_ACCOUNT = host + '/v1/accounts/bank/mapping/confirm';
const API_CONFIRM_TRANSACTION_BANK = host + '/v1/ewallet/transaction/bank/verify';
const API_CASHOUT_TRANSACTION = host + '/v1/transaction/request_cashout';
const API_CASHIN_BY_CARD = host + '/v1/transaction/cashin/by_card';
const API_LIST_STAFF = host + '/v1/merchants/staff';
const API_REQUEST_ADD_STAFF = host + '/v1/merchants/staff/request_add';
const API_ACCEPT_ADD_STAFF = host + '/v1/merchants/staff/accept_add';
const API_REMOVE_STAFF = host + '/v1/merchants/staff/remove';
const API_FIND_STAFF = host + '/v1/merchants/staff/find';
const API_GET_CASHBACK_TRANSACTION = host + '/v1/transaction/cashback';
const API_GAME_CARD_DETAIL = host + '/v1/games/transaction/card/detail/'
const API_GAME_BANK_DETAIL = host + '/v1/games/transaction/bank/detail/'
const API_GAME_WALET_DETAIL = host + '/v1/games/transaction/ewallet/detail/'
const API_CARD_STORE = host + '/v1/users/archive/card_data'


const API_KEY = 'GuVdXWzWPpwsB5EDNYuoJ1Er6OU1aSpP'
const secret_key = 'XW6S7WVwr2uopUJOEusN0OD1adEPYzPp'
const client_ver = VERSION.NAME

module.exports = {
      HeaderGET: function () {
            return {
                  'Content-Type': 'multipart/form-data',
                  'Client-Authorization': API_KEY,
                  'Language': Lang.getLanguage(),
                  'Platform': Platform.OS
            }
      },

      HeaderTokenGET: function (access_token) {
            return {
                  'Content-Type': 'multipart/form-data',
                  'Client-Authorization': API_KEY,
                  'Language': Lang.getLanguage(),
                  'User-Token': access_token,
                  'Platform': Platform.OS
            }
      },

      HeaderPOST: function () {
            return {
                  'Content-Type': 'application/json',
                  'Client-Authorization': API_KEY,
                  'Language': Lang.getLanguage(),
                  'Platform': Platform.OS
            }
      },

      HeaderTokenPOST: function (access_token) {
            return {
                  'Content-Type': 'application/json',
                  'Client-Authorization': API_KEY,
                  'Language': Lang.getLanguage(),
                  'User-Token': access_token,
                  'Platform': Platform.OS
            }
      },

      Login: function (account, password) {
            var device_name = (DeviceInfo.getDeviceName() == null) ? 'PayHub' : DeviceInfo.getDeviceName();
            var device_id = DeviceInfo.getUniqueID();
            var device_os = Platform.OS;
            var os_version = DeviceInfo.getSystemVersion();
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  device_name: device_name,
                  account: account,
                  client_version: client_ver,
                  device_id: device_id,
                  device_os: device_os,
                  os_version: os_version,
                  password: password,
                  ts: time
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_LOGIN, {
                        headers: this.HeaderPOST(),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      Register: function (username, password, phone_number) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  password: password,
                  phone_number: phone_number,
                  ts: time,
                  username: username
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            // Alert.alert(JSON.stringify(obj.signature));
            return (
                  fetch(API_REGISTER, {
                        headers: this.HeaderPOST(),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      Verify: function (user_id, username, password, phone_number, email, cmnd_number, fullname, address, verify_info, device_token) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  address: address,
                  cmnd_number: cmnd_number,
                  email: email,
                  fullname: fullname,
                  password: password,
                  phone_number: phone_number,
                  ts: time,
                  user_id: user_id,
                  username: username,
                  verify_info: verify_info
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_VERIFY, {
                        headers: this.HeaderPOST(),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      Merge: function (user_id, username, password, phone_number, email, cmnd_number, fullname, address, verify_info, device_token) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  address: address,
                  cmnd_number: cmnd_number,
                  email: email,
                  fullname: fullname,
                  password: password,
                  phone_number: phone_number,
                  ts: time,
                  user_id: user_id,
                  username: username,
                  verify_info: verify_info
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_MERGE, {
                        headers: this.HeaderPOST(),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      Logout: function (access_token) {
            return (
                  fetch(API_LOGOUT, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  }))
      },

      UserInfo: function (access_token) {
            return (
                  fetch(API_USERINFO, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  }))
      },

      CashinBank: function (access_token, bank_code, amount) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  amount: amount,
                  bank_code: bank_code,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_CASHIN_BANK, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      CashinBankAcc(access_token, bank_code, amount, method, account_info) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  amount: amount,
                  bank_code: bank_code,
                  ts: time,
                  method: method,
                  account_info: account_info
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_CASHIN_BANK, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      CashinVisa: function (access_token, amount) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  amount: amount,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_CASHIN_VISA, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      ListBank: function (access_token, bank_type) {
            return (
                  fetch(API_LISTBANK + '?type=' + bank_type, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  }))
      },

      CashinDetail: function (access_token, trans_id) {
            return (
                  fetch(API_CASHIN_DETAIL + trans_id, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  }))
      },

      //merchant
      ListMerchant: function (access_token) {
            return (
                  fetch(API_LIST_MERCHANT, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  }))
      },

      MerchantDetail: function (access_token, merchant_id) {
            return (
                  fetch(API_MERCHANT_DETAIL + merchant_id, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  }))
      },

      MerchantCate: function () {
            return (
                  fetch(API_MERCHANT_CATE, {
                        method: 'GET',
                        headers: this.HeaderGET()
                  }))
      },

      MerchantCateDetail: function () {
            return (
                  fetch(API_MERCHANT_CATE_DETAIL, {
                        method: 'GET',
                        headers: this.HeaderGET()
                  }))
      },


      MerchantStores: function (cid, limit, offset, lat, long, search) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  cid: cid,
                  lat: lat,
                  limit: limit,
                  long: long,
                  offset: offset,
                  search: search,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();

            return (
                  fetch(API_MERCHANT_STORES + '?cid=' + cid + '&ts=' + obj.ts + '&limit=' + limit + '&offset=' + offset + '&lat=' + lat + '&long=' + long + '&search=' + search + '&signature=' + signature, {
                        method: 'GET',
                        headers: this.HeaderGET()
                  }))
      },

      MerchantStoreDetail: function (merchant_id) {
            return (
                  fetch(API_MERCHANT_STORES_DETAIL + merchant_id, {
                        method: 'GET',
                        headers: this.HeaderGET()
                  }))
      },
      //end merchant

      Cashback: function (access_token, receiver_phone_number, payment_method, payment_amount, cashback_percent, message) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  cashback_percent: cashback_percent,
                  message: message,
                  payment_amount: payment_amount,
                  payment_method: payment_method,
                  receiver_phone_number: receiver_phone_number,
                  ts: time
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_CASHBACK, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      CashoutMethods: function (access_token) {
            return (
                  fetch(API_CASHOUT_METHODS, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  }))
      },

      
      FindMerchantStore: function (limit, offset, lat, long) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  lat: lat,
                  limit: limit,
                  long: long,
                  offset: offset,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_FIND_MERCHANT_STORES + '?limit=' + limit + '&ts=' + obj.ts + '&offset=' + offset + '&lat=' + lat + '&long=' + long + '&signature=' + signature, {
                        headers: this.HeaderGET(),
                        method: 'GET'
                  }));
      },

      FindUser(access_token, field) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  field: field,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_FIND_USER + '?field=' + field + '&ts=' + time + '&signature=' + signature, {
                        headers: this.HeaderTokenGET(access_token),
                        method: 'GET'
                  }));
      },

      ListNews(startIndex) {
            return (
                  fetch(API_LIST_NEWS + '?limit=20&offset=' + startIndex, {
                        method: 'GET',
                        headers: this.HeaderGET()
                  }))
      },

      NewsDetail: function (new_id) {
            return (
                  fetch(API_NEWS_DETAIL + new_id, {
                        method: 'GET',
                        headers: this.HeaderGET()
                  }))
      },

      ListHistory: function (access_token, limit, offset, start_date, end_date, type) {
            if (!type) type = '';
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  end_date: end_date,
                  limit: limit,
                  offset: offset,
                  start_date: start_date,
                  ts: time,
                  type: type
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            // Actions.popup({ title: 'Thông báo', content: 'Thơi gian. \n' + obj.ts, flag: 'error' });
            return (
                  fetch(API_LIST_HISTORY + '?limit=' + limit + '&ts=' + obj.ts + '&offset=' + offset + '&start_date=' + start_date + '&end_date=' + end_date + '&signature=' + signature + '&type=' + type, {
                        headers: this.HeaderTokenGET(access_token),
                        method: 'GET'
                  }));
      },

      FindMerchant: function (access_token, phone_number) {
            return (
                  fetch(API_FIND_STORES + phone_number, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  }))
      },

      HistoryDetail: function (access_token, trans_id, type) {
            var url;
            if (type.toLowerCase() == 'cashin')
                  url = API_CASHIN_DETAIL;
            else if (type.toLowerCase() == 'cashout')
                  url = API_CASHOUT_DETAIL;
            else if (type.toLowerCase() == 'cashback' || type.toLowerCase() == 'receive_cashback')
                  url = API_CASHBACK_DETAIL;
            else if (type.toLowerCase() == 'topup')
                  url = API_TOPUP_DETAIL;
            else if (type.toLowerCase() == 'buy_card')
                  url = API_BUY_CARDS_DETAIL;
            else if (type.toLowerCase() == 'cashout_cashback_money')
                  url = API_CASHOUT_CASHBACK_DETAIL;
            else if (type.toLowerCase() == 'lend_money' || type.toLowerCase() == 'borrow_money')
                  url = API_BORROW_DETAIL;
            else if (type.toLowerCase() == 'transfer' || type.toLowerCase() == 'receive_transfer')
                  url = API_TRANSFER_DETAIL;
            else if (type.toLowerCase() == 'orders')
                  url = API_PAYMENT_ORDER_DETAIL;
            else if (type.toLowerCase() == 'receive_orders_money' || type.toLowerCase() == 'payment_orders' || type.toLowerCase() == 'paymentorders' || type.toLowerCase() == 'payment')
                  url = API_PAYMENT_ORDERS_DETAIL;
            else if (type.toLowerCase() == 'game_ewallet_charging')
                  url = API_GAME_WALET_DETAIL;
            else if (type.toLowerCase() == 'game_card_charging')
                  url = API_GAME_CARD_DETAIL;
            else if (type.toLowerCase() == 'game_bank_charging')
                  url = API_GAME_BANK_DETAIL;
            else {
                  Alert.alert('Tạm thời không xem được chi tiết giao dịch ' + type.toLowerCase());
                  return;
            }
            console.log(url + trans_id);
            return (
                  fetch(url + trans_id, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  }))
      },

      ConfirmOtp: function (access_token, transaction_id, otp, type) {
            var time = parseInt(new Date().getTime() / 1000);
            var url;

            if (type.toLowerCase() == 'cashout')
                  url = API_OTP_NEW;//API_CONFIRM_CASHOUT;
            else if (type.toLowerCase() == 'cashback')
                  url = API_OTP_NEW;//API_CONFIRM_CASHBACK;
            else if (type.toLowerCase() == 'topup')
                  url = API_OTP_NEW;//API_CONFIRM_TOPUP;
            else if (type.toLowerCase() == 'cards')
                  url = API_OTP_NEW;//API_CONFIRM_CARD;
            else if (type.toLowerCase() == 'transfer')
                  url = API_OTP_NEW;//API_TRANSFER_CONFIRM;
            else if (type.toLowerCase() == 'games')
                  url = API_OTP_NEW;//API_CONFIRM_GAME_EWALLET;
            else if (type.toLowerCase() == 'borrow')
                  url = API_OTP_NEW;//API_BORROW_CONFIRM;
            else if (type.toLowerCase() == 'paymentorders' || type.toLowerCase() == 'payment_order')
                  url = API_OTP_NEW;//API_USER_CONFIRM_PAYMENT;
            else if (type.toLowerCase() == 'add_card') {
                  url = API_CONFIRM_BANK_ACCOUNT;
                  var obj = {
                        otp: otp,
                        request_id: transaction_id,
                        ts: time
                  }
                  var args = Object.keys(obj).map(function (k) { return obj[k] });
                  var signature = crypto(args.join('') + secret_key).toString();
                  obj.signature = signature;
                  return (
                        fetch(url, {
                              method: 'POST',
                              headers: this.HeaderTokenPOST(access_token),
                              body: JSON.stringify(obj)
                        }))
            }
            else if (type.toLowerCase() == 'register') {
                  url = API_CONFIRM_VERIFY;
                  var obj = {
                        otp: otp,
                        phone_number: transaction_id,
                        ts: time
                  }
                  var args = Object.keys(obj).map(function (k) { return obj[k] });
                  var signature = crypto(args.join('') + secret_key).toString();
                  obj.signature = signature;
                  return (
                        fetch(url, {
                              method: 'POST',
                              headers: this.HeaderPOST(),
                              body: JSON.stringify(obj)
                        }))
            }

            var obj = {
                  transaction_id: transaction_id,
                  ts: time,
                  verify_code: otp,
                  verify_type: 'OTP'
            }

            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(url, {
                        method: 'POST',
                        headers: this.HeaderTokenPOST(access_token),
                        body: JSON.stringify(obj)
                  }))
      },

      FindByMerchant: function (mid, limit, offset, lat, long) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  lat: lat,
                  limit: limit,
                  long: long,
                  mid: mid,
                  offset: offset,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_FIND_BY_MERCHANT + '?mid=' + mid + '&ts=' + obj.ts + '&limit=' + limit + '&offset=' + offset + '&lat=' + lat + '&long=' + long + '&signature=' + signature, {
                        headers: this.HeaderGET(),
                        method: 'GET'
                  }));
      },

      TopupBank: function (access_token, bank_code, amount, topup_phone_number) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  amount: amount,
                  bank_code: bank_code,
                  topup_phone_number: topup_phone_number,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_TOPUP_BANK, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      TopupVisa: function (access_token, amount, topup_phone_number) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  amount: amount,
                  topup_phone_number: topup_phone_number,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_TOPUP_VISA, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      TopupEwallet: function (access_token, amount, topup_phone_number) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  amount: amount,
                  topup_phone_number: topup_phone_number,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_TOPUP_EWALLET, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      TopupDetail: function (access_token, trans_id) {
            return (
                  fetch(API_TOPUP_DETAIL + trans_id, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  }))
      },

      GetConfigPayment: function (access_token, service) {
            return (
                  fetch(API_GETCONFIG_PAYMENT + '?service=' + service, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  }))
      },

      MerchantRate: function (access_token, merchant_id, merchant_store_id, rate) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  merchant_id: merchant_id,
                  merchant_store_id: merchant_store_id,
                  rate: rate,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_MERCHANT_RATE, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      TrackClient(access_token, device_token, appsflyer_id, appsflyer_idfa, appsflyer_advertising_id) {
            var device_name = (DeviceInfo.getDeviceName() == null) ? 'payhub' : DeviceInfo.getDeviceName();
            var device_id = DeviceInfo.getUniqueID();
            var device_os = Platform.OS;
            var os_version = DeviceInfo.getSystemVersion();
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  client_version: client_ver,
                  device_id: device_id,
                  device_name: device_name,
                  device_os: device_os,
                  device_token: device_token,
                  os_version: os_version,
                  appsflyer_id: appsflyer_id,
                  appsflyer_advertising_id: appsflyer_advertising_id,
                  appsflyer_idfa: appsflyer_idfa,
                  ts: time
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_TRACK_CLIENT, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      ForgotPassword: function (phone_number) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  phone_number: phone_number,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_FORGOT_PASSWORD, {
                        headers: this.HeaderPOST(),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      ResetPassword: function (phone_number, password, access_key, otp) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  access_key: access_key,
                  otp: otp,
                  password: password,
                  phone_number: phone_number,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_RESET_PASSWORD, {
                        headers: this.HeaderPOST(),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      ValidateRegister: function (phone_number, username, email) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  email: email,
                  phone_number: phone_number,
                  ts: time,
                  username: username
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_VALIDATE_REGISTER, {
                        headers: this.HeaderPOST(),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      GetOTP: function (phone_number) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  phone_number: phone_number,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_GET_OTP, {
                        headers: this.HeaderPOST(),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      UpdateProfile: function (access_token, email, cmnd_number, fullname, address, gender) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  address: address,
                  cmnd_number: cmnd_number,
                  email: email,
                  fullname: fullname,
                  gender: gender,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_UPDATE_PROFILE, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      GetNotification: function (access_token, offset) {
            var ts = parseInt(new Date().getTime() / 1000);
            var signature = crypto('10' + offset.toString() + ts + secret_key).toString();

            return (
                  fetch(API_NOTIFICATION + '?ts=' + ts + '&limit=10&offset=' + offset + '&signature=' + signature, {
                        headers: this.HeaderTokenGET(access_token),
                        method: 'GET'
                  }));
      },

      DeleteNotification: function (access_token, notice_ids) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  notice_ids: notice_ids,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_DELETE_NOTIFICATION, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      GetListATM: function (access_token) {
            var ts = parseInt(new Date().getTime() / 1000);
            var signature = crypto(ts + secret_key).toString();

            return (
                  fetch(API_LIST_ATM + '?ts=' + ts + '&signature=' + signature, {
                        headers: this.HeaderTokenGET(access_token),
                        method: 'GET'
                  }));
      },

      GetListVISA: function (access_token) {
            var ts = parseInt(new Date().getTime() / 1000);
            var signature = crypto(ts + secret_key).toString();

            return (
                  fetch(API_LIST_VISA + '?ts=' + ts + '&signature=' + signature, {
                        headers: this.HeaderTokenGET(access_token),
                        method: 'GET',
                  }));
      },

      StoreCard: function (access_token, type, bank_name, bank_code, bank_branch, card_expiry, card_number, card_holder_name, card_secure_code) {
            var card_expiry_month = card_expiry.split("/")[0];
            var card_expiry_year = card_expiry.split("/")[1];
            var time = parseInt(new Date().getTime() / 1000);
            var signature;
            var url;
            var obj;
            if (type.toLowerCase() == 'atm') {
                  url = API_STORE_ATM;
                  obj = {
                        bank_branch: bank_branch,
                        bank_code: bank_code,
                        bank_name: bank_name,
                        card_expiry_month: card_expiry_month,
                        card_expiry_year: card_expiry_year,
                        card_holder_name: card_holder_name,
                        card_number: card_number,
                        ts: time
                  }
                  var args = Object.keys(obj).map(function (k) { return obj[k] });
                  var signature = crypto(args.join('') + secret_key).toString();
                  obj.signature = signature;
            }
            else if (type.toLowerCase() == 'visa') {
                  url = API_STORE_VISA;
                  obj = {
                        bank_code: bank_code,
                        bank_name: bank_name,
                        card_expiry_month: card_expiry_month,
                        card_expiry_year: card_expiry_year,
                        card_holder_name: card_holder_name,
                        card_number: card_number,
                        card_secure_code: card_secure_code,
                        ts: time
                  }
                  var args = Object.keys(obj).map(function (k) { return obj[k] });
                  var signature = crypto(args.join('') + secret_key).toString();
                  obj.signature = signature;
            }

            return (
                  fetch(url, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      CashbackExchange: function (access_token, amount) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  amount: amount,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_CASHBACK_EXCHANGE, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      ListGames: function (access_token) {
            return (
                  fetch(API_LIST_GAMES, {
                        headers: this.HeaderTokenGET(access_token),
                        method: 'GET',
                  }));
      },

      GameConfig: function (access_token, game_id) {
            var ts = parseInt(new Date().getTime() / 1000);
            var signature = crypto(game_id.toString() + ts.toString() + secret_key).toString();
            // Actions.popup({ title: 'Thông báo', content: API_GAME_CONFIG + '?game_id=' + game_id + '&ts=' + ts + '&signature=' + signature, flag: 'error' });
            return (
                  fetch(API_GAME_CONFIG + '?game_id=' + game_id + '&ts=' + ts + '&signature=' + signature, {
                        headers: this.HeaderTokenGET(access_token),
                        method: 'GET',
                  }));
      },

      ListServerGame: function (access_token, game_id, appota_username) {
            var ts = parseInt(new Date().getTime() / 1000);
            var signature = crypto(appota_username + game_id + ts + secret_key).toString();
            return (
                  fetch(API_LIST_GAMES_SERVER + '?appota_username=' + appota_username + '&ts=' + ts + '&game_id=' + game_id + '&signature=' + signature, {
                        headers: this.HeaderTokenGET(access_token),
                        method: 'GET',
                  }));
      },

      ListServerRole: function (access_token, game_id, appota_username, server_id) {
            var ts = parseInt(new Date().getTime() / 1000);
            var signature = crypto(appota_username + game_id + server_id + ts + secret_key).toString();
            return (
                  fetch(API_LIST_GAME_ROLE + '?appota_username=' + appota_username + '&ts=' + ts + '&game_id=' + game_id + '&server_id=' + server_id + '&signature=' + signature, {
                        headers: this.HeaderTokenGET(access_token),
                        method: 'GET',
                  }));
      },

      RequestChargingEwallet: function (access_token, game_id, appota_username, role_id, role_name, server_id, server_name, amount, package_id, package_value) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  amount: amount,
                  appota_username: appota_username,
                  game_id: game_id,
                  package_id: package_id,
                  package_value: package_value,
                  role_id: role_id,
                  role_name: role_name,
                  server_id: server_id,
                  server_name: server_name,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            // Alert.alert(JSON.stringify(obj));
            return (
                  fetch(API_REQUEST_CHARGING_EWALLET, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      ChargingBank: function (access_token, game_id, appota_username, role_id, role_name, server_id, server_name, amount, package_id, package_value, bank_code) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  amount: amount,
                  appota_username: appota_username,
                  bank_code: bank_code,
                  game_id: game_id,
                  package_id: package_id,
                  package_value: package_value,
                  role_id: role_id,
                  role_name: role_name,
                  server_id: server_id,
                  server_name: server_name,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            // Alert.alert(JSON.stringify(obj));
            return (
                  fetch(API_CHARGING_BANK, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      ChargingCard: function (access_token, game_id, appota_username, role_id, role_name, server_id, server_name, package_id, package_value, card_code, card_serial, card_vendor) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  appota_username: appota_username,
                  card_code: card_code,
                  card_serial: card_serial,
                  card_vendor: card_vendor,
                  game_id: game_id,
                  package_id: package_id,
                  package_value: package_value,
                  role_id: role_id,
                  role_name: role_name,
                  server_id: server_id,
                  server_name: server_name,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_CHARGING_CARD, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      GameDetail: function (access_token, trans_id) {
            return (
                  fetch(API_GAME_DETAIL + trans_id, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  }))
      },

      ListCard: function (access_token) {
            return (
                  fetch(API_LIST_CARDS, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  }))
      },

      RequestByCardEwallet: function (access_token, order_info) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  order_info: order_info,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_REQUEST_BUY_CARDS_EWALLET, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      BuyCardByBanking: function (access_token, order_info, bank_code) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  bank_code: bank_code,
                  order_info: order_info,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_BUY_CARDS_BANK, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      ListTopup: function (access_token) {
            return (
                  fetch(API_LIST_TOPUP, {
                        headers: this.HeaderTokenGET(access_token),
                        method: 'GET'
                  }));
      },

      RequestTransfer: function (access_token, receiver_phone_number, amount, message) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  amount: amount,
                  message: message,
                  receiver_phone_number: receiver_phone_number,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_TRANSFER_REQUEST, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      RequestTransferGroup: function (access_token, receivers, amount, message) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  amount: amount,
                  message: message,
                  receivers: receivers,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_TRANSFER_REQUEST_GROUP, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      RequestBorrow: function (access_token, scrivener_phone_number, amount, message) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  amount: amount,
                  message: message,
                  scrivener_phone_number: scrivener_phone_number,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_BORROW_REQUEST, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      AcceptBorrow: function (access_token, transaction_id, type) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  transaction_id: transaction_id,
                  ts: time,
                  type: type
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_BORROW_ACCEPT, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      ChangePassword: function (access_token, current_password, new_password) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  current_password: current_password,
                  new_password: new_password,
                  ts: time
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_CHANGE_PASSWORD, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      UserCheckin: function (access_token, merchant_store_id, user_latitude, user_longitude, type) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  merchant_store_id: merchant_store_id,
                  ts: time.toString(),
                  user_latitude: user_latitude.toString(),
                  user_longitude: user_longitude.toString(),
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            var url = type == 'checkin' ? API_USER_CHECKIN_MERCHANT : API_USER_CHECKOUT_MERCHANT;
            return (
                  fetch(url, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      UserUpdateAvatar(access_token, body) {
            return (
                  fetch(API_USER_UPDATE_AVATAR, {
                        headers: this.HeaderTokenGET(access_token),
                        method: 'POST',
                        body: body
                  }));
      },

      CreatePaymentOrder(access_token, payer_phone_number, orders_amount) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  action: 'create_and_push',
                  orders_amount: orders_amount,
                  orders_info: '',
                  payer_phone_number: payer_phone_number,
                  ts: time.toString()
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_MERCHANT_CREATE_PAYMENT, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      AcceptPaymentOrder(access_token, transaction_id, type) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  transaction_id: transaction_id,
                  ts: time.toString(),
                  type: type
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_USER_ACEPT_PAYMENT, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      RequestPaymentOrder(access_token, merchant_store_phone_number, amount, orders_info) {
            var time = parseInt(new Date().getTime() / 1000);
            var obj = {
                  amount: amount.toString(),
                  merchant_store_phone_number: merchant_store_phone_number.toString(),
                  orders_info: orders_info,
                  ts: time.toString()
            }
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_REQUEST_PAYMENT_ORDER, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      SetPin(access_token, pin_code) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  pin_code: pin_code,
                  ts: time
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            // console.log('PIN token='+access_token + '\n' + JSON.stringify(obj));
            return (
                  fetch(API_SET_PIN, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      VerifyPin(access_token, pin_code) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  pin_code: pin_code,
                  ts: time
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            console.log('PIN ' + JSON.stringify(obj));
            return (
                  fetch(API_VERIFY_PIN, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      UpdatePin(access_token, pin_code, current_password) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  pin_code: pin_code,
                  current_password: current_password,
                  ts: time
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            console.log(JSON.stringify(obj) + '\n' + API_UPDATE_PIN);
            return (
                  fetch(API_UPDATE_PIN, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      BankAccount(access_token) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  ts: time
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_LIST_BANK_ACCOUNT, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      MappingBank(access_token, bank_code, account_number, account_type, account_holder_name) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  ts: time,
                  bank_code: bank_code,
                  account_number: account_number,
                  account_type: account_type,
                  account_holder_name: account_holder_name
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_MAPPING_BANK_ACCOUNT, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      ConfirmBankTrans(access_token, transaction_id, verify_type, verify_code) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  ts: time,
                  transaction_id: transaction_id,
                  verify_type: verify_type,
                  verify_code: verify_code
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;

            return (
                  fetch(API_CONFIRM_TRANSACTION_BANK, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      CashoutBank(access_token, amount, bank_code, method, account_info) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  ts: time,
                  amount: amount,
                  bank_code: bank_code,
                  method: method,
                  account_info: account_info
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_CASHOUT_TRANSACTION, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      CashinByCard(access_token, code, serial, provider) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  ts: time,
                  code: code,
                  serial: serial,
                  provider: provider
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_CASHIN_BY_CARD, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  }));
      },

      ListStaff(access_token) {
            return (
                  fetch(API_LIST_STAFF, {
                        headers: this.HeaderTokenGET(access_token),
                        method: 'GET'
                  }));
      },

      RequestAddStaff(access_token, staff_phone_number, name, description) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  staff_phone_number: staff_phone_number,
                  ts: time,
                  description: description,
                  name: name
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_REQUEST_ADD_STAFF, {
                        method: 'POST',
                        headers: this.HeaderTokenPOST(access_token),
                        body: JSON.stringify(obj)
                  }))
      },

      AcceptAddStaff(access_token, staff_phone_number, access_key, verify_code) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  staff_phone_number: staff_phone_number,
                  ts: time,
                  access_key: access_key,
                  verify_code: verify_code,
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_ACCEPT_ADD_STAFF, {
                        method: 'POST',
                        headers: this.HeaderTokenPOST(access_token),
                        body: JSON.stringify(obj)
                  }))
      },

      RemoveStaff(access_token, staff_phone_number) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  staff_phone_number: staff_phone_number,
                  ts: time
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            return (
                  fetch(API_REMOVE_STAFF, {
                        method: 'POST',
                        headers: this.HeaderTokenPOST(access_token),
                        body: JSON.stringify(obj)
                  }))
      },

      FindStaff(access_token, phone_number) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  phone_number: phone_number,
                  ts: time
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            var params = Object.keys(obj).map(function (k) { return k + '=' + obj[k] }).join('&');
            return (
                  fetch(API_FIND_STAFF + '?' + params, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token),
                  }))
      },

      GetCashbackTrans(access_token, staff_phone_number) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  ts: time,
                  staff_phone_number: staff_phone_number
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            var params = Object.keys(obj).map(function (k) { return k + '=' + obj[k] }).join('&');
            // console.log(API_GET_CASHBACK_TRANSACTION + '?' + params);
            return (
                  fetch(API_GET_CASHBACK_TRANSACTION + '?' + params, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token),
                  }))
      },

      CardStore(access_token, limit, offset) {
            var time = parseInt(new Date().getTime() / 1000);
            var list = {
                  ts: time,
                  limit: limit,
                  offset: offset
            }
            const obj = {};
            Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
            var args = Object.keys(obj).map(function (k) { return obj[k] });
            var signature = crypto(args.join('') + secret_key).toString();
            obj.signature = signature;
            var params = Object.keys(obj).map(function (k) { return k + '=' + obj[k] }).join('&');
            return (
                  fetch(API_CARD_STORE + '?' + params, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token),
                  }))
      },
};