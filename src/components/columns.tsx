import React, { ReactElement } from 'react';
import { Tag, Checkbox } from 'antd';
import OrganizerCell from './organizer-cell';
import taskTypes from './task-types';

const filterTypes = () => {
  const [...typesArray] = taskTypes;
  const temp = typesArray.map((task) => {
    const { ...newTemp } = task;
    delete newTemp.color;
    return newTemp;
  });
  return temp;
};

export default [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (tag: string): ReactElement => (
      <>
        <Tag color={taskTypes.find((task) => task.value === tag)?.color} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      </>
    ),
    filters: filterTypes(),
    onFilter: (value: any, record: any): boolean => record.type.indexOf(value) === 0,
  },
  {
    title: 'Place',
    key: 'place',
    dataIndex: 'place',
  },
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Organizer',
    key: 'organizer',
    dataIndex: 'organizer',
    render: (name: string): ReactElement => <OrganizerCell name={name} />,
  },
  {
    title: 'Comment',
    key: 'comment',
    dataIndex: 'comment',
  },
  {
    title: 'Done',
    key: 'done',
    dataIndex: 'done',
    render: (done: boolean): ReactElement => <Checkbox checked={done} />,
  },
];
