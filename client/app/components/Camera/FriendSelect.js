import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Switch,
  Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import searchImg from './search.png';
import selectFriendUnchecked from './ic_radio_button_unchecked.png';
import selectFriendChecked from './ic_radio_button_checked.png';

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
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'space-between'
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
  switchButton: {
    alignSelf: 'center',
    fontSize: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});

class FriendSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  onConfirmSelections() {
    this.props.confirmFriendSelection();
  }

  onFriendSelect (friend) {
    if (!this.props.friendRecipients.includes(friend.id)) {
      this.props.addFriendToRecipients(friend.id);
    } else {
      this.props.removeFriendFromRecipients(friend.id);
    }
  }

  onPublicPrivateSwitch() {
    this.props.togglePublicPrivatePost();
    console.log('CURRENTLY === ', this.props.isPublicPost);
  }

  render () {
    var that = this;
    var displayFriends = function() {
      return (
        <View>
          <Switch
            onValueChange={() => that.onPublicPrivateSwitch()}
            value={that.props.isPublicPost}
            style={{alignSelf: 'center'}}
          />
        <Text style={{alignSelf: 'center'}}>{that.props.isPublicPost ? 'Private' : 'Public'}</Text>
          { that.props.friendList.map(function(friend, i){
              if (friend.username.toLowerCase().includes(that.state.text.toLowerCase())) {
                var selectIcon;
                if (!that.props.friendRecipients.includes(friend.id)) {
                  selectIcon = selectFriendUnchecked;
                } else {
                  selectIcon = selectFriendChecked;
                }
                return (
                  <View style={styles.friendBody} key={i}>
                  <Text style={styles.username}>
                    { friend.username }
                  </Text>
                  <TouchableHighlight onPress={that.onFriendSelect.bind(that, friend)} >
                    <Image source={selectIcon}/>
                  </TouchableHighlight>
                 </View>
                )
              }
            })
          }
        </View>
        // <View>
        //
          // { that.props.friendList.map(function(friend, i){
          //     if (friend.username.toLowerCase().includes(that.state.text.toLowerCase())) {
          //       var selectIcon;
          //       if (!that.props.friendRecipients.includes(friend.id)) {
          //         selectIcon = selectFriendUnchecked;
          //       } else {
          //         selectIcon = selectFriendChecked;
          //       }
          //       return (
          //         <View style={styles.friendBody} key={i}>
          //         <Text style={styles.username}>
          //           { friend.username }
          //         </Text>
          //         <TouchableHighlight onPress={that.onFriendSelect.bind(that, friend)} >
          //           <Image source={selectIcon}/>
          //         </TouchableHighlight>
          //        </View>
          //       )
          //     }
          //   })
          // }
        // </View>
      );
    };
    return (
      <View>
        <View style = {styles.heading}>
          <Text style={styles.text}>Friend Select</Text>
        </View>
        <View style={styles.searchBox}>
          <Image source={searchImg}/>
          <TextInput  style={styles.textInput} onChangeText={(text)=>this.setState({text})} value={this.state.text}/>
        </View>
        <ScrollView bounces={true}>
          { displayFriends() }
        </ScrollView>
        <TouchableHighlight style={styles.confirmButton} onPress={this.onConfirmSelections.bind(this)}>
          <Text style={styles.confirmButtonText}>Confirm Selections</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = ({ app, camera }) => {
  const { friendList } = app;
  const { friendRecipients, isPublicPost } = camera;
  return {
    isPublicPost,
    friendList,
    friendRecipients
  };
};

const bundledActionCreators = Object.assign({}, appActions, cameraActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendSelect);
