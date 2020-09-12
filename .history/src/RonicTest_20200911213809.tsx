import React, { ReactElement, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import './ronicTest.css';

export default function RonicTest():ReactElement {
  const [markdownHide, useMarkdownHide] = useState(true);
  const markdown = useRef(null);

  function butonClickHadler() {
    useMarkdownHide(!markdownHide);
  }

  return (
    <>
      <div className="wrapper">
        <div className="task">Task description</div>
        <div ref={markdown} className={markdownHide ? 'markdown' : 'markdown hide'}>Markdown</div>
      </div>
      <button onClick={butonClickHadler} type="button" className="button">Edit</button>
    </>
  );
}
