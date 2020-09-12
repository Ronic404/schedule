import React, { ReactElement, useState } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './ronicTest.css';

const initialText = `## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |
`;

export default function RonicTest():ReactElement {
  const [taskHide, setTaskHide] = useState(true);
  const [text, setText] = useState(initialText);

  const handleChange = (event:any) => setText(event.target.value);

  return (
    <>
      <div className="wrapper">
        <textarea
          onChange={handleChange}
          className={!taskHide ? 'task' : 'task hide'}
        >
          {initialText}
        </textarea>
        <ReactMarkdown source={text} className="markdown" />
      </div>
      <Button
        onClick={() => setTaskHide(!taskHide)}
        type="primary"
        style={{ marginLeft: 8 }}
        size="large"
        shape="round"
      >
        Edit
      </Button>
    </>
  );
}