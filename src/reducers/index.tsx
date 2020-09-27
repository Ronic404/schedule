// import { combineReducers } from 'redux';
import { IEvent } from '../interfaces';

type StateType = {
  role: string,
  type: string,
  events: IEvent[],
  loading: boolean,
  zone: string,
  taskNumber: number,
}

const initialState: StateType = {
  role: 'mentor',
  type: 'table',
  events: [],
  loading: true,
  zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  taskNumber: 1,
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
    case 'CHANGE_TIMEZONE':
      return {
        ...state,
        zone: action.payload,
      };
    case 'CHANGE_TASK_NUMBER':
      return {
        ...state,
        taskNumber: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
