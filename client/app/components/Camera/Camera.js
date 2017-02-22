import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import ReactNativeCamera from 'react-native-camera';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cameraActions from '../../actions/cameraActions';

import styles from '../../styles';
import AR from './AR';
import CameraReview from './CameraReview';
import DropPin from './DropPin';
import FriendSelect from './FriendSelect';

class Camera extends Component {
  constructor(props) {
    super(props);
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
    console.log('Picture Taken');
  }

  toggleMode() {
    this.props.toggleCaptureMode();
    console.log('mode == ', this.props.captureMode);
  }

  render () {
    console.log('Camera Props === ', this.props);
    console.log('Capture Mode === ', this.props.captureMode);
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        showsPagination={false}
        loop={false}
        horizontal={false}
        index={1}
      >
        <View style={styles.slide2}>
          <AR />
        </View>
        <View style={styles.slide1}>
          <ReactNativeCamera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={ReactNativeCamera.constants.Aspect.fill}
          captureMode={this.props.captureMode}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          <Text style={styles.capture} onPress={this.toggleMode.bind(this)}>[MODE]</Text>
        </ReactNativeCamera>
        </View>
        <View style={styles.slide3}>
          <CameraReview />
        </View>
        <View style={styles.slide1}>
          <FriendSelect />
        </View>
        <View style={styles.slide2}>
          <DropPin />
        </View>
      </Swiper>
    );
  }
}

const mapStateToProps = ({camera}) => {
  const { captureMode } = camera;
  return {
    captureMode
  };
};

const bundledActionCreators = Object.assign({}, cameraActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
