import React, { ReactElement, useRef } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import './ronicTest.css';

export default function RonicTest():ReactElement {
  const button = useRef();

  function buttonClickHadler() {
    if (button.classlist.contains)
  }

  return (
    <>
      <div className="wrapper">
        <div className="task">Task description</div>
        <div className="markdown">Markdown</div>
      </div>
      <button ref={button} onClick={buttonClickHadler} type="button" className="button">Edit</button>
    </>
  );
}
