import { combineReducers } from 'redux';
import tacoReducer from './tacoReducer';
import userReducer from './userReducer';

export default combineReducers({
  tacoReducer,
  userReducer
});
