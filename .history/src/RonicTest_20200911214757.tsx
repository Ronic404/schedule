import React, { ReactElement, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import './ronicTest.css';

export default function RonicTest():ReactElement {
  const [markdownHide, setMarkdownHide] = useState(true);

  return (
    <>
      <div className="wrapper">
        <div className="task">Task description</div>
        <ReactMarkdown source= className={markdownHide ? 'markdown' : 'markdown hide'} />
      </div>
      <button onClick={() => setMarkdownHide(!markdownHide)} type="button" className="button">Edit</button>
    </>
  );
}
