import React, {
  FC, ReactElement, useEffect, useState,
} from 'react';
import {
  Table, Tag, Checkbox,
} from 'antd';
import moment from 'moment';

import styles from './main-table.module.css';
import OrganizerCell from '../organizer-cell';
import ColsSelector from '../cols-selector';

interface taskTypesArray {
  text: string,
  value: string,
  color?: string,
}

const taskTypes: taskTypesArray[] = [
  {
    text: 'Stream',
    value: 'stream',
    color: '#FF9A6F',
  },
  {
    text: 'Faculty',
    value: 'faculty',
    color: '#BE6AFF',
  },
  {
    text: 'Self-education',
    value: 'self-education',
    color: '#FCFF6A',
  },
  {
    text: 'Test',
    value: 'test',
    color: '#6ADBFF',
  },
  {
    text: 'Deadline',
    value: 'deadline',
    color: '#FF6A6A',
  },
  {
    text: 'Start',
    value: 'start',
    color: '#A3FF6A',
  },
];

const filterTypes = () => {
  const [...typesArray] = taskTypes;
  const temp = typesArray.map((task) => {
    const { ...newTemp } = task;
    delete newTemp.color;
    return newTemp;
  });
  return temp;
};

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
    render: (tag: string) => (
      <>
        <Tag color={taskTypes.find((task) => task.value === tag)?.color} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      </>
    ),
    filters: filterTypes(),
    onFilter: (value: any, record: any) => record.type.indexOf(value) === 0,
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

const createColsTitles = () => {
  const temp: {title: string, checked: boolean}[] = [];
  const [...titles] = columns;
  titles.forEach((col) => {
    temp.push({ title: col.title, checked: true });
  });
  return temp;
};

const data = [
  {
    key: '1',
    date: moment().format('ll'),
    time: moment().format('LT'),
    type: 'test',
    place: 'ddddd',
    name: 'fffff',
    organizer: 'nastassiamilashevskaya',
    comment: 'jjjjj',
    done: false,
  },
  {
    key: '2',
    date: moment().format('ll'),
    time: moment().format('LT'),
    type: 'start',
    place: 'ddddd',
    name: 'fffff',
    organizer: 'nastassiamilashevskaya',
    comment: 'jjjjj',
    done: true,
  },
  {
    key: '3',
    date: moment().format('ll'),
    time: moment().format('LT'),
    type: 'stream',
    place: 'ddddd',
    name: 'fffff',
    organizer: 'nastassiamilashevskaya',
    comment: 'jjjjj',
    done: false,
  },
];

const MainTable: FC = (): ReactElement => {
  const [colsTitles, setColsTitles] = useState<{title: string, checked: boolean}[]>([]);

  const changeColsHandler = (cols: {title: string, checked: boolean}[]) => {
    setColsTitles(cols);
  };

  const activeCols = () => {
    const temp: any = [];
    colsTitles.forEach((el) => {
      if (el.checked) temp.push(columns.find((c) => c.title === el.title));
    });
    console.log(colsTitles);
    return temp;
  };

  useEffect(() => {
    setColsTitles(createColsTitles());
  }, []);

  return (
    <div className={styles.container}>
      <ColsSelector
        onChangeCols={(cols: {title: string, checked: boolean}[]) => changeColsHandler(cols)}
        columns={colsTitles}
      />
      <Table size="middle" columns={activeCols()} dataSource={data} />
    </div>
  );
};

export default MainTable;
