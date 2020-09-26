// import { combineReducers } from 'redux';
import { IEvent } from '../interfaces';

type StateType = {
  role: string,
  type: string,
  events: IEvent[],
  loading: boolean,
}

const initialState: StateType = {
  role: 'mentor',
  type: 'table',
  events: [],
  loading: true,
};

const reducer = (state: StateType = initialState, action: any): StateType => {
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
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
