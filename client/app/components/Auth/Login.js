import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from '../../styles';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View style={styles.slide1}>
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
    )
  }
};
