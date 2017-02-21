import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Swiper from 'react-native-swiper';

import styles from '../../styles';
import Login from './Login';
import Signup from './Signup';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const {state, actions} = this.props;
    console.log('Landing state === ', state);
    console.log('Landing actions === ', actions);

    if (state.loginClicked === true) {
      return (
        <View>
          <Text onPress={actions.backClicked}>Back</Text>
          <Text style={styles.text}>Login</Text>
          <Text>Username</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          />
          <Text>Password</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          />
        </View>
      );
    } else if (state.signupClicked === true) {
      return (
        <View>
          <Text onPress={actions.backClicked}>Back</Text>
          <Text style={styles.text}>Signup</Text>
          <Text>Username</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          />
          <Text>Password</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.text}>TRAIL</Text>
          <Text style={styles.text} onPress={actions.loginClicked}>LOGIN</Text>
          <Text style={styles.text} onPress={actions.signupClicked}>SIGNUP</Text>
        </View>
      )
    }
  }
};

export default connect(state => ({
    state: state.authReducers
  }),
  (dispatch) => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(Landing);
