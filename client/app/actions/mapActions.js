import types from './types';

export function currentCoordsFound (latitude, longitude, latitudeDelta, longitudeDelta) {
  return {
    type: types.CurrentCoordsFound,
    payload: {
    	latitude: latitude,
    	longitude: longitude,
    	latitudeDelta: latitudeDelta,
  		longitudeDelta: longitudeDelta
    }
  };
}