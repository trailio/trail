import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, AsyncStorage } from 'react-native';
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
    console.log('username submitted', text)
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
    console.log('password submitted', text)
  }

  onSubmitSignin() {
    console.log('signing in using username & password', this.props.username, this.props.password);
  }

  onSubmitSignup() {
    console.log('signup in using username & password & no email for now', this.props.username, this.props.password);
  }

  render () {
    if (this.props.loginClicked === true) {
      return (
        <View>
          <Text onPress={this.props.backClicked}>Back</Text>
          <Text/>
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
          <Text/>
          <Text onPress={this.onSubmitSignin.bind(this)}>Sign In</Text>
        </View>
      );
    } else if (this.props.signupClicked === true) {
      return (
        <View>
          <Text onPress={this.props.backClicked}>Back</Text>
          <Text/>
          <Text style={styles.text}>Signup</Text>
          <Text>Username</Text>
          <TextInput
            style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 0.5}}
            value={this.props.username}
            onChangeText={this.onUsernameChange.bind(this)}
          />
          <Text>Password</Text>
          <TextInput
            style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 0.5}}
            value={this.props.password}
            onChangeText={this.onPasswordChange.bind(this)}
          />
          <Text/>
          <Text onPress={this.onSubmitSignup.bind(this)}>Sign Up</Text>
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

const mapStateToProps = ({auth}) => {
  const { loginClicked, signupClicked, username, password } = auth;
  return {
    loginClicked,
    signupClicked,
    username,
    password
  };
};

const bundledActionCreators = Object.assign({}, authActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
