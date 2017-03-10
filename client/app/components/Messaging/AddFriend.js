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
import Tabs from 'react-native-tabs';
import Swiper from 'react-native-swiper';
import searchImg from './search.png'
import addFriendImg from './addFriendIcon.png'
import acceptFriendImg from './acceptFriendIcon.png'
import removeFriendImg from './removeFriendIcon.png'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../actions/appActions';
import styles from './addFriendStyles';




class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      page:'addFriends'
    };
  }

  onFindUser(){
    var that = this;
    var interactionType = {
      addFriends: that.props.searchedUser.bind(that, that.state.text, that.props.id),
      acceptFriends: function(searchText){console.log('display only friend requests matching', searchText)}.bind(that, that.state.text),
      removeFriends: function(searchText){console.log('display only current friends matching', searchText)}.bind(that, that.state.text)
    }
    console.log('searching for user ===>', this.props.id)
    interactionType[this.state.page]()
    //Then define searchFriend socket endpoint in server and build out userSearch from filmedin
    //upon return, add a listener to appReducers.js for returned search results in an array, then render them as a list similar to your inbox, with a button click for add friend that will change when clicked
  }

  onFriendAdd(userID, username, friend){
    console.log(`calling onFriendAdd for`)
    console.log(JSON.stringify(friend));
    var primaryUser = {id: userID, username: username};
    this.props.addedFriend(primaryUser, friend);
  }

  onFriendAccept(userID, username, friend) {
    console.log(`calling onFriendAdd for`)
    console.log(JSON.stringify(friend));
    var primaryUser = {id: userID, username: username};
    this.props.addedFriend(primaryUser, friend);
  }

  onFriendRemove(userID, username, friend) {
    console.log(`calling onFriendRemove for ${username} with ID of ${userID} to friend of`)
    console.log(JSON.stringify(friend));
    this.props.removedFriend(userID, friend.id);
  }

  displayUsernames () {
    var that = this
    var interactionType = {
      addFriends: {list: that.props.searchedFriends, onSubmit: that.onFriendAdd, img: addFriendImg},
      acceptFriends: {list: that.props.receivedFriendRequests, onSubmit: that.onFriendAccept, img: acceptFriendImg},
      removeFriends: {list: that.props.friendList, onSubmit: that.onFriendRemove, img: removeFriendImg}
    }
    console.log('interactiontype!!', interactionType[that.state.page])
    
    return (
      <View>
        { 
          interactionType[that.state.page].list.map(function(friend, i) {
          return (
            <View style={styles.friendBody} key={i}>
            <Text style={styles.username}> 
              { friend.username }
            </Text>
            <TouchableHighlight onPress={interactionType[that.state.page].onSubmit.bind(that, that.props.id, that.props.username, friend)} >
              <Image source={interactionType[that.state.page].img}/>
            </TouchableHighlight>
            </View>
          )
        })}
      </View>
    )
  };

  render() {

    var that = this;
    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.header}>FRIENDS</Text>
        </View>
        <View style={{padding: 5}}/>
        <View style={styles.nav}>
              <View style={styles.navInner}>
                <View style={(this.state.page==='addFriends')? styles.navInnerAddFriendSelected : styles.navInnerAddFriend}>
                  <TouchableHighlight onPress={()=>that.setState({page:'addFriends'})}><Text style={(this.state.page==='addFriends')? styles.navTextSelected : styles.navText}>Add</Text></TouchableHighlight>
                </View>
                <View style={(this.state.page==='acceptFriends')? styles.navInnerAcceptFriendSelected : styles.navInnerAcceptFriend}> 
                  <TouchableHighlight onPress={()=>that.setState({page:'acceptFriends'})}><Text style={(this.state.page==='acceptFriends')? styles.navTextSelected : styles.navText}>Accept</Text></TouchableHighlight>
                </View>
                <View style={(this.state.page==='removeFriends')? styles.navInnerRemoveFriendSelected : styles.navInnerRemoveFriend}>
                  <TouchableHighlight onPress={()=>that.setState({page:'removeFriends'})}><Text style={(this.state.page==='removeFriends')? styles.navTextSelected : styles.navText}>Remove</Text></TouchableHighlight>
                </View>
             </View>
        </View>
        <View style={{padding: 10}}/>
        <View style={styles.scrollBox}>
        <View style={styles.heading}/>
          <View style={styles.searchBox}>
            <Image source={searchImg}/>
            <TextInput  style={styles.textInput} onChangeText={(text)=>this.setState({text})} value={this.state.text}/>
          </View>  

          <View style={{padding: 5}}/>
          <View style={styles.searchButtonBox}>
            <TouchableHighlight style={styles.searchButton} onPress={this.onFindUser.bind(this)}>
              <Text style={styles.searchButtonText}>Find User</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.heading}>
            <ScrollView bounces={true}>
              { this.displayUsernames.call(this, this.state.page) }
              <View style={{padding: 230}}/>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}



const mapStateToProps = ({app}) => {
  const { searchedUser, friendList, receivedFriendRequests, sentFriendRequests, searchedFriends, addedFriend, username, id} = app;
  return {
    searchedUser,
    friendList,
    receivedFriendRequests,
    sentFriendRequests,
    searchedFriends,
    addedFriend,
    username,
    id
  };
};

const bundledActionCreators = Object.assign({}, appActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);
