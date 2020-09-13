import React, {
  ReactElement, useEffect, useRef, useState,
} from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { Button } from 'antd';
import initialTaskText from './initial-task-text';

import 'github-markdown-css';
import 'antd/dist/antd.css';
import styles from './style.module.css';

export default function CreateTask():ReactElement {
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
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <textarea
            ref={textarea}
            value={text}
            onChange={handleChange}
            className={!taskHide ? styles.task : styles.hide}
          />
          <ReactMarkdown source={text} className={`${styles.markdown} markdown-body`} escapeHtml={false} />
        </div>
        <Button
          className={styles['button-task']}
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
