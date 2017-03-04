export default function reducer ( state = {
  isLoggedIn: false,
  username: '',
  id: '',
  sentPosts: [],
  receivedPosts: [],
  friendList: [{username: 'blobz341', id: 3}, {username: 'mamoize91', id: 5}, {username: 'xxoxoxaznxo23', id: 7}, {username: 'poofzie', id: 1}],
  renderImageURL: '',
  searchedFriends: []
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
        id: action.payload.posts.id,
        sentPosts: action.payload.posts.sent,
        receivedPosts: action.payload.posts.received,
        friendList: action.payload.friends
      }
    } else {
      return {
        ...state,
        isLoggedIn: true
      }
    }
  }
  case 'USER_SEARCHED': {
    console.log('user searched received from server', action.data);
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
      renderImageURL: ''
    }
  }
  default:
    return state;
  }
}
