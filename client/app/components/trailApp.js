import React, { Component } from 'react';
import { Text, View, AsyncStorage, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/appActions';

import styles from '../styles';
import Camera from './Camera/Camera';
import Inbox from './Messaging/Inbox';
import LoginSignup from './Auth/LoginSignup';
import TrailMap from './Map/TrailMap';

class TrailApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    AsyncStorage.removeItem('STORAGE_KEY');
    if (!this.props.isLoggedIn) {
      return (
        <View style={styles.slide3}>
          <LoginSignup />
        </View>
      );
    } else {
      return (
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
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

        </Swiper>
      );
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('STORAGE_KEY').then((value) => {
      AsyncStorage.getItem('USER').then((user) => {
        if (value && user) {
          this.props.loginUser(JSON.parse(user));
        }
      });
    });
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
