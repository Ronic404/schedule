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

export {
  changeRole,
  changeType,
  eventsLoaded,
  changeTimezone,
};
