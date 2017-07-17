import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ListView,
    Dimensions,
    RefreshControl
} from "react-native";
import { Actions } from "react-native-router-flux"
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import ProgressImage from 'react-native-progress/CircleSnail'
import styles from '../Common/style'
import renderIf from '../Common/renderIf'
import Lang from '../Common/Lang'
import RowData from './RowData';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger } from 'react-native-fbsdk'
import * as Requests from '../Helpers/Requests'
import Loading from '../Common/Loading'
import Toast from '@remobile/react-native-toast';
import TimerMixin from 'react-timer-mixin';
import * as Animatable from 'react-native-animatable';
const popToRoot = () => {
    Actions.pop();
}

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
class GameGiftcode extends React.Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling = false;
    }
    state = {
        hasData: true,
        canLoadMore: true,
        refreshing: false,
        isLoading: false,
        isLoadingMore: false,
        dataSource: ds.cloneWithRows(this.props.ds_game_giftcode)
    }

    // componentWillMount(){
    //     this.props.dispatch(taskActionCreators.change_show_giftcode_des(true))
    // }

    componentDidMount() {
        GoogleAnalytics.trackScreenView('ga_notification');
        appsFlyer.trackEvent('af_notification', {}, () => { }, () => { });
        AppEventsLogger.logEvent('fb_notification', 1);

        this.getSpinTurn()
        if (this.props.ds_game_giftcode.length == 0) {
            this.setState({ isLoading: true })

            setTimeout(() => {
                this.getListItems(0);
            }, 200);
        }
        setTimeout(() => {
            this.props.dispatch(taskActionCreators.change_show_giftcode_des(false))
        }, 6000);
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    getSpinTurn = () => {
        let { dispatch, access_token } = this.props
        Requests.Spin_Turn(access_token)
            .then((items) => {
                var turn = items.turns + items.vip_turns + items.turns_bonus + items.vip_turns_bonus
                dispatch(taskActionCreators.change_spin_turn(turn))
            })
            .catch((error) => {
            })
    }

    getListItems = (startIndex) => {
        let { dispatch, access_token, ds_game_giftcode } = this.props
        Requests.Game_Giftcode(access_token, startIndex, 20, '', '')
            .then((items) => {

                var resData = startIndex == 0 ? items.data : ds_game_giftcode.concat(items.data)
                dispatch(taskActionCreators.ds_game_giftcode(resData))
                this.setState({
                    hasData: (startIndex == 0 && items.data.length == 0) ? false : true,
                    refreshing: false,
                    isLoading: false,
                    isLoadingMore: false,
                    canLoadMore: items.data.length == 0 ? false : true,
                    dataSource: ds.cloneWithRows(resData)
                })
            })
            .catch((error) => {
                this.setState({
                    hasData: ds_game_giftcode.length == 0 ? false : true,
                    refreshing: false,
                    isLoading: false,
                    isLoadingMore: false,
                })
            })
    }

    BuyGameGiftcode = (giftcode_id) => {
        this.setState({ isLoading: true })
        let { dispatch, access_token } = this.props
        Requests.Buy_Game_Giftcode(access_token, giftcode_id)
            .then((data) => {
                this.setState({ isLoading: false })
                Toast.showToast(Lang.giao_dich_thanh_cong(), 'short', 'top')
                this.getSpinTurn()
            })
            .catch((error) => {
                this.setState({ isLoading: false })
            })
    }

    _onRefresh() {
        let { dispatch } = this.props
        dispatch(taskActionCreators.ds_game_giftcode([]))
        this.setState({
            refreshing: true,
            dataSource: ds.cloneWithRows([])
        });
        this.getSpinTurn()
        this.getListItems(0)
    }

    loadMoreItems() {
        if (this.state.isLoadingMore) return;
        if (!this.state.canLoadMore) return
        if (this.props.ds_game_giftcode.length == 0) return;
        if (this.state.isLoading) return;
        this.setState({ isLoadingMore: true })
        this.getListItems(this.props.ds_game_giftcode.length);
    }

    onScroll(e) {
        var windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
        if (windowHeight + offset > height + 30) {
            this.loadMoreItems();
        }
    }

    onBuyGC(data) {
        if (this.props.spin_turn < data.price) {
            Actions.popup({
                title: Lang.thong_bao(),
                content: Lang.khong_du_spin(),
                onPress_Cancel: () => { },
                onPress_Ok: () => Actions.spin({ nomeHome: true })
            })
            return
        }
        Actions.popup({
            title: Lang.doi_gift_code(),
            content: Lang.confirm_buy_giftcode(data.name, data.game_name, `${data.price} spin`),
            onPress_Cancel: () => { },
            onPress_Ok: () => this.BuyGameGiftcode(data.id)
        })
    }

    render() {
        let { spin_turn } = this.props
        return (
            <View {...this.props} style={[styles.container, styles.tabGames]}>
                <View style={styles.headerNav}>
                    <View style={styles.headerNavInner}>
                        <View style={styles.navLeft}>
                            <TouchableOpacity onPress={popToRoot}>
                                <Image source={require('../../element/nav-bar/nav-back.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}>
                            <Text style={styles.navTitle_Text}>
                                Giftcode
                            </Text>
                        </View>
                        <View style={styles.navRight}>
                            <TouchableOpacity style={styles.navTouch} onPress={() => Actions.spin({ nomeHome: true })}>
                                <Text style={styles.navRight_Text}>{spin_turn}</Text>
                                <Image source={require('../../element/nav-bar/nav-spin.png')} style={styles.headerNav_Img} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {renderIf(this.props.show_giftcode_des)(
                    <View style={styles.AlertFull}>    
                        <Animatable.Text style={styles.AlertFull_Title} animation="flash" easing="ease-out" iterationCount="infinite" >{Lang.dung_spin_doi_giftcode()}</Animatable.Text>
                    </View>
                )}
                <ScrollView onScroll={(e) => this.onScroll(e)} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }>
                    <View style={styles.ViewGames}>
                        <View style={styles.ViewGames_Inner}>
                            {renderIf(!this.state.hasData)(
                                <View style={styles.Page_404}>
                                    <Image source={require('../../element/form/not-bag.png')} style={styles.Page_404_Img} />
                                    <Text style={styles.Page_404_Text}>{Lang.khong_co_vat_pham()}</Text>
                                </View>
                            )}
                            {renderIf(this.state.hasData)(
                                <ListView
                                    ref={component => this.listview = component}
                                    style={{ flex: 1, backgroundColor: 'white' }}
                                    dataSource={this.state.dataSource}
                                    renderRow={(data, sectionID, rowID) => <RowData {...data} onBuyGC={this.onBuyGC.bind(this, data)} />}
                                    enableEmptySections={true}
                                    scrollEnabled={false}
                                    showsVerticalScrollIndicator={false}
                                />
                            )}
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.QuickAction}>
                    <TouchableOpacity style={styles.QuickAction_Touch} onPress={() => Actions.my_bag({ tab: 'game_giftcode' })}>
                        <Image source={require('../../element/homepage/QuickAction.png')} style={styles.QuickAction_Img} />
                    </TouchableOpacity>
                </View>
                {renderIf(this.state.isLoading)(
                    <Loading />
                )}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    ds_game_giftcode: state.taskState.ds_game_giftcode,
    spin_turn: state.taskState.spin_turn,
    show_giftcode_des: state.taskState.show_giftcode_des,
})

export default connect(mapStateToProps)(GameGiftcode)
