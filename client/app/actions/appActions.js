import types from './types';

export function loginUser () {
  return {
    type: types.LoginUser
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

export function searchedUser (searchText) {
  return {
    type: types.SearchedUser,
    payload: searchText
  };
}

export function addedFriend(userID, username, friend) {
  return {
    type: types.AddedFriend,
    payload: {username: username, id: userID, friendID: friend.id}
  }
}