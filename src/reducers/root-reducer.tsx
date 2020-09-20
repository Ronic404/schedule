import { combineReducers } from 'redux';
import typeReducer from './type-reducer';
import timezoneReducer from './timezone-reducer';
import index from './index';

const rootReducer = combineReducers({
  types: typeReducer,
  timezone: timezoneReducer,
  index,
});

export default rootReducer;
