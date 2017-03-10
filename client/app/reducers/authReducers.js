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
    return {
      ...state,
      loginClicked: true,
      signupClicked: false
    };
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
      friendList: action.data.friendList,
      receivedFriendRequests: action.data.receivedFriendRequests,
      sentFriendRequests: action.data.sentFriendRequests
    };

    AsyncStorage.setItem('STORAGE_KEY', action.data.token).then((value) => {
      AsyncStorage.setItem('USER', JSON.stringify(user)).then((value) => {
        console.log('user credentials logged!!')
        store.dispatch({type: 'LOGIN_USER', payload: user});
      })
    });
    return {
      ...state
    }
  }
  case 'LOGOUT_CLICKED': {
    AsyncStorage.removeItem('STORAGE_KEY').then(()=> {
      AsyncStorage.removeItem('USER').then(()=>{
        console.log('user logged out!!')
      })
    })
    return{
      ...state,
      loginClicked: false,
      signupClicked: false,
      usernameText: '',
      passwordText: ''
    }
  }
  default:
    return state;
  }
}
