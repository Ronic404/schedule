import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import './ronicTest.css';

export default function RonicTest():ReactElement {
  function buttonClickHandler() {
    
  }

  return (
    <>
      <div className="wrapper">
        <div className="task">Task description</div>
        <div className="markdown">Markdown</div>
      </div>
      <button onclick={buttonClickHadler} type="button" className="button">Edit</button>
    </>
  );
}
