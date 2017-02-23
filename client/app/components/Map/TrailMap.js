import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Swiper from 'react-native-swiper';
import ViewContent from './ViewContent';
import MapView from 'react-native-maps';

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
    backgroundColor: 'grey',
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
      }
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
    console.log('navigator.geolocation', navigator.geolocation);
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
              loadingEnabled={true}
            >
              <MapView.Marker
                coordinate={this.state.region}
                title={"title"}
                description={"description"}
                draggable
              />
            </MapView> : null}
        </View>
        <View style={styles.slide1}>
          <ViewContent />
        </View>
      </Swiper>
    );
  }
}
