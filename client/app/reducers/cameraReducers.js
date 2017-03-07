import ReactNativeCamera from 'react-native-camera';

const constants = {
  still: ReactNativeCamera.constants.CaptureMode.still,
  video: ReactNativeCamera.constants.CaptureMode.video,
  front: ReactNativeCamera.constants.Type.front,
  back: ReactNativeCamera.constants.Type.back,
  flashOn: ReactNativeCamera.constants.FlashMode.on,
  flashOff: ReactNativeCamera.constants.FlashMode.off,
  flashAuto: ReactNativeCamera.constants.FlashMode.auto
};

export default function reducer ( state = {
  captureMode: constants.still,
  captureSide: constants.back,
  currentView: 'cameraView',
  flashMode: constants.flashOff,
  friendRecipients: [],
  isPublicPost: true,
  isRecording: false,
  photoPath: '',
  uploadPhoto: false,
  videoPath: ''
}, action) {
  switch (action.type) {
  case 'TOGGLE_CAPTURE_MODE': {
    if (state.captureMode === constants.video) {
      return {
        ...state,
        captureMode: constants.still
      }
    } else {
      return {
        ...state,
        captureMode: constants.video
      }
    }
  }
  case 'TOGGLE_CAPTURE_SIDE': {
    if (state.captureSide === constants.front) {
      return {
        ...state,
        captureSide: constants.back
      }
    } else {
      return {
        ...state,
        captureSide: constants.front
      }
    }
  }
  case 'TOGGLE_FLASH_MODE': {
    if (state.flashMode === constants.flashOff) {
      return {
        ...state,
        flashMode: constants.flashOn
      }
    } else if (state.flashMode === constants.flashOn) {
      return {
        ...state,
        flashMode: constants.flashAuto
      }
    } else {
      return {
        ...state,
        flashMode: constants.flashOff
      }
    }
  }
  case 'PHOTO_CAPTURE_PRESSED': {
    return {
      ...state,
      photoPath: action.payload,
      currentView: 'friendSelect'
    }
  }
  case 'CONFIRM_FRIEND_SELECTION': {
    return {
      ...state,
      currentView: 'dropPin'
    }
  }
  case 'TOGGLE_UPLOAD': {
    if (state.uploadPhoto === true) {
      return {
        ...state,
        isRecording: false,
        uploadPhoto: false,
        friendRecipients: [],
        photoPath: '',
        videoPath: ''
      }
    } else if (state.uploadPhoto === false) {
      return {
        ...state,
        uploadPhoto: true,
        currentView: 'cameraView'
      }
    }
  }
  case 'TOGGLE_ISRECORDING': {
    if (state.isRecording === true) {
      return {
        ...state,
        isRecording: false
      }
    } else if (state.isRecording === false) {
      return {
        ...state,
        isRecording: true
      }
    }
  }
  case 'VIDEO_RECORDING_ENDED': {
    return {
      ...state,
      videoPath: action.payload,
      currentView: 'friendSelect'
    }
  }
  case 'ADD_FRIEND_TO_RECIPIENTS': {
    return {
      ...state,
      friendRecipients: [...state.friendRecipients, action.payload]
    }
  }
  case 'REMOVE_FRIEND_FROM_RECIPIENTS': {
    return {
      ...state,
      friendRecipients: state.friendRecipients.filter(item => item !== action.payload)
    };
  }
  case 'TOGGLE_PUBLIC_PRIVATE_POST': {
    return {
      ...state,
      isPublicPost: !state.isPublicPost
    }
  }
  default:
    return state;
  }
}
