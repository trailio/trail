import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import MapView from 'react-native-maps';
import mapStyle from '../Map/mapStyle';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mapActions from '../../actions/mapActions';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  map: {
    height: height - 100, 
    width: width,
    margin: 0,
    padding: 0
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10
  }
});

class DropPin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // region: {
      //   latitude: null,
      //   longitude: null,
      //   latitudeDelta: null,
      //   longitudeDelta: null
      // },
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

    // this.setState({
    //   region: {
    //     latitude: lat,
    //     longitude: lon,
    //     latitudeDelta: latDelta,
    //     longitudeDelta: longDelta
    //   }
    // })
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
    console.log('this.state.pinDropLong', this.state.pinDropLong)
    console.log('this.state.pinDropLat', this.state.pinDropLat)
    console.log('this.props.latitude', this.props.latitude)
    console.log('this.props.longitude', this.props.longitude)
    return (
    <View>
      {this.props.latitude ?
        <MapView 
          style={styles.map} 
          initialRegion={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: this.props.latitudeDelta,
            longitudeDelta: this.props.longitudeDelta
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          scrollEnabled={false}
          provider={'google'}
          customMapStyle={mapStyle}
        >
          <MapView.Marker
            coordinate={{
            latitude: this.props.latitude,
            longitude: this.props.longitude
            }}
            title={"title"}
            description={"description"}
            draggable
            onDragEnd={(e) => this.setState({ pinDropLong: e.nativeEvent.coordinate.longitude, pinDropLat: e.nativeEvent.coordinate.latitude})}
          />
        </MapView> : null
      }
      <Text style={styles.text}>Drop Pin</Text>
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

const bundledActionCreators = Object.assign({}, mapActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DropPin);

