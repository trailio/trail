import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
  Modal
} from 'react-native';
import Swiper from 'react-native-swiper';
import ViewContent from './ViewContent';
import MapView from 'react-native-maps';
import store from '../../store.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../actions/appActions';

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
  },
  modalVisible: false
});

class TrailMap extends Component {
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
    this.setState({
      region: {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015
      },
    })
  }

  onMarkerPress(imageURL) {
    this.props.imageURLChanged(imageURL);
    this.setState({modalVisible: true});
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
    var image = () => { 
      if (this.props.renderImageURL.length) {
      return (
        <Image
          style={{width: 500, height: 500}}
          source={{uri: this.props.renderImageURL}}
        />
        )
      }
    };
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
              // followsUserLocation={true}
              scrollEnabled={false}
            >
              <MapView.Marker
                coordinate={this.state.region}
                title={"Alfred"}
                draggable
              />
            {this.props.receivedPosts.map((marker,i) => (
              <MapView.Marker 
                coordinate={{
                  latitude: Number(marker.latitude),
                  longitude: Number(marker.longitude)
                }}
                title={marker.username}
                key={i}
                pinColor={'aqua'}
              >
                <MapView.Callout tooltip style={styles.customView}>
                  <Modal onPress={()=>this.onMarkerPress()} underlayColor='#dddddd' visible={this.state.modalVisible}>
                      <View>
                          <Image style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height - 100}}
                          source={{uri: marker.imageURL}}/> 
                          <TouchableHighlight onPress={()=>this.setState({modalVisible: !this.state.modalVisible})}>
                            <Text >Close Image</Text>
                          </TouchableHighlight>
                      </View>
                  </Modal>
                </MapView.Callout>
              </MapView.Marker>
            ))}
            </MapView> : null}
            <View>
              {image()}
            </View>
        </View>
        <View style={styles.slide1}>
          <ViewContent />
        </View>
      </Swiper>
    );
  }
}

const mapStateToProps = ({app}) => {
  const { isLoggedIn, sentPosts, receivedPosts, renderImageURL } = app;
  return {
    isLoggedIn, 
    sentPosts, 
    receivedPosts,
    renderImageURL
  };
};

const bundledActionCreators = Object.assign({}, appActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TrailMap);
