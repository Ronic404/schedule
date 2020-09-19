const changeType = (newType: string): { type: string, payload: string } => {
  console.log('Экшн сработал');
  return ({
    type: 'CHANGE_TYPE',
    payload: newType,
  });
};

export default changeType;
