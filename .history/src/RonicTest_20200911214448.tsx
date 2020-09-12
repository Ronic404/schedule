import React, { ReactElement, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import './ronicTest.css';

export default function RonicTest():ReactElement {
  const [markdownHide, useMarkdownHide] = useState(true);

  return (
    <>
      <div className="wrapper">
        <div className="task">Task description</div>
        <div className={markdownHide ? 'markdown' : 'markdown hide'}>Markdown</div>
      </div>
      <button onClick={() => useMarkdownHide(false)} type="button" className="button">Edit</button>
    </>
  );
}
