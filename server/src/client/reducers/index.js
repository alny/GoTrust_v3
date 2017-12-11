import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';
import verifyReducer from './verifyReducer';
import profileReducer from './profileReducer';
import topUserReducer from './topUserReducer';
import middlemanReducer from './middlemanReducer';
import inventoryReducer from './inventoryReducer';
import tradesReducer from './tradesReducer';

export default combineReducers({
  users: usersReducer,
  auth: authReducer,
  admins: adminsReducer,
  verify: verifyReducer,
  profile: profileReducer,
  top: topUserReducer,
  middleman: middlemanReducer,
  inventory: inventoryReducer,
  trades: tradesReducer
});
