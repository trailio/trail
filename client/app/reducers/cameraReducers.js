const constants = {
  still: 'Camera.constants.CaptureMode.still',
  video: 'Camera.constants.CaptureMode.video',
  front: 'Camera.constants.Type.front',
  back: 'Camera.constants.Type.back'
}

export default function reducer ( state = {
  captureMode: constants.video,
  captureSide: constants.front
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
  default:
    return state;
  }
}
