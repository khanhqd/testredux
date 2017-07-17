//@flow
import React, { Component } from 'react';
import { PropTypes } from "react";
import {
    View,
    StyleSheet,
    ListView,
} from "react-native";
import { Actions } from "react-native-router-flux";

export default class BaseComponent extends Component {
    constructor(props) {
        super(props);
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }
}
