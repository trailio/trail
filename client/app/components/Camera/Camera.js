import React, { Component, NativeModules } from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import ReactNativeCamera from 'react-native-camera';
import { RNS3 } from 'react-native-aws3';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cameraActions from '../../actions/cameraActions';
import config from '../../../config';

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
    // Current method: https://medium.com/@knowbody/react-native-image-upload-to-s3-bucket-5220941bfea2#.pw9qgho27
    this.camera.capture()
      .then(data => {
        const file = {
          uri: data.path,
          name: 'photo.jpg',
          type: 'image/jpeg'
        };

        const options = {
          keyPrefix: 'photos/',
          bucket: 'trail-media',
          region: 'us-west-1',
          accessKey: config.AWSAccessKeyID,
          secretKey: config.AWSSecretAccessKey,
          successActionStatus: 201
        };

        RNS3.put(file, options)
          .then(response => {
            if (response.status !== 201) {
              throw new Error('Failed to upload image to S3', response);
            }
            console.log('*** BODY ***', response.body);
            // photo url = response.body.location
          });
      })
      .catch(error => console.log('ERROR: ', error));
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
