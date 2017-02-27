import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import store  from '../store'

export default function reducer ( state = {
  loginClicked: false,
  signupClicked: false,
  username: '',
  password: ''
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
    console.log('LOGIN_RESPONSE from authReducer messages posts sent', action.data.posts.sent);
    console.log('LOGIN_RESPONSE from authReducer messages posts received', action.data.posts.received);
    console.log('LOGIN_RESPONSE from authReducer messages token', action.data.token);
    AsyncStorage.setItem('STORAGE_KEY', action.data.token).then((value) => {
      store.dispatch({type: 'LOGIN_USER', payload: action.data.posts});
    }); 
    return {
      ...state
    }
  }

  default:
    return state;
  }
}
