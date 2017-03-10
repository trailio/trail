import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import MapView from 'react-native-maps';
import mapStyle from '../Map/mapStyle';
import sendIcon from './send.png';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as cameraActions from '../../actions/cameraActions';
import * as mapActions from '../../actions/mapActions';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  map: {
    height: height,
    width: width,
    margin: 0,
    padding: 0
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    position: 'absolute',
  },
  send: {
    position: 'absolute',
    top: height - 150,
    bottom: 0,
    left: width - 120,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  }
});

class DropPin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pinDropLong: null,
      pinDropLat: null
    }
  }

  calcDelta(lat, lon, accuracy) {
    const oneDegreeOfLongitudeInMeters = 10000;
    const circumference = 10000;

    const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
    const longDelta = (accuracy / oneDegreeOfLongitudeInMeters);

    this.props.currentCoordsFound(lat, lon, latDelta, longDelta);
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

  submitPinDrop() {
    console.log('PROPS == ', this.state.pinDropLat, this.state.pinDropLong);
    this.props.dropPin(this.state.pinDropLat, this.state.pinDropLong);
    this.props.toggleUpload();
  }

  render () {

    var sendPin = function() { console.log('SENDDDPINNN!!!!!', this)};
    var that = this;

    //To calculate distance between two coordinates: https://en.wikipedia.org/wiki/Haversine_formula
    function getDistanceFromLatLonInMeters(lat1,lon1,lat2,lon2) {
      var R = 6371000; // Radius of the earth in meters
      var dLat = deg2rad(lat2-lat1);
      var dLon = deg2rad(lon2-lon1);
      var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in meters
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }

    var locationCheck = function(lat1, long1, lat2, long2) {
      if (lat1 && getDistanceFromLatLonInMeters(lat1, long1, lat2, long2) <= 170) {
        return (
          <TouchableHighlight onPress={that.submitPinDrop.bind(that)} style={styles.send}>
            <Image source={sendIcon}/>
          </TouchableHighlight>
        );
      } else {
        return null;
      }
    };

    return (
    <View>
  
      {this.props.latitude ?
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
          followsUserLocation={true}
          scrollEnabled={true}
          provider={'google'}
          customMapStyle={mapStyle}
        >
            <Text style={{
              color: '#fff',
              fontSize: 60,
              fontWeight: 'bold',
              color: 'rgba(255, 255, 255, .5)',
              textAlign: 'center',
              top: height/2,
              backgroundColor: 'rgba(0, 0, 0, 0)'
            }}>Drop Pin</Text>
        <MapView.Circle
          center={{
            latitude: this.props.latitude,
            longitude: this.props.longitude
          }}
          radius={170}
          strokeWidth={3}
          strokeColor={'rgba(234, 75, 75, 0.8)'}
          fillColor={'rgba(236, 199, 189, 0.8)'}
          zIndex={2}
        />
          <MapView.Marker
            coordinate={{
            latitude: Number(this.props.latitude),
            longitude: Number(this.props.longitude)
            }}
            image={require('../Map/TrailPin.png')}
            draggable
            onDragEnd={(e) => this.setState({ pinDropLong: e.nativeEvent.coordinate.longitude, pinDropLat: e.nativeEvent.coordinate.latitude})}
          />
        </MapView> : null
      }
      {locationCheck(this.state.pinDropLat, this.state.pinDropLong, this.props.latitude, this.props.longitude)}
    </View>
    );
  }
}

const mapStateToProps = ({map}) => {
  const { latitude, longitude, latitudeDelta, longitudeDelta } = map;
  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta
  };
};

const bundledActionCreators = Object.assign({}, cameraActions, mapActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DropPin);