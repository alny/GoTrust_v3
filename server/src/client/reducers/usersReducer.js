import { FETCH_USERS } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      console.log(action.payload.data.result)
      return action.payload.data.result;
    default:
      return state;
  }
};
