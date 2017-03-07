const types = {

  LoginUser: 'LOGIN_USER',
  ImageURLChanged: 'IMAGEURL_CHANGED',
  ImageClosed: 'IMAGE_CLOSED',
  SearchedUser: 'socket/searchedUser',
  AddedFriend: 'socket/addFriend',
  RemovedFriend: 'socket/removeFriend',

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

  VideoRecordingEnded: 'VIDEO_RECORDING_ENDED',
  PhotoCapturePressed: 'PHOTO_CAPTURE_PRESSED',
  ConfirmFriendSelection: 'CONFIRM_FRIEND_SELECTION',

  ToggleUpload: 'TOGGLE_UPLOAD',
  ToggleIsRecording: 'TOGGLE_ISRECORDING',

  AddFriendToRecipients: 'ADD_FRIEND_TO_RECIPIENTS',
  RemoveFriendFromRecipients: 'REMOVE_FRIEND_FROM_RECIPIENTS',

  DropPin: 'DROP_PIN'

  // SocketHello: 'socket/hello'
  // SocketReceiveMessage: 'server/receiveMessage'
};

export default types;
