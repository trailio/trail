import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableHighlight, AsyncStorage } from 'react-native';
// import {Button from 'react-native-button'};
import Swiper from 'react-native-swiper';

import styles from '../../styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions';
import * as appActions from '../../actions/appActions';
import TrailApp from '../trailApp';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {email: ''};
    //set email to local state instead of redux since it's relatively private information
  }

  onUsernameChange(text) {
    this.props.usernameChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onEmailChange(event) {
    this.setState({email: event});
  }

  onSubmitSignin() {
    console.log('signing in using username & password', this.props.usernameText, this.props.passwordText);
    this.props.submitSignin(this.props.usernameText, this.props.passwordText);
  }

  onSubmitSignup() {
    console.log('signup in using username & password & no email for now', this.props.usernameText, this.props.passwordText, this.state.email);
    this.props.submitSignup(this.props.usernameText, this.props.passwordText, this.state.email);
  }


  render () {
    if (this.props.isLoggedIn) {
      return (
        <TrailApp />
      );
    } else {
      if (this.props.loginClicked === true) {
        return (
          <View>
            <Text onPress={this.props.backClicked}>Back</Text>
            <Text/>
            <Text style={styles.text}>Login</Text>
            <Text>Username</Text>
            <TextInput
              style={{height: 40, width: 150, borderColor: 'gray', borderWidth: 1}}
              value={this.props.usernameText}
              autoCapitalize={'none'}
              onChangeText={this.onUsernameChange.bind(this)}
            />
            <Text>Password</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              value={this.props.passwordText}
              autoCapitalize={'none'}
              secureTextEntry={true}
              onChangeText={this.onPasswordChange.bind(this)}
            />
            <Text/>
            <TouchableHighlight onPress={this.onSubmitSignin.bind(this)}><Text>Sign In</Text></TouchableHighlight>
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
              value={this.props.usernameText}
              onChangeText={this.onUsernameChange.bind(this)}
            />
            <Text>Password</Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 0.5}}
              value={this.props.passwordText}
              onChangeText={this.onPasswordChange.bind(this)}
            />
            <Text>Email</Text>
            <TextInput
              style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 0.5}}
              value={this.state.email}
              onChangeText={this.onEmailChange.bind(this)}
            />
            <Text/>
            <TouchableHighlight onPress={this.onSubmitSignup.bind(this)}><Text>Sign Up</Text></TouchableHighlight>
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
}

const mapStateToProps = ({auth, app}) => {
  const { loginClicked, signupClicked, usernameText, passwordText} = auth;
  const { isLoggedIn } = app;
  // console.log('mapStateToProps app in LoginSignup', app)
  return {
    loginClicked,
    signupClicked,
    usernameText,
    passwordText,
    isLoggedIn
  };
};

const bundledActionCreators = Object.assign({}, authActions, appActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
