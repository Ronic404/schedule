type stateType = {
    type: string,
  }

const initialState: stateType = {
  type: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

const timezoneReducer = (state: stateType = initialState, action: any): stateType => {
  switch (action.type) {
    case 'CHANGE_TIMEZONE':
      return { ...state, type: action.payload };
    default:
      return state;
  }
};

export default timezoneReducer;
