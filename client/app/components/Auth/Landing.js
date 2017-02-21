import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Swiper from 'react-native-swiper';

import styles from '../../styles';
import Login from './Login';
import Signup from './Signup';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    if (this.props.loginClicked === true) {
      return (
        <View>
          <Text onPress={this.props.backClicked}>Back</Text>
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
    } else if (this.props.signupClicked === true) {
      return (
        <View>
          <Text onPress={this.props.backClicked}>Back</Text>
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
          <Text style={styles.text} onPress={this.props.handleLoginClick}>LOGIN</Text>
          <Text style={styles.text} onPress={this.props.handleSignupClick}>SIGNUP</Text>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  console.log('STATE IN STORE ==> ', state);
  return {
    loginClicked: state.authReducers.loginClicked,
    signupClicked: state.authReducers.signupClicked
  };
}
var bundledActionCreators = Object.assign({}, authActions);
function mapDispatchToProps(dispatch) {
  return bindActionCreators(bundledActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
