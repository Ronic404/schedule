import React, { FC, ReactElement } from 'react';
import {
  Table, Tag, Checkbox,
} from 'antd';
import moment from 'moment';

import styles from './main-table.module.css';
import OrganizerCell from '../organizer-cell';

const taskTypes = [
  {
    type: 'stream',
    color: '#FF9A6F',
  },
  {
    type: 'faculty',
    color: '#BE6AFF',
  },
  {
    type: 'self-education',
    color: '#FCFF6A',
  },
  {
    type: 'test',
    color: '#6ADBFF',
  },
  {
    type: 'deadline',
    color: '#FF6A6A',
  },
  {
    type: 'start',
    color: '#A3FF6A',
  },
];

const columns = [
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
    render: (tags: string[]) => (
      <>
        {tags.map((tag) => {
          const color = taskTypes.find((task) => task.type === tag)?.color;
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
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
    // render: (text: string, record: any) => (
    //   <Space size="middle">
    //     <span>
    //       Invite
    //       {' '}
    //       {' '}
    //       {record.name}
    //     </span>
    //     <span>Delete</span>
    //   </Space>
    // ),
  },
  {
    title: 'Organizer',
    key: 'organizer',
    dataIndex: 'organizer',
    render: (name: string) => <OrganizerCell name={name} />,
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
    render: (done: boolean) => <Checkbox checked={done} />,
  },
];

const data = [
  {
    key: '1',
    date: moment().format('ll'),
    time: moment().format('LT'),
    type: ['test'],
    place: 'ddddd',
    name: 'fffff',
    organizer: 'nastassiamilashevskaya',
    comment: 'jjjjj',
    done: false,
  },
  {
    key: '1',
    date: moment().format('ll'),
    time: moment().format('LT'),
    type: ['start'],
    place: 'ddddd',
    name: 'fffff',
    organizer: 'nastassiamilashevskaya',
    comment: 'jjjjj',
    done: true,
  },
  {
    key: '1',
    date: moment().format('ll'),
    time: moment().format('LT'),
    type: ['stream'],
    place: 'ddddd',
    name: 'fffff',
    organizer: 'nastassiamilashevskaya',
    comment: 'jjjjj',
    done: false,
  },
];

const MainTable: FC = (): ReactElement => (
  <div className={styles.container}>
    <Table size="middle" columns={columns} dataSource={data} />
  </div>
);

export default MainTable;
