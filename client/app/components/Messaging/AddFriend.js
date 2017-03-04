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
import addFriendImg from './addFriend.png'

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
    flexDirection:'row',
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d3d3d3'
  },
  searchButton: {
    alignSelf: 'flex-end' 
  },
  searchButtonText: {
    fontSize: 14
  },
  username:  {
    color: '#54575C',
    fontSize: 20
  },
  friendBody: {
    padding: 20,
    marginHorizontal: 30,
    backgroundColor: 'rgba(255,255,255,0)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tabNav: {
    backgroundColor:'white'
  },
  selectedIconStyle: {
    backgroundColor: '#d3d3d3'
  },
  selectedStyle: {
    color:'white',
    fontWeight: 'bold'
  },
});


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
    console.log(`calling onFriendAdd for ${username} with ID of ${userID} to friend of`)
    console.log(JSON.stringify(friend));
    this.props.addedFriend(userID, friend.id);
  }

  onFriendAccept(userID, username, friend) {
    console.log(`calling onFriendAccept for ${username} with ID of ${userID} to friend of`)
    console.log(JSON.stringify(friend));
    this.props.addedFriend(userID, friend.id);
  }

  onFriendRemove(userID, username, friend) {
    console.log(`calling onFriendRemove for ${username} with ID of ${userID} to friend of`)
    console.log(JSON.stringify(friend));
    this.props.removedFriend(userID, friend.id);
  }

  displayUsernames () {
    var that = this
    var interactionType = {
      addFriends: {list: that.props.searchedFriends, onSubmit: that.onFriendAdd},
      acceptFriends: {list: that.props.receivedFriendRequests, onSubmit: that.onFriendAccept},
      removeFriends: {list: that.props.friendList, onSubmit: that.onFriendRemove}
    }
    
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
              <Image source={addFriendImg}/>
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
        <View style = {styles.heading}>
            <Text style={styles.text}>Goorl Friends</Text>
        </View>
        <View style = {styles.heading}>
          <Tabs selected={this.state.page} style={styles.tabNav}
                selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
              <Text name="addFriends" selectedIconStyle={styles.selectedIconStyle} selectedStyle={styles.selectedStyle}>Add</Text>
              <Text name="acceptFriends" selectedIconStyle={styles.selectedIconStyle} selectedStyle={styles.selectedStyle}>Accept</Text>
              <Text name="removeFriends" selectedIconStyle={styles.selectedIconStyle} selectedStyle={styles.selectedStyle}>Remove</Text>
          </Tabs>
        </View>
        <View style={styles.searchBox}>
          <Image source={searchImg}/>
          <TextInput  style={styles.textInput} onChangeText={(text)=>this.setState({text})} value={this.state.text}/>
        </View>
        <TouchableHighlight style={styles.searchButton} onPress={this.onFindUser.bind(this)}>
          <Text style={styles.searchButtonText}>Find User</Text>
        </TouchableHighlight>
        <ScrollView bounces={true}>
          { this.displayUsernames.call(this, this.state.page) }
        </ScrollView>
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