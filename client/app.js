import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Camera from './components/Camera/Camera';
import Inbox from './components/Messaging/Inbox';
import Landing from './components/Auth/Landing';
import TrailMap from './components/Map/TrailMap';

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

export default class App extends Component {
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
        index={1}
      >
        <View style={styles.slide1}>
          <Inbox />
        </View>
        <View style={styles.slide2}>
          <Camera />
        </View>
        <View style={styles.slide3}>
          <TrailMap />
        </View>
        <View style={styles.slide3}>
          <Landing />
        </View>
      </Swiper>
    )
  }
};
