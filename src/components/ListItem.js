import React, { Component } from 'react';
import { CardSection } from './common';
import { Text, TouchableWithoutFeedback, View, LayoutAnimation } from 'react-native';
import * as actions from '../actions';
import { connect } from 'react-redux';

class ListItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }
  renderDescription() {
    const { library, expanded } = this.props;
    if (expanded) {
      return (
          <Text>{this.props.library.description}</Text>
      )
    }
  }
  render() {
    const { id, title } = this.props.library;

    return (
    <TouchableWithoutFeedback
      onPress={() => this.props.selectLibrary(id)}
      >
      <View>
        <CardSection>
          <Text>{title}
          </Text>
        </CardSection>
        {this.renderDescription()}
      </View>
    </TouchableWithoutFeedback>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryID === ownProps.library.id;
  return { expanded };
}

export default connect(mapStateToProps, actions)(ListItem);
