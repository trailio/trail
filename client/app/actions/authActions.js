export function handleLoginClick () {
  return {
    type: 'LOGIN_CLICKED'
  };
}

export function handleSignupClick () {
  return {
    type: 'SIGNUP_CLICKED'
  };
}

export function backClicked () {
  return {
    type: 'BACK_CLICKED'
  };
}

export function usernameChanged (text) {
  return {
    type: 'USERNAME_CHANGED',
    payload: text
  }
};

export function passwordChanged (text) {
  return {
    type: 'PASSWORD_CHANGED',
    payload: text
  }
};
