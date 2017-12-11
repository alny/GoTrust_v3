import { FETCH_TOP_USER } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_TOP_USER:
      console.log(action.payload.data.result)
      return action.payload.data.result
    default:
      return state;
  }
};
