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
  }

  onReceivedPostPress(imageurl) {
    this.props.imageURLChanged(imageurl);
  }

  onImagePressed() {
    this.props.imageClosed();
  }

  render () {
    var that = this;

    var receivedMessages = function() {
      return (
        <View>
        { that.props.receivedPosts.map(function(post, i) {
          return (
            <TouchableHighlight
              onPress={that.onReceivedPostPress.bind(that, post.imageurl)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
