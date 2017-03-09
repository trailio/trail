import { applyMiddleware, createStore, compose} from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise-middleware';
import reducers from './reducers';

let socket = io('http://trail-server.us-west-2.elasticbeanstalk.com/');
// let socket = io('http://localhost:49160');
// let socket = io('http://5cc669df.ngrok.io');

let socketIoMiddleware = createSocketIoMiddleware(socket, 'socket/');

const middleware = applyMiddleware(ReduxPromise(), socketIoMiddleware, ReduxThunk);

let store = createStore(reducers, {}, middleware);

export default store;
