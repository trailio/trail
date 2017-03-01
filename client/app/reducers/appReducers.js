export default function reducer ( state = {
  isLoggedIn: false,
  sentPosts: [],
  receivedPosts: [],
  renderImageURL: '',
}, action) {
  switch (action.type) {
  case 'LOGIN_USER': {
    console.log('!!!!!!!!!!!!', action.payload)
    var sentPosts, receivedPosts;
    if (action.payload.sent || action.payload.received) {
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
