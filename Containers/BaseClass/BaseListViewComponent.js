//@flow
import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    StyleSheet,
    ListView,
    Alert,
    Dimensions,
} from "react-native";
import { Actions } from "react-native-router-flux";
import BaseComponent from './BaseComponent';

export default class BaseListViewComponent extends BaseComponent {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        var canLoadMore = true;
        var isLoadingMore = false;
        var listItems = [];
        this.state = {
            text: '',
            isFocused: false,
            isLoading: false,
            refreshing: false,
            dataSource: ds.cloneWithRows([])
        };
        this._bind('onScroll');
    }

    getListItems(startIndex) {

    }

    handleGetItemsDone(list, startIndex) {
        if (list.length == 0) {
            this.canLoadMore = false;
            if (startIndex == 0)
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows([])
                });
        } else {
            for (var i = 0; i < list.length; i++) {
                this.listItems.push(list[i]);
            }
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.listItems)
            });
            this.isLoadingMore = false;
        }
    }

    handleGetItemsError(error) {
        this.isLoadingMore = false;
        if (error.toString().indexOf('Network') > -1) {
            Alert.alert('Thông báo', 'Lỗi ' + error.toString(), [{
                text: 'Đồng ý'
            }])
        } else {
            Alert.alert('Thông báo', error.toString(), [{
                text: 'Đồng ý'
            }])
        }
    }

    loadMoreItems() {
        if (this.isLoadingMore) return;
        if (this.listItems.length == 0) return;
        if (this.state.isLoading) return;
        this.isLoadingMore = true;
        this.getListItems(this.listItems.length);
    }

    onScroll(e) {
        var windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
        if (windowHeight + offset > height + 30) {
            this.loadMoreItems();
        }
    }
}
