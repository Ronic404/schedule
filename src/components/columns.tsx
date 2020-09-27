import React, { ReactElement } from 'react';
import { Checkbox } from 'antd';
import CustomTag from './custom-tag';
import moment from 'moment-timezone';
import OrganizerCell from './organizer-cell';
import taskTypes, { textColor } from './task-types';

const filterTypes = () => {
  const [...typesArray] = taskTypes;
  const temp = typesArray.map((task) => {
    const { ...newTemp } = task;
    delete newTemp.color;
    return newTemp;
  });
  return temp;
};

const dateRenderer = (timeZone: string) => (value: string) => (value
  ? moment(value, 'YYYY-MM-DD HH:mmZ')
    .tz(timeZone)
    .format('ll')
  : '');

const timeRenderer = (timeZone: string) => (value: string) => (value
  ? moment(value, 'YYYY-MM-DD HH:mmZ')
    .tz(timeZone)
    .format('HH:mm')
  : '');

const getColumnDefs = (timezone: string) => ([
  {
    title: 'Date',
    dataIndex: 'dateTime',
    key: 'date',
    editable: true,
    render: dateRenderer(timezone),
  },
  {
    title: 'Time',
    dataIndex: 'dateTime',
    key: 'time',
    editable: true,
    render: timeRenderer(timezone),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    editable: true,
    render: (tag: string): ReactElement => (
      <>
        <CustomTag 
          backgroundColor={taskTypes.find((task) => task.value === tag)?.color} 
          color={textColor.color}
          key={tag} 
          text={tag.toUpperCase()}
          />
      </>
    ),
    filters: filterTypes(),
    onFilter: (value: any, record: any): boolean => record.type.indexOf(value) === 0,
  },
  {
    title: 'Place',
    key: 'place',
    dataIndex: 'place',
    editable: true,
  },
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: 'Organizer',
    key: 'organizer',
    dataIndex: 'organizer',
    editable: true,
    render: (name: string): ReactElement => <OrganizerCell name={name} />,
  },
  {
    title: 'Comment',
    key: 'comment',
    dataIndex: 'comment',
    editable: true,
  },
  {
    title: 'Done',
    key: 'done',
    dataIndex: 'done',
    editable: true,
    render: (done: boolean): ReactElement => <Checkbox checked={done} />,
  },
]);
export default getColumnDefs;
