import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  heading: {
    padding: 20
  },
  postBody: {
    // margin: .25,
    borderColor: '#81cbe5',
    borderWidth: .25,
    borderRadius: 5,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  }
});

export default styles;
