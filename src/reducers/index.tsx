// import { combineReducers } from 'redux';
import { IEvent } from '../interfaces';

type StateType = {
  role: string,
  type: string,
  events: IEvent[],
  loading: boolean,
  taskNumber: number,
  timezone: string,
  styleSelectorVisibility: boolean
}

const initialState: StateType = {
  role: 'Student',
  type: 'table',
  events: [],
  loading: true,
  taskNumber: 1,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  styleSelectorVisibility: false,
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
        timezone: action.payload,
      };
    case 'CHANGE_TASK_NUMBER':
      return {
        ...state,
        taskNumber: action.payload,
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

export default reducer;
