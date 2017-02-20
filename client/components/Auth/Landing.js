import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
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
  },
  button: {
    width: 100,
    height: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  }
});

export default class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { count, increment, decrement } = this.props;

    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        showsPagination={false}
        loop={false}
        horizontal={false}
      >
        <View style={styles.slide1}>
          <Text style={styles.text}>{ count }</Text>
          <TouchableOpacity
            onPress={increment}
            style={styles.button}
          >
            <Text>UP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={decrement}
            style={styles.button}
          >
            <Text>DOWN</Text>
          </TouchableOpacity>
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
