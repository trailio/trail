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

  toggleCameraMode() {
    this.props.toggleCaptureMode();
  }

  toggleCameraSide() {
    this.props.toggleCaptureSide();
  }

  render () {
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
          captureMode={this.props.captureMode}
          type={this.props.captureSide}>
          <Text style={styles.captureModeButton} onPress={this.toggleCameraMode.bind(this)}>
            {(this.props.captureMode === 'Camera.constants.CaptureMode.still') ? ('[PHOTO]') : ('[VIDEO]')}
          </Text>
          <Text style={styles.captureButton} onPress={this.takePicture.bind(this)}>[X]</Text>
          <Text style={styles.cameraSideButton} onPress={this.toggleCameraSide.bind(this)}>
            {(this.props.captureSide === 'Camera.constants.Type.front') ? ('[FRONT]') : ('[BACK]')}
          </Text>
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
  const { captureMode, captureSide } = camera;
  return {
    captureMode,
    captureSide
  };
};

const bundledActionCreators = Object.assign({}, cameraActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
