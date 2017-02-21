import React, {Component} from 'react';
import { Provider } from "react-redux";
import TrailApp from './trailApp';
import store from '../store.js';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TrailApp />
      </Provider>
    );
  }
}
