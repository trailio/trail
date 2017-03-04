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
import selectFriendImg from './addFriend.png'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from '../../actions/appActions';
import * as cameraActions from '../../actions/cameraActions';


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
  confirmButton: {
    alignSelf: 'center'
  },
  confirmButtonText: {
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
});

class FriendSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      friendsSelected: {}
    };
  }

  onConfirmSelections() {
    console.log('make use of this.state.friendsSelected to finish your posting process');
    this.props.confirmFriendSelection();
  }

  onFriendSelect (friend) {
    console.log(`${JSON.stringify(friend)} added to friendsSelected`)
    if (!(friend.id in this.state.friendsSelected)) {
      this.state.friendsSelected[friend.id] = friend.username;
    } else {
      delete this.state.friendsSelected[friend.id]
    }
    console.log(`current friend list is ${JSON.stringify(this.state.friendsSelected)}`)
  }

  render () {
    var that = this;
    var displayFriends = function() {
      return (
        <View>
          { that.props.friendList.map(function(friend, i){
              if (friend.username.toLowerCase().includes(that.state.text.toLowerCase())) {
                return (
                  <View style={styles.friendBody} key={i}>
                  <Text style={styles.username}>
                    { friend.username }
                  </Text>
                  <TouchableHighlight onPress={that.onFriendSelect.bind(that, friend)} >
                    <Image source={selectFriendImg}/>
                  </TouchableHighlight>
                 </View>
                )
              }
            })
          }
        </View>
      )
    }
    return (
      <View>
        <View style = {styles.heading}>
          <Text style={styles.text}>Friend Select</Text>
        </View>
        <View style={styles.searchBox}>
          <Image source={searchImg}/>
          <TextInput  style={styles.textInput} onChangeText={(text)=>this.setState({text})} value={this.state.text}/>
        </View>
        <TouchableHighlight style={styles.confirmButton} onPress={this.onConfirmSelections.bind(this)}>
          <Text style={styles.confirmButtonText}>Confirm Selections</Text>
        </TouchableHighlight>
        <ScrollView bounces={true}>
          { displayFriends() }
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ app, camera }) => {
  const { friendList } = app;
  return {
    friendList
  };
};

const bundledActionCreators = Object.assign({}, appActions, cameraActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendSelect);
