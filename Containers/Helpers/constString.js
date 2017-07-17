
// const host = 'https://api.test.ewallet.appotapay.com';
const host = 'https://api.gw.ewallet.appotapay.com';
// const host = 'https://api.gw.dev.ewallet.appotapay.com/'

export const API = {
    LOGIN: host + '/v1/auth/login',
    USER_INFO: host + '/v1/users/info',
    LIST_BANK: host + '/v1/banks',
    TRACK_CLIENT: host + '/v1/track/client',
    LOGOUT: host + '/v1/auth/logout',
    UPDATE_AVATAR: host + '/v1/users/change_avatar',
    BORROW_REQUEST: host + '/v1/transaction/borrow_money/request',
    BORROW_ACCEPT: host + '/v1/transaction/borrow_money/accept',
    BORROW_CONFIRM: host + '/v1/transaction/borrow_money/confirm',
    BORROW_DETAIL: host + '/v1/transaction/borrow_money/detail/',
    GAME_PACKAGES: host + '/v1/games/packages',
    BUY_GAME_PACKAGES: host + '/v1/games/buy_package_game/by_ewallet/request',
    LIST_GAMES: host + '/v1/games',
    GAME_CONFIG: host + '/v1/games/get_config',
    LIST_GAMES_SERVER: host + '/v1/games/get_list_server',
    LIST_GAME_ROLE: host + '/v1/games/get_list_role',
    GAME_CASHBACK_CHARGING: host + '/v1/games/payment/cashback_charging/request',
    VERIFY_TRANSACTION: host + '/v1/ewallet/transaction/verify',
    CASHOUT_BANK_ACC: host + '/v1/transaction/cashout/accounts',
    LIST_CARD: host + '/v1/shop/cards',
    GAME_GIFTCODE: host + '/v1/minigame/giftcodes',
    BUY_GAME_GIFTCODE: host + '/v1/minigame/giftcode/buy',
    SPIN_INIT: host + '/v1/minigame/spin/init',
    SPIN_TURN: host + '/v1/minigame/spin/request',
    USER_ARCHIVE: host + '/v1/users/archive',
    USER_ARCHIVE_DELETE: host + '/v1/users/archive/delete',
    GET_OTP: host + '/v1/auth/get_verify_code',
    VERIFY_REGISTER: host + '/v1/auth/verify_register',
    VERIFY_LOGIN: host + '/v1/auth/verify_login',
    ENABLE_SMS_OTP: host + '/v1/ewallet/sms_otp/transaction',
    DISABLE_SMS_OTP: host + '/v1/users/sms_otp/disable',
    TRANSACTION_DETAIL: host + '/v1/transaction/user_transaction/detail',
    BILL_INFO: host + '/v1/services/bill/info' 
}

export const LINK = {
    ABOUT: 'https://vi.appota.com/app/about.html',
    PRIVACY: 'https://vi.appota.com/app/privacy.html',
    CONDITIONS: 'https://vi.appota.com/app/conditions.html',
    COMMITMENT: 'https://vi.appota.com/app/commitment.html',
    SUPPORT_MERCHANT: 'https://vi.appota.com/app/suport-merchant.html',
    SUPPORT_USER: 'https://vi.appota.com/app/suport-user.html',
    DEFAULT_BANNER: 'https://in.ewallet.appotapay.com/uploads/avatar/042017/18057650_616757575194128_4208322316258326492_n.jpg',
    SPIN: 'https://vi.appota.com/spin/spin.html?token='
}

export const VERSION = {
    NAME: '2.1',
    BUILD: 'b247'
}

export const CASHBACK_PERCENT = {
    GAME_TOPUP_WALLET: 6,
}

export const PRICE = {
    SMS_OTP: '20.000',
    CASHIN_CARD: '20%',
}