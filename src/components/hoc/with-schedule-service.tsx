/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';

import { ScheduleServiceConsumer } from '../schedule-service-context';

const withScheduleService = () => (Wrapped: FC) => (props: any): any => (
  <ScheduleServiceConsumer>
    {
      (scheduleService) => (
        <Wrapped
          {...props}
          scheduleService={scheduleService}
        />
      )
    }
  </ScheduleServiceConsumer>
);

export default withScheduleService;
