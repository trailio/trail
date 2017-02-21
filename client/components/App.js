import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import Swiper from 'react-native-swiper';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import * as appActions from '../actions/appActions';

import Camera from './Camera/Camera';
import Inbox from './Messaging/Inbox';
import Landing from './Auth/Landing';
import TrailMap from './Map/TrailMap';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {state, actions} = this.props;
    console.log('STATE ==== ', state);
    console.log('ACTIONS ==== ', actions.default);
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
        <View style={styles.slide1}>
          <Text onPress={actions.default}>
            {state.testingRedux}
          </Text>
          <Text onPress={actions.changeAgain}>SWITCH</Text>
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
}

export default connect(state => ({
    state: state.appReducers
  }),
  (dispatch) => ({
    actions: bindActionCreators(appActions, dispatch)
  })
)(App);

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
