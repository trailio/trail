import types from './types';

export function loginUser (user) {
  return {
    type: types.LoginUser,
    payload: user
  };
}

export function imageURLChanged (imageURL) {
  return {
    type: types.ImageURLChanged,
    payload: imageURL
  };
}

export function imageClosed () {
  return {
    type: types.ImageClosed
  };
}

export function searchedUser (searchText, userID) {
  return {
    type: types.SearchedUser,
    payload: {
              searchText: searchText,
              userID: userID
             }
  };
}

export function addedFriend(primaryID, friendID) {
  return {
    type: types.AddedFriend,
    payload: {primaryID: primaryID, friendID: friendID}
  }
}

export function removedFriend(primaryID, friendID) {
  return {
    type: types.RemovedFriend,
    payload: {primaryID: primaryID, friendID: friendID}
  }
}