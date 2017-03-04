import types from './types';

export function toggleCaptureMode () {
  return {
    type: types.ToggleCaptureMode
  };
}

export function toggleCaptureSide () {
  return {
    type: types.ToggleCaptureSide
  };
}

export function toggleFlashMode () {
  return {
    type: types.ToggleFlashMode
  };
}

export function postPhoto(latitude, longitude, imageURL, publicPost) {
  return {
    type: types.PostPhoto,
    payload: {
      latitude: latitude,
      longitude: longitude,
      imageURL: imageURL,
      publicPost: publicPost
    }
  };
}

export function photoCapturePressed(photoPath) {
  return {
    type: types.PhotoCapturePressed,
    payload: photoPath
  };
}
