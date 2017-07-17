/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    AsyncStorage,
    Linking,
    Platform
} from 'react-native';
import {
    Scene,
    Reducer,
    Router,
    Switch,
    Modal,
    Actions,
    ActionConst,
} from 'react-native-router-flux';
import { connect } from 'react-redux'
import { taskActionCreators } from "../Actions/TaskActions"
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import renderIf from './Common/renderIf';

/*Common*/
var styles = require('./Common/style.js');
var Lang = require('./Common/Lang');

/* Common view */
import Splash from './CommonView/Splash';
import ComingSoon from './CommonView/ComingSoon';
import History from './History/History';
import History_Detail from './History/Detail';
import MyQrcode from './Setting/MyQRCode';
import WebView from './CommonView/WebView';
import wTrans from './CommonView/wTrans';

/* Login */
import Login from './Login/Login'
import Verify_Login from './Login/Verify'
import Pin from './Pin/Pin';
import Protected from './Pin/Protected'
import SetPin from './Pin/SetPin';
import NewPin from './Pin/NewPin';
import PasswordPin from './Pin/Password';
import Forgot_OTP from './Forgot/OTP';
import Forgot_Password from './Forgot/Password';
import Forgot_Phone from './Forgot/Phone';
import Register_Phone from './Register/Phone';
import Register_OTP from './Register/OTP';
import Register_Password from './Register/Password';
import Verify_Phone from './Verify/Phone';
import Verify_OTP from './Verify/OTP';

/*Tab1 Home*/
import Home from './Home/Home';
import History_Balance from './History/History_Balance';
import BorrowMoney from './BorrowMoney/BorrowMoney';
import BorrowMoney_OTP from './BorrowMoney/OTP';
import Transfer from './Transfer/Transfer';
import Transfer_OTP from './Transfer/OTP';
import Bank from './CommonView/Bank';
import Cashin from './Cashin/Cashin';
import Cashin_Receipt from './Cashin/Receipt';
import Cashin_Bank_OTP from './Cashin/OTP';
import Cashin_Card from './Cashin/Card';
import Cashin_Success from './Cashin/Success';
import Cashout from './Cashout/Cashout';
import Cashout_BankAcc from './Cashout/BankAcc';
import Cashout_Receipt from './Cashout/Receipt';
import Cashout_OTP from './Cashout/OTP';
import MobileTopup from './MobileTopup/MobileTopup';
import MobileTopup_Receipt from './MobileTopup/Receipt';
import MobileTopup_OTP from './MobileTopup/OTP';
import BuyCards from './BuyCards/BuyCards';
import BuyCards_Detail from './BuyCards/Detail';
import BuyCards_OTP from './BuyCards/OTP';
import BuyCards_Receipt from './BuyCards/Receipt';
import BuyCards_Success from './BuyCards/Success';
import Scan from './Scan/Scan';
import Scan_Orders from './Scan/Orders';
import Scan_Orders_OTP from './Scan/OTP';
import Scan_PaymentOrders from './Scan/PaymentOrders';
import Scan_PaymentOrders_OTP from './Scan/PaymentOrders_OTP';
import Contact from './Contact/Contact';
import Checkin from './Checkin/Checkin';
import MyBag from './MyBag/MyBag';

import Game from './Game/Game'
import Games_AppotaID from './Game/AppotaID'

import GamesTopup from './GamesTopup/GamesTopup';
import GamesTopup_Detail from './GamesTopup/Detail';
import GamesTopup_Package from './GamesTopup/Package';
import GamesTopup_Card from './GamesTopup/Card';
import GamesTopup_Receipt from './GamesTopup/Receipt';
import GamesTopup_OTP from './GamesTopup/OTP';

import Mini_Game from './Spin/Spin';
import Spin from './Spin/Spin';
import Betting from './Betting/Betting';
import Giftcode from './Giftcode/Giftcode';

import Internet from './Services/Internet';
import RowInput from './Services/RowInput';

/*Tab2 Explore*/
import Explore from './Explore/Explore';
import Explore_Detail from './Explore/Detail';
import Explore_Map from './Explore/Map';
import Explore_DetailMap from './Explore/DetailMap';
import Explore_Picture from './Explore/Picture';
import Explore_Rate from './Explore/Rate';

