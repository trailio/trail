import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import store  from '../store'

export default function reducer ( state = {
  latitude: null,
  longitude: null,
  latitudeDelta: null,
  longitudeDelta: null
}, action) {
  switch (action.type) {
  case 'CURRENT_COORDS_FOUND': {
    return {
      ...state,
      latitude: action.payload.latitude,
      longitude: action.payload.longitude,
      latitudeDelta: action.payload.latitudeDelta,
  		longitudeDelta: action.payload.longitudeDelta
    };
  }
  default:
    return state;
  }
}