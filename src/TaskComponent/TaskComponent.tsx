import React, {
  ReactElement, useEffect, useRef, useState,
} from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { Button } from 'antd';
import initialTaskText from './initialTaskText';

import 'github-markdown-css';
import 'antd/dist/antd.css';
import './style.css';

export default function TaskComponent():ReactElement {
  const [taskHide, setTaskHide] = useState<boolean>(true);
  const [text, setText] = useState<string>(initialTaskText);
  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect((): void => {
    if (localStorage.getItem('task-text')) {
      setText(JSON.parse(localStorage.getItem('task-text') || ''));
    }
  }, []);

  const handleChange = (): void => {
    setText(textarea.current?.value || '');
    localStorage.setItem('task-text', JSON.stringify(textarea.current?.value || ''));
  };

  return (
    <>
      <div className="wrapper">
        <div className="main">
          <textarea
            ref={textarea}
            value={text}
            onChange={handleChange}
            className={!taskHide ? 'task' : 'task hide'}
          />
          <ReactMarkdown source={text} className="markdown markdown-body" escapeHtml={false} />
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
