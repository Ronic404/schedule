const changeRole = (newRole: string): { type: string, payload: string } => ({
  type: 'CHANGE_ROLE',
  payload: newRole,
});

export default changeRole;
