import React, { Component } from 'react';
import {
      Platform,
      Alert,
      AsyncStorage
} from "react-native";
import LocalizedStrings from 'react-native-localization';
import { PRICE } from '../Helpers/constString'

module.exports = {
      initLang(lang) {
            return strings.setLanguage(lang);
      },

      getDeviceLang() {
            return strings.getInterfaceLanguage();
      },

      getLanguage() {
            return strings.getLanguage();
      },

      nap_dienthoai2() {
            return strings.nap_dienthoai2;
      },

      nap_game2() {
            return strings.nap_game2;
      },

      mua_the2() {
            return strings.mua_the2;
      },

      mua_the_nhanh() {
            return strings.mua_the_nhanh;
      },

      mua_the_khac() {
            return strings.mua_the_khac;
      },

      hoa_don2() {
            return strings.hoa_don2;
      },

      san_pham2() {
            return strings.san_pham2;
      },

      nhan_tien2() {
            return strings.nhan_tien2;
      },

      tk_vi() {
            return strings.tk_vi;
      },

      tk_cashback() {
            return strings.tk_cashback;
      },

      muon_tien() {
            return strings.muon_tien;
      },

      rut_tien() {
            return strings.rut_tien;
      },

      chuyen_tien() {
            return strings.chuyen_tien;
      },

      li_xi() {
            return strings.li_xi;
      },

      li_xi_content() {
            return strings.li_xi_content;
      },

      li_xi_alert_title() {
            return strings.li_xi_alert_title;
      },

      li_xi_alert_content() {
            return strings.li_xi_alert_content;
      },

      san_pham() {
            return strings.san_pham;
      },

      nap_game() {
            return strings.nap_game;
      },

      noi_bat() {
            return strings.noi_bat;
      },

      nap_dienthoai() {
            return strings.nap_dienthoai;
      },

      mua_the() {
            return strings.mua_the;
      },

      chiet_khau() {
            return strings.chiet_khau;
      },

      hoa_don() {
            return strings.hoa_don;
      },

      mua_ve() {
            return strings.mua_ve;
      },

      pizza() {
            return strings.pizza;
      },

      nap_tien() {
            return strings.nap_tien;
      },

      trang_chu() {
            return strings.trang_chu;
      },

      kham_pha() {
            return strings.kham_pha;
      },

      tin_tuc() {
            return strings.tin_tuc;
      },

      thong_bao() {
            return strings.thong_bao;
      },

      ca_nhan() {
            return strings.ca_nhan;
      },

      tim_cua_hang() {
            return strings.tim_cua_hang;
      },

      can_dang_nhap() {
            return strings.can_dang_nhap;
      },

      confirm_checkin(type) {
            return strings.formatString(strings.confirm_checkin, type);
      },

      button_ok() {
            return strings.button_ok;
      },

      button_huy() {
            return strings.button_huy;
      },

      button_dong() {
            return strings.button_dong;
      },
      button_nhan_li_xi() {
            return strings.button_nhan_li_xi;
      },
      checkin_that_bai() {
            return strings.checkin_that_bai;
      },

      checkin_thanh_cong(type) {
            return strings.formatString(strings.checkin_thanh_cong, type);
      },

      loi_ket_noi() {
            return strings.loi_ket_noi;
      },

      token_het_han() {
            return strings.token_het_han;
      },

      des_thanh_toan() {
            return strings.des_thanh_toan;
      },

      des_nap_tien() {
            return strings.des_nap_tien;
      },

      des_mua_the() {
            return strings.des_mua_the;
      },

      des_mua_the2() {
            return strings.des_mua_the2;
      },

      thong_tin() {
            return strings.thong_tin;
      },

      so_dien_thoai() {
            return strings.so_dien_thoai;
      },

      so_tien() {
            return strings.so_tien;
      },

      noi_dung() {
            return strings.noi_dung;
      },

      nhap_so_dien_thoai() {
            return strings.nhap_so_dien_thoai;
      },

      nhap_so_tien() {
            return strings.nhap_so_tien;
      },

      nhap_so_tien_min(tien) {
            return strings.formatString(strings.nhap_so_tien_min, tien)
      },

      nhap_so_tien_max(tien) {
            if (tien == 5)
                  return strings.nhap_so_tien_max_5;
      },

      muon_tien_thanh_cong() {
            return strings.muon_tien_thanh_cong;
      },

      chon_hinh_thuc_rut() {
            return strings.chon_hinh_thuc_rut;
      },

      tk_khong_du() {
            return strings.tk_khong_du;
      },

      xac_nhan_doi_tien(amount) {
            return strings.formatString(strings.xac_nhan_doi_tien, amount);
      },

      doi_tien_thanh_cong() {
            return strings.doi_tien_thanh_cong;
      },

      phi() {
            return strings.phi;
      },

      mien_phi() {
            return strings.mien_phi;
      },

      khong_mat_phi() {
            return strings.khong_mat_phi;
      },

      ngon_ngu() {
            return strings.ngon_ngu;
      },

      lang() {
            return strings.lang;
      },

      doi_mat_khau() {
            return strings.doi_mat_khau;
      },

      doi_ma_pin() {
            return strings.doi_ma_pin;
      },

      phien_ban() {
            return strings.phien_ban;
      },

      dieu_kien_tham_gia() {
            return strings.dieu_kien_tham_gia;
      },

      cac_cam_ket() {
            return strings.cac_cam_ket;
      },

      ho_tro() {
            return strings.ho_tro;
      },

      cua_hang() {
            return strings.cua_hang;
      },

      nguoi_dung() {
            return strings.nguoi_dung;
      },

      xac_nhan_dang_xuat() {
            return strings.xac_nhan_dang_xuat;
      },

      thanh_toan() {
            return strings.thanh_toan;
      },

      hoan_tien() {
            return strings.hoan_tien;
      },

      cai_dat() {
            return strings.cai_dat;
      },

      gioi_thieu() {
            return strings.gioi_thieu;
      },

      chinh_sach() {
            return strings.chinh_sach;
      },

      dang_xuat() {
            return strings.dang_xuat;
      },

      so_tien_hoan_lai() {
            return strings.so_tien_hoan_lai;
      },

      gui_yeu_cau() {
            return strings.gui_yeu_cau;
      },

      hinh_thuc_thanh_toan() {
            return strings.hinh_thuc_thanh_toan;
      },

      yeu_cau_thanh_toan() {
            return strings.yeu_cau_thanh_toan;
      },

      lich_su() {
            return strings.lich_su;
      },

      tat_ca() {
            return strings.tat_ca;
      },

      thang() {
            return strings.thang;
      },

      cho_muon_tien() {
            return strings.cho_muon_tien;
      },

      doi_tien_sang_vi() {
            return strings.doi_tien_sang_vi;
      },

      nhan_tien_cashback() {
            return strings.nhan_tien_cashback;
      },

      nap_game_Tkvi() {
            return strings.nap_game_Tkvi;
      },

      nap_game_card() {
            return strings.nap_game_card;
      },

      nap_game_bank() {
            return strings.nap_game_bank;
      },

      nhan_tien_Tkvi() {
            return strings.nhan_tien_Tkvi;
      },

      chuyen_tien_Tkvi() {
            return strings.chuyen_tien_Tkvi;
      },

      nhan_tien_thanh_toan() {
            return strings.nhan_tien_thanh_toan;
      },

      khong_xem_duoc_lich_su() {
            return strings.khong_xem_duoc_lich_su;
      },

      lich_su_giao_dich() {
            return strings.lich_su_giao_dich;
      },

      chi_tiet_lich_su() {
            return strings.chi_tiet_lich_su;
      },

      loai_giao_dich() {
            return strings.loai_giao_dich;
      },

      loai_the() {
            return strings.loai_the;
      },

      ma_giao_dich() {
            return strings.ma_giao_dich;
      },

      thoi_gian() {
            return strings.thoi_gian;
      },

      menh_gia() {
            return strings.menh_gia;
      },

      ma_the() {
            return strings.ma_the;
      },

      han_dung() {
            return strings.han_dung;
      },

      login_fail() {
            return strings.login_fail;
      },

      mat_khau() {
            return strings.mat_khau;
      },

      quen_mat_khau() {
            return strings.quen_mat_khau;
      },

      ban_chua_co_tk() {
            return strings.ban_chua_co_tk;
      },

      dang_ky() {
            return strings.dang_ky;
      },

      dang_nhap() {
            return strings.dang_nhap;
      },

      dang_nhap_thanh_cong() {
            return strings.dang_nhap_thanh_cong;
      },

      cap_nhat_thong_tin_thanh_cong() {
            return strings.cap_nhat_thong_tin_thanh_cong;
      },

      cap_nhat_thong_tin_that_bai() {
            return strings.cap_nhat_thong_tin_that_bai;
      },

      thong_tin_ca_nhan() {
            return strings.thong_tin_ca_nhan;
      },

      ten_day_du() {
            return strings.ten_day_du;
      },

      cmnd() {
            return strings.cmnd;
      },

      dia_chi() {
            return strings.dia_chi;
      },

      cap_nhat() {
            return strings.cap_nhat;
      },

      the_tin_dung() {
            return strings.the_tin_dung;
      },

      khong_du_tien() {
            return strings.khong_du_tien;
      },

      danh_ba() {
            return strings.danh_ba;
      },

      yeu_thich() {
            return strings.yeu_thich;
      },

      tim_kiem() {
            return strings.tim_kiem;
      },

      nhan_vat() {
            return strings.nhan_vat;
      },

      chon_server() {
            return strings.chon_server;
      },

      chon_nhan_vat() {
            return strings.chon_nhan_vat;
      },

      chon_goi_nap() {
            return strings.chon_goi_nap;
      },

      goi_nap() {
            return strings.goi_nap;
      },

      the_cao() {
            return strings.the_cao;
      },

      tai_khoan() {
            return strings.tai_khoan;
      },

      khong_ton_tai() {
            return strings.khong_ton_tai;
      },

      nhap_appota_id() {
            return strings.nhap_appota_id;
      },

      lay_thong_tin_game() {
            return strings.lay_thong_tin_game;
      },

      chon_loai_the() {
            return strings.chon_loai_the;
      },

      thong_tin_the_cao() {
            return strings.thong_tin_the_cao;
      },

      nhap_serial() {
            return strings.nhap_serial;
      },

      nhap_ma_the() {
            return strings.nhap_ma_the;
      },

      tiep_tuc() {
            return strings.tiep_tuc;
      },

      gia() {
            return strings.gia;
      },

      so_luong() {
            return strings.so_luong;
      },

      da_copy() {
            return strings.da_copy;
      },

      chi_tiet_giao_dich() {
            return strings.chi_tiet_giao_dich;
      },

      dang_phat_trien() {
            return strings.dang_phat_trien;
      },

      des_dang_phat_trien() {
            return strings.des_dang_phat_trien;
      },

      chon_dich_vu() {
            return strings.chon_dich_vu;
      },

      dien() {
            return strings.dien;
      },

      nuoc() {
            return strings.nuoc;
      },

      truyen_hinh() {
            return strings.truyen_hinh;
      },

      bao_hiem() {
            return strings.bao_hiem;
      },

      dien_thoai_co_dinh() {
            return strings.dien_thoai_co_dinh;
      },

      dien_thoai_di_dong() {
            return strings.dien_thoai_di_dong;
      },

      vay_tieu_dung() {
            return strings.vay_tieu_dung;
      },

      khong_lay_duoc_thong_tin() {
            return strings.khong_lay_duoc_thong_tin;
      },

      lien_he() {
            return strings.lien_he;
      },

      hinh_anh() {
            return strings.hinh_anh;
      },

      danh_gia() {
            return strings.danh_gia;
      },

      ban_do() {
            return strings.ban_do;
      },

      des_danh_gia() {
            return strings.des_danh_gia;
      },

      danh_gia_thanh_cong() {
            return strings.danh_gia_thanh_cong;
      },

      danh_gia_that_bai() {
            return strings.danh_gia_that_bai;
      },

      chi_duong() {
            return strings.chi_duong;
      },

      chon_ung_dung_map() {
            return strings.chon_ung_dung_map;
      },

      thu_vien_anh() {
            return strings.thu_vien_anh;
      },

      lay_tin_tuc_fail() {
            return strings.lay_tin_tuc_fail;
      },

      tu_choi_muon_tien() {
            return strings.tu_choi_muon_tien;
      },

      tu_choi_thanh_toan() {
            return strings.tu_choi_thanh_toan;
      },

      cap_nhat_avt_thanh_cong() {
            return strings.cap_nhat_avt_thanh_cong;
      },

      cap_nhat_avt_that_bai() {
            return strings.cap_nhat_avt_that_bai;
      },

      chon_ngan_hang() {
            return strings.chon_ngan_hang;
      },

      quen_mat_khau_thanh_cong() {
            return strings.quen_mat_khau_thanh_cong;
      },

      so_dien_thoai_la_gi() {
            return strings.so_dien_thoai_la_gi;
      },

      gui_ma_toi_so_nay() {
            return strings.gui_ma_toi_so_nay;
      },

      mat_khau_la_gi() {
            return strings.mat_khau_la_gi;
      },

      mat_khau_de_thao_tac() {
            return strings.mat_khau_de_thao_tac;
      },

      doi_mat_khau_thanh_cong() {
            return strings.doi_mat_khau_thanh_cong;
      },

      mat_khau_de_doi_pin() {
            return strings.mat_khau_de_thao_tac;
      },

      ma_xac_minh() {
            return strings.ma_xac_minh;
      },

      xac_minh_lay_mat_khau() {
            return strings.xac_minh_lay_mat_khau;
      },

      chua_nhan_duoc_otp() {
            return strings.chua_nhan_duoc_otp;
      },

      nhap_otp_gui_toi_so() {
            return strings.nhap_otp_gui_toi_so;
      },

      des_so_dien_thoai() {
            return strings.des_so_dien_thoai;
      },

      gui_lai() {
            return strings.gui_lai;
      },

      giay() {
            return strings.giay;
      },

      doi_so() {
            return strings.doi_so;
      },

      otp_sai() {
            return strings.otp_sai;
      },

      yeu_cau_otp_sau() {
            return strings.yeu_cau_otp_sau;
      },

      luc_khac() {
            return strings.luc_khac;
      },

      dang_ky_thanh_cong() {
            return strings.dang_ky_thanh_cong;
      },

      xac_nhan_giao_dich() {
            return strings.xac_nhan_giao_dich;
      },

      ngan_hang() {
            return strings.ngan_hang;
      },

      so_du() {
            return strings.so_du;
      },

      tong_tien() {
            return strings.tong_tien;
      },

      giao_dich_thanh_cong() {
            return strings.giao_dich_thanh_cong;
      },

      giao_dich_that_bai() {
            return strings.giao_dich_that_bai;
      },

      nha_mang() {
            return strings.nha_mang;
      },

      nguon_tien() {
            return strings.nguon_tien;
      },

      qua_ngan_hang() {
            return strings.qua_ngan_hang;
      },

      qua_tk_vi() {
            return strings.qua_tk_vi;
      },

      chuc_mung_nam_moi() {
            return strings.chuc_mung_nam_moi;
      },

      mat_khau_cu() {
            return strings.mat_khau_cu;
      },

      mat_khau_moi() {
            return strings.mat_khau_moi;
      },

      nhap_lai_mat_khau() {
            return strings.nhap_lai_mat_khau;
      },

      mat_khau_moi_6_ky_tu() {
            return strings.mat_khau_moi_6_ky_tu;
      },

      mat_khau_khong_khop() {
            return strings.mat_khau_khong_khop;
      },

      nhap_day_du_thong_tin() {
            return strings.nhap_day_du_thong_tin;
      },

      xac_minh() {
            return strings.xac_minh;
      },

      thanh_cong() {
            return strings.thanh_cong;
      },

      tieng_anh() {
            return strings.tieng_anh;
      },

      tieng_viet() {
            return strings.tieng_viet;
      },

      chon_ngon_ngu() {
            return strings.chon_ngon_ngu;
      },

      lien_ket_the() {
            return strings.lien_ket_the;
      },

      nhap_noi_dung() {
            return strings.nhap_noi_dung;
      },

      gan_day() {
            return strings.gan_day;
      },

      rut_tien_thanh_cong() {
            return strings.rut_tien_thanh_cong;
      },

      chon() {
            return strings.chon;
      },

      my_qrcode() {
            return strings.my_qrcode;
      },

      confirm_li_xi(phone) {
            return strings.formatString(strings.confirm_li_xi, phone);
      },

      confirm_thanh_toan(phone) {
            return strings.formatString(strings.confirm_thanh_toan, phone);
      },

      confirm_thanh_toan_hoa_don(amount, phone) {
            return strings.formatString(strings.confirm_thanh_toan_hoa_don, amount, phone);
      },

      qrcode_khong_dung() {
            return strings.qrcode_khong_dung;
      },

      quet_ma() {
            return strings.quet_ma;
      },

      map_gan_day() {
            return strings.map_gan_day;
      },

      vi_appota() {
            return strings.vi_appota;
      },

      ten_la_gi() {
            return strings.ten_la_gi;
      },

      des_update_name() {
            return strings.des_update_name;
      },

      chia_se() {
            return strings.chia_se;
      },

      luu_anh() {
            return strings.luu_anh;
      },

      nhan_tien() {
            return strings.nhan_tien;
      },

      luu_anh_thanh_cong() {
            return strings.luu_anh_thanh_cong;
      },

      appota_hoac_phone() {
            return strings.appota_hoac_phone;
      },

      lien_ket_appota() {
            return strings.lien_ket_appota;
      },

      xoa() {
            return strings.xoa;
      },

      lam_moi() {
            return strings.lam_moi;
      },

      nhap_ma_pin() {
            return strings.nhap_ma_pin;
      },

      nhap_lai_ma_pin() {
            return strings.nhap_lai_ma_pin;
      },

      tao_ma_pin() {
            return strings.tao_ma_pin;
      },

      pin_khong_dung() {
            return strings.pin_khong_dung;
      },

      pin_khong_khop() {
            return strings.pin_khong_khop;
      },

      tao_pin_thanh_cong() {
            return strings.tao_pin_thanh_cong;
      },

      xoa_thong_bao_thanh_cong() {
            return strings.xoa_thong_bao_thanh_cong;
      },

      confirm_xoa_thong_bao() {
            return strings.confirm_xoa_thong_bao;
      },

      ten_dang_nhap() {
            return strings.ten_dang_nhap;
      },

      confirm_chuyen_tien(phone) {
            return strings.formatString(strings.confirm_chuyen_tien, phone);
      },

      so_the() {
            return strings.so_the;
      },

      ten_chu_the() {
            return strings.ten_chu_the;
      },

      het_han() {
            return strings.het_han;
      },

      ma_pin_moi() {
            return strings.ma_pin_moi;
      },

      cap_nhat_pin_thanh_cong() {
            return strings.cap_nhat_pin_thanh_cong;
      },

      cap_nhat_pin_that_bai() {
            return strings.cap_nhat_pin_that_bai;
      },

      quen_ma_pin() {
            return strings.quen_ma_pin;
      },

      so_tai_khoan() {
            return strings.so_tai_khoan;
      },

      chu_tai_khoan() {
            return strings.chu_tai_khoan;
      },

      nap_vi() {
            return strings.nap_vi;
      },

      nap_vi2() {
            return strings.nap_vi2;
      },

      nhan_vien() {
            return strings.nhan_vien;
      },

      quan_ly_nhan_vien() {
            return strings.quan_ly_nhan_vien;
      },

      them_nhan_vien() {
            return strings.them_nhan_vien;
      },

      danh_sach_nhan_vien() {
            return strings.danh_sach_nhan_vien;
      },

      khong_co_nhan_vien() {
            return strings.khong_co_nhan_vien;
      },

      ten_nhan_vien() {
            return strings.ten_nhan_vien;
      },

      chon_anh_dai_dien() {
            return strings.chon_anh_dai_dien;
      },

      chup_anh() {
            return strings.chup_anh;
      },

      chon_anh_thu_vien() {
            return strings.chon_anh_thu_vien;
      },

      nap_vi_bang_card(vendor) {
            return strings.formatString(strings.nap_vi_bang_card, vendor);
      },

      thuc_linh() {
            return strings.thuc_linh;
      },

      confirm_xoa_nv() {
            return strings.confirm_xoa_nv;
      },

      ten_ban_la_gi() {
            return strings.ten_ban_la_gi;
      },

      update_profile_title() {
            return strings.update_profile_title;
      },

      update_profile_desc() {
            return strings.update_profile_desc;
      },

      note_cashback_1() {
            return strings.note_cashback_1;
      },

      note_cashback_2() {
            return strings.note_cashback_2;
      },

      note_cashback_3() {
            return strings.note_cashback_3;
      },

      confirm_touch_id() {
            return strings.confirm_touch_id;
      },

      khong_co_nv_game() {
            return strings.khong_co_nv_game;
      },

      thanh_toan_nhanh_bang_vi() {
            return strings.thanh_toan_nhanh_bang_vi;
      },

      mo_khoa_bang_van_tay() {
            return strings.mo_khoa_bang_van_tay;
      },

      nhac_cua_hang_hoan_tien(percent) {
            return strings.formatString(strings.nhac_cua_hang_hoan_tien, percent);
      },

      nap_game_khac(percent) {
            return strings.formatString(strings.nap_game_khac, percent);
      },

      nap_game_nhanh1(percent) {
            return strings.formatString(strings.nap_game_nhanh1, percent);
      },

      nap_game_nhanh2(percent) {
            return strings.formatString(strings.nap_game_nhanh2, percent);
      },

      co_loi() {
            return strings.co_loi;
      },

      khong_co_thong_bao() {
            return strings.khong_co_thong_bao;
      },

      tui_do() {
            return strings.tui_do;
      },

      chi_tiet() {
            return strings.chi_tiet;
      },

      khong_co_vat_pham() {
            return strings.khong_co_vat_pham;
      },

      gui_tin_nhan() {
            return strings.gui_tin_nhan;
      },

      dieu_le() {
            return strings.dieu_le;
      },

      giao_dich_chua_thanh_cong() {
            return strings.giao_dich_chua_thanh_cong;
      },

      so_tien_la_boi_so10() {
            return strings.so_tien_la_boi_so10;
      },

      copy_code() {
            return strings.copy_code;
      },

      copy_serial() {
            return strings.copy_serial;
      },

      nap_the_nay() {
            return strings.nap_the_nay;
      },

      danh_sach_ma_the() {
            return strings.danh_sach_ma_the;
      },

      danh_sach_giftcode() {
            return strings.danh_sach_giftcode;
      },

      mini_game() {
            return strings.mini_game;
      },

      ca_cuoc() {
            return strings.ca_cuoc;
      },

      giftcode() {
            return strings.giftcode;
      },

      vong_quay_may_man() {
            return strings.vong_quay_may_man;
      },

      des_vong_quay_may_man() {
            return strings.des_vong_quay_may_man;
      },

      don_vi_tien() {
            return strings.don_vi_tien;
      },

      des_rut_tien() {
            return strings.des_rut_tien;
      },

      chi_nhanh() {
            return strings.chi_nhanh;
      },

      confirm_buy_giftcode(giftcode, game, price) {
            return strings.formatString(strings.confirm_buy_giftcode, giftcode, game, price);
      },

      doi_gift_code() {
            return strings.doi_gift_code;
      },

      khong_du_spin() {
            return strings.khong_du_spin;
      },

      mua_spin() {
            return strings.mua_spin;
      },

      xac_minh_tai_khoan() {
            return strings.xac_minh_tai_khoan;
      },

      chua_dang_nhap() {
            return strings.chua_dang_nhap;
      },

      moi_ban_dang_nhap() {
            return strings.moi_ban_dang_nhap;
      },

      dung_spin_doi_giftcode() {
            return strings.dung_spin_doi_giftcode;
      },

      cai_dat_bao_mat() {
            return strings.cai_dat_bao_mat;
      },

      bat_tat_sms_otp() {
            return strings.bat_tat_sms_otp;
      },

      des_bat_tat_sms_otp() {
            return strings.formatString(strings.des_bat_tat_sms_otp, PRICE.SMS_OTP);
      },

      tai_du_lieu() {
            return strings.tai_du_lieu;
      },

      thanh_toan_sms() {
            return strings.thanh_toan_sms;
      },

      mien_phi_otp_sms() {
            return strings.mien_phi_otp_sms;
      },

      quyen_loi_vip() {
            return strings.quyen_loi_vip;
      },

      the_atm_ibanking() {
            return strings.the_atm_ibanking;
      },

      ngan_hang_noi_dia() {
            return strings.ngan_hang_noi_dia;
      },

      thu_mua_the() {
            return strings.thu_mua_the;
      },

      thu_mua_the2() {
            return strings.thu_mua_the2;
      },
};

