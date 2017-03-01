import types from './types';

export function handleLoginClick () {
  return {
    type: types.ClickedLogin
  };
}

export function handleSignupClick () {
  return {
    type: types.ClickedSignin
  };
}

export function backClicked () {
  return {
    type: types.ClickedBack
  };
}

export function usernameChanged (text) {
  return {
    type: types.UsernameChanged,
    payload: text
  };
}

export function passwordChanged (text) {
  return {
    type: types.PasswordChanged,
    payload: text
  };
}

export function SubmitSignin (username, password) {
  return {
    type: types.SocketSignIn,
    payload: {
      username: username,
      password: password
    }
  };
}

export function SubmitSignup (username, password, email) {
  return {
    type: types.SocketSignUp,
    payload: {
      username: username,
      password: password,
      email: email
    }
  };
}
