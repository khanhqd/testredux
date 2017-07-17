import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Platform,
    RefreshControl,
    ListView,
    Dimensions,
    StatusBar,
    Clipboard
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux'
import { taskActionCreators } from "../../Actions/TaskActions"
import renderIf from '../Common/renderIf'
import RowData from './RowData_Card';
import Toast from '@remobile/react-native-toast';
import * as Requests from '../Helpers/Requests'
import ActionSheet from 'react-native-actionsheet'
import Communications from 'react-native-communications';

var styles = require('../Common/style.js');
var Loading = require('../Common/Loading');
var Lang = require('../Common/Lang');

const popToRoot = () => {
    Actions.pop();
}

const CANCEL_INDEX = 0
class Bag_Not extends React.Component {
    render() {
        return (
            <View style={styles.Page_404}>
                <Image source={require('../../element/form/not-bag.png')} style={styles.Page_404_Img} />
                <Text style={styles.Page_404_Text}>{Lang.khong_co_vat_pham()}</Text>
            </View>
        );
    }
}

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
class AppotaView extends Component {
    state = {
        canLoadMore: true,
        refreshing: false,
        isLoading: false,
        hasData: true,
        hasData_giftcode: true,
        isLoadingMore: false,
        selectedItem: null,
        dataSource: ds.cloneWithRows(this.props.my_bag_ds_card),
    }

    componentDidMount() {
        if (this.props.my_bag_ds_card.length == 0) {
            this.setState({ isLoading: true })

            setTimeout(() => {
                this.getListItems(0);
            }, 200);
        }
    }

    showActionSheet(item) {
        this.ActionSheet.show()
        this.setState({
            selectedItem: item.data
        })
    }

    handlePress(i) {
        if (i == 1) {
            Communications.text('', `${Lang.ma_the()}: ${this.state.selectedItem.code}\nSerial: ${this.state.selectedItem.serial}`)
        }
        else if (i == 2) {
            Toast.showToast(Lang.da_copy(), "short", "center");
            Clipboard.setString(this.state.selectedItem.serial);
        }
        else if (i == 3) {
            Toast.showToast(Lang.da_copy(), "short", "center");
            Clipboard.setString(this.state.selectedItem.code);
        }
    }

    _onRefresh() {
        let { dispatch } = this.props
        dispatch(taskActionCreators.my_bag_ds_card([]))
        this.setState({ refreshing: true, dataSource: ds.cloneWithRows([]) })
        this.getListItems(0)
    }

    loadMoreItems() {
        if (this.state.isLoadingMore) return;
        if (this.props.my_bag_ds_card.length == 0) return;
        if (this.state.isLoading) return;
        if (!this.state.canLoadMore) return
        this.setState({ isLoadingMore: true })
        this.getListItems(this.props.my_bag_ds_card.length);
    }

    onScroll(e) {
        var windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
        if (windowHeight + offset > height + 30) {
            this.loadMoreItems();
        }
    }

    getListItems(startIndex) {

        let { dispatch, access_token, my_bag_ds_card } = this.props
        Requests.User_Archive(access_token, startIndex, 20, 'card')
            .then((cards) => {
                var resData = resData = startIndex == 0 ? cards.data : my_bag_ds_card.concat(cards.data)
                dispatch(taskActionCreators.my_bag_ds_card(resData))
                this.setState({
                    refreshing: false,
                    isLoading: false,
                    isLoadingMore: false,
                    canLoadMore: cards.data.length == 0 ? false : true,
                    hasData: (cards.data.length == 0 && startIndex == 0) ? false : true,
                    dataSource: ds.cloneWithRows(resData)
                })
            })
            .catch((error) => {
                this.setState({
                    hasData: false,
                    refreshing: false,
                    isLoading: false,
                    isLoadingMore: false,
                });
            })
    }

    render() {
        const options = [Lang.button_huy(), Lang.gui_tin_nhan(), Lang.copy_serial(), Lang.copy_code()]
        return (
            <View style={styles.FormControl}>
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />} onScroll={(e) => this.onScroll(e)} keyboardShouldPersistTaps='always' >
                    <View>
                        {renderIf(!this.state.hasData)(
                            <Bag_Not />
                        )}
                        {renderIf(this.state.hasData)(
                            <View style={styles.FormControl_Group}>
                                <View style={styles.FormControl_TitleBorder}>
                                    <Text style={styles.FormControl_TitleText}>
                                        {Lang.danh_sach_ma_the().toUpperCase()}
                                    </Text>
                                </View>
                                <View style={styles.FormControl_ContentNoBorder}>
                                    <View style={styles.FormControl_Select}>
                                        <View style={styles.FormControl_SelectGroup}>
                                            <ListView
                                                ref={component => this.listview = component}
                                                style={{ flex: 1, backgroundColor: 'white' }}
                                                dataSource={this.state.dataSource}
                                                renderRow={(data, sectionID, rowID) => <RowData {...data} onPress={() => this.showActionSheet(data)} />}
                                                enableEmptySections={true}
                                                initialListSize={this.props.my_bag_ds_card.length}
                                                showsVerticalScrollIndicator={false}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={this.handlePress.bind(this)}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    access_token: state.taskState.access_token,
    user_infor: state.taskState.user_infor,
    my_bag_ds_card: state.taskState.my_bag_ds_card,
})

export default connect(mapStateToProps)(AppotaView)
