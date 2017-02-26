import { combineReducers } from 'redux';

import appReducers from './appReducers.js';
import authReducers from './authReducers.js';
import cameraReducers from './cameraReducers.js';
import mapReducers from './mapReducers.js';

export default combineReducers({
  app: appReducers,
  auth: authReducers,
  camera: cameraReducers,
  map: mapReducers
});
