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

export function addedFriend(friend) {
  return {
    type: types.AddedFriend,
    payload: friend
  }
}