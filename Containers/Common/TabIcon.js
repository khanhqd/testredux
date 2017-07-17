import React, {
  PropTypes,
} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import renderIf from './renderIf'
const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => (
  <View style={{
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  }}>
    <Image source={props.selected ? props.icActive : props.ic } style={{ width: 48, height: 32 }}/>
    <Text style={{ color: props.selected ? '#449D47' : '#929292', fontSize: 10 }}>
      {props.title}
    </Text>
    {
      renderIf(props.title == 'Thông báo' && props.badgeCount > 0)(
        <View style={styles.IconBadge}>
        <Text style={styles.IconBadge_Text}>
          {props.badgeCount}
        </Text>
      </View>
      )
    }
  </View>
);
TabIcon.propTypes = propTypes;

const styles = StyleSheet.create({
  IconImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  IconTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  IconBadge: {
    backgroundColor: '#FE3824',
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    paddingLeft: 5,
    paddingRight: 5,
    minWidth: 18,
    position: 'absolute',
    top: 5,
    right: 3,
  },
  IconBadge_Text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default TabIcon;
