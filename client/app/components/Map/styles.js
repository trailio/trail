import { Dimensions, StyleSheet } from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 30,
  },
  video: {
    //position: 'absolute',
    height: height,
    width: width,
    flex: 1,
    margin: 0,
    padding: 0
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    height: height,
    width: width
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    height: height,
    width: width
  },
  calloutStyle: {
    flex: 1,
    position: 'relative',
  },
  directions: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    top: height-100,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  photo: {
    flex: 1,
    width: 375,
    height: 675
  },
});

export default styles;
