export default function reducer ( state = {
  testingRedux: 'TEST',
}, action) {
  switch (action.type) {
    case 'TEST_REDUX': {
      return Object.assign({}, state, {
        testingRedux: 'CHANGE TEST',
      })
    }
    case 'CHANGE_AGAIN': {
      return Object.assign({}, state, {
        testingRedux: 'CHANGE BACK'
      })
    }
    default:
      return state;
  }
}
