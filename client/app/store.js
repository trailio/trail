import { applyMiddleware, createStore, compose} from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import ReduxLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise-middleware';

import reducers from "./reducers"

// let socket = io('http://localhost:8000');
let socket = io('http://6538119a.ngrok.io');
let socketIoMiddleware = createSocketIoMiddleware(socket, "socket/");

const middleware = applyMiddleware(ReduxPromise(), socketIoMiddleware, ReduxThunk, ReduxLogger());

let store = createStore(reducers, {}, middleware);

// console.log('hahahahhaahhah');
// store.subscribe(()=>{
//   console.log('new client state', store.getState());
// });

// store.dispatch({type:'socket/hello', foodtype:'Hello!'});

export default store;



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