let strings = new LocalizedStrings({
      en: {
            nap_game2: "Games top up",
            nap_game_khac: "Other games",
            nap_game_nhanh1: "Quick top up games",
            nap_game_nhanh2: "Choose the best discount to top up",
            nap_dienthoai2: 'Mobile top up',
            mua_the2: 'Buy prepaid cards',
            mua_the_nhanh: 'Quick buy cards',
            mua_the_khac: 'Buy other value cards',
            hoa_don2: 'Pay bills',
            san_pham2: "Product checking",
            nhan_tien2: 'Receive money',
            tk_vi: "Wallet balance",
            tk_cashback: "Cashback balance",
            rut_tien: "Withdraw ",
            chuyen_tien: "Transfer",
            li_xi: "Lucky Money",
            li_xi_content: "Lucky money to friends and your relatives",
            li_xi_alert_title: "Lucky Money",
            li_xi_alert_content: "You got lucky money from phone number",
            san_pham: "Product\nChecking",
            nap_game: "Games\nTop Up ",
            noi_bat: "Featured",
            nap_dienthoai: "Mobile\nTop Up",
            mua_the: 'Buy cards',
            chiet_khau: "Big deal",
            hoa_don: 'Utilities',
            mua_ve: "Buy tickets",
            pizza: "Order pizza",
            nap_tien: 'Top up',
            trang_chu: "Home",
            kham_pha: "Discover",
            tin_tuc: "News",
            thong_bao: "Notifications",
            ca_nhan: "Me",
            tim_cua_hang: "Search ",
            can_dang_nhap: "You need to log in to use this feature !",
            confirm_checkin: "Do you want to {0} at",
            button_huy: 'Cancel',
            button_ok: 'OK',
            button_dong: 'Close',
            button_nhan_li_xi: 'RECEIVED LUCKY MONEY',
            checkin_that_bai: 'Check-in failed',
            checkin_thanh_cong: '{0} successfully',
            loi_ket_noi: 'Connection error, please try again!',
            token_het_han: 'Access token expired, please log in again!',
            des_thanh_toan: 'Paid by wallet: Free\nPaid by Visa, Master Card, Amex, JCB: 3%+7000VND\nPaid by ATM/ iBanking: Free',
            des_nap_tien: `Minimum amount: 20.000 VND\nCashin by card: ${PRICE.CASHIN_CARD}\nNạp tiền bằng ATM/Internet Banking: Miễn phí\nCashin by Visa, Master Card, Amex, JCB: 3%+7000VND`,
            des_mua_the: 'Cashback:\n\n6% cashback with Appota card\n5% cashback with Vinaphone card\n4.5% cashback with Mobifone card\n3% cashback with Viettel card',
            des_mua_the2: 'Cashback:\n\n5% cashback with Vinaphone card\n4.5% cashback with Mobifone card\n3% cashback with Viettel card',
            thong_tin: 'Information',
            so_dien_thoai: 'Phone number',
            so_tien: 'Amount',
            noi_dung: 'Message',
            nhap_so_dien_thoai: 'Please input a valid phone number',
            nhap_so_tien: 'Input amount',
            nhap_so_tien_min: 'Please input amount bigger than {0} VND',
            nhap_so_tien_max_5: 'Please input amount smaller than 5.000.000 VND',
            muon_tien_thanh_cong: 'Borrow successfully',
            chon_hinh_thuc_rut: 'Choose withdrawal method',
            tk_khong_du: 'Insufficient balance',
            xac_nhan_doi_tien: 'Transfer {0}VND from Cashback account to Wallet account?',
            doi_tien_thanh_cong: 'Transfer successfully!',
            phi: 'Transaction fee',
            mien_phi: 'Free',
            khong_mat_phi: 'Free',
            ngon_ngu: 'Language',
            lang: 'Ti?ng Anh',
            doi_mat_khau: 'Change password',
            doi_ma_pin: 'Change PIN',
            phien_ban: 'Version',
            dieu_kien_tham_gia: 'Terms of service',
            cac_cam_ket: 'Commitments',
            ho_tro: 'Support',
            cua_hang: 'Merchants',
            nguoi_dung: 'Users',
            xac_nhan_dang_xuat: 'Are you sure to log out?',
            thanh_toan: 'Pay',
            hoan_tien: 'Cashback',
            cai_dat: 'Settings',
            gioi_thieu: 'About us',
            chinh_sach: 'Privacy policy',
            dang_xuat: 'Log out',
            so_tien_hoan_lai: 'Cashback amount',
            gui_yeu_cau: 'Send request',
            hinh_thuc_thanh_toan: 'Payment method',
            yeu_cau_thanh_toan: 'Request payment',
            lich_su: 'History',
            tat_ca: 'All',
            thang: 'Month',
            cho_muon_tien: 'Lend money',
            muon_tien: 'Borrow money',
            doi_tien_sang_vi: 'Transfer money to Wallet ',
            nhan_tien_cashback: 'Received cashback amount',
            nap_game_Tkvi: 'Buy game credits by Wallet balance ',
            nap_game_card: 'Buy game credits with Telco prepaid cards',
            nap_game_bank: 'Buy game credits by Bank account balance ',
            nhan_tien_Tkvi: 'Receive money to Wallet',
            chuyen_tien_Tkvi: 'Transfer money to Wallet',
            nhan_tien_thanh_toan: 'Receive payment',
            khong_xem_duoc_lich_su: 'Cannot retrieve transaction history',
            lich_su_giao_dich: 'Transaction history',
            chi_tiet_lich_su: 'History detail',
            loai_giao_dich: 'Transaction type',
            ma_giao_dich: 'Transaction code',
            thoi_gian: 'Time',
            menh_gia: 'Value',
            han_dung: 'Expiry date',
            ma_the: 'Card code',
            login_fail: 'Incorrect phone number or password',
            mat_khau: 'Password',
            quen_mat_khau: 'Forgotten password',
            ban_chua_co_tk: 'Do you have an account?',
            dang_ky: 'Register',
            dang_nhap: 'Login',
            dang_nhap_thanh_cong: 'You are logged in',
            cap_nhat_thong_tin_thanh_cong: 'User info updated',
            cap_nhat_thong_tin_that_bai: 'Fail to update user info',
            thong_tin_ca_nhan: 'Profile',
            ten_day_du: 'Full name',
            cmnd: 'National ID number ',
            dia_chi: 'Address',
            cap_nhat: 'Update',
            the_tin_dung: 'Credit card',
            khong_du_tien: 'Insufficient balance',
            danh_ba: 'Contacts',
            yeu_thich: 'Favorite',
            tim_kiem: 'Search',
            nhan_vat: 'Nick name',
            chon_server: 'Choose server',
            chon_nhan_vat: 'Choose game nick name',
            chon_goi_nap: 'Choose package',
            goi_nap: 'Package',
            the_cao: 'Cards',
            tai_khoan: 'Account',
            khong_ton_tai: 'does not exist',
            nhap_appota_id: 'Input your Appota ID',
            lay_thong_tin_game: 'Get game information',
            chon_loai_the: 'Choose card type',
            thong_tin_the_cao: 'Card information',
            nhap_serial: 'Input card serial number ',
            nhap_ma_the: 'Input card number',
            tiep_tuc: 'Continue',
            gia: 'Price',
            loai_the: 'Card type',
            so_luong: 'Quantity ',
            da_copy: 'Copied to clipboard',
            chi_tiet_giao_dich: 'Transaction details',
            dang_phat_trien: 'Coming soon',
            des_dang_phat_trien: 'This feature is being developed, please come back later!',
            chon_dich_vu: 'Choose services',
            dien: 'Electricity',
            nuoc: 'Water',
            truyen_hinh: 'Cable TV',
            bao_hiem: 'Insurance',
            dien_thoai_co_dinh: 'Landline phone',
            dien_thoai_di_dong: 'Mobile phone',
            vay_tieu_dung: 'Loans',
            khong_lay_duoc_thong_tin: 'Cannot connect to server, please try again',
            lien_he: 'Contact',
            hinh_anh: 'Images',
            danh_gia: 'Rating',
            ban_do: 'Maps',
            des_danh_gia: 'Rate this store\'s services',
            danh_gia_that_bai: 'Rating failed',
            danh_gia_thanh_cong: 'Thank you for your review',
            chi_duong: 'Direction',
            chon_ung_dung_map: 'Choose your map application',
            thu_vien_anh: 'Photo library',
            lay_tin_tuc_fail: 'Failed to get news',
            tu_choi_muon_tien: 'Rejected successfully',
            tu_choi_thanh_toan: 'Rejected payment successfully',
            cap_nhat_avt_thanh_cong: 'Updated avatar successfully',
            cap_nhat_avt_that_bai: 'Updated avatar failed',
            quen_mat_khau_thanh_cong: 'Request to change password received',
            so_dien_thoai_la_gi: 'What is your phone number ?',
            gui_ma_toi_so_nay: 'Appota will send OTP to change password on this phone number',
            mat_khau_la_gi: 'What is your password?',
            mat_khau_de_thao_tac: 'The password which user uses to log in and manage account or do other activities in Appota system ',
            mat_khau_de_doi_pin: 'Enter the password to authenticate your account before changing PIN',
            doi_mat_khau_thanh_cong: 'Password changed successfully!',
            ma_xac_minh: 'One time password',
            xac_minh_lay_mat_khau: 'Verify to get your password',
            chua_nhan_duoc_otp: 'Have you received password yet ?',
            nhap_otp_gui_toi_so: 'Please input the OTP that is sent to your phone number',
            des_so_dien_thoai: 'This phone number wil be used in Appota system ',
            gui_lai: 'Resend',
            giay: 'second',
            doi_so: 'Replace number',
            otp_sai: 'Your OTP is incorrect',
            yeu_cau_otp_sau: 'Request for OTP again after',
            luc_khac: 'At another time ',
            dang_ky_thanh_cong: 'Register successfully',
            xac_nhan_giao_dich: 'Confirm transaction',
            ngan_hang: 'Bank',
            so_du: 'Balance',
            tong_tien: 'Total',
            giao_dich_thanh_cong: 'Transaction successfully',
            giao_dich_that_bai: 'Transaction failed',
            nha_mang: 'Mobile Carrier',
            nguon_tien: 'Money source',
            qua_ngan_hang: 'by bank',
            qua_tk_vi: 'by wallet',
            chuc_mung_nam_moi: 'Happy New Year!',
            mat_khau_cu: 'Old password',
            mat_khau_moi: 'New password',
            nhap_lai_mat_khau: 'Retype new password',
            mat_khau_moi_6_ky_tu: 'Password must be at least 6 characters',
            mat_khau_khong_khop: 'Password does not match',
            nhap_day_du_thong_tin: 'Please complete all information',
            xac_minh: 'Verify',
            thanh_cong: 'successfully',
            tieng_anh: 'English',
            tieng_viet: 'Vietnamese',
            chon_ngon_ngu: 'Choose language',
            lien_ket_the: 'Bank cards',
            nhap_noi_dung: 'Please input your message',
            gan_day: 'Recent',
            rut_tien_thanh_cong: 'Your transaction is successful. We\'ll process your request within 24 hours. Please be patient',
            chon: 'Select',
            my_qrcode: 'Share this code to people you would like to receive money from',
            confirm_li_xi: 'Do you confirm to give lucky money to {0}?',
            confirm_thanh_toan: 'Do you confirm to make a payment to the store {0}?',
            confirm_thanh_toan_hoa_don: 'Do you confirm to pay bill with value of {0}d for the store {1} ?',
            qrcode_khong_dung: 'Qr code incorrect',
            quet_ma: 'Scan',
            map_gan_day: 'Nearby',
            vi_appota: 'Appota Wallet',
            ten_la_gi: 'What\'s your name?',
            des_update_name: 'Use your real name to be recognized easily',
            chia_se: 'Share',
            luu_anh: 'Save',
            nhan_tien: 'Receive\nMoney',
            luu_anh_thanh_cong: 'Saved to Camera Roll!',
            appota_hoac_phone: 'Appota ID or Phone number',
            lien_ket_appota: 'Would you like to connect your phone number with Appota ID?',
            xoa: 'Delete',
            lam_moi: 'Reset',
            nhap_ma_pin: 'Input PIN code',
            tao_ma_pin: 'Create PIN code',
            nhap_lai_ma_pin: 'Retype PIN code',
            pin_khong_khop: 'PIN code does not match',
            tao_pin_thanh_cong: 'PIN code created successfully',
            pin_khong_dung: 'Incorrect PIN code',
            xoa_thong_bao_thanh_cong: 'Deleted successfully !',
            confirm_xoa_thong_bao: 'Do you confirm to delete notification?',
            ten_dang_nhap: 'Username',
            confirm_chuyen_tien: 'Do you confirm to send money to {0}?',
            so_the: 'Card number',
            ten_chu_the: 'Account holder',
            het_han: 'Expiry',
            ma_pin_moi: 'New PIN code',
            cap_nhat_pin_thanh_cong: 'Updated PIN code successfully',
            cap_nhat_pin_that_bai: 'Updated PIN code failed',
            quen_ma_pin: 'Forgot PIN code',
            so_tai_khoan: 'Account number',
            chu_tai_khoan: 'Account name',
            nap_vi: "Deposits",
            nap_vi2: 'Wallet deposits',
            nhan_vien: 'Staff',
            quan_ly_nhan_vien: 'Staff management',
            them_nhan_vien: 'Add employee',
            danh_sach_nhan_vien: 'Employees list',
            khong_co_nhan_vien: 'You still haven\'t added staff!',
            ten_nhan_vien: 'Name',
            chon_anh_dai_dien: 'Select profile picture',
            chup_anh: 'Take photo',
            chon_anh_thu_vien: 'Choose from photos',
            nap_vi_bang_card: 'You have topped up Appota wallet successfully with {0} card',
            thuc_linh: 'Net wage',
            confirm_xoa_nv: 'Do you agree to delete staff?',
            ten_ban_la_gi: 'What\'s your name?',
            update_profile_title: 'Complete your profile',
            update_profile_desc: 'Update your information to have more support from us',
            note_cashback_1: 'Storekeeper send a request to customer service',
            note_cashback_2: 'Storekeeper transfer cashback-money for user have bill at their store',
            note_cashback_3: 'Storekeeper create QRCode for customer scan and make a payment',
            confirm_touch_id: 'Use your figherprint to access',
            khong_co_nv_game: 'Don\'t have any nick name in this server:',
            thanh_toan_nhanh_bang_vi: 'Buy cards quickly with wallet balance',
            mo_khoa_bang_van_tay: 'Unlock with your fingerprint',
            nhac_cua_hang_hoan_tien: 'Please remind storekeeper cashback {0}% bill after make a payment.',
            co_loi: 'get more',
            khong_co_thong_bao: 'You still haven\'t received any notification',
            tui_do: 'My bag',
            chi_tiet: 'Detail',
            khong_co_vat_pham: 'Your box is empty',
            gui_tin_nhan: 'Send message',
            dieu_le: 'Rule',
            giao_dich_chua_thanh_cong: 'This transaction haven\'t succeeded yet, do you want to go back to screen home?',
            so_tien_la_boi_so10: 'Amount must be a multiple of 10.000 VND',
            copy_code: 'Copy code',
            copy_serial: 'Copy serial',
            nap_the_nay: 'Top up by this card',
            des_rut_tien: `Withdrawal account is executed in your first time is real account and will be linked with wallet account. If you wanna change, let's call 0919015533`,
            danh_sach_ma_the: 'List of prepaid card codes',
            danh_sach_giftcode: 'List giftcode',
            ca_cuoc: 'Betting',
            mini_game: 'Mini game',
            giftcode: 'Giftcode',
            vong_quay_may_man: 'Lucky spin',
            des_vong_quay_may_man: 'How to make money free, easy and win real cash everyday',
            don_vi_tien: 'VND',
            chi_nhanh: 'Branch',
            confirm_buy_giftcode: 'Do you confirm buy "{0}" of "{1}" with {2}?',
            doi_gift_code: 'Confirm exchange',
            khong_du_spin: `Don't have enough the number of spins to exchange the giftcode. Access Lucky Spin to receive more turns.`,
            mua_spin: 'Buy spin',
            xac_minh_tai_khoan: 'Verify to login',
            chua_dang_nhap: 'You are not logged in',
            moi_ban_dang_nhap: 'Please sign in to use full features on this application. Please click here!',
            dung_spin_doi_giftcode: 'Use the Lucky Spin to exchange the giftcode',
            cai_dat_bao_mat: 'Security setting',
            bat_tat_sms_otp: 'OTP SMS',
            des_bat_tat_sms_otp: 'Turn on to receive OTP before make a payment\nMonthly payment: {0} VND/30 days\nFree for VIP 3',
            tai_du_lieu: 'Downloading',
            thanh_toan_sms: 'Pay for OTP SMS sevice',
            mien_phi_otp_sms: 'Free OTP SMS service for VIP 3',
            quyen_loi_vip: 'VIP benefit',
            the_atm_ibanking: 'ATM/iBanking',
            ngan_hang_noi_dia: 'Domestic bank',
            thu_mua_the: 'Procurement\nCard',
            thu_mua_the2: 'Procurement card'
      },
      vi: {
            nap_game2: "Nạp game",
            nap_game_khac: "Game khác",
            nap_game_nhanh1: "Nạp game nhanh",
            nap_game_nhanh2: "Bạn nên chọn cách nạp có lợi nhất",
            nap_dienthoai2: 'Nạp tiền điện thoại',
            mua_the2: 'Mua mã thẻ',
            mua_the_nhanh: 'Mua mã thẻ nhanh',
            mua_the_khac: 'Mua thẻ với các mệnh giá khác',
            hoa_don2: 'Thanh toán hóa đơn',
            san_pham2: "Check sản phẩm",
            nhan_tien2: 'Nhận tiền',
            tk_vi: "TK Ví",
            tk_cashback: "TK Cashback",
            muon_tien: "Mượn tiền",
            rut_tien: "Rút tiền",
            chuyen_tien: "Chuyển tiền",
            li_xi: "Lì xì",
            li_xi_content: "Hãy lì xì đến bạn bè và người thân của bạn",
            li_xi_alert_title: "Lì xì tết",
            li_xi_alert_content: "Bạn đã nhận được lì xì từ số điện thoại",
            san_pham: "Check\nSản phẩm",
            nap_game: "Nạp game",
            noi_bat: "Nổi bật",
            nap_dienthoai: "Nạp tiền\nĐiện thoại",
            mua_the: "Mua\nMã thẻ",
            chiet_khau: "Kèo thơm",
            hoa_don: "Thanh toán\nHóa đơn",
            mua_ve: "Mua vé",
            pizza: "Gọi pizza",
            nap_tien: "Nạp tiền",
            trang_chu: "Trang chủ",
            kham_pha: "Khám phá",
            tin_tuc: "Tin tức",
            thong_bao: "Thông báo",
            ca_nhan: "Cá nhân",
            tim_cua_hang: "Tìm cửa hàng",
            can_dang_nhap: "Bạn cần đăng nhập để sử dụng tính năng này!",
            confirm_checkin: "Bạn có muốn {0} tại cửa hàng",
            button_huy: 'Hủy',
            button_ok: 'Đồng ý',
            button_dong: 'Đóng',
            button_nhan_li_xi: 'NHẬN LÌ XÌ',
            checkin_that_bai: 'Check-in tại cửa hàng thất bại',
            checkin_thanh_cong: 'Bạn đã {0} thành công tại cửa hàng',
            loi_ket_noi: 'Kết nối bị lỗi, vui lòng kiểm tra lại!',
            token_het_han: 'Phiên làm việc hết hạn, vui lòng đăng nhập lại!',
            des_thanh_toan: 'Thanh toán bằng ví: Miễn phí\nThanh toán bằng thẻ tín dụng Visa, Master Card, Amex, JCB: 3%+7000VND\nThanh toán bằng ATM/ iBanking: Miễn phí',
            des_nap_tien: `Số tiền tối thiểu: 20.000 đ\nNạp tiền bằng thẻ cào: ${PRICE.CASHIN_CARD}\nNạp tiền bằng ATM/Internet Banking: Miễn phí\nNạp tiền bằng thẻ tín dụng Visa, Master Card, Amex, JCB: 3%+7000đ`,
            des_mua_the: 'Hoàn ngay:\n\n6% chiết khấu khi mua thẻ Appota\n5% chiết khấu cho thẻ Vinaphone\n4.5% chiết khấu cho thẻ Mobifone\n3% cho thẻ Viettel',
            des_mua_the2: 'Hoàn ngay:\n\n5% chiết khấu cho thẻ Vinaphone\n4.5% chiết khấu cho thẻ Mobifone\n3% cho thẻ Viettel',
            thong_tin: 'Thông tin',
            so_dien_thoai: 'Số điện thoại',
            so_tien: 'Số tiền',
            noi_dung: 'Nội dung',
            nhap_so_dien_thoai: 'Bạn cần nhập đúng số điện thoại',
            nhap_so_tien: 'Bạn cần nhập số tiền',
            nhap_so_tien_10: 'Bạn cần nhập số tiền lớn hơn 10.000 đ',
            nhap_so_tien_20: 'Bạn cần nhập số tiền lớn hơn 20.000 đ',
            nhap_so_tien_50: 'Bạn cần nhập số tiền lớn hơn 50.000 đ',
            nhap_so_tien_200: 'Bạn cần nhập số tiền lớn hơn 200.000 đ',
            nhap_so_tien_100: 'Bạn cần nhập số tiền lớn hơn 100.000 đ',
            nhap_so_tien_min: 'Bạn cần nhập số tiền lớn hơn {0} đ',
            nhap_so_tien_max_5: 'Bạn cần nhập số tiền bé hơn 5.000.000 đ',
            muon_tien_thanh_cong: 'Yêu cầu mượn tiền thành công',
            chon_hinh_thuc_rut: 'Chọn hình thức rút tiền',
            tk_khong_du: 'Tài khoản của bạn không đủ',
            xac_nhan_doi_tien: 'Thực hiện quy đổi {0}đ từ tài khoản Cashback sang tài khoản Ví?',
            doi_tien_thanh_cong: 'Quy đổi tài khoản Cashback sang tài khoản Ví thành công!',
            phi: 'Phí giao dịch',
            mien_phi: 'Miễn phí',
            khong_mat_phi: 'Không mất phí',
            ngon_ngu: 'Ngôn ngữ',
            lang: 'Vietnamese',
            doi_mat_khau: 'Đổi mật khẩu',
            doi_ma_pin: 'Đổi mã PIN',
            phien_ban: 'Phiên bản',
            dieu_kien_tham_gia: 'Điều kiện tham gia',
            cac_cam_ket: 'Các cam kết',
            ho_tro: 'Hỗ trợ',
            cua_hang: 'Cửa hàng',
            nguoi_dung: 'Người dùng',
            xac_nhan_dang_xuat: 'Bạn có muốn đăng xuất?',
            thanh_toan: 'Thanh toán',
            hoan_tien: 'Hoàn tiền',
            cai_dat: 'Cài đặt',
            gioi_thieu: 'Giới thiệu',
            chinh_sach: 'Chính sách',
            dang_xuat: 'Đăng xuất',
            so_tien_hoan_lai: 'Số tiền hoàn lại',
            gui_yeu_cau: 'Gửi yêu cầu',
            hinh_thuc_thanh_toan: 'Hình thức thanh toán',
            yeu_cau_thanh_toan: 'Yêu cầu thanh toán',
            lich_su: 'Lịch sử',
            tat_ca: 'Tất cả',
            thang: 'Tháng',
            cho_muon_tien: 'Cho mượn tiền',
            doi_tien_sang_vi: 'Đổi tiền sang Tk ví',
            nhan_tien_cashback: 'Nhận tiền cashback',
            nap_game_Tkvi: 'Nạp game bằng Tk ví',
            nap_game_card: 'Nạp game bằng thẻ cào',
            nap_game_bank: 'Nạp game qua ngân hàng',
            nhan_tien_Tkvi: 'Nhận tiền Tk ví',
            chuyen_tien_Tkvi: 'Chuyển tiền Tk ví',
            nhan_tien_thanh_toan: 'Nhận tiền thanh toán',
            khong_xem_duoc_lich_su: 'Tạm thời không xem được chi tiết lịch sử',
            lich_su_giao_dich: 'Lịch sử giao dịch',
            chi_tiet_lich_su: 'Chi tiết lịch sử',
            loai_giao_dich: 'Loại giao dịch',
            ma_giao_dich: 'Mã giao dịch',
            thoi_gian: 'Thời gian',
            menh_gia: 'Mệnh giá',
            han_dung: 'Hạn dùng',
            ma_the: 'Mã thẻ',
            login_fail: 'Số điện thoại hoặc mật khẩu không đúng',
            mat_khau: 'Mật khẩu',
            quen_mat_khau: 'Quên mật khẩu',
            ban_chua_co_tk: 'Bạn chưa có tài khoản?',
            dang_ky: 'Đăng ký',
            dang_nhap: 'Đăng nhập',
            dang_nhap_thanh_cong: 'Đăng nhập thành công',
            cap_nhat_thong_tin_thanh_cong: 'Cập nhật thông tin cá nhân thành công',
            cap_nhat_thong_tin_that_bai: 'Cập nhật thông tin cá nhân thất bại',
            thong_tin_ca_nhan: 'Thông tin cá nhân',
            ten_day_du: 'Tên đầy đủ',
            cmnd: 'Chứng minh nhân dân',
            dia_chi: 'Địa chỉ',
            cap_nhat: 'Cập nhật',
            the_tin_dung: 'Thẻ tín dụng',
            khong_du_tien: 'Số dư ví không đủ',
            danh_ba: 'Danh bạ',
            yeu_thich: 'Yêu thích',
            tim_kiem: 'Tìm kiếm',
            nhan_vat: 'Nhân vật',
            chon_server: 'Chọn server',
            chon_nhan_vat: 'Chọn nhân vật',
            chon_goi_nap: 'Chọn gói nạp',
            goi_nap: 'Gói nạp',
            the_cao: 'Thẻ cào',
            tai_khoan: 'Tài khoản',
            khong_ton_tai: 'Không tồn tại',
            nhap_appota_id: 'Nhập tài khoản Appota',
            lay_thong_tin_game: 'Lấy thông tin game',
            chon_loai_the: 'Chọn loại thẻ',
            thong_tin_the_cao: 'Thông tin thẻ cào',
            nhap_serial: 'Nhập serial',
            nhap_ma_the: 'Nhập mã thẻ',
            tiep_tuc: 'Tiếp tục',
            gia: 'Giá',
            loai_the: 'Loại thẻ',
            so_luong: 'Số lượng',
            da_copy: 'Đã copy vào clipboard',
            chi_tiet_giao_dich: 'Chi tiết giao dịch',
            dang_phat_trien: 'Đang phát triển',
            des_dang_phat_trien: 'Tính năng này đang trong quá trình phát triển, mời bạn quay lại sau!',
            chon_dich_vu: 'Chọn dịch vụ',
            dien: 'Điện',
            nuoc: 'Nước',
            truyen_hinh: 'Truyền hình',
            bao_hiem: 'Bảo hiểm',
            dien_thoai_co_dinh: 'Điện thoại\ncố định',
            dien_thoai_di_dong: 'Điện thoại\ndi động',
            vay_tieu_dung: 'Vay\ntiêu dùng',
            khong_lay_duoc_thong_tin: 'Không lấy được thông tin từ máy chủ, vui lòng thử lại',
            lien_he: 'Liên hệ',
            hinh_anh: 'Hình ảnh',
            danh_gia: 'Đánh giá',
            ban_do: 'Bản đồ',
            des_danh_gia: 'Vui lòng đánh giá chất lượng dịch vụ của cửa hàng',
            danh_gia_that_bai: 'Đánh giá cửa hàng thất bại',
            danh_gia_thanh_cong: 'Đánh giá cửa hàng thành công',
            chi_duong: 'Chỉ đường',
            chon_ung_dung_map: 'Ứng dụng nào bạn muốn sử dụng?',
            thu_vien_anh: 'Thư viện ảnh',
            lay_tin_tuc_fail: 'Lấy danh sách tin tức thất bại',
            tu_choi_muon_tien: 'Bạn đã từ chối cho mượn tiền thành công',
            tu_choi_thanh_toan: 'Bạn đã từ chối thanh toán tiền thành công',
            cap_nhat_avt_thanh_cong: 'Bạn đã cập nhật ảnh đại diện thành công',
            cap_nhat_avt_that_bai: 'Bạn đã cập nhật ảnh đại diện thất bại',
            quen_mat_khau_thanh_cong: 'Bạn đã yêu cầu thay đổi mật khẩu thành công',
            so_dien_thoai_la_gi: 'Số di động của bạn là gì?',
            gui_ma_toi_so_nay: 'Appota sẽ gửi mã xác minh đổi mật khẩu về số điện thoại này',
            mat_khau_la_gi: 'Mật khẩu của bạn là gì?',
            mat_khau_de_thao_tac: 'Mật khẩu để đăng nhập và quản lý tài khoản hay các thao tác trên hệ thống của Appota',
            mat_khau_de_doi_pin: 'Nhập mật khẩu để xác thực tài khoản trước khi đổi mã PIN',
            doi_mat_khau_thanh_cong: 'Bạn đã thay đổi mật khẩu thành công',
            ma_xac_minh: 'Mã xác minh',
            xac_minh_lay_mat_khau: 'Xác minh lấy lại mật khẩu',
            chua_nhan_duoc_otp: 'Bạn chưa nhận được mã?',
            nhap_otp_gui_toi_so: 'Vui lòng nhập mã xác minh đã được gửi đến số',
            des_so_dien_thoai: 'Bạn sẽ dùng số này khi sử dụng trên hệ thống của Appota',
            gui_lai: 'Gửi lại',
            giay: 'giây',
            doi_so: 'Đổi số',
            otp_sai: 'Mã xác minh không đúng',
            yeu_cau_otp_sau: 'Yêu cầu lại sau',
            luc_khac: 'Lúc khác',
            dang_ky_thanh_cong: 'Đăng ký tài khoản thành công',
            xac_nhan_giao_dich: 'Xác nhận giao dịch',
            ngan_hang: 'Ngân hàng',
            so_du: 'Số dư',
            tong_tien: 'Tổng tiền',
            giao_dich_thanh_cong: 'Giao dịch thành công',
            giao_dich_that_bai: 'Giao dịch thất bại',
            nha_mang: 'Nhà mạng',
            nguon_tien: 'Nguồn tiền',
            qua_ngan_hang: 'qua ngân hàng',
            qua_tk_vi: 'qua tk ví',
            chuc_mung_nam_moi: 'Chúc mừng năm mới!',
            mat_khau_cu: 'Mật khẩu cũ',
            mat_khau_moi: 'Mật khẩu mới',
            nhap_lai_mat_khau: 'Nhập lại mật khẩu mới',
            mat_khau_moi_6_ky_tu: 'Mật khẩu mới phải trên 6 ký tự',
            mat_khau_khong_khop: 'Nhập lại mật khẩu không khớp',
            nhap_day_du_thong_tin: 'Vui lòng nhập đầy đủ thông tin',
            xac_minh: 'Xác minh',
            thanh_cong: 'Thành công',
            tieng_anh: 'Tiếng Anh',
            tieng_viet: 'Tiếng Việt',
            chon_ngon_ngu: 'Chọn ngôn ngữ',
            lien_ket_the: 'Liên kết',
            nhap_noi_dung: 'Nhập nội dung',
            gan_day: 'Gần đây',
            rut_tien_thanh_cong: 'Rút tiền thành công, giao dịch của bạn sẽ được xử lý trong vòng 24h',
            chon: 'Chọn',
            my_qrcode: 'Bạn có thể dùng mã QRCode này để để gửi cho bất kỳ người nào. Người nhận sẽ dùng tính năng quét mã QRCode để chuyển tiền và lì xì cho bạn một cách nhanh chóng',
            confirm_li_xi: 'Bạn có đồng ý lì xì cho số điện thoại {0} không?',
            confirm_thanh_toan: 'Bạn có đồng ý thanh toán cho cửa hàng có số điện thoại {0} không?',
            confirm_thanh_toan_hoa_don: 'Bạn có đồng ý thanh toán số tiền {0}đ cho cửa hàng có số điện thoại {1} không?',
            qrcode_khong_dung: 'Qr Code không đúng',
            quet_ma: 'Quét mã',
            map_gan_day: 'Gần đây',
            vi_appota: 'Ví Appota',
            ten_la_gi: 'Tên của bạn là gì?',
            des_update_name: 'Dùng tên thật giúp bạn bè nhận ra bạn dễ dàng hơn',
            chia_se: 'Chia sẻ',
            luu_anh: 'Lưu',
            nhan_tien: 'Nhận tiền',
            luu_anh_thanh_cong: 'Lưu ảnh vào thư viện thành công!',
            appota_hoac_phone: 'Appota ID hoặc Số điện thoại',
            lien_ket_appota: 'Bạn có muốn liên kết số điện thoại này vào Appota ID của bạn không?',
            xoa: 'Xóa',
            lam_moi: 'Làm mới',
            nhap_ma_pin: 'Nhập mã PIN',
            tao_ma_pin: 'Tạo mã PIN',
            nhap_lai_ma_pin: 'Nhập lại mã PIN',
            pin_khong_khop: 'Nhập lại mã PIN không khớp',
            tao_pin_thanh_cong: 'Tạo mã PIN thành công',
            pin_khong_dung: 'Mã PIN không đúng',
            xoa_thong_bao_thanh_cong: 'Xóa thành công!',
            confirm_xoa_thong_bao: 'Bạn có muốn xóa thông báo này?',
            ten_dang_nhap: 'Tên đăng nhập',
            confirm_chuyen_tien: 'Bạn có đồng ý chuyển tiền cho số điện thoại {0} không?',
            so_the: 'Số thẻ',
            ten_chu_the: 'Tên chủ thẻ',
            het_han: 'Hết hạn',
            ma_pin_moi: 'Mã PIN mới',
            cap_nhat_pin_thanh_cong: 'Cập nhật mã PIN thành công',
            cap_nhat_pin_that_bai: 'Cập nhật mã PIN thất bại',
            quen_ma_pin: 'Quên mã PIN',
            so_tai_khoan: 'Số tài khoản',
            chu_tai_khoan: 'Chủ tài khoản',
            nap_vi: "Nạp ví",
            nap_vi2: 'Nạp tiền vào ví',
            nhan_vien: 'Nhân viên',
            quan_ly_nhan_vien: 'Quản lý nhân viên',
            them_nhan_vien: 'Thêm nhân viên',
            danh_sach_nhan_vien: 'Danh sách nhân viên',
            khong_co_nhan_vien: 'Bạn chưa thêm nhân viên nào',
            ten_nhan_vien: 'Tên nhân viên',
            chon_anh_dai_dien: 'Chọn ảnh đại diện',
            chup_anh: 'Chụp ảnh',
            chon_anh_thu_vien: 'Chọn ảnh từ thư viện',
            nap_vi_bang_card: 'Bạn đã nạp ví thành công bằng thẻ {0} trị giá',
            thuc_linh: 'Thực lĩnh',
            confirm_xoa_nv: 'Bạn có đồng ý xóa nhân viên này?',
            ten_ban_la_gi: 'Tên bạn là gì?',
            update_profile_title: 'Hoàn thiện hồ sơ của bạn',
            update_profile_desc: 'Cập nhật những thông tin của bạn để được hỗ trợ nhiều hơn',
            note_cashback_1: 'Chủ cửa hàng gửi yêu cầu thanh toán đến khách hàng đã sử dụng dịch vụ',
            note_cashback_2: 'Chủ cửa hàng giảm giá cho khách hàng bằng chức năng "Hoàn tiền" để chuyển lại tiền cashback vào Ví cho khách hàng',
            note_cashback_3: 'Chủ cửa hàng tạo QRCode để khách hàng quét và thanh toán',
            confirm_touch_id: 'Dùng vân tay để truy cập',
            khong_co_nv_game: 'Không có nhân vật nào trong server:',
            thanh_toan_nhanh_bang_vi: 'Thanh toán nhanh với tài khoản ví',
            mo_khoa_bang_van_tay: 'Mở khoá bằng vân tay',
            nhac_cua_hang_hoan_tien: 'Hãy nhắc chủ cửa hàng hoàn tiền {0}% tổng hóa đơn sau khi bạn thanh toán.',
            co_loi: 'có lợi',
            khong_co_thong_bao: 'Bạn không có thông báo nào!',
            tui_do: 'Túi đồ',
            chi_tiet: 'Chi tiết',
            khong_co_vat_pham: 'Bạn không có vật phẩm nào',
            gui_tin_nhan: 'Gửi tin nhắn',
            dieu_le: 'Điều lệ',
            giao_dich_chua_thanh_cong: 'Giao dịch chưa thành công, bạn có đồng ý quay lại không?',
            so_tien_la_boi_so10: 'Số tiền rút cần là bội số của 10.000 đ',
            copy_code: 'Sao chép mã thẻ',
            copy_serial: 'Sao chép serial',
            nap_the_nay: 'Nạp luôn thẻ này',
            des_rut_tien: 'Tài khoản rút tiền sẽ được lưu lại cố định ở hệ thống, nếu muốn thay đổi vui lòng liên hệ đến SĐT 0919015533  (Số máy lẻ 102, 103).',
            danh_sach_ma_the: 'Danh sách mã thẻ',
            danh_sach_giftcode: 'Danh sách giftcode',
            mini_game: 'Mini game',
            ca_cuoc: 'Cược vui',
            giftcode: 'Giftcode',
            nhan_thuong_spin: 'Nhận thưởng ',
            vong_quay_may_man: 'Vòng quay may mắn',
            des_vong_quay_may_man: 'Vào game nhận ngay lượt quay miễn phí hàng ngày và nhiều giải thưởng hấp dẫn',
            don_vi_tien: 'đ',
            chi_nhanh: 'Chi nhánh',
            confirm_buy_giftcode: 'Bạn có muốn mua "{0}" của "{1}" với giá {2} không?',
            doi_gift_code: 'Xác nhận đổi Giftcode',
            khong_du_spin: 'Số lượt quay không đủ để đổi giftcode. Truy cập vào "Vòng quay may mắn" để có thêm lượt quay.',
            mua_spin: 'Mua lượt quay may mắn',
            xac_minh_tai_khoan: 'Xác minh tài khoản',
            chua_dang_nhap: 'Bạn chưa đăng nhập',
            moi_ban_dang_nhap: 'Mời bạn đăng nhập để sử dụng đầy đủ tính năng của ứng dụng. Xin vui lòng bấm vào đây!',
            dung_spin_doi_giftcode: 'Dùng lượt quay để đổi giftcode chơi game',
            cai_dat_bao_mat: 'Cài đặt bảo mật',
            bat_tat_sms_otp: 'Mã bảo mật OTP SMS',
            des_bat_tat_sms_otp: 'Bật để luôn nhận mã xác minh giao dịch\nPhí {0} đ/30 ngày\nMiễn phí với tài khoản VIP 3',
            tai_du_lieu: 'Đang tải dữ liệu',
            thanh_toan_sms: 'Thanh toán dịch vụ OTP SMS',
            mien_phi_otp_sms: 'Miễn phí dịch vụ OTP SMS đối với VIP 3',
            quyen_loi_vip: 'Quyền lợi VIP',
            the_atm_ibanking: 'Thẻ ATM/iBanking',
            ngan_hang_noi_dia: 'Ngân hàng nội địa',
            thu_mua_the: 'Thu mua\nThẻ',
            thu_mua_the2: 'Thu mua thẻ'
      }
});
