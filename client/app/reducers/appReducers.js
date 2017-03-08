export default function reducer ( state = {
  isLoggedIn: false,
  username: '',
  id: '',
  sentPosts: [],
  receivedPosts: [],
  friendList: [{username: 'blobz341', id: 3}, {username: 'mamoize91', id: 5}, {username: 'xxoxoxaznxo23', id: 7}, {username: 'poofzie', id: 1}],
  receivedFriendRequests: [{username: 'blobz341', id: 3}, {username: 'mamoize91', id: 5}, {username: 'poofzie', id: 1}],
  sentFriendRequests: [{username: 'xxoxoxaznxo23', id: 7}],
  renderImageURL: '',
  renderLatitude: '',
  renderLongitude: '',
  searchedFriends: [],
}, action) {
  switch (action.type) {
  case 'LOGIN_USER': {
    // console.log('IS Action.payload an object???????', action.payload);
    // console.log(typeof action.payload)
    if (typeof action.payload === 'object') {
      // console.log('Action.payload is an object!!!!', action.payload);
      // console.log('Received friendlist from server: ', action.payload.friends);
      //note: friends is an array of objects containing both username and id
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        id: action.payload.id,
        sentPosts: action.payload.posts.sent,
        receivedPosts: action.payload.posts.received,
        friendList: action.payload.friendList,
        receivedFriendRequests: action.payload.receivedFriendRequests,
        sentFriendRequests: action.payload.sentFriendRequests
      }
    } else {
      return {
        ...state,
        isLoggedIn: true
      }
    }
  }
  case 'LOGOUT_CLICKED': {
    return {
      ...state,
      isLoggedIn: false,
      username: '',
      id: '',
      sentPosts: [],
      receivedPosts: [],
      friendList: [{username: 'blobz341', id: 3}, {username: 'mamoize91', id: 5}, {username: 'xxoxoxaznxo23', id: 7}, {username: 'poofzie', id: 1}],
      receivedFriendRequests: [{username: 'blobz341', id: 3}, {username: 'mamoize91', id: 5}, {username: 'poofzie', id: 1}],
      sentFriendRequests: [{username: 'xxoxoxaznxo23', id: 7}],
      renderImageURL: '',
      searchedFriends: []
    }
  }
  case 'USER_SEARCHED': {
    // console.log('user searched received from server', action.data);
    return {
      ...state,
      searchedFriends: action.data  
    }
  }
  case 'IMAGEURL_CHANGED': {
    return {
      ...state,
      renderImageURL: action.payload
    }
  }
  case 'IMAGE_CLOSED': {
    return {
      ...state,
      renderImageURL: '',
      renderLatitude: '',
      renderLongitude: ''
    }
  }
  case 'LATITUDE_CHANGED': {
    return {
      ...state,
      renderLatitude: action.payload
    }
  }
  case 'LONGITUDE_CHANGED': {
    return {
      ...state,
      renderLongitude: action.payload
    }
  }
  case 'POST_RECEIVED': {
    state.receivedPosts.push(action.data)
    console.log('post received just now: ', action.data)
    return {
      ...state
    }
  }
  case 'POST_SENT': {
    state.sentPosts.push(action.data);
    console.log('post sent just now: ', action.data)
    return {
      ...state
    }
  }  
  case 'FRIEND_REMOVED': {
    console.log('friend removed for id ', action.data)
    var editedFriends = state.friendList.filter(function(friend){
      return (!(friend.id === action.data));
    })
    return {
      ...state,
      friendList: editedFriends
    }
  }
  case 'FRIEND_ADDED': {
    state.friendList.push(action.data);
    console.log('friend added: ', action.data.username)
    console.log('new friend list => ', state.friendList)
    return {
      ...state
    }
  }
  case 'FRIEND_REQUEST_OUTGOING': {
    state.sentFriendRequests.push(action.data);
    console.log('friend request sent to: ', action.data.username)
    console.log('new sent requests list => ', state.sentFriendRequests)
    return {
      ...state
    }
  }

  case 'FRIEND_REQUEST_INCOMING': {
    state.receivedFriendRequests.push(action.data);
    console.log('friend request sent to: ', action.data.username)
    console.log('new sent requests list => ', state.receivedFriendRequests)
    return {
      ...state
    }
  }

  default:
    return state;
  }
}
