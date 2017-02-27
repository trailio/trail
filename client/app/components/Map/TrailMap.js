import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Swiper from 'react-native-swiper';
import ViewContent from './ViewContent';
import MapView from 'react-native-maps';
import store from '../../store.js';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});

export default class TrailMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
      },
      friendMarkers: [{
        title: 'Jimothy',
        coordinates: {
          latitude: 37.78728814970013,
          longitude: -122.40743033333337
        },
      },
      {
        title: 'Andrew',
        coordinates: {
          latitude: 37.78541777072449,
          longitude: -122.40435033333334
        },  
      },
      {
        title: 'Jen',
        coordinates: {
          latitude: 37.784332402346976,
          longitude: -122.40630366666669
        },  
      }]
    }
  }

  calcDelta(lat, lon, accuracy) {
    const oneDegreeOfLongitudeInMeters = 10000;
    const circumference = 10000;

    const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
    const longDelta = (accuracy / oneDegreeOfLongitudeInMeters);

    this.setState({
      region: {
        latitude: lat,
        longitude: lon,
        latitudeDelta: latDelta,
        longitudeDelta: longDelta
      },
    })
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const accuracy = position.coords.accuracy
        this.calcDelta(lat, lon, accuracy)
      }
    )
  }

  render () {
    console.log('trailmap!!!!!!!!this.props.latitude', this.props.latitude)
    console.log('trailmap!!!!!!!!store.getState()', store.getState())
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        showsPagination={false}
        loop={false}
        horizontal={false}
      >
        <View style={styles.slide1}>
          {this.state.region.latitude ?
            <MapView 
              style={styles.map} 
              initialRegion={this.state.region}
              showsUserLocation={true}
              followsUserLocation={true}
              scrollEnabled={false}
            >
              <MapView.Marker
                coordinate={this.state.region}
                title={"Alfred"}
                draggable
              />
            {this.state.friendMarkers.map((marker,i) => (
              <MapView.Marker 
                coordinate={marker.coordinates}
                title={marker.title}
                key={i}
                pinColor={"aqua"}
              />
            ))}
            </MapView> : null}
        </View>
        <View style={styles.slide1}>
          <ViewContent />
        </View>
      </Swiper>
    );
  }
}
