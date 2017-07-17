var Lang = require('../Common/Lang')
module.exports = {
    renderHistoryType(type) {
        switch (type) {
            case 'cashin':
                return Lang.nap_vi2()
            case 'cashout':
                return Lang.rut_tien()
            case 'lend_money':
                return Lang.cho_muon_tien()
            case 'borrow_money':
                return Lang.muon_tien()
            case 'cashout_cashback_money':
                return Lang.doi_tien_sang_vi()
            case 'cashback':
                return Lang.hoan_tien()
            case 'receive_cashback':
                return Lang.nhan_tien_cashback()
            case 'topup':
                return Lang.nap_dienthoai2()
            case 'game_ewallet_charging':
                return Lang.nap_game_Tkvi()
            case 'game_card_charging':
                return Lang.nap_game_card()
            case 'game_bank_charging':
                return Lang.nap_game_bank()
            case 'transfer':
                return Lang.chuyen_tien_Tkvi()
            case 'receive_transfer':
                return Lang.nhan_tien_Tkvi()
             case 'buy_card':
                return Lang.mua_the2()
            case 'receive_orders_money':
                return Lang.nhan_tien_thanh_toan()
            case 'payment_orders':
                return Lang.thanh_toan()
            case 'paymentorders':
                return Lang.thanh_toan()
            case 'payment':
                return Lang.thanh_toan()
            case 'receive_spin_reward':
                return Lang.vong_quay_may_man()
            case 'buy_spin':
                return Lang.mua_spin()
            case 'pay_sms_service':
                return Lang.thanh_toan_sms()
            default:
                return type
        }
    }
}