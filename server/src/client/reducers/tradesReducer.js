import { FETCH_TRADES } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_TRADES:
      console.log(action.payload.data.result)
      return action.payload.data.result
    default:
      return state;
  }
};
