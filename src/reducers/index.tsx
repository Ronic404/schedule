import { combineReducers } from 'redux';

type stateType = {
  role: string,
  type: string,
  zone: string,
  styleSelectorVisibility: boolean
}

const initialState: stateType = {
  role: 'student',
  type: 'table',
  zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  styleSelectorVisibility: false,
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
    case 'CHANGE_STYLESELECTOR_VISIBILITY':
      return {
        ...state,
        styleSelectorVisibility: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  types: reducer,
  roles: reducer,
  timezone: reducer,
  styleSelectorVisibility: reducer,
});

export { reducer, rootReducer };
