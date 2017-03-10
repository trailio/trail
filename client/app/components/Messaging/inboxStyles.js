import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#537fbb',
  },
   header: {
    color: '#FDFDFB',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }, 
  heading: {
    paddingTop: 20
  },
  fillPage: {
    padding: 100,
    margin: 100
  },
  postBody: {
    // flex: 1,
    // borderBottomColor: '#333333',
    borderBottomColor: '#d4d4d4',
    // borderLeftColor: '#FDFDFB',
    // borderRightColor: '#FDFDFB',
    borderBottomWidth:  1,
    padding: 20,
    backgroundColor: '#FDFDFB',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30
  },
  scrollBox: {
    backgroundColor: '#FDFDFB',
    borderRadius: 20
  },
  pinImg: {
  },
  postName:  {
    color: '#54575C',
    fontSize: 14
  },
  postDate: {
    color: '#54575C',
    fontSize: 10
  },
  video: {
    //position: 'absolute',
    height: height,
    width: width,
    flex: 1,
    margin: 0,
    padding: 0
  },
  photo: {
    flex: 1,
    width: 375,
    height: 675
  },
  map: {
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
    top: height-250,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  icon: {
    top: 130,
    position: 'absolute',
    bottom: 0,
    left: 160,
    right: 0,
  },
});

export default styles;
