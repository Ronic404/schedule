import React, { ReactElement, useRef } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import './ronicTest.css';

export default function RonicTest():ReactElement {
  const markdown = useRef(null);

  function buttonClickHadler() {
    console.log(markdown.current.focus)
  }

  return (
    <>
      <div className="wrapper">
        <div className="task">Task description</div>
        <div ref={markdown} className="markdown">Markdown</div>
      </div>
      <button onClick={buttonClickHadler} type="button" className="button">Edit</button>
    </>
  );
}
