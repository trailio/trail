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

  onSubmitUsername(){
    console.log('searching for username ===>', this.state.text)
    this.props.searchedUser(this.state.text);
    //Then define searchFriend socket endpoint in server and build out userSearch from filmedin
    //upon return, add a listener to appReducers.js for returned search results in an array, then render them as a list similar to your inbox, with a button click for add friend that will change when clicked
  }

  onFriendAdd(userID, username, friend){
    // console.log('call some function to submit add friends here for ', username);
    this.props.addedFriend(userID, username, friend);
  }

  onFriendAccept(friend) {
    //TBD - for accpepting friend requests
  }

  render() {
    var self = this;
    var displayUsernames = function(){};
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
        <TouchableHighlight style={styles.searchButton} onPress={this.onSubmitUsername.bind(this)}>
          <Text style={styles.searchButtonText}>Find User</Text>
        </TouchableHighlight>
        <ScrollView bounces={true}>
          { displayUsernames() }
        </ScrollView>
      </View>
    );
  }
}



const mapStateToProps = ({app}) => {
  const { searchedUser, searchedFriends, addedFriend, username, id} = app;
  return {
    searchedUser,
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