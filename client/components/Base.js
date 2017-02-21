import React, {Component} from 'react';
import { Provider } from "react-redux";
import App from './App.js';
import store from '../store.js';

console.log('storeeeeee ==== ', store.getState());

export default class Base extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
