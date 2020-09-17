import { combineReducers } from 'redux';
import typeReducer from './type-reducer';
import index from './index';

const rootReducer = combineReducers({
  types: typeReducer,
  index,
});

export default rootReducer;
