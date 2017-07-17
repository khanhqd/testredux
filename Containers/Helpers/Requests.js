import {
      Platform,
} from "react-native"
import { Actions } from "react-native-router-flux"
import crypto from "crypto-js/sha256"
import DeviceInfo from 'react-native-device-info'
import { API, VERSION } from './constString'
import Toast from '@remobile/react-native-toast'

var Lang = require('../Common/Lang')
const API_KEY = 'GuVdXWzWPpwsB5EDNYuoJ1Er6OU1aSpP'
const secret_key = 'XW6S7WVwr2uopUJOEusN0OD1adEPYzPp'
const client_ver = VERSION.NAME

module.exports = {
      //START COMMON FUNC
      HeaderGET() {
            return {
                  'Content-Type': 'multipart/form-data',
                  'Client-Authorization': API_KEY,
                  'Language': Lang.getLanguage(),
                  'Platform': Platform.OS
            }
      },

      HeaderTokenGET(access_token) {
            return {
                  'Content-Type': 'multipart/form-data',
                  'Client-Authorization': API_KEY,
                  'Language': Lang.getLanguage(),
                  'User-Token': access_token,
                  'Platform': Platform.OS
            }
      },

      HeaderPOST() {
            return {
                  'Content-Type': 'application/json',
                  'Client-Authorization': API_KEY,
                  'Language': Lang.getLanguage(),
                  'Platform': Platform.OS
            }
      },

      HeaderTokenPOST(access_token) {
            return {
                  'Content-Type': 'application/json',
                  'Client-Authorization': API_KEY,
                  'Language': Lang.getLanguage(),
                  'User-Token': access_token,
                  'Platform': Platform.OS
            }
      },

      onError(message, reject) {
            reject(message)
            setTimeout(() => {
                  Actions.popup({
                        title: Lang.thong_bao(),
                        content: message,
                        flag: 'error'
                  })
            }, 10)
      },

      responseHandle(data, resolve, reject) {
            if (data.status == 200) {
                  resolve(JSON.parse(data._bodyText))
            }
            else {
                  reject('error')
                  setTimeout(() => {
                        if (data.status == 401) {
                              Toast.showToast(Lang.token_het_han(), "short", "center");
                              Actions.login()
                        }
                        else if (data.status == 500) {
                              var error = JSON.parse(data._bodyText).error
                              if (error.code == 500)
                                    Actions.popup({
                                          title: Lang.thong_bao(),
                                          content: 'Internal Server Error',
                                          flag: 'error'
                                    })
                              else
                                    Actions.popup({
                                          title: Lang.thong_bao(),
                                          content: error.message,
                                          flag: 'error'
                                    })
                        }
                        else {
                              var error = JSON.parse(data._bodyText).error
                              Actions.popup({
                                    title: Lang.thong_bao(),
                                    content: error.message,
                                    flag: 'error'
                              })
                        }
                  }, 10)
            }
      },

      responseHandle2(data, password, resolve, reject) {
            if (data.status == 200) {
                  resolve(JSON.parse(data._bodyText))
            }
            else {
                  reject('error')
                  setTimeout(() => {
                        if (data.status == 500) {
                              var error = JSON.parse(data._bodyText).error
                              if (error.code == 500)
                                    Actions.popup({
                                          title: Lang.thong_bao(),
                                          content: 'Internal Server Error',
                                          flag: 'error'
                                    })
                              else
                                    Actions.popup({
                                          title: Lang.thong_bao(),
                                          content: error.message,
                                          flag: 'error'
                                    })
                        }
                        else if (data.status == 203) {
                              // user đã có tk trên appota, cần đăng ký lại trên eWallet
                              var dataa = JSON.parse(data._bodyText);
                              Actions.popup({
                                    title: Lang.thong_bao(),
                                    content: Lang.so_dien_thoai_la_gi(),
                                    onPress_Ok: () => Actions.verify({ verify: dataa, password: password })
                              });
                        }
                        else {
                              var response = JSON.parse(data._bodyText)
                              Actions.popup({
                                    title: Lang.thong_bao(),
                                    content: response.error.message,
                                    flag: 'error'
                              })
                        }
                  }, 10)
            }
      },
      //END COMMON FUNC

      Login(account, password) {
            return new Promise((resolve, reject) => {
                  var device_name = (DeviceInfo.getDeviceName() == null) ? 'APAY' : DeviceInfo.getDeviceName();
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

                  fetch(API.LOGIN, {
                        headers: this.HeaderPOST(),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  })
                        .then((data) => {
                              this.responseHandle2(data, password, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      TrackClient(access_token, device_token, appsflyer_id, appsflyer_idfa, appsflyer_advertising_id) {
            return new Promise((resolve, reject) => {
                  var device_name = (DeviceInfo.getDeviceName() == null) ? 'APAY' : DeviceInfo.getDeviceName();
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
                  Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; })
                  var args = Object.keys(obj).map(function (k) { return obj[k] })
                  var signature = crypto(args.join('') + secret_key).toString()
                  obj.signature = signature

                  fetch(API.TRACK_CLIENT, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      User_Infor(access_token) {
            return new Promise((resolve, reject) => {
                  fetch(API.USER_INFO, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      List_Bank(access_token, bank_type) {
            return new Promise((resolve, reject) => {
                  fetch(API.LIST_BANK + '?type=' + bank_type, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      Logout(access_token) {
            return new Promise((resolve, reject) => {
                  fetch(API.LOGOUT, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      Update_Avatar(access_token, body) {
            return new Promise((resolve, reject) => {
                  fetch(API.UPDATE_AVATAR, {
                        headers: this.HeaderTokenGET(access_token),
                        method: 'POST',
                        body: body
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      Request_Borrow(access_token, scrivener_phone_number, amount, message) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000);
                  var params = {
                        amount: amount,
                        message: message,
                        scrivener_phone_number: scrivener_phone_number,
                        ts: time
                  }
                  const obj = {};
                  Object.keys(params).sort().forEach(function (key) { obj[key] = params[key]; })
                  var args = Object.keys(obj).map(function (k) { return obj[k] })
                  var signature = crypto(args.join('') + secret_key).toString()
                  obj.signature = signature

                  fetch(API.BORROW_REQUEST, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      Game_Packages(access_token, game_id) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000)
                  var params = {
                        game_id: game_id,
                        ts: time
                  }
                  const obj = {};
                  Object.keys(params).sort().forEach(function (key) { obj[key] = params[key]; })
                  var args = Object.keys(obj).map(function (k) { return obj[k] })
                  var signature = crypto(args.join('') + secret_key).toString()
                  obj.signature = signature
                  var list = Object.keys(obj).map(function (k) { return k + '=' + obj[k] }).join('&')

                  fetch(API.GAME_PACKAGES + '?' + list, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      Buy_Game_Packages(access_token, game_id, appota_username, role_id, role_name, server_id, server_name, package_id) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000);
                  var params = {
                        appota_username: appota_username,
                        game_id: game_id,
                        role_id: role_id,
                        role_name: role_name,
                        server_id: server_id,
                        server_name: server_name,
                        package_id: package_id,
                        ts: time
                  }
                  const obj = {};
                  Object.keys(params).sort().forEach(function (key) { obj[key] = params[key]; })
                  var args = Object.keys(obj).map(function (k) { return obj[k] })
                  var signature = crypto(args.join('') + secret_key).toString()
                  obj.signature = signature

                  fetch(API.BUY_GAME_PACKAGES, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      List_Game(access_token) {
            return new Promise((resolve, reject) => {
                  fetch(API.LIST_GAMES, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      Game_Cashback_Charging(access_token, game_id, appota_username, role_id, role_name, server_id, server_name, amount, package_id, package_value) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000);
                  var params = {
                        appota_username: appota_username,
                        game_id: game_id,
                        role_id: role_id,
                        role_name: role_name,
                        server_id: server_id,
                        server_name: server_name,
                        package_id: package_id,
                        ts: time,
                        amount: amount,
                        package_value: package_value
                  }
                  const obj = {};
                  Object.keys(params).sort().forEach(function (key) { obj[key] = params[key]; })
                  var args = Object.keys(obj).map(function (k) { return obj[k] })
                  var signature = crypto(args.join('') + secret_key).toString()
                  obj.signature = signature

                  fetch(API.GAME_CASHBACK_CHARGING, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      Verify_transaction(access_token, transaction_id, verify_code, verify_type) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000)
                  var params = {
                        transaction_id: transaction_id,
                        ts: time,
                        verify_code: verify_code,
                        verify_type: verify_type
                  }
                  const obj = {};
                  Object.keys(params).sort().forEach(function (key) { obj[key] = params[key]; })
                  var args = Object.keys(obj).map(function (k) { return obj[k] })
                  var signature = crypto(args.join('') + secret_key).toString()
                  obj.signature = signature

                  fetch(API.VERIFY_TRANSACTION, {
                        method: 'POST',
                        headers: this.HeaderTokenPOST(access_token),
                        body: JSON.stringify(obj)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      Cashout_Account(access_token) {
            return new Promise((resolve, reject) => {
                  fetch(API.CASHOUT_BANK_ACC, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  })
                        .then((data) => {
                              if (data.status == 200) {
                                    resolve(JSON.parse(data._bodyText))
                              }
                              else {
                                    var res = JSON.parse(data._bodyText)
                                    reject(res.error.message)
                              }
                        })
                        .catch((error) => {
                              reject(error.toString())
                        })
                        .done()
            })
      },

      List_Card(access_token) {
            return new Promise((resolve, reject) => {
                  fetch(API.LIST_CARD, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      Game_Giftcode(access_token, offset, limit, game_id, type) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000);
                  var list = {
                        ts: time,
                        limit: limit,
                        offset: offset,
                        game_id: game_id,
                        type: type
                  }
                  const obj = {};
                  Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
                  var args = Object.keys(obj).map(function (k) { return obj[k] });
                  var signature = crypto(args.join('') + secret_key).toString();
                  obj.signature = signature;
                  var params = Object.keys(obj).map(function (k) { return k + '=' + obj[k] }).join('&');

                  fetch(API.GAME_GIFTCODE + `?${params}`, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      Buy_Game_Giftcode(access_token, giftcode_id) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000);
                  var params = {
                        giftcode_id: giftcode_id,
                        ts: time,
                  }
                  const obj = {};
                  Object.keys(params).sort().forEach(function (key) { obj[key] = params[key]; })
                  var args = Object.keys(obj).map(function (k) { return obj[k] })
                  var signature = crypto(args.join('') + secret_key).toString()
                  obj.signature = signature

                  fetch(API.BUY_GAME_GIFTCODE, {
                        headers: this.HeaderTokenPOST(access_token),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  })
                        .then((data) => {
                              console.log('GC=' + JSON.stringify(data))
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      Spin_Turn(access_token) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000)
                  var params = {
                        ts: time,
                  }
                  const obj = {};
                  Object.keys(params).sort().forEach(function (key) { obj[key] = params[key]; })
                  var args = Object.keys(obj).map(function (k) { return obj[k] })
                  var signature = crypto(args.join('') + secret_key).toString()
                  obj.signature = signature

                  fetch(API.SPIN_INIT, {
                        method: 'POST',
                        headers: this.HeaderTokenPOST(access_token),
                        body: JSON.stringify(obj)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      User_Archive(access_token, offset, limit, type) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000);
                  var list = {
                        ts: time,
                        limit: limit,
                        offset: offset,
                        type: type
                  }
                  const obj = {};
                  Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
                  var args = Object.keys(obj).map(function (k) { return obj[k] });
                  var signature = crypto(args.join('') + secret_key).toString();
                  obj.signature = signature;
                  var params = Object.keys(obj).map(function (k) { return k + '=' + obj[k] }).join('&');

                  fetch(API.USER_ARCHIVE + `?${params}`, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      Delete_User_Archive(access_token, ids) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000);
                  var list = {
                        ts: time,
                        ids: ids,
                  }
                  const obj = {};
                  Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
                  var args = Object.keys(obj).map(function (k) { return obj[k] });
                  var signature = crypto(args.join('') + secret_key).toString();
                  obj.signature = signature;
                  var params = Object.keys(obj).map(function (k) { return k + '=' + obj[k] }).join('&');

                  fetch(API.USER_ARCHIVE_DELETE + `?${params}`, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      GetOTP(phone_number) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000);
                  var obj = {
                        phone_number: phone_number,
                        ts: time
                  }
                  var args = Object.keys(obj).map(function (k) { return obj[k] });
                  var signature = crypto(args.join('') + secret_key).toString();
                  obj.signature = signature;
                  fetch(API.GET_OTP, {
                        headers: this.HeaderPOST(),
                        method: 'POST',
                        body: JSON.stringify(obj)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      Verify_Register(otp, phone_number) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000)
                  var params = {
                        otp: otp,
                        phone_number: phone_number,
                        ts: time
                  }
                  const obj = {};
                  Object.keys(params).sort().forEach(function (key) { obj[key] = params[key]; })
                  var args = Object.keys(obj).map(function (k) { return obj[k] })
                  var signature = crypto(args.join('') + secret_key).toString()
                  obj.signature = signature

                  fetch(API.VERIFY_REGISTER, {
                        method: 'POST',
                        headers: this.HeaderPOST(),
                        body: JSON.stringify(obj)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      Verify_Login(access_token, otp) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000)
                  var params = {
                        verify_code: otp,
                        verify_type: 'OTP',
                        ts: time
                  }
                  const obj = {};
                  Object.keys(params).sort().forEach(function (key) { obj[key] = params[key]; })
                  var args = Object.keys(obj).map(function (k) { return obj[k] })
                  var signature = crypto(args.join('') + secret_key).toString()
                  obj.signature = signature

                  fetch(API.VERIFY_LOGIN, {
                        method: 'POST',
                        headers: this.HeaderTokenPOST(access_token),
                        body: JSON.stringify(obj)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      enableSmsOtp(access_token, auto_renew) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000)
                  var params = {
                        auto_renew: auto_renew,
                        ts: time
                  }
                  const obj = {};
                  Object.keys(params).sort().forEach(function (key) { obj[key] = params[key]; })
                  var args = Object.keys(obj).map(function (k) { return obj[k] })
                  var signature = crypto(args.join('') + secret_key).toString()
                  obj.signature = signature

                  fetch(API.ENABLE_SMS_OTP, {
                        method: 'POST',
                        headers: this.HeaderTokenPOST(access_token),
                        body: JSON.stringify(obj)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      disableSmsOtp(access_token) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000)
                  var params = {
                        ts: time
                  }
                  const obj = {};
                  Object.keys(params).sort().forEach(function (key) { obj[key] = params[key]; })
                  var args = Object.keys(obj).map(function (k) { return obj[k] })
                  var signature = crypto(args.join('') + secret_key).toString()
                  obj.signature = signature

                  fetch(API.DISABLE_SMS_OTP, {
                        method: 'POST',
                        headers: this.HeaderTokenPOST(access_token),
                        body: JSON.stringify(obj)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      transacionDetail(access_token, transaction_id, type) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000);
                  var list = {
                        ts: time,
                        transaction_id: transaction_id,
                        type: type
                  }
                  const obj = {};
                  Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
                  var args = Object.keys(obj).map(function (k) { return obj[k] });
                  var signature = crypto(args.join('') + secret_key).toString();
                  obj.signature = signature;
                  var params = Object.keys(obj).map(function (k) { return k + '=' + obj[k] }).join('&');

                  fetch(API.TRANSACTION_DETAIL + `?${params}`, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },

      getBillInfo(access_token, service_code, bill_code) {
            return new Promise((resolve, reject) => {
                  var time = parseInt(new Date().getTime() / 1000);
                  var list = {
                        ts: time,
                        service_code: service_code,
                        bill_code: bill_code
                  }
                  const obj = {};
                  Object.keys(list).sort().forEach(function (key) { obj[key] = list[key]; });
                  var args = Object.keys(obj).map(function (k) { return obj[k] });
                  var signature = crypto(args.join('') + secret_key).toString();
                  obj.signature = signature;
                  var params = Object.keys(obj).map(function (k) { return k + '=' + obj[k] }).join('&');

                  fetch(API.BILL_INFO + `?${params}`, {
                        method: 'GET',
                        headers: this.HeaderTokenGET(access_token)
                  })
                        .then((data) => {
                              this.responseHandle(data, resolve, reject)
                        })
                        .catch((error) => {
                              this.onError(error.toString(), reject)
                        })
                        .done()
            })
      },
}
