import React, { FC, ReactElement } from 'react';
import { Layout, Calendar, Tag } from 'antd';

import { Moment } from 'moment';
import data from '../data';
import taskTypes from '../task-types';

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
      el.date.indexOf(','),
    );
    return parseInt(day, 10) === value.date();
  });
  const newArr = listData.map((item: list) => ({
    ...item,
    color: taskTypes.filter((el) => el.value === item.type)[0].color,
  }));
  return newArr || [];
};

const dateCellRender = (value : Moment): ReactElement => {
  const listData = getListData(value);
  return (
    <ul className={styles.calendar__cell}>
      {listData.map((item: list) => (
        <li key={item.key} className={styles['calendar__list-item']}>
          <Tag color={taskTypes.find((task) => task.value === item.type)?.color}>
            {item.type.toUpperCase()}
          </Tag>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

const CalendarSchedule: FC = (): ReactElement => (
  <Layout className={styles.calendar}>
    <Calendar dateCellRender={dateCellRender} />
  </Layout>
);

export default CalendarSchedule;
