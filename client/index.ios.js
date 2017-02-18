/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import App from './app.js';

export default class client extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('client', () => client);
