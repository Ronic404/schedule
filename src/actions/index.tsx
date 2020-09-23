const changeRole = (newRole: string): { type: string, payload: string } => ({
  type: 'CHANGE_ROLE',
  payload: newRole,
});

const changeType = (newType: string): { type: string, payload: string } => ({
  type: 'CHANGE_TYPE',
  payload: newType,
});
const changeTimezone = (newTimezone: string): { type: string, payload: string } => ({
  type: 'CHANGE_TIMEZONE',
  payload: newTimezone,
});
const changeStyleSelectorVisibility = (newVisibility: boolean): { type: string, payload: boolean } => ({
  type: 'CHANGE_STYLESELECTOR_VISIBILITY',
  payload: newVisibility,
});

export { 
  changeRole, 
  changeType, 
  changeTimezone, 
  changeStyleSelectorVisibility };
