import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Swiper from 'react-native-swiper';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    height: 600, margin: 0
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  }
});

export default class DropPin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
      },
      pinDropLong: null,
      pinDropLat: null
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
      }
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
    console.log('this.state.pinDropLong', this.state.pinDropLong)
    console.log('this.state.pinDropLat', this.state.pinDropLat)
    return (
    <View>
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