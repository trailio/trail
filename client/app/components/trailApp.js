import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

import { connect } from 'react-redux';
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
    );
  }
}

function mapStateToProps(state) {
  console.log('STATE IN STORE ==> ', state);
  return {
    isLoggedIn: state.appReducers.isLoggedIn
  };
}

var bundledActionCreators = Object.assign({}, appActions);
function mapDispatchToProps(dispatch) {
  return bindActionCreators(bundledActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailApp);
