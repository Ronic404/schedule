import React, { ReactElement, useState } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { Button } from 'antd';
import toc from 'remark-toc';
import initialTaskText from './initialTaskText';

import 'github-markdown-css';
import 'antd/dist/antd.css';
import './style.css';

export default function TaskComponent():ReactElement {
  const [taskHide, setTaskHide] = useState(true);
  const [text, setText] = useState(initialTaskText);

  const handleChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="wrapper">
        <div className="main">
          <textarea
            value={text}
            onChange={handleChange}
            className={!taskHide ? 'task' : 'task hide'}
          />
          <ReactMarkdown source={text} className="markdown markdown-body" escapeHtml={false} plugins={[toc]} />
        </div>
        <Button
          className="button-task"
          onClick={() => setTaskHide(!taskHide)}
          type="primary"
          size="large"
          shape="round"
        >
          Edit
        </Button>
      </div>
    </>
  );
}
