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

export function submitSignin (usernameText, passwordText) {
  return {
    type: types.SocketSignIn,
    payload: {
      usernameText: usernameText,
      passwordText: passwordText
    }
  };
}

export function submitSignup (usernameText, passwordText, email) {
  return {
    type: types.SocketSignUp,
    payload: {
      usernameText: usernameText,
      passwordText: passwordText,
      email: email
    }
  };
}
