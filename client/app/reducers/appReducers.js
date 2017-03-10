export default function reducer ( state = {
  isLoggedIn: false,
  username: '',
  id: '',
  sentPosts: [],
  receivedPosts: [],
  publicPosts: [],
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
        publicPosts: action.payload.posts.publicPosts,
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
    console.log('post received just now: ', action.data)
    // console.log('state.receivedPosts', state.receivedPosts);
    return {
      ...state,
      receivedPosts: state.receivedPosts.concat(action.data)
    }
  }
  case 'POST_SENT': {
    console.log('post sent just now: ', action.data)
    console.log('state.sentPosts', state.sentPosts)
    return {
      ...state,
      sentPosts: state.sentPosts.concat(action.data)
    }
  }
  case 'PUBLIC_POST': {
    state.publicPosts.push(action.data);
    console.log('public post just now: ', action.data)
    console.log('state.publicPosts', state.publicPosts)
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
    var editedAcceptedFriends = state.receivedFriendRequests.filter(function(friend){
      return (!(friend.id === action.data.id));
    })
    var editedSentFriends = state.sentFriendRequests.filter(function(friend){
      return (!(friend.id === action.data.id));
    })
    console.log('friend added: ', action.data.username)
    console.log('new friend list => ', state.friendList)
    return {
      ...state,
      receivedFriendRequests: editedAcceptedFriends,
      sentFriendRequests: editedSentFriends
    }
  }
  case 'FRIEND_REQUEST_OUTGOING': {
    console.log('friend request sent to: ', action.data.username)
    console.log('new sent requests list => ', state.sentFriendRequests)
    return {
      ...state,
      sentFriendRequests: state.sentFriendRequests.concat(action.data)
    }
  }

  case 'FRIEND_REQUEST_INCOMING': {
    console.log('friend request sent to: ', action.data.username)
    console.log('new sent requests list => ', state.receivedFriendRequests)
    return {
      ...state,
      receivedFriendRequests: state.receivedFriendRequests.concat(action.data)
    }
  }

  default:
    return state;
  }
}
