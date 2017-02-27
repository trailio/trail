import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import Swiper from 'react-native-swiper';
import AddFriend from './AddFriend';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../actions/appActions';
import TrailApp from '../trailApp';


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
  }
});

class Inbox extends Component {
  constructor(props) {
    super(props);
  }

  onReceivedPostPress(imageURL) {
    this.props.imageURLChanged(imageURL);
  }

  render () {
    var that = this
    var receivedMessages = function() {
      return (
        <View>
        { that.props.receivedPosts.map(function(post){
          return (<TouchableHighlight onPress={that.onReceivedPostPress(post.imageURL)}><Text style={styles.text2}> {post.username}...long: {post.longitude}, lat: {post.latitude} </Text></TouchableHighlight>)
        })}
        </View>
      )
    };

    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        showsPagination={false}
        loop={false}
        index={1}
        horizontal={false}
      >
        <View style={styles.slide1}>
          <AddFriend />
        </View>
        <View style={styles.slide1}>
          <Text style={styles.text}>Inbox</Text>
          <ScrollView>
            { receivedMessages() }
          </ScrollView>
        </View>
      </Swiper>
    );
  }
}


const mapStateToProps = ({app}) => {
  const { isLoggedIn, sentPosts, receivedPosts } = app;
  return {
    isLoggedIn,
    sentPosts,
    receivedPosts
  };
};

const bundledActionCreators = Object.assign({}, appActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);