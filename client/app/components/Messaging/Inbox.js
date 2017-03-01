import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image
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
    console.log("HIIIIIII imageURL changed to: ", imageURL);
    this.props.imageURLChanged(imageURL);
  }

  onImagePressed(){
    this.props.imageClosed();
  }

  render () {
    var that = this;
    var receivedMessages = function() {
      return (
        <View>
        { that.props.receivedPosts.map(function(post){
          return (<TouchableHighlight onPress={function(){that.onReceivedPostPress(post.imageURL)}}><Text style={styles.text2}> {post.username}...long: {post.longitude}, lat: {post.latitude} </Text></TouchableHighlight>)
        })}
        </View>
      )
    };
    if (this.props.renderImageURL) {
      console.log('this.props.renderImageURL!!!!!!', this.props.renderImageURL);
      return(
        <View>
          <TouchableHighlight onPress={function() { that.onImagePressed() }}>
            <Image
              style={{width: 500, height: 500}}
              source={{uri: that.props.renderImageURL}}
            />
          </TouchableHighlight>
        </View>
      );
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
          <View style={styles.slide1}>
            <AddFriend />
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Inbox</Text>
            <ScrollView>
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
