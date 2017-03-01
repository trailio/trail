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
import pinImg from './Pin.png'
// import Inbox from './Inbox'

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
    textAlign: 'center'
  },
  postBody: {
    // margin: .25,
    borderColor: '#81cbe5',
    borderWidth: .25,
    borderRadius: 5,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  pinImg: {
  },
  postName:  {
    color: '#54575C',
    fontSize: 14
  },
  postDate: {
    color: '#54575C',
    fontSize: 10
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
        { that.props.receivedPosts.map(function(post, i){
          return (
          <TouchableHighlight onPress={function(){that.onReceivedPostPress(post.imageURL)}} key={i}>
            <View style={styles.postBody}>
              <Image source={pinImg} style={pinImg}/>
              <Text style={styles.postName}> 
                {post.username}
              </Text>
              <Text style={styles.postDate}>
                {post.timePosted}
              </Text>
            </View>
            </TouchableHighlight>)
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
          <View>
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
