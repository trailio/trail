import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');


const styles = StyleSheet.create({
  wrapper: {
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
    flexDirection: 'column',
    backgroundColor: '#FDFDFB',
    borderRadius: 20
  },
  textInput: {
    flex: 1,
    fontSize: 22
  },
  searchBox: {
    flexDirection:'row',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 30
  },

  searchButtonBox: {
    // flex: 1,
    borderRadius: 30,
    // borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    
  },
  searchButton: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cb3131'
  },
  username:  {
    color: '#54575C',
    fontSize: 20
  },
  friendBody: {
    padding: 20,
    marginHorizontal: 30,
    backgroundColor: 'rgba(255,255,255,0)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nav: {
    paddingLeft: 80,
    paddingRight: 80,
  },
  navInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navInnerAddFriend: {
    flex: 1,
    // borderColor: '#d4d4d4',
    // borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#FDFDFB',
  },
  navInnerAddFriendSelected: {
    flex: 1,
    // borderColor: '#d4d4d4',
    // borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#cb3131',
  },
  navInnerAcceptFriend: {
    flex: 1,
    // borderColor: '#d4d4d4',
    // borderWidth: 1,
    backgroundColor: '#FDFDFB',
  },
  navInnerAcceptFriendSelected: {
    flex: 1,
    // borderColor: '#d4d4d4',
    // borderWidth: 1,
    backgroundColor: '#cb3131',
  },
  navInnerRemoveFriend: {
    flex: 1,
    // borderColor: '#d4d4d4',
    // borderWidth: 1,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FDFDFB',
  },
  navInnerRemoveFriendSelected: {
    flex: 1,
    // borderColor: '#d4d4d4',
    // borderWidth: 1,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#cb3131',
  },
  navText: {
    margin: 5,
    fontWeight: 'bold',
    color: '#cb3131',
    textAlign: 'center'
  },
  navTextSelected : {
    margin: 5,
    fontWeight: 'bold',
    color: '#FDFDFB',
    textAlign: 'center'
  },
  navButton: {


  }
});


export default styles;