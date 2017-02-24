import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/appActions';

import styles from '../styles';
import Camera from './Camera/Camera';
import Inbox from './Messaging/Inbox';
import LoginSignup from './Auth/LoginSignup';
import TrailMap from './Map/TrailMap';
// import io from 'socket.io-client';

class TrailApp extends Component {
  constructor(props) {
    super(props);
    // this.socket = io('http://localhost:8000');
  }

  render() {
  	// this.socket.emit('message', 'hello world!')
   //  this.socket.on('message2', function(msg) {
   //    console.log('message2 received', msg)
    // })
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        showsPagination={false}
        loop={false}
        index={3}
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
          <LoginSignup />
        </View>

      </Swiper>
    );
  }
}

const mapStateToProps = ({app}) => {
  const { isLoggedIn } = app;
  return {
    isLoggedIn
  };
};

const bundledActionCreators = Object.assign({}, appActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TrailApp);
