export default function reducer ( state = {
  isLoggedIn: false,
}, action) {
  switch (action.type) {
  case 'LOGIN_USER': {
    return Object.assign({}, state, {
      isLoggedIn: true
    });
  }
  default:
    return state;
  }
}
