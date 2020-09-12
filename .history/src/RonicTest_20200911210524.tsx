import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import './ronicTest.css';

export default function RonicTest():ReactElement {
  return (
    <>
      <div className="wrapper">
        <div className="task">Task description</div>
        <div className="markdown">Markdown</div>
      </div>
      <button type="button" className="button">Show markdown</button>
    </>
  );
}
