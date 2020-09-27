/* eslint-disable react/jsx-one-expression-per-line */
import React, {
  ReactElement, useEffect, useRef, useState,
} from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown/with-html';
import {
  Button, Form, Input, DatePicker, TimePicker, Select, Tag, Switch, Table, Divider, message,
} from 'antd';
import MapRonic from '../map';
import Feedback from '../feedback';
import initialTaskText from './initial-task-text';
import allTypes from '../task-types';
import defaultEvent from './default-event';

import 'github-markdown-css';
import 'antd/dist/antd.css';
import styles from './style.module.css';

function CreateTask({ role, events, taskNumber }: any): ReactElement {
  const event = events[taskNumber - 1];
  const {
    date, time, name, organizer,
  } = event || defaultEvent;

  const startTaskBackendDay = (date.day.toString().length === 1) ? `0${date.day}` : date.day;
  const startTaskBackendMonth = (date.month.toString().length === 1) ? `0${date.month}` : date.month;
  const deadlineBackendDay = (time.day.toString().length === 1) ? `0${time.day}` : time.day;
  const deadlinekBackendMonth = (time.month.toString().length === 1) ? `0${time.month}` : time.month;
  const startTaskBackendHour = (date.hour.toString().length === 1) ? `0${date.hour}` : date.hour;
  const startTaskBackendMinute = (date.minute.toString().length === 1) ? `0${date.minute}` : date.minute;
  const deadlinekBackendHour = (time.hour.toString().length === 1) ? `0${time.hour}` : time.hour;
  const deadlinekBackendMinute = (time.minute.toString().length === 1) ? `0${time.minute}` : time.minute;

  const [taskHide, setTaskHide] = useState<boolean>(true);
  const [text, setText] = useState<string>(initialTaskText);
  const [latitude, setLatitude] = useState<number>(53.9000000);
  const [longitude, setLongitude] = useState<number>(27.5666700);
  const [showMap, setShowMap] = useState<boolean>(true);
  const [nameFolder, setNameFolder] = useState<string>('RSSschool');
  const [nameBranch, setNameBranch] = useState<string>('RSSschool');
  const [nameTask, setNameTask] = useState<string>(name);
  const [nameOrganizer, setNameOrganizer] = useState<string>(organizer);
  const [startTaskDate, setStartTaskDate] = useState<string>(`${startTaskBackendDay}.${startTaskBackendMonth}.${date.year}`);
  const [startTaskTime, setStartTaskTime] = useState<string>(`${startTaskBackendHour}:${startTaskBackendMinute}`);
  const [deadlineDate, setDeadlineDate] = useState<string>(`${deadlineBackendDay}.${deadlinekBackendMonth}.${time.year}`);
  const [deadlineTime, setDeadlineTime] = useState<string>(`${deadlinekBackendHour}:${deadlinekBackendMinute}`);
  const [tagNumber, setTagNumber] = useState<number>(0);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const mapComponent = !showMap ? <MapRonic latitude={latitude} longitude={longitude} /> : null;
  const editButtonClass = role === 'Mentor' ? styles['button-task'] : styles.hide;

  const tableHeader = [
    {
      title: 'Start task',
      dataIndex: 'StartTask',
      key: 'StartTask',
    },
    {
      title: 'Deadline',
      dataIndex: 'Deadline',
      key: 'Deadline',
    },
    {
      title: 'Folder',
      dataIndex: 'Folder',
      key: 'Folder',
    },
    {
      title: 'Branch',
      dataIndex: 'Branch',
      key: 'Branch',
    },
  ];

  const tableContent = [
    {
      key: '1',
      StartTask: `${startTaskDate} ${startTaskTime}`,
      Deadline: `${deadlineDate} ${deadlineTime}`,
      Folder: nameFolder,
      Branch: nameBranch,
    },
  ];

  useEffect((): void => {
    if (localStorage.getItem('task-text')) {
      setText(JSON.parse(localStorage.getItem('task-text') || ''));
    }
  }, []);

  useEffect((): void => {
    if (role === 'Student') {
      setTaskHide(true);
    }
  }, [role]);

  const handleChange = (): void => {
    setText(textarea.current?.value || '');
    localStorage.setItem('task-text', JSON.stringify(textarea.current?.value || ''));
  };

  const onFinish = () => {
    message.success('Task has been saved!');
  };

  const saveDescription = () => {
    setStartTaskDate((document.querySelector('#startTaskDate') as HTMLInputElement).value);
    setStartTaskTime((document.querySelector('#startTaskTime') as HTMLInputElement).value);
    setDeadlineDate((document.querySelector('#deadlineDate') as HTMLInputElement).value);
    setDeadlineTime((document.querySelector('#deadlineTime') as HTMLInputElement).value);
    setNameFolder((document.querySelector('#folder') as HTMLInputElement).value);
    setNameBranch((document.querySelector('#branch') as HTMLInputElement).value);
    setNameTask((document.querySelector('#nameTask') as HTMLInputElement).value);
    setNameOrganizer((document.querySelector('#organizer') as HTMLInputElement).value);
    setTagNumber(Number(document.querySelector('#type')?.getAttribute('aria-activedescendant')?.slice(-1)));
    setLatitude(Number((document.querySelector('#latitude') as HTMLInputElement).value));
    setLongitude(Number((document.querySelector('#longitude') as HTMLInputElement).value));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={!taskHide ? styles.editTask : styles.hide}>
            <Form onFinish={onFinish}>
              <Form.Item label="Start task">
                <Input.Group compact>
                  <Form.Item
                    name="startTaskDate"
                    required={false}
                    hasFeedback
                    rules={[{ required: true, message: 'Выберите дату!' }]}
                    style={{ margin: '0' }}
                  >
                    <DatePicker />
                  </Form.Item>
                  <Form.Item
                    name="startTaskTime"
                    required={false}
                    hasFeedback
                    rules={[{ required: true, message: 'Выберите время начала!' }]}
                    style={{ margin: '0 0 0 10px' }}
                  >
                    <TimePicker minuteStep={1} format="HH:mm" />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
              <Form.Item label="Deadline">
                <Input.Group compact>
                  <Form.Item
                    name="deadlineDate"
                    required={false}
                    hasFeedback
                    rules={[{ required: true, message: 'Назначьте дату дедлайна!' }]}
                    style={{ margin: '0' }}
                  >
                    <DatePicker />
                  </Form.Item>
                  <Form.Item
                    name="deadlineTime"
                    required={false}
                    hasFeedback
                    rules={[{ required: true, message: 'Выберите время дедлайна!' }]}
                    style={{ margin: '0 0 0 10px' }}
                  >
                    <TimePicker minuteStep={1} format="HH:mm" />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
              <Form.Item
                label="Name folder"
                name="folder"
                required={false}
                hasFeedback
                rules={[{ required: true, message: 'Напишите название папки!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Name branch"
                name="branch"
                required={false}
                hasFeedback
                rules={[{ required: true, message: 'Напишите название ветки!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Name task"
                name="nameTask"
                required={false}
                hasFeedback
                rules={[{ required: true, message: 'Напишите название задания!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Type"
                required={false}
                hasFeedback
                rules={[{ required: true, message: 'Выберите тип задания!' }]}
              >
                <Select id="type">
                  {allTypes.map((type) => (
                    <Select.Option
                      key={type.value}
                      value={type.value}
                    >
                      <Tag color={type.color} key={type.value}>{type.value.toUpperCase()}</Tag>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Organizer"
                name="organizer"
                required={false}
                hasFeedback
                rules={[{ required: true, message: 'Напишите имя организатора!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Show map">
                <Switch onChange={(prev) => setShowMap(!prev)} />
              </Form.Item>
              <Form.Item label="Coordinates">
                <Input.Group compact>
                  <Form.Item
                    name={['Coordinates', 'latitude']}
                    noStyle
                  >
                    <Input style={{ width: '50%' }} placeholder="latitude" id="latitude" />
                  </Form.Item>
                  <Form.Item
                    name={['Coordinates', 'longitude']}
                    noStyle
                  >
                    <Input style={{ width: '50%' }} placeholder="longitude" id="longitude" />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={saveDescription}>
                  Save
                </Button>
              </Form.Item>
            </Form>
            <textarea
              ref={textarea}
              value={text}
              onChange={handleChange}
              className={styles.textarea}
            />
          </div>
          <div className={styles.taskPage}>
            <div>
              <Table
                columns={tableHeader}
                dataSource={tableContent}
                bordered
                pagination={false}
                className={styles.topTable}
              />
              <Divider style={{ fontSize: '3em' }}>{nameTask}</Divider>
              <div>
                <Tag
                  color={allTypes[tagNumber].color}
                  key={allTypes[tagNumber].value}
                >
                  {allTypes[tagNumber].value.toUpperCase()}
                </Tag>
                <span>Organizer: {nameOrganizer}</span>
                <Divider />
              </div>
            </div>
            <ReactMarkdown source={text} className={`${styles.markdown} markdown-body`} escapeHtml={false} />
            {mapComponent}
            <Divider />
            <Feedback />
          </div>
        </div>
        <Button
          className={editButtonClass}
          onClick={() => setTaskHide(!taskHide)}
          type="primary"
          size="large"
        >
          Edit
        </Button>
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  role: state.role,
  events: state.events,
  taskNumber: state.taskNumber,
});

export default connect(mapStateToProps)(CreateTask);
