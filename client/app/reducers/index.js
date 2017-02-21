import { combineReducers } from 'redux';

import appReducers from './appReducers.js';
import authReducers from './authReducers.js';

export default combineReducers({
  app: appReducers,
  auth: authReducers
});
