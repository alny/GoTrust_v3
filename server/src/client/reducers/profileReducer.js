import { FETCH_PROFILE } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      console.log(action.payload.data.result)
      return action.payload.data.result
    default:
      return state;
  }
};
