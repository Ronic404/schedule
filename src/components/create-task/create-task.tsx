import React, {
  ReactElement, useEffect, useRef, useState,
} from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import {
  Button, Form, Input, DatePicker, TimePicker, Select, Tag, Switch,
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
  const [latitude, setLatitude] = useState<number>(55.75);
  const [longitude, setLongitude] = useState<number>(37.57);
  const [showMap, setShowMap] = useState<boolean>(true);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const mapComponent = !showMap ? <MapRonic latitude={latitude} longitude={longitude} /> : null;

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
    setLatitude(Number((document.querySelector('#latitude') as HTMLInputElement).value));
    setLongitude(Number((document.querySelector('#longitude') as HTMLInputElement).value));
  };

  return (
    <>
      <div className={styles.wrapper}>
        {/* {mapComponent} */}
        <div className={styles.main}>
          {/* <div className={!taskHide ? styles.task : styles.hide}> */}
          <div className={taskHide ? styles.task : styles.hide}>
            <Form>
              <Form.Item
                label="Name task"
                name="Name"
                required={false}
                rules={[{ required: true, message: 'Напишите название задания!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Date"
                name="Date"
                required={false}
                rules={[{ required: true, message: 'Выберите дату!' }]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Deadline"
                name="Deadline"
                required={false}
                rules={[{ required: true, message: 'Назначьте время сдач!' }]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Time"
                name="Time"
                required={false}
                rules={[{ required: true, message: 'Выберите время!' }]}
              >
                <TimePicker minuteStep={5} format="HH:mm" />
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
