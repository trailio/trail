import React, { Component, NativeModules } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
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

import cameraFrontIcon from '../../../assets/ic_camera_front_white.png';
import cameraRearIcon from '../../../assets/ic_camera_rear_white.png';
import cameraIcon from '../../../assets/ic_camera_white_48pt.png';
import setCameraMode from '../../../assets/ic_photo_camera_white_36pt.png';
import setVideoMode from '../../../assets/ic_camera_roll_white_36pt.png';
import flashOff from '../../../assets/ic_flash_off_white.png';
import flashOn from '../../../assets/ic_flash_on_white.png';
import flashAuto from '../../../assets/ic_flash_auto_white.png';


class Camera extends Component {
  constructor(props) {
    super(props);
  }

  takePicture() {
    // Current method: https://medium.com/@knowbody/react-native-image-upload-to-s3-bucket-5220941bfea2#.pw9qgho27
    this.camera.capture()
      .then(data => {
        const dateString = (new Date()).toISOString().replace(/\.|:|-/g,'');
        const file = {
          uri: data.path,
          name: this.props.username + dateString + '.jpg',
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
            this.props.postPhoto(this.props.latitude, this.props.latitude, response.body.postResponse.location, true);
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
    var cameraSide = this.props.captureSide === ReactNativeCamera.constants.Type.front ? cameraFrontIcon : cameraRearIcon;
    var cameraMode = this.props.captureMode === ReactNativeCamera.constants.CaptureMode.still ? setCameraMode : setVideoMode;
    var flashMode = this.props.flashMode === ReactNativeCamera.constants.FlashMode.off ? flashOff : this.props.flashMode === ReactNativeCamera.constants.FlashMode.on ? flashOn : flashAuto;

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
          <TouchableHighlight style={styles.flashButton} onPress={this.toggleFlash.bind(this)}>
            <Image source={flashMode} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.captureButton} onPress={this.takePicture.bind(this)}>
            <Image source={cameraIcon} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.cameraSideButton} onPress={this.toggleCameraSide.bind(this)}>
            <Image source={cameraSide} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.captureModeButton} onPress={this.toggleCameraMode.bind(this)}>
            <Image source={cameraMode} />
          </TouchableHighlight>
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

const mapStateToProps = ({ auth, camera, map }) => {
  const { username } = auth;
  const { captureMode, captureSide, flashMode } = camera;
  const { latitude, longitude } = map;
  return {
    captureMode,
    captureSide,
    flashMode,
    latitude,
    longitude,
    username
  };
};

const bundledActionCreators = Object.assign({}, cameraActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
