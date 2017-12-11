import { FETCH_INVENTORY } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_INVENTORY:
      console.log(action.payload.data.result)
      return action.payload.data.result
    default:
      return state;
  }
};
