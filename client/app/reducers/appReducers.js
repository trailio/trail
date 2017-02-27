export default function reducer ( state = {
  isLoggedIn: false,
  sentPosts: {}, 
  receivedPosts: {}
}, action) {
  switch (action.type) {
  case 'LOGIN_USER': {
    return {
      ...state,
      isLoggedIn: true,
      sentPosts: action.payload.sent,
      receivedPosts: action.payload.received
    }
  }
  default:
    return state;
  }
}