/*Tab3 News*/
import News from './News/News';
import News_Detail from './News/Detail';

/*Tab3 Merchant*/
import Merchant from './Merchant/Merchant';
import Merchant_OTP from './Merchant/OTP';
import Merchant_Receipt from './Merchant/Receipt';
import Staff from './Staff/Staff';
import Staff_Add from './Staff/Add';
import Staff_OTP from './Staff/OTP';
import Staff_Detail from './Staff/Detail';

/*Tab4 Notification*/
import Noti from './Notification/Notification';

/*Tab5 Setting*/
import Personal from './Setting/Personal';
import SecuritySetting from './Setting/SecuritySetting';
import Language from './Setting/Language';
import Profile from './Setting/Profile';
import ChangePassword from './Setting/ChangePassword';

/*Popup*/
import Popup from './Popup/Popup';
import UpdateName from './Popup/UpdateName';

import _drawerImage from '../Assets/ic-AddCard.png';

const TabIcon = (props) => (
    <View style={{
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
    }}>
        <Image source={props.selected ? props.icActive : props.ic} style={{ width: 48, height: 32 }} />
        <Text style={{ color: props.selected ? '#449D47' : '#929292', fontSize: 10 }}>
            {props.title}
        </Text>
    </View>
);

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        //    console.log('ACTION:', action);
        return defaultReducer(state, action);
    };
};

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#EFEFF4',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 64;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};

const menuButton = () => {
    return (
        <TouchableOpacity style={{ width: 50, height: 50, backgroundColor: 'blue' }}>

        </TouchableOpacity>
    )
}

const refreshOnBack = () => {
    Actions.pop();
    setTimeout(() => {
        Actions.refresh();
    }, 10);
}

class App extends Component {
    state = {
        loaded: false,
        isMC: false,
    }

    componentWillMount() {
        let { dispatch } = this.props
        AsyncStorage.getItem("lang").then((value) => {
            if (value != null && value.length != 0) {
                Lang.initLang(value);
                dispatch(taskActionCreators.change_lang(value))
            }
            else {
                let lang = Lang.getDeviceLang().split('-')[0]
                if (lang == 'vi') {
                    Lang.initLang('vi');
                    AsyncStorage.setItem("lang", "vi");
                    dispatch(taskActionCreators.change_lang('vi'))
                }
                else {
                    Lang.initLang('en');
                    AsyncStorage.setItem("lang", "en");
                    dispatch(taskActionCreators.change_lang('en'))
                }

            }
        }).done();

        AsyncStorage.getItem("access_token").then((value) => {
            if (value != null && value.length != 0) {
                dispatch(taskActionCreators.change_token(value))
            }
            else {
                dispatch(taskActionCreators.change_token(''))
            }
        }).done();

        AsyncStorage.getItem("Merchant_UI").then((value) => {
            if (value != null && value.length != 0) {
                if (value == 'true') {
                    this.setState({ isMC: true });
                }
                else {
                    this.setState({ isMC: false });
                }
            }
            else {
                this.setState({ isMC: false });
            }
        }).done();
    }

