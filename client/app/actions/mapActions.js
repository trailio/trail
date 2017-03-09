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

export function dropPin (pinDropLat, pinDropLong) {
  return {
    type: types.DropPin,
    payload: {
      pinDropLat: pinDropLat,
      pinDropLong: pinDropLong
    }
  };
}