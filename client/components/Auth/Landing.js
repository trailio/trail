import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Swiper from 'react-native-swiper';
import Login from './Login';
import Signup from './Signup';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render () {
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        showsPagination={false}
        loop={false}
        horizontal={false}
      >
        <View style={styles.slide1}>
          <Text style={styles.text}>Landing</Text>
        </View>
        <View style={styles.slide2}>
          <Login />
        </View>
        <View style={styles.slide3}>
          <Signup />
        </View>
      </Swiper>
    )
  }
};
