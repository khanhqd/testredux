import React, { Component } from 'react';
import {
      Platform,
      Alert,
      Keyboard,
      AsyncStorage,
      StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
var Lang = require('../Common/Lang');

module.exports = {
      vendorHelper(contact_number) {
            var mobile_number1 = contact_number.substr(0, 4);
            var mobile_number2 = contact_number.substr(0, 3);
            if (mobile_number2 == '090' || mobile_number2 == '089' || mobile_number2 == '093' || mobile_number1 == '0120' || mobile_number1 == '0121' || mobile_number1 == '0122' || mobile_number1 == '0126' || mobile_number1 == '0128') {
                  return 'mobi';
            }
            else if (mobile_number2 == '096' || mobile_number2 == '086' || mobile_number2 == '097' || mobile_number2 == '098' || mobile_number1 == '0162' || mobile_number1 == '0163' || mobile_number1 == '0164' || mobile_number1 == '0165' || mobile_number1 == '0166' || mobile_number1 == '0167' || mobile_number1 == '0168' || mobile_number1 == '0169') {
                  return 'viettel';
            }
            else if (mobile_number2 == '091' || mobile_number2 == '088' | mobile_number2 == '094' || mobile_number1 == '0123' || mobile_number1 == '0124' || mobile_number1 == '0125' || mobile_number1 == '0127' || mobile_number1 == '0129') {
                  return 'vina';
            }
            else if (mobile_number2 == '092' || mobile_number1 == '0188') {
                  return 'vnmobi';
            }
            else if (mobile_number2 == '095') {
                  return 'sfone';
            }
            else if (mobile_number1 == '0993' || mobile_number1 == '0994' || mobile_number1 == '0995' || mobile_number1 == '0996' || mobile_number1 == '0199') {
                  return 'gmobi';
            }
      },

      vendor2Name(vendor){
            return vendor.charAt(0).toUpperCase() + vendor.slice(1).toLowerCase()
      },

      toFixed(value, precision) {
            var power = Math.pow(10, precision || 0);
            return String(Math.round(value * power) / power);
      },

      toDotString(num) {
            var parts = num.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return parts.join(".");
      },

      replaceAll(text, search, replace) {
            //if replace is not sent, return original string otherwise it will
            if (replace === undefined) {
                  return text.toString();
            }
            return text.replace(new RegExp('[' + search + ']', 'g'), replace);
      },

      change_alias(alias) {
            var str = alias;
            str = str.toLowerCase();
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ  |ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ  |ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|$|_/g, "");
            /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
            str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
            str = str.replace(/^\-+|\-+$/g, "");
            //cắt bỏ ký tự - ở đầu và cuối chuỗi 
            return str;
      },

      number_format(number, decimals, dec_point, thousands_sep) {
            number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number;
            var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
            var sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
            var dec = (typeof dec_point === 'undefined') ? '.' : dec_point;
            var s = '';
            var toFixedFix = function (n, prec) {
                  var k = Math.pow(10, prec);
                  return '' + (Math.round(n * k) / k).toFixed(prec);
            };
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            if (s[0].length > 3) {
                  s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '').length < prec) {
                  s[1] = s[1] || '';
                  s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
      },

      getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
            var dLon = this.deg2rad(lon2 - lon1);
            var a =
                  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2)
                  ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km

            return d;
      },

      deg2rad(deg) {
            return deg * (Math.PI / 180)
      },

      onNetworkError(error) {
            if (error.indexOf('Network') > -1)
                  return Actions.popup({ title: Lang.thong_bao(), content: Lang.loi_ket_noi(), flag: 'error' });
            else
                  return Actions.popup({ title: Lang.thong_bao(), content: error, flag: 'error' });
      },

      onRequestEnd(data, content) {
            if (data.status == 401) {
                  AsyncStorage.removeItem("access_token");
                  return Actions.popup({ title: Lang.thong_bao(), content: Lang.token_het_han(), flag: 'error', onPress_Ok: () => Actions.login() });
            }
            else if (data.status == 500) {
                  return Actions.popup({ title: Lang.thong_bao(), content: 'Internal Server Error', flag: 'error' });
            }
            else {
                  var err = JSON.parse(data._bodyText);
                  return Actions.popup({ title: Lang.thong_bao(), content: err.error.message, flag: 'error' });
            }
      },

      Description_ThanhToan() {
            return (
                  Lang.des_thanh_toan()
            );
      },

      Description_NapTien() {
            return (
                  Lang.des_nap_tien()
            );
      },

      Description_MuaThe() {
            return (
                  Lang.des_mua_the2()
            );
      }
};
