import { combineReducers } from 'redux';
import { IEvent } from '../interfaces';

type stateType = {
  role: string,
  type: string,
  events: IEvent[],
}

const initialState: stateType = {
  role: 'mentor',
  type: 'table',
  events: [],
};

const reducer = (state: stateType = initialState, action: any): stateType => {
  switch (action.type) {
    case 'CHANGE_ROLE':
      return {
        ...state,
        role: action.payload,
      };
    case 'CHANGE_TYPE':
      return {
        ...state,
        type: action.payload,
      };
    case 'EVENTS_LOADED':
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  types: reducer,
  roles: reducer,
  events: reducer,
});

export { reducer, rootReducer };
