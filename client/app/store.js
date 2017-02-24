import { applyMiddleware, createStore, compose} from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import ReduxLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise-middleware';

import reducers from "./reducers"

// let socket = io('http://localhost:8000');
// let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const middleware = applyMiddleware(ReduxPromise(), ReduxThunk, ReduxLogger());

export default createStore(reducers, {}, middleware);



// //
// function reducer(state = {}, action){
//   switch(action.type){
//     case 'message':
//       return Object.assign({}, {message:action.data});
//     default:
//       return state;
//   }
// }
// let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);
// store.subscribe(()=>{
//   console.log('new client state', store.getState());
// });
// store.dispatch({type:'server/hello', data:'Hello!'});