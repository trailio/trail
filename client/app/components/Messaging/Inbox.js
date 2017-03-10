import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import VideoPlayer from 'react-native-video';
import MapView from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../actions/appActions';

import styles from './inboxStyles';
import pinImg from './BluePin.png';
import mapStyle from '../Map/mapStyle';
import GetDirectionsIcon from '../Map/GetDirectionsIcon.png';

import AddFriend from './AddFriend';

class Inbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
    }
  }

  onReceivedPostPress(imageurl, lat, long) {
    this.props.imageURLChanged(imageurl);
    this.props.latitudeChanged(lat);
    this.props.longitudeChanged(long);

  }

  onImagePressed() {
    this.props.imageClosed();
    console.log('IM IN HERE', this.props)
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }
    );
  }

  render () {
    var that = this;
    // console.log('this.props', this.props);
    // console.log('this.state.latitude', this.state.latitude);
    // console.log('this.state.longitude', this.state.longitude);

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

    function checkPic () {
      // console.log('SOIFJEIOSJFSIOEJFISE',that.state.latitude, that.state.longitude, that.props.renderLatitude, that.props.renderLongitude)
      console.log('USER IS THIS MANY METERS AWAY FROM MESSAGE', getDistanceFromLatLonInMeters(that.state.latitude, that.state.longitude, that.props.renderLatitude, that.props.renderLongitude))
      //if user is less than 170 meters away from message, use can view message
      if (that.props.renderLatitude && (getDistanceFromLatLonInMeters(that.state.latitude, that.state.longitude, that.props.renderLatitude, that.props.renderLongitude) <= 170)){
        if (that.props.renderImageURL.indexOf('.jpg') >= 0) {
          return (
              <View>
                <TouchableHighlight onPress={function() { that.onImagePressed(); }}>
                  <Image
                    style={styles.photo}
                    source={{uri: that.props.renderImageURL}}
                  />
                </TouchableHighlight>
              </View>
            );
        } else if (that.props.renderImageURL.indexOf('.mp4') >= 0) {
          return (
            <View>
              <TouchableHighlight onPress={function() { that.onImagePressed(); }}>
                <VideoPlayer source={{uri: that.props.renderImageURL}}
                  rate={1.0}
                  volume={1.0}
                  muted={false}
                  paused={false}
                  resizeMode="cover"
                  repeat={true}
                  style={styles.video}
                />
              </TouchableHighlight>
            </View>
          );
        }
      } else {
        return (
          <View style={styles.slide1}>
            {that.state.latitude ?
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: that.state.latitude,
                  longitude: that.state.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.015}}
                showsUserLocation={true}
                followsUserLocation={true}
                scrollEnabled={false}
                provider={'google'}
                customMapStyle={mapStyle}
                showsScale={true}
                onPress={function() { that.onImagePressed(); }}
              >
                <MapView.Marker
                  coordinate={{        
                    latitude: Number(that.props.renderLatitude),
                    longitude: Number(that.props.renderLongitude),
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.015
                  }}
                  image={require('../Map/TrailPin.png')}
                >
                </MapView.Marker>
                <TouchableHighlight 
                  style={styles.directions}
                  onPress={function(){
                    getDirections({
                     source: {
                      latitude: that.state.latitude,
                      longitude: that.state.longitude
                      },
                      destination: {
                        latitude: Number(that.props.renderLatitude),
                        longitude: Number(that.props.renderLongitude)
                      }
                    })}
                  }
                >
                  <View>
                    <Image source={GetDirectionsIcon} style={styles.icon}/>
                    <Text 
                    style={{
                      color: '#fff',
                      fontSize: 30,
                      fontWeight: 'bold',
                      top: 170,
                      left: 90
                    }}> 
                    Get
                  </Text>
                  <Text 
                    style={{
                      color: '#fff',
                      fontSize: 30,
                      fontWeight: 'bold',
                      top: 170,
                      left: 90
                    }}> 
                    Directions
                  </Text>
                  </View>
                </TouchableHighlight>
              </MapView> : null}
          </View>
        );
      }
    }

    var months = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    }

    var getDate = function(unformattedDate) {
      var dateArr = unformattedDate.split('T')[0].split('-').reverse();
      var month = months[dateArr[1]];
      var date = dateArr[0];
      var year = dateArr[2];

      var amPm;
      var timeArr = unformattedDate.split('T')[1].split(':');
      var hour;

      var convertToPST = function(hour) {
        var correctHour;
        if (hour - 8 < 0) {
          correctHour = 24 + (hour - 8)
        } else {
          correctHour = hour - 8
        }
        return correctHour
      }

      var newHour = convertToPST(timeArr[0])

      if (newHour <= 12) {
        amPm = 'AM';
        hour = newHour;
      } else if (newHour > 12) {
        amPm = 'PM';
        hour = newHour - 12;
      }

      var minutes = timeArr[1];

      return month + ' ' + (Number(date) - 1)  + ', ' + year + ' ' + hour + ':' + minutes + ' ' + amPm;
    }

    var receivedMessages = function() {
      return (
        <View>
        { that.props.receivedPosts.map(function(post, i) {
          console.log('inbox.js rendering messages for ', post.username);
          return (
            <TouchableHighlight
              onPress={that.onReceivedPostPress.bind(that, post.imageurl, post.latitude, post.longitude)}
              key={i}
            >
              <View>
                <View style={styles.postBody}>
                  <Image source={pinImg}/>
                  <Text style={styles.postName}>
                    {post.username}
                  </Text>
                  <Text style={styles.postDate}>
                    {getDate(post.timeposted)}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          );
        })}
        </View>
      );
    };

    if (this.props.renderImageURL && this.props.renderLatitude) {
      // console.log('USER IS THIS MANY METERS AWAY FROM MESSAGE', getDistanceFromLatLonInMeters(this.state.latitude, this.state.longitude, that.props.renderLatitude, that.props.renderLongitude))
      // console.log('that.props.renderLatitude', that.props.renderLatitude)
      // console.log('HELLOOOO', this.state.latitude, this.state.longitude, that.props.renderLatitude, that.props.renderLongitude)
      return checkPic();  
    } else {
      return (
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          showsPagination={false}
          loop={false}
          index={1}
          horizontal={false}
        >
          <View>
            <AddFriend style={styles.slide}/>
          </View>
          <View>
            <View style={styles.heading}>
              <Text style={styles.header}>INBOX</Text>
            </View>
            <View style={styles.scrollBox}>
              <View style={styles.heading}/>
              <ScrollView bounces={true}>
                { receivedMessages() }
                <View style={styles.fillPage}/>
              </ScrollView>
            </View> 
          </View>
        </Swiper>
      );
    }
  }
}

const mapStateToProps = ({app}) => {
  const { isLoggedIn, sentPosts, receivedPosts, renderImageURL, renderLatitude, renderLongitude } = app;
  return {
    isLoggedIn,
    sentPosts,
    receivedPosts,
    renderImageURL,
    renderLatitude,
    renderLongitude
  };
};

const bundledActionCreators = Object.assign({}, appActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
