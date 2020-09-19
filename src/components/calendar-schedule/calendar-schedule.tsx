import React, { FC, ReactElement } from 'react';
import { Layout, Calendar, Badge } from 'antd';

import data from '../data';
import taskTypes from '../task-types';
import { Moment } from 'moment';

import styles from './calendar-schedule.module.css';

type list = {
    key: string,
    date: string,
    time: string,
    type: string,
    place: string,
    name: string,
    organizer: string,
    comment: string,
    done: boolean,
    color?: string 
}

const getListData = (value: Moment): Array<list> => {
    const listData = data.filter((el) => {
        const day = el.date.substring(
            el.date.indexOf(' ') + 1, 
            el.date.indexOf(','));
        return parseInt(day) === value.date();
    });
    listData.forEach((item: list) => {
        item.color = taskTypes.filter((el) => el.value === item.type)[0].color;
    })
    return listData || [];
}

const dateCellRender = (value : Moment): ReactElement => {
    const listData = getListData(value);
    return (
      <ul className={styles['calendar__cell']}>
        {listData.map((item: list) => (
          <li key={item.key}>
            <Badge color={item.color} text={item.name} />
          </li>
        ))}
      </ul>
    );
}

  
const CalendarSchedule: FC = (): ReactElement => {
    return (
        <Layout>
            <Calendar dateCellRender={dateCellRender} />
        </Layout>
    );
};
  
export default CalendarSchedule;
  