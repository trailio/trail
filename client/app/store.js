import { applyMiddleware, createStore, compose} from 'redux'
import ReduxLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise-middleware';

import reducers from "./reducers"

const middleware = applyMiddleware(ReduxPromise(), ReduxThunk, ReduxLogger());

export default createStore(reducers, {}, middleware);
