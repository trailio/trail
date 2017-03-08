import types from './types';

export function loginUser (user) {
  return {
    type: types.LoginUser,
    payload: user
  };
}

export function latitudeChanged (latitude) {
  return {
    type: types.LatitudeChanged,
    payload: latitude
  };
}

export function longitudeChanged (longitude) {
  return {
    type: types.LongitudeChanged,
    payload: longitude
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

export function addedFriend(primaryUser, friend) {
  return {
    type: types.AddedFriend,
    payload: {user: primaryUser, friend: friend}
  }
}

export function removedFriend(primaryID, friendID) {
  return {
    type: types.RemovedFriend,
    payload: {primaryID: primaryID, friendID: friendID}
  }
}