import { combineReducers } from 'redux';

type stateType = {
  role: string,
  type: string,
  zone: string,
}

const initialState: stateType = {
  role: 'student',
  type: 'table',
  zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
    case 'CHANGE_TIMEZONE':
      return {
        ...state,
        zone: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  types: reducer,
  roles: reducer,
  timezone: reducer,
});

export { reducer, rootReducer };
