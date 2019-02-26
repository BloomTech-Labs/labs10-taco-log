import { combineReducers } from 'redux';
import tacoReducer from './tacoReducer';
import userReducer from './userReducer';
import authReducer from '../reducers/auth';

export default combineReducers({
  tacoReducer,
  userReducer,
  authReducer
});
