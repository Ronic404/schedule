const changeTimezone = (newTimezone: string): { type: string, payload: string } => ({
  type: 'CHANGE_TIMEZONE',
  payload: newTimezone,
});

export default changeTimezone;
