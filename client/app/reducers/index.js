import { combineReducers } from 'redux';

import appReducers from './appReducers.js';
import authReducers from './authReducers.js';
import cameraReducers from './cameraReducers.js';

export default combineReducers({
  app: appReducers,
  auth: authReducers,
  camera: cameraReducers
});
