import React, { Component, NativeModules } from 'react';
import { Text, View } from 'react-native';
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
    // this.camera.capture()
    //   .then((data) => console.log(data))
    //   .catch(err => console.error(err));
    // console.log('Picture Taken');
    this.refs.cam.capture(function(err, path) {
      alert('Picture Taken!');
      var obj = {
        uri: path,
        uploadUrl: 'config/serverURL/api/media/',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: {}
      };
      NativeModules.FileTransfer.upload(obj, (err, res) => {
        if (res) {
          console.log('File Transfer Response:', res);
        } else if (err) {
          console.log('File Transfer Error:', err);
        }
      });
    });
  }

  toggleCameraMode() {
    this.props.toggleCaptureMode();
  }

  toggleCameraSide() {
    this.props.toggleCaptureSide();
  }

  toggleFlash() {
    this.props.toggleFlashMode();
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
        captureTarget={ReactNativeCamera.constants.CaptureTarget.disk}
        flashMode={this.props.flashMode}
        type={this.props.captureSide}>
          <Text style={styles.flashButton} onPress={this.toggleFlash.bind(this)}>
            {(this.props.flashMode === ReactNativeCamera.constants.FlashMode.off) ? ('[OFF]')
              : (this.props.flashMode === ReactNativeCamera.constants.FlashMode.on) ? ('[ON]')
              : (this.props.flashMode === ReactNativeCamera.constants.FlashMode.auto) ? ('[AUTO]')
              : ('[ERROR]')}
          </Text>
          <Text style={styles.captureButton} onPress={this.takePicture.bind(this)}>[X]</Text>
          <Text style={styles.cameraSideButton} onPress={this.toggleCameraSide.bind(this)}>
            {(this.props.captureSide === ReactNativeCamera.constants.Type.front) ? ('[FRONT]') : ('[BACK]')}
          </Text>
          <Text style={styles.captureModeButton} onPress={this.toggleCameraMode.bind(this)}>
            {(this.props.captureMode === ReactNativeCamera.constants.CaptureMode.still) ? ('[PHOTO]') : ('[VIDEO]')}
          </Text>
        </ReactNativeCamera>
        </View>
        <View style={styles.slide3}>
          <CameraReview />
        </View>
        <View style={styles.slide1}>
          <FriendSelect />
        </View>
        <View>
          <DropPin style={styles.slide2}/>
        </View>
      </Swiper>
    );
  }
}

const mapStateToProps = ({camera}) => {
  const { captureMode, captureSide, flashMode } = camera;
  return {
    captureMode,
    captureSide,
    flashMode
  };
};

const bundledActionCreators = Object.assign({}, cameraActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
