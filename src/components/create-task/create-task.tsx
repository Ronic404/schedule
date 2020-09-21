import React, {
  ReactElement, useEffect, useRef, useState,
} from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import {
  Button, Form, Input, DatePicker, TimePicker, Select, Tag, Switch, Table,
} from 'antd';
import MapRonic from '../map';
import initialTaskText from './initial-task-text';
import allTypes from '../task-types';

import 'github-markdown-css';
import 'antd/dist/antd.css';
import styles from './style.module.css';

export default function CreateTask(): ReactElement {
  const [taskHide, setTaskHide] = useState<boolean>(true);
  const [text, setText] = useState<string>(initialTaskText);
  const [latitude, setLatitude] = useState<number>(53.9000000);
  const [longitude, setLongitude] = useState<number>(27.5666700);
  const [showMap, setShowMap] = useState<boolean>(true);
  const [nameFolder, setNameFolder] = useState<string>('RSSschool');
  const [nameBranch, setNameBranch] = useState<string>('RSSschool');
  const [deadlineDate, setDeadlineDate] = useState<string>('01.01.1970');
  const [deadlineTime, setDeadlineTime] = useState<string>('00:00');
  const textarea = useRef<HTMLTextAreaElement>(null);

  const mapComponent = !showMap ? <MapRonic latitude={latitude} longitude={longitude} /> : null;

  const columns = [
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

  const data = [
    {
      key: '1',
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

  const handleChange = (): void => {
    setText(textarea.current?.value || '');
    localStorage.setItem('task-text', JSON.stringify(textarea.current?.value || ''));
  };

  const saveDescription = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDeadlineDate((document.querySelector('#deadlineDate') as HTMLInputElement).value);
    setDeadlineTime((document.querySelector('#deadlineTime') as HTMLInputElement).value);
    setNameFolder((document.querySelector('#folder') as HTMLInputElement).value);
    setNameBranch((document.querySelector('#branch') as HTMLInputElement).value);
    setLatitude(Number((document.querySelector('#latitude') as HTMLInputElement).value));
    setLongitude(Number((document.querySelector('#longitude') as HTMLInputElement).value));

    // console.log((document.querySelector('#DeadlineDate') as HTMLInputElement).value);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          {/* <div className={!taskHide ? styles.task : styles.hide}> */}
          <div className={taskHide ? styles.task : styles.hide}>
            <Form>
              <Form.Item
                label="Deadline date"
                name="deadlineDate"
                required={false}
                rules={[{ required: true, message: 'Назначьте дату дедлайна!' }]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Deadline time"
                name="deadlineTime"
                required={false}
                rules={[{ required: true, message: 'Выберите время дедлайна!' }]}
              >
                <TimePicker minuteStep={5} format="HH:mm" />
              </Form.Item>
              <Form.Item
                label="Name folder"
                name="folder"
                id="folder"
                required={false}
                rules={[{ required: true, message: 'Напишите название папки!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Name branch"
                name="branch"
                required={false}
                rules={[{ required: true, message: 'Напишите название ветки!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Name task"
                name="Name"
                required={false}
                rules={[{ required: true, message: 'Напишите название задания!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Start task"
                name="StartTask"
                required={false}
                rules={[{ required: true, message: 'Выберите дату!' }]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Type"
                name="Type"
                required={false}
                rules={[{ required: true, message: 'Выберите тип задания!' }]}
              >
                <Select>
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
                name="Organizer"
                required={false}
                rules={[{ required: true, message: 'Напишите имя организатора!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Show map">
                <Switch onChange={(prev) => setShowMap(!prev)} />
              </Form.Item>
              <Form.Item label="Place">
                <Input.Group compact>
                  <Form.Item
                    name={['place', 'latitude']}
                    noStyle
                  >
                    <Input style={{ width: '50%' }} placeholder="latitude" id="latitude" />
                  </Form.Item>
                  <Form.Item
                    name={['place', 'longitude']}
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
            />
          </div>
          <div>
            {mapComponent}
            <div>
              <Table columns={columns} dataSource={data} bordered pagination={false} />
            </div>
            <ReactMarkdown source={text} className={`${styles.markdown} markdown-body`} escapeHtml={false} />
          </div>
        </div>
        <Button
          className={styles['button-task']}
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
