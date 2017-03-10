import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#537fbb',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#537fbb',
  },
  loginSlide: {
    backgroundColor: '#537fbb',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'  
  },
  loginSpace: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  loginBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#333333'
  },
  imagePadLeftRight: {
    paddingLeft: 80,
    paddingRight: 80
  },
  imagePadTopBottom: {
    paddingBottom: 10,
    paddingTop: 5
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  loginHeader: {
    color: '#333333',
    fontSize: 40,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#FDFDFB',
    fontSize: 30,
    fontWeight: 'bold',
  },
  loginText2: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: '#FDFDFB',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text2: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    width: 400,
    height: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  cameraSideButton: {
    top: 30,
    right: 10,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  captureModeButton: {
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  captureButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    bottom: 10,
    padding: 10,
  },
  flashButton: {
    top: 30,
    left: 10,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)'
  }
});

export default styles;
