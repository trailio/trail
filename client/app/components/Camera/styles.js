import { StyleSheet } from 'react-native';

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
    color: '#cb3131',
    alignSelf: 'center'
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
  confirmButton: {
    alignSelf: 'center',
  },
  confirmButtonText: {
    fontSize: 14
  },
    switchButton: {
    alignSelf: 'center',
    fontSize: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
    textInput: {
    flex: 1,
    fontSize: 22
  },
    toggleText: {
    color: '#FDFDFB',
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10
  },
   nav: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});
export default styles;
