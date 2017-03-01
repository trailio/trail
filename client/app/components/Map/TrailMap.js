import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import ViewContent from './ViewContent';
import MapView from 'react-native-maps';
import store from '../../store.js';
import mapStyle from './mapStyle';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';

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
    modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal2: {
    height: 230,
    backgroundColor: "#3B5998"
  },

  modal3: {
    height: 300,
    width: 300
  },

  modal4: {
    height: 300
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "black",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

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
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    }
  };

  calcDelta(lat, lon, accuracy) {
    this.setState({
      region: {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015
      },
    });
  }

  openModal1(id) {
    this.refs.modal1.open();
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        this.calcDelta(lat, lon, accuracy);
      }
    );
  }

  render () {

    console.log('trailmap!!!!!!!!this.props.latitude', this.props.latitude)
    console.log('trailmap!!!!!!!!store.getState()', store.getState())

    var BContent = <Button onPress={() => this.setState({isOpen: false})} style={[styles.btn, styles.btnModal]}>X</Button>;

    var image = () => { 
      if (this.props.renderImageURL.length) {
        return (
        <Image
          style={{width: 500, height: 500}}
          source={{uri: this.props.renderImageURL}}
        />
        );
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
              provider={'google'}
              customMapStyle={mapStyle}
              showsScale={true}
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
                onPress={() => this.refs.modal1.open()}
              >
              </MapView.Marker>
            ))}
            </MapView> : null}
            <View>
              <Modal
                style={[styles.modal, styles.modal1]}
                ref={"modal1"}
                swipeToClose={this.state.swipeToClose}
                onClosed={this.onClose}
                onOpened={this.onOpen}
                onClosingState={this.onClosingState}>
                  <Text>Hi</Text>
                  <Button onPress={() => this.setState({swipeToClose: !this.state.swipeToClose})} style={styles.btn}>Disable swipeToClose({this.state.swipeToClose ? "true" : "false"})</Button>
              </Modal>
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
