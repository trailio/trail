import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/appActions';

import styles from '../styles';
import Camera from './Camera/Camera';
import Inbox from './Messaging/Inbox';
import Landing from './Auth/Landing';
import TrailMap from './Map/TrailMap';

class TrailApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {state, actions} = this.props;
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        showsPagination={false}
        loop={false}
        index={4}
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
)(TrailApp);
