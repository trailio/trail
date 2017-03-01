import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import searchImg from './search.png'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../actions/appActions';

const styles = StyleSheet.create({
  wrapper: {
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
   heading: {
    padding: 20
  },
  textInput: {
    flex: 1,
    fontSize: 22
  },
  searchBox: {
    flexDirection:'row'
  },
  searchButton: {
    alignSelf: 'flex-end'
  },
  searchButtonText: {
    fontSize: 14
  }
});

class AddFriend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }


  //TODO: EVENTUALLY REFACTOR TO REMOVE THE FIND USERNAME BUTTON AND SEARCH DYNAMICALLY WHILE TYPING
  onSubmitUsername(){
    console.log('searching for username ===>', this.state.text)
    this.props.searchedUser(this.state.text);
    //Then define searchFriend socket endpoint in server and build out userSearch from filmedin
    //upon return, add a listener to appReducers.js for returned search results in an array, then render them as a list similar to your inbox, with a button click for add friend that will change when clicked
  }

/*
var that = this
    var displayUsernames = function() {
      return (
        <View>
        { that.props.receivedPosts.map(function(post, i){
          return (
          <TouchableHighlight onPress={function(){console.log('call some function to submit add friends here')}} key={i}>
            <View style={styles.postBody}>
              <Image source={pinImg}/>
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

*/
  render () {
    var that = this
    var displayUsernames = function() {}
    return (
      <View>
        <View style = {styles.heading}>
          <Text style={styles.text}>Add Friend</Text>
        </View>
        <View style={styles.searchBox}>
          <Image source={searchImg}/>
          <TextInput  style={styles.textInput} onChangeText={(text)=>this.setState({text})} value={this.state.text}/>
        </View>
        <TouchableHighlight style={styles.searchButton} onPress={this.onSubmitUsername.bind(this)}>
          <Text style={styles.searchButtonText}>Find Username</Text>
        </TouchableHighlight>
        <ScrollView bounces={true}>
          { displayUsernames() }
        </ScrollView>

      </View>)
  }
}


const mapStateToProps = ({app}) => {
  const { searchedUser } = app;
  return {
    searchedUser
  };
};

const bundledActionCreators = Object.assign({}, appActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);


