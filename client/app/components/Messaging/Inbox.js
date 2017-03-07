import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  ScrollView
} from 'react-native';
import Swiper from 'react-native-swiper';
import VideoPlayer from 'react-native-video';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../actions/appActions';

import styles from './styles';
import pinImg from './Pin.png';

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
    console.log('CHECK HERE!!!!!', this.props)
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
    console.log('this.props', this.props);
    console.log('this.state.latitude', this.state.latitude);
    console.log('this.state.longitude', this.state.longitude);


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
      if (lat1 && getDistanceFromLatLonInMeters(lat1, long1, lat2, long2) <= 5) {
        return true;
      } else {
        return false;
      }

    };

    var receivedMessages = function() {
      return (
        <View>
        { that.props.receivedPosts.map(function(post, i) {
          return (
            <TouchableHighlight
              onPress={that.onReceivedPostPress.bind(that, post.imageurl, post.latitude, post.longitude)}
              key={i}
            >
              <View style={styles.postBody}>
                <Image source={pinImg}/>
                <Text style={styles.postName}>
                  {post.username}
                </Text>
                <Text style={styles.postDate}>
                  {post.timeposted}
                </Text>
              </View>
            </TouchableHighlight>
          );
        })}
        </View>
      );
    };

    console.log('this.props', this.props)

    if (this.props.renderImageURL) {
      if (this.props.renderImageURL.indexOf('.mp4') >= 0) {
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
      } else {
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
      }
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
            <AddFriend />
          </View>
          <View style={styles.heading}>
            <Text style={styles.text}>Inbox</Text>
            <ScrollView bounces={true}>
              { receivedMessages() }
            </ScrollView>
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
