import { combineReducers } from 'redux';

type stateType = {
  role: string,
  type: string
}

const initialState: stateType = {
  role: 'mentor',
  type: 'table'
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
        type: action.payload 
      };
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  types: reducer,
  roles: reducer
});


export { reducer, rootReducer };
