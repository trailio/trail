import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Swiper from 'react-native-swiper';

import styles from '../../styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  onUsernameChange(text) {
    this.props.usernameChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
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
            value={this.props.username}
            onChangeText={this.onUsernameChange.bind(this)}
          />
          <Text>Password</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            value={this.props.password}
            onChangeText={this.onPasswordChange.bind(this)}
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
            style={{height: 40, width:100, borderColor: 'gray', borderWidth: 0.5}}
          />
          <Text>Password</Text>
          <TextInput
            style={{height: 40, width:100, borderColor: 'gray', borderWidth: 0.5}}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.text}>TRAIL</Text>
          <Text style={styles.text2} onPress={this.props.handleLoginClick}>LOGIN</Text>
          <Text style={styles.text2} onPress={this.props.handleSignupClick}>SIGNUP</Text>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  console.log('STATE IN STORE ==> ', state);
  const { loginClicked, signupClicked, username, password } = state.authReducers;
  return {
    loginClicked,
    signupClicked,
    username,
    password
  };
}

var bundledActionCreators = Object.assign({}, authActions);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(bundledActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
