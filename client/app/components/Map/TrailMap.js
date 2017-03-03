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
import PopupDialog, { SlideAnimation, DialogButton } from 'react-native-popup-dialog';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../actions/appActions';

const {height, width} = Dimensions.get('window');

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
  calloutStyle: {
    flex: 1, 
    position: 'relative',
  }
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
      }
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
    console.log('this.props.receivedPosts',this.props.receivedPosts)

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
                draggable      
              >
                <MapView.Callout onPress={() => {this.popupDialog.openDialog()}} style={styles.calloutStyle}>
                  <View>
                    <Text>
                      Alfred
                    </Text>
                  </View>  
                </MapView.Callout>
              </MapView.Marker>
              <PopupDialog 
                ref={(popupDialog) => {this.popupDialog=popupDialog}} 
                height={height} 
                dialogAnimation={new SlideAnimation({slideFrom: 'top'})} 
                actions={[
                  <DialogButton
                    text='X'
                    onPress={() => {this.popupDialog.dismiss()}}
                    key='button-1'
                    align='left'
                  />
                ]}>
                <View>
                    <Image
                      style={{width: width, height: height - 100}}
                      source={{uri: 'https://trail-media.s3.amazonaws.com/photos%2Fuser20170301T181739776Z.jpg'}}
                    />
                </View>
              </PopupDialog>


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
