import { FETCH_MIDDLEMEN } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_MIDDLEMEN:
      console.log(action.payload.data.result)
      return action.payload.data.result
    default:
      return state;
  }
};
