const types = {

  LoginUser: 'LOGIN_USER',
  ImageURLChanged: 'IMAGEURL_CHANGED',

  ClickedLogin: 'LOGIN_CLICKED',
  ClickedSignin: 'SIGNUP_CLICKED',
  ClickedBack: 'BACK_CLICKED',

  UsernameChanged: 'USERNAME_CHANGED',
  PasswordChanged: 'PASSWORD_CHANGED',

  ToggleCaptureMode: 'TOGGLE_CAPTURE_MODE',
  ToggleCaptureSide: 'TOGGLE_CAPTURE_SIDE',
  ToggleFlashMode: 'TOGGLE_FLASH_MODE',

  SocketSignIn: 'socket/signin',
  SocketSignUp: 'socket/signup',

  PostPhoto: 'socket/postPhoto',

  CurrentCoordsFound: 'CURRENT_COORDS_FOUND',
  // SocketHello: 'socket/hello'
  // SocketReceiveMessage: 'server/receiveMessage'
};

export default types;
