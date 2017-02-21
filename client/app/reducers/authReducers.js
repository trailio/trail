export default function reducer ( state = {
  loginClicked: false,
  signupClicked: false
}, action) {
  switch (action.type) {
    case 'LOGIN_CLICKED': {
      return Object.assign({}, state, {
        loginClicked: true,
        signupClicked: false
      })
    }
    case 'SIGNUP_CLICKED': {
      return Object.assign({}, state, {
        loginClicked: false,
        signupClicked: true
      })
    }
    case 'BACK_CLICKED': {
      return Object.assign({}, state, {
        loginClicked: false,
        signupClicked: false
      })
    }
    default:
      return state;
  }
}
