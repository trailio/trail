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