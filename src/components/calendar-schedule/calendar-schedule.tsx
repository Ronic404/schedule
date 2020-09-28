import React, { FC, ReactElement } from 'react';
import {
  Layout, Calendar, Select, Row, Col,
} from 'antd';

import moment, { Moment } from 'moment';
import CustomTag from '../custom-tag';

import data from '../data';
import taskTypes, { textColor } from '../task-types';

import styles from './calendar-schedule.module.css';

type list = {
    key: string,
    type: string,
    place: string,
    name: string,
    organizer: string,
    comment: string,
    done?: boolean,
    hided?: boolean,
    color?: string
    dateTime: moment.Moment,
}

type headerRenderTypes = {
  value: any,
  onChange: (date: Moment) => void,
}

const getListData = (value: Moment): Array<list> => {
  const listData = data.filter((el) => {
    const date = moment(el.dateTime);
    return date.date() === value.date()
      && date.month() === value.month()
      && date.year() === value.year();
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
          <CustomTag
            backgroundColor={taskTypes.find((task) => task.value === item.type)?.color}
            color={textColor.color}
            text={item.type.toUpperCase()}
          />
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

const headerRender = ({ value, onChange } : headerRenderTypes) => {
  const start = 0;
  const end = 12;
  const monthOptions = [];

  const current = value.clone();
  const localeData = value.localeData();
  const months = [];
  for (let i = 0; i < 12; i += 1) {
    current.month(i);
    months.push(localeData.monthsShort(current));
  }

  for (let index = start; index < end; index += 1) {
    monthOptions.push(
      <Select.Option className="month-item" key={`${index}`} value={index}>
        {months[index]}
      </Select.Option>,
    );
  }
  const month = months[value.month()];

  const year = value.year();
  const options = [];
  for (let i = year - 10; i < year + 10; i += 1) {
    options.push(
      <Select.Option key={i} value={i} className="year-item">
        {i}
      </Select.Option>,
    );
  }
  return (
    <div style={{ padding: 8 }}>
      <Row gutter={8} className={styles.calendar__header}>
        <Col>
          <Select
            size="small"
            dropdownMatchSelectWidth={false}
            className="my-year-select"
            onChange={(newYear) => {
              const now = value.clone().year(newYear);
              onChange(now);
            }}
            value={String(year)}
          >
            {options}
          </Select>
        </Col>
        <Col>
          <Select
            size="small"
            dropdownMatchSelectWidth={false}
            onChange={(selectedMonth) => {
              const newValue = value.clone();
              newValue.month(parseInt(selectedMonth, 10));
              onChange(newValue);
            }}
            value={String(month)}
          >
            {monthOptions}
          </Select>
        </Col>
      </Row>
    </div>
  );
};

const CalendarSchedule: FC = (): ReactElement => (
  <Layout className={styles.calendar}>
    <Calendar dateCellRender={dateCellRender} headerRender={headerRender} />
  </Layout>
);

export default CalendarSchedule;
