import { Dimensions, StyleSheet } from 'react-native';

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
  text2: {
    color: '#000',
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
    backgroundColor: '#fff'
  },
  captureModeButton: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  captureButton: {
    backgroundColor: '#fff',
    bottom: 10,
    padding: 10,
    width: 50,
    height: 50,
    textAlign: 'center'
  }
});

export default styles;
