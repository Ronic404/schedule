import React, { FC, ReactElement, useState } from 'react';
import {
  Modal, Button, Form, Input, message,
} from 'antd';
import Rater from '../rater';

const Feedback: FC = (): ReactElement => {
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    if (!(document.querySelector('#input') as HTMLInputElement).value.trim() || !(document.querySelector('#textarea') as HTMLInputElement).value.trim()) {
      message.error('Fill in all the lines');
    } else {
      setConfirmLoading(true);
      console.log(`nick: ${(document.querySelector('#input') as HTMLInputElement).value}`);
      console.log(`comment: ${(document.querySelector('#textarea') as HTMLInputElement).value}`);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
        message.success('Your message has been send!');
      }, 2000);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Leave feedback
      </Button>
      <Modal
        title="Your opinion is important to us!"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item
            label="Nick"
            name="nick"
            required={false}
            rules={[{ required: true, message: 'Как Вас зовут?' }]}
          >
            <Input id="input" />
          </Form.Item>
          <Form.Item
            label="Text"
            name="text"
            required={false}
            rules={[{ required: true, message: 'Оставьте сообщение!' }]}
          >
            <Input.TextArea id="textarea" />
          </Form.Item>
        </Form>
        <Rater />
      </Modal>
    </>
  );
};

export default Feedback;
