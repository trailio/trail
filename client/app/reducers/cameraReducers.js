export default function reducer ( state = {
  captureMode: 'Camera.constants.CaptureMode.video',
  captureSide: 'Camera.constants.Type.front'
}, action) {
  switch (action.type) {
  case 'TOGGLE_CAPTURE_MODE': {
    if (state.captureMode === 'Camera.constants.CaptureMode.video') {
      return {
        ...state,
        captureMode: 'Camera.constants.CaptureMode.still'
      }
    } else {
      return {
        ...state,
        captureMode: 'Camera.constants.CaptureMode.video'
      }
    }
  }
  case 'TOGGLE_CAPTURE_SIDE': {
    if (state.captureSide === 'Camera.constants.Type.front') {
      return {
        ...state,
        captureSide: 'Camera.constants.Type.back'
      }
    } else {
      return {
        ...state,
        captureSide: 'Camera.constants.Type.front'
      }
    }
  }
  default:
    return state;
  }
}
