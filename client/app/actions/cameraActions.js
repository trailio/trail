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

export function postPhoto(userID, username, recipientUserID, latitude, longitude, imageURL, publicPost) {
  return {
    type: types.PostPhoto,
    payload: {
      userID: userID,
      username: username,
      recipientUserID: recipientUserID,
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

export function videoRecordingEnded(videoPath) {
  return {
    type: types.VideoRecordingEnded,
    payload: videoPath
  };
}

export function confirmFriendSelection() {
  return {
    type: types.ConfirmFriendSelection
  };
}

export function toggleUpload() {
  return {
    type: types.ToggleUpload
  };
}

export function toggleIsRecording() {
  return {
    type: types.ToggleIsRecording
  };
}

export function addFriendToRecipients(friendID) {
  return {
    type: types.AddFriendToRecipients,
    payload: friendID
  };
}

export function removeFriendFromRecipients(friendID) {
  return {
    type: types.RemoveFriendFromRecipients,
    payload: friendID
  };
}

export function togglePublicPrivatePost() {
  return {
    type:types.TogglePublicPrivatePost
  }
}
