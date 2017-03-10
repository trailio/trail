import React, { Component } from 'react';
import { Text, View, AsyncStorage, TouchableHighlight } from 'react-native';
import Swiper from 'react-native-swiper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/appActions';
import * as authActions from '../actions/authActions';
import styles from '../styles';

class AccountInfo extends Component {
  constructor(props) {
    super(props);
  }

  onClickLogout() {
  	this.props.clickedLogout();
  }

  render() {
  	var that = this;
  	return (
  		  <View style={styles.heading}>
          <TouchableHighlight onPress={that.onClickLogout.bind(that)} >
              <Text style={styles.loginText}>LOGOUT</Text>
          </TouchableHighlight>
        </View>
    )
  }
}

const mapStateToProps = ({app, auth}) => {
  const { isLoggedIn } = app;
  return {
    isLoggedIn
  };
};

const bundledActionCreators = Object.assign({}, authActions, appActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);