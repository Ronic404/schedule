import React from 'react';

const scheduleService: any = null;

const {
  Provider: ScheduleServiceProvider,
  Consumer: ScheduleServiceConsumer,
} = React.createContext(scheduleService);

export {
  ScheduleServiceProvider,
  ScheduleServiceConsumer,
};
