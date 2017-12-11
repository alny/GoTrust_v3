import { CHECK_LINK } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case CHECK_LINK:
      return action.payload.data.result;
    default:
      return state;
  }
};
