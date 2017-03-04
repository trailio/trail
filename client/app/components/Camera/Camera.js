import React, { Component, NativeModules } from 'react';
import { Dimensions, Image, Text, TouchableHighlight, View } from 'react-native';
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
import recordIcon from '../../../assets/ic_fiber_manual_record_white_48pt.png';

class Camera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
      counter: '',
      counterInterval: null,
      counterTimeout: null,
      currentView: 'cameraView'
    };

  }

  startRecording() {
    if (!this.state.isRecording) {
      var context = this;
      var setCounterInterval = setInterval(function() {
        context.setState({
          counter: context.state.counter - 1
        });
      }, 1000);
      var setCounterTimeout = setTimeout(function() {
        context.stopRecording();
      }, 7000);

      this.setState({
        isRecording: true,
        counter: 7,
        counterInterval: setCounterInterval,
        counterTimeout: setCounterTimeout
      });

      this.camera.capture()
        .then(data => {
          const dateString = (new Date()).toISOString().replace(/\.|:|-/g,'');
          const file = {
            uri: data.path,
            name: this.props.username + dateString + '.jpg',
            type: 'video/mp4'
          };

          const options = {
            keyPrefix: 'videos/',
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
              this.props.postPhoto(this.props.latitude, this.props.longitude, response.body.postResponse.location, true);
            });
        })
        .catch(error => console.log('ERROR: ', error));

    } else {
      this.stopRecording();
    }
  }

  stopRecording() {
    clearInterval(this.state.counterInterval);
    clearTimeout(this.state.counterTimeout);
    this.setState({
      counter: '',
      isRecording: false
    });
    this.camera.stopCapture();
    alert('Uploading, your video will appear shortly!');
  }

  takePicture() {
    // Current method: https://medium.com/@knowbody/react-native-image-upload-to-s3-bucket-5220941bfea2#.pw9qgho27

    // this.setState({
    //   currentView: 'friendSelect'
    // });
    this.camera.capture()
      .then(data => {

        this.props.photoCapturePressed(data);
        console.log('PHOTOPATH === ', this.props.photoPath);

        // console.log('DATA FROM PHOTO CAPTURE === ', data);
        //
        // const dateString = (new Date()).toISOString().replace(/\.|:|-/g,'');
        // const file = {
        //   uri: data.path,
        //   name: this.props.username + dateString + '.jpg',
        //   type: 'image/jpeg'
        // };
        //
        // const options = {
        //   keyPrefix: 'photos/',
        //   bucket: 'trail-media',
        //   region: 'us-west-1',
        //   accessKey: config.AWSAccessKeyID,
        //   secretKey: config.AWSSecretAccessKey,
        //   successActionStatus: 201
        // };
        //
        // RNS3.put(file, options)
        //   .then(response => {
        //     if (response.status !== 201) {
        //       throw new Error('Failed to upload image to S3', response);
        //     }
        //     console.log('*** BODY ***', response.body);
        //     this.props.postPhoto(this.props.latitude, this.props.longitude, response.body.postResponse.location, true);
        //   });
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

  toggleDropPin() {
    console.log('ToggleDropPin');
    this.setState({
      currentView: 'dropPin'
    });
  }

  render () {

    if (this.props.currentView === 'cameraView') {
      var cameraSide = this.props.captureSide === ReactNativeCamera.constants.Type.front ? cameraFrontIcon : cameraRearIcon;
      var cameraMode = this.props.captureMode === ReactNativeCamera.constants.CaptureMode.still ? setCameraMode : setVideoMode;
      var flashMode = this.props.flashMode === ReactNativeCamera.constants.FlashMode.off ? flashOff : this.props.flashMode === ReactNativeCamera.constants.FlashMode.on ? flashOn : flashAuto;
      var captureIcon;
      var captureFn;
      if (this.props.captureMode === ReactNativeCamera.constants.CaptureMode.still) {
        captureIcon = cameraIcon;
        captureFn = this.takePicture.bind(this);
      } else {
        captureIcon = recordIcon;
        captureFn = this.startRecording.bind(this);
      }

      return (
        <View>
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
            <TouchableHighlight style={styles.captureButton} onPress={captureFn}>
              <Image source={captureIcon} />
            </TouchableHighlight>
            <TouchableHighlight style={styles.cameraSideButton} onPress={this.toggleCameraSide.bind(this)}>
              <Image source={cameraSide} />
            </TouchableHighlight>
            <TouchableHighlight style={styles.captureModeButton} onPress={this.toggleCameraMode.bind(this)}>
              <Image source={cameraMode} />
            </TouchableHighlight>
          </ReactNativeCamera>
        </View>
      );
    } else if (this.props.currentView === 'friendSelect') {
      return (
        <View>
          <FriendSelect />
        </View>
      );
    } else if (this.state.currentView === 'dropPin') {
      return (
        <View>
          <DropPin />
        </View>
      );
    }

    // return (
    //   <Swiper
    //     style={styles.wrapper}
    //     showsButtons={false}
    //     showsPagination={false}
    //     loop={false}
    //     horizontal={false}
    //     index={1}
    //   >
    //     <View style={styles.slide2}>
    //       <AR />
    //     </View>
    //     <View style={styles.slide1}>
    //       <ReactNativeCamera
    //       ref={(cam) => {
    //         this.camera = cam;
    //       }}
    //       style={styles.preview}
    //       aspect={ReactNativeCamera.constants.Aspect.fill}
    //       captureMode={this.props.captureMode}
    //       captureTarget={ReactNativeCamera.constants.CaptureTarget.disk}
    //       flashMode={this.props.flashMode}
    //       type={this.props.captureSide}>
    //         <TouchableHighlight style={styles.flashButton} onPress={this.toggleFlash.bind(this)}>
    //           <Image source={flashMode} />
    //         </TouchableHighlight>
    //         <TouchableHighlight style={styles.captureButton} onPress={captureFn}>
    //           <Image source={captureIcon} />
    //         </TouchableHighlight>
    //         <TouchableHighlight style={styles.cameraSideButton} onPress={this.toggleCameraSide.bind(this)}>
    //           <Image source={cameraSide} />
    //         </TouchableHighlight>
    //         <TouchableHighlight style={styles.captureModeButton} onPress={this.toggleCameraMode.bind(this)}>
    //           <Image source={cameraMode} />
    //         </TouchableHighlight>
    //       </ReactNativeCamera>
    //
    //       <PopupDialog
    //         ref={(popupDialog) => { this.popupDialog = popupDialog; }}
    //         height={height}
    //         dialogAnimation={ new SlideAnimation({ slideFrom: 'top' })}
    //         actions={[
    //           <DialogButton
    //             text = 'CLOSE'
    //             onPress = {() => { this.toggleDropPin(); }}
    //             key = 'button-1'
    //             align = 'center'
    //           />
    //         ]}
    //         >
    //         {friendOrDrop}
    //       </PopupDialog>
    //     </View>
    //     <View>
    //       <CameraReview />
    //     </View>
    //     <View>
    //       <FriendSelect />
    //     </View>
    //     <View>
    //       <DropPin />
    //     </View>
    //   </Swiper>
    // );
  }
}

const mapStateToProps = ({ app, camera, map }) => {
  const { username } = app;
  const { captureMode, captureSide, currentView, flashMode, photoPath } = camera;
  const { latitude, longitude } = map;
  return {
    captureMode,
    captureSide,
    currentView,
    flashMode,
    latitude,
    longitude,
    photoPath,
    username
  };
};

const bundledActionCreators = Object.assign({}, cameraActions);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(bundledActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
