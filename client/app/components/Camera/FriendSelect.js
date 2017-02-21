import React, { Component } from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default class FriendSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render () {
    return (
      <Text style={styles.text}>
        Friend Select
      </Text>
    );
  }
}
