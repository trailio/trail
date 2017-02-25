import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'

export default function reducer ( state = {
  loginClicked: false,
  signupClicked: false,
  username: '',
  password: '',
  message: ''
}, action) {
  switch (action.type) {
  case 'LOGIN_CLICKED': {
    return Object.assign({}, state, {
      loginClicked: true,
      signupClicked: false
    });
  }
  case 'SIGNUP_CLICKED': {
    return {
      ...state,
      loginClicked: false,
      signupClicked: true
    };
  }
  case 'BACK_CLICKED': {
    return {
      ...state,
      loginClicked: false,
      signupClicked: false,
      username: '',
      password: ''
    };
  }
  case 'USERNAME_CHANGED': {
    return {
      ...state,
      username: action.payload
    }
  }
  case 'PASSWORD_CHANGED': {
    return {
      ...state,
      password: action.payload
    }
  }
  case 'LOGIN_RESPONSE': {
    //use action.data as json token, store it in async storage
    // try {
    //   await AsyncStorage.setItem(STORAGE_KEY, action.data);
    // } catch (error) {
    //   console.log('AsyncStorage error: ' + error.message);
    // }
    // var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
    // console.log(DEMO_TOKEN);
    AsyncStorage.setItem('STORAGE_KEY', action.data).then((value) => {
      console.log("xxxxxxxx item set for value ", value);
      AsyncStorage.getItem('STORAGE_KEY').then((value) => {
        console.log('xxxxxxxx storage key is ', value);
      })
    })
    return {
      ...state,
      message: action.data
    }
  }
  default:
    return state;
  }
}
