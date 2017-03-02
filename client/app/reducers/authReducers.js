import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import store  from '../store'

export default function reducer ( state = {
  loginClicked: false,
  signupClicked: false,
  usernameText: '',
  passwordText: ''
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
      usernameText: '',
      passwordText: ''
    };
  }
  case 'USERNAME_CHANGED': {
    return {
      ...state,
      usernameText: action.payload
    }
  }
  case 'PASSWORD_CHANGED': {
    return {
      ...state,
      passwordText: action.payload
    }
  }
  case 'LOGIN_RESPONSE': {
    var user = {
      username: action.data.username, 
      id: action.data.id, 
      posts: action.data.posts, 
      friends: action.data.friends
    };
    AsyncStorage.setItem('STORAGE_KEY', action.data.token).then((value) => {
      AsyncStorage.setItem('USER', JSON.stringify(user)).then((value) => {
        store.dispatch({type: 'LOGIN_USER', payload: user});
      })
    });
    return {
      ...state
    }
  }

  default:
    return state;
  }
}
