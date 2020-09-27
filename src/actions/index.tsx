import { IEvent } from '../interfaces';

const changeRole = (newRole: string): { type: string, payload: string } => ({
  type: 'CHANGE_ROLE',
  payload: newRole,
});

const changeType = (newType: string): { type: string, payload: string } => ({
  type: 'CHANGE_TYPE',
  payload: newType,
});

const eventsLoaded = (newEvents: IEvent[]): { type: string, payload: IEvent[] } => ({
  type: 'EVENTS_LOADED',
  payload: newEvents,
});

const changeTimezone = (newTimezone: string): { type: string, payload: string } => ({
  type: 'CHANGE_TIMEZONE',
  payload: newTimezone,
});

const changeTaskNumber = (newTaskNumber: number): { type: string, payload: number } => ({
  type: 'CHANGE_TASK_NUMBER',
  payload: newTaskNumber,
});

const changeStyleSelectorVisibility = (newVisibility: boolean)
  : { type: string, payload: boolean } => ({
  type: 'CHANGE_STYLESELECTOR_VISIBILITY',
  payload: newVisibility,
});

export {
  changeRole,
  changeType,
  eventsLoaded,
  changeTimezone,
  changeTaskNumber,
  changeStyleSelectorVisibility,
};
