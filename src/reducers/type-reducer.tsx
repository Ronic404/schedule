type stateType = {
  type: string,
}

const initialState: stateType = {
  type: 'table',
};

const typeReducer = (state: stateType = initialState, action: any): stateType => {
  console.log('Мой редюсер');
  switch (action.type) {
    case 'CHANGE_TYPE':
      return { ...state, type: action.payload };
    default:
      return state;
  }
};

export default typeReducer;
