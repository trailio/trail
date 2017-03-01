export default function reducer ( state = {
  isLoggedIn: false,
  sentPosts: [],
  receivedPosts: [],
  renderImageURL: '',
}, action) {
  switch (action.type) {
  case 'LOGIN_USER': {
    if (typeof action.payload === 'Object') {
      console.log('Action.payload is an object');
      return {
        ...state,
        isLoggedIn: true,
        sentPosts: action.payload.sent,
        receivedPosts: action.payload.received
      }
    } else {
      return {
        ...state,
        isLoggedIn: true,
      }
    }
  }
  case 'USER_SEARCHED' : {
    console.log('user searched received from server', action.payload);
    return {
      ...state
    }
  }
  case 'IMAGEURL_CHANGED': {
    console.log('!!!!!!!!!!!!', action.payload)
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
