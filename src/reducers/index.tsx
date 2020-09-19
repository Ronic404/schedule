type stateType = {
  role: string,
}

const initialState: stateType = {
  role: 'mentor',
};

const reducer = (state: stateType = initialState, action: any): stateType => {
  switch (action.type) {
    case 'CHANGE_ROLE':
      return {
        role: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
