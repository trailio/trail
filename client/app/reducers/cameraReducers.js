export default function reducer ( state = {
  captureMode: 'Camera.constants.CaptureMode.video',
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
  default:
    return state;
  }
}