    componentDidMount() {
        GoogleAnalytics.setTrackerId('UA-71632969-4');
        let options = {
            devKey: 'ARDuQcYYMeAiZycPmvoQxg',
            appId: "1198481412",
            isDebug: true
        };

        appsFlyer.initSdk(options,
            (result) => {
                console.log('=appsFlyer=' + result)
            },
            (error) => {
                console.error('=appsFlyer=' + error);
            }
        )
        setTimeout(() => {
            this.setState({
                loaded: true
            })
        }, 100)
        //deep Linking
        Linking.addEventListener('url', this.handleOpenURL);
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
              console.log('deep')
              this.handleOpenURL
            });
        }
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = (event) => {
      Actions.login()
    }

    onChangeLang() {
        this.setState({ loaded: false })
        setTimeout(() => {
            this.setState({ loaded: true })
        }, 100)
    }

    onPressTab(tab) {
        if (this.props.access_token.length == 0) {
            Actions.login()
        }
        else {
            switch (tab) {
                case "tab3":
                    Actions.tab3()
                    break

                case "tab4":
                    Actions.tab4()
                    break
            }
        }
    }

    OnInitUI() {
        this.setState({
            loaded: false,
            isMC: !this.state.isMC
        });
        setTimeout(() => {
            this.setState({
                loaded: true
            });
        }, 100);
    }

    render() {
        if (!this.state.loaded) return null;
        return (
            <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
                <Scene key="modal" component={Modal} >
                    <Scene key="root" hideNavBar hideTabBar>
                        <Scene key="splash" initial type={ActionConst.REPLACE} hideNavBar hideTabBar component={Splash} title="Splash" panHandlers={null} />
                        <Scene key="login" onSwitchMC={this.OnInitUI.bind(this)} hideNavBar hideTabBar component={Login} direction="vertical" panHandlers={null} />
                        <Scene key="verify_login" onSwitchMC={this.OnInitUI.bind(this)} hideNavBar hideTabBar component={Verify_Login} />
                        <Scene key="pin" pin={this.state.PIN} hideNavBar hideTabBar component={Pin} title="PIN" direction="vertical" panHandlers={null} />
                        <Scene key="set_pin" hideNavBar hideTabBar component={SetPin} title="PIN" direction="vertical" panHandlers={null} />
                        <Scene key="change_pin" hideNavBar hideTabBar direction="vertical" panHandlers={null} >
                            <Scene key="password_pin" hideNavBar hideTabBar component={PasswordPin} title="Password Pin" panHandlers={null} direction="vertical" />
                            <Scene key="new_pin" hideNavBar hideTabBar component={NewPin} title="New Pin" panHandlers={null} direction="vertical" />
                        </Scene>
                        <Scene key="history" hideTabBar component={History} />
                        <Scene key="history_detail" hideTabBar component={History_Detail} />
                        <Scene key="history_balance" hideTabBar component={History_Balance} />
                        <Scene key="my_qrcode" hideTabBar component={MyQrcode} />
                        <Scene key="webview2" component={WebView} hideTabBar hideNavBar />
                        <Scene key="webview_trans" component={wTrans} hideTabBar hideNavBar />
                        <Scene key="comingsoon" component={ComingSoon} hideTabBar hideNavBar />
                        <Scene key="register" hideNavBar hideTabBar direction="vertical" panHandlers={null} >
                            <Scene key="register_phone" hideNavBar hideTabBar component={Register_Phone} panHandlers={null} direction="vertical" />
                            <Scene key="register_otp" hideNavBar hideTabBar component={Register_OTP} panHandlers={null} direction="vertical" />
                            <Scene key="register_password" onSwitchMC={this.OnInitUI.bind(this)} hideNavBar hideTabBar component={Register_Password} panHandlers={null} direction="vertical" />
                        </Scene>
                        <Scene key="forgot" hideNavBar hideTabBar direction="vertical" panHandlers={null} >
                            <Scene key="forgot_phone" hideNavBar hideTabBar component={Forgot_Phone} panHandlers={null} direction="vertical" />
                            <Scene key="forgot_otp" hideNavBar hideTabBar component={Forgot_OTP} panHandlers={null} direction="vertical" />
                            <Scene key="forgot_password" hideNavBar hideTabBar component={Forgot_Password} panHandlers={null} direction="vertical" />
                        </Scene>
                        <Scene key="verify" hideNavBar hideTabBar direction="vertical" panHandlers={null} >
                            <Scene key="verify_phone" hideNavBar hideTabBar component={Verify_Phone} panHandlers={null} direction="vertical" />
                            <Scene key="verify_otp" hideNavBar hideTabBar component={Verify_OTP} panHandlers={null} direction="vertical" />
                        </Scene>
                        <Scene key="profile" hideTabBar component={Profile} />
                        <Scene key="borrow_money_otp" hideTabBar component={BorrowMoney_OTP} />

                        <Scene key="tabbar" type={ActionConst.RESET}>
                            <Scene key="main" tabs tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle} >
                                <Scene key="tab1" hideNavBar title={Lang.trang_chu()} icon={TabIcon} ic={require('../element/nav-tab/tab-home.png')} icActive={require('../element/nav-tab/tab-home-active.png')} navigationBarStyle={{ backgroundColor: 'green' }} titleStyle={{ color: 'white' }} >
                                    <Scene key="home" component={Home} />
                                    <Scene key="borrow_money" hideTabBar component={BorrowMoney} />
                                    <Scene key="cashin" hideTabBar component={Cashin} />
                                    <Scene key="cashin_bank_otp" hideTabBar component={Cashin_Bank_OTP} />
                                    <Scene key="cashin_card" hideTabBar component={Cashin_Card} />
                                    <Scene key="cashout" hideTabBar component={Cashout} />
                                    <Scene key="cashout_bank_acc" hideTabBar component={Cashout_BankAcc} />
                                    <Scene key="cashout_otp" hideTabBar component={Cashout_OTP} />
                                    <Scene key="bank" hideTabBar component={Bank} />
                                    <Scene key="webview" component={WebView} hideTabBar hideNavBar />
                                    <Scene key="transfer" hideTabBar component={Transfer} />
                                    <Scene key="transfer_otp" hideTabBar component={Transfer_OTP} />
                                    <Scene key="mobile_topup" hideTabBar component={MobileTopup} />
                                    <Scene key="mobile_topup_otp" hideTabBar component={MobileTopup_OTP} />
                                    <Scene key="buy_cards" hideTabBar component={BuyCards} />
                                    <Scene key="buy_cards_detail" hideTabBar component={BuyCards_Detail} />
                                    <Scene key="buy_cards_otp" hideTabBar component={BuyCards_OTP} />
                                    <Scene key="buy_cards_success" hideTabBar component={BuyCards_Success} />
                                    <Scene key="scan" title={'scan'} hideTabBar component={Scan} />
                                    <Scene key="contact" hideTabBar component={Contact} />
                                    <Scene key="checkin" hideTabBar component={Checkin} />
                                    <Scene key="my_bag" hideTabBar component={MyBag} />
                                    <Scene key="payment_orders" hideTabBar component={Scan_PaymentOrders} />
                                    <Scene key="payment_orders_otp" hideTabBar component={Scan_PaymentOrders_OTP} />
                                    <Scene key="qrcode_orders" hideTabBar component={Scan_Orders} />
                                    <Scene key="qrcode_orders_otp" hideTabBar component={Scan_Orders_OTP} />
                                    <Scene key="games_topup" hideTabBar component={GamesTopup} />
                                    <Scene key="games_topup_detail" hideTabBar component={GamesTopup_Detail} />
                                    <Scene key="games_topup_package" hideTabBar component={GamesTopup_Package} />
                                    <Scene key="games_topup_card" hideTabBar component={GamesTopup_Card} />
                                    <Scene key="games_topup_otp" hideTabBar component={GamesTopup_OTP} />
                                    <Scene key="mini_game" hideTabBar component={Mini_Game} />
                                    <Scene key="spin" hideTabBar component={Spin} />
                                    <Scene key="giftcode" hideTabBar component={Giftcode} />
                                    <Scene key="betting" hideTabBar component={ComingSoon} />
                                    <Scene key="protected" fromHome={true} hideNavBar hideTabBar component={Protected} direction="vertical" panHandlers={null} />
                                    <Scene key="internet" hideTabBar component={Internet} />
                                    <Scene key="row_input" hideTabBar component={RowInput} />
                                </Scene>
                                <Scene key="tab2" hideNavBar title={Lang.kham_pha()} icon={TabIcon} ic={require('../element/nav-tab/tab-explore.png')} icActive={require('../element/nav-tab/tab-explore-active.png')} navigationBarStyle={{ backgroundColor: 'green' }} titleStyle={{ color: 'white' }} >
                                    <Scene key="explore" component={Explore} />
                                    <Scene key="explore_map" hideTabBar component={Explore_Map} />
                                    <Scene key="explore_detail" hideTabBar component={Explore_Detail} />
                                    <Scene key="explore_detail_map" hideTabBar component={Explore_DetailMap} />
                                    <Scene key="explore_picture" hideTabBar component={Explore_Picture} />
                                </Scene>
                                {renderIf(!this.state.isMC)(
                                    <Scene key="tab3" hideNavBar title={Lang.tin_tuc()} icon={TabIcon} ic={require('../element/nav-tab/tab-news.png')} icActive={require('../element/nav-tab/tab-news-active.png')} navigationBarStyle={{ backgroundColor: 'green' }} titleStyle={{ color: 'white' }} >
                                        <Scene key="news" component={News} />
                                        <Scene key="news_detail" hideTabBar component={News_Detail} />
                                    </Scene>
                                )}
                                {renderIf(this.state.isMC)(
                                    <Scene key="tab3" title="Cashback" hideNavBar icon={TabIcon} ic={require('../element/nav-tab/tab-cashback.png')} icActive={require('../element/nav-tab/tab-cashback-active.png')} onPress={this.onPressTab.bind(this, "tab3")}>
                                        <Scene key="merchant" component={Merchant} title="Merchant" />
                                        <Scene key="merchant_otp" hideTabBar component={Merchant_OTP} title="OTP Merchant" />
                                        <Scene key="staff" hideTabBar component={Staff} title="Staff" />
                                        <Scene key="staff_add" hideTabBar component={Staff_Add} title="Staff" />
                                        <Scene key="staff_otp" hideTabBar component={Staff_OTP} title="Staff" />
                                        <Scene key="staff_detail" hideTabBar component={Staff_Detail} title="Staff" />
                                        <Scene key="contact_personal" hideTabBar component={Contact} title="Danh bạ" />
                                        <Scene key="protected_mc" fromHome={false} hideNavBar hideTabBar component={Protected} direction="vertical" panHandlers={null} />
                                    </Scene>
                                )}
                                <Scene key="tab4" hideNavBar title={Lang.thong_bao()} icon={TabIcon} ic={require('../element/nav-tab/tab-notifition.png')} icActive={require('../element/nav-tab/tab-notifition-active.png')} navigationBarStyle={{ backgroundColor: 'green' }} titleStyle={{ color: 'white' }} onPress={this.onPressTab.bind(this, "tab4")}>
                                    <Scene key="notification" component={Noti} />
                                </Scene>
                                <Scene key="tab5" hideNavBar title={Lang.cai_dat()} icon={TabIcon} ic={require('../element/nav-tab/tab-user.png')} icActive={require('../element/nav-tab/tab-user-active.png')} navigationBarStyle={{ backgroundColor: 'green' }} titleStyle={{ color: 'white' }} >
                                    <Scene key="personal" component={Personal} />
                                    <Scene key="language" onChangeLang={this.onChangeLang.bind(this)} hideTabBar component={Language} />
                                    <Scene key="change_password" hideTabBar component={ChangePassword} />
                                    <Scene key="security_setting" hideTabBar component={SecuritySetting} />
                                </Scene>
                            </Scene>
                        </Scene>
                    </Scene>
                    <Scene key="popup" component={Popup} hideTabBar hideNavBar />
                    <Scene key="update_name" component={UpdateName} hideTabBar hideNavBar />
                    <Scene key="explore_rate" component={Explore_Rate} hideTabBar hideNavBar />
                    <Scene key="cashin_receipt" component={Cashin_Receipt} hideTabBar hideNavBar />
                    <Scene key="cashin_success" hideTabBar component={Cashin_Success} />
                    <Scene key="cashout_receipt" hideTabBar component={Cashout_Receipt} />
                    <Scene key="mobile_topup_receipt" hideTabBar component={MobileTopup_Receipt} />
                    <Scene key="buy_cards_receipt" hideTabBar component={BuyCards_Receipt} />
                    <Scene key="merchant_receipt" hideTabBar component={Merchant_Receipt} />
                    <Scene key="games_topup_receipt" hideTabBar component={GamesTopup_Receipt} />
                </Scene>
            </Router>
        );
    }
}


const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    lang: state.taskState.lang,
})
export default connect(mapStateToProps)(App)
