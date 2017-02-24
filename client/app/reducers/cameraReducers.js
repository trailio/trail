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
  captureMode: constants.video,
  captureSide: constants.back,
  flashMode: constants.flashOff
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
  default:
    return state;
  }
}
