import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import Swiper from 'react-native-swiper';
import searchImg from './search.png';
import continueImg from './continueImg.png';
import selectFriendUnchecked from './ic_radio_button_unchecked.png';
import selectFriendChecked from './ic_radio_button_checked.png';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from '../../actions/appActions';
import * as cameraActions from '../../actions/cameraActions';

import styles from './styles';


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
            onTintColor={'rgb(234, 75, 75)'}
          />
        <Text style={{alignSelf: 'center'}}>{that.props.isPublicPost ? 'Public Post' : 'Private Post'}</Text>
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
                );
              }
          })
          }
        </View>
      );
    };
    return (
      <View>
        <View style={{padding: 50}}/>
        <View style = {styles.heading}>
          <Text style={styles.header}>SELECT RECIPIENTS</Text>
        </View>
        <View style={{padding: 5}}/>

        <View style={{padding: 5}}/>

        <View style={styles.scrollBox}>
          <View style={styles.heading}/>
          <View style={styles.searchBox}>
            <Image source={searchImg}/>
            <TextInput  style={styles.textInput} onChangeText={(text)=>this.setState({text})} value={this.state.text}/>
          </View>
            <ScrollView bounces={true}>
              { displayFriends() }
            </ScrollView>
        </View>
        <TouchableHighlight style={styles.confirmButton} onPress={this.onConfirmSelections.bind(this)}>
          <Text style={styles.toggleText}>{((!that.props.isPublicPost && (this.props.friendRecipients.length !== 0)) || that.props.isPublicPost) ? 'Confirm Selection' : 'Please Select Recipients'}</Text>
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
