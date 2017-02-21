export default function reducer ( state = {
  loginClicked: false,
  signupClicked: false,
  username: '',
  password: ''
}, action) {
  switch (action.type) {
  case 'LOGIN_CLICKED': {
    return Object.assign({}, state, {
      loginClicked: true,
      signupClicked: false
    });
  }
  case 'SIGNUP_CLICKED': {
    return Object.assign({}, state, {
      loginClicked: false,
      signupClicked: true
    });
  }
  case 'BACK_CLICKED': {
    return Object.assign({}, state, {
      loginClicked: false,
      signupClicked: false
    });
  }
  case 'USERNAME_CHANGED': {
    return {
      ...state,
      username: action.payload
    }
  }
  case 'PASSWORD_CHANGED': {
    return {
      ...state,
      password: action.payload
    }
  }
  default:
    return state;
  }
}
