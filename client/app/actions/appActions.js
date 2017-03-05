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

export function addedFriend(userID, username, friend) {
  return {
    type: types.AddedFriend,
    payload: {username: username, id: userID, friendID: friend.id}
  }
}