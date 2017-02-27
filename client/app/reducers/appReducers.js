export default function reducer ( state = {
  isLoggedIn: false,
  sentPosts: [], 
  receivedPosts: [],
  renderImageURL: '',
}, action) {
  switch (action.type) {
  case 'LOGIN_USER': {
    console.log('!!!!!!!!!!!!', action.payload)
    return {
      ...state,
      isLoggedIn: true,
      sentPosts: action.payload.sent,
      receivedPosts: action.payload.received
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
