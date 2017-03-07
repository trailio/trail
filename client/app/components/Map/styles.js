import { Dimensions, StyleSheet } from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  calloutStyle: {
    flex: 1,
    position: 'relative',
  },
  video: {
    //position: 'absolute',
    height: height,
    width: width,
    flex: 1,
    margin: 0,
    padding: 0
  }
});

export default styles;
