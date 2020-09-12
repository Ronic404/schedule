import React, { ReactElement, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './ronicTest.css';

export default function RonicTest():ReactElement {
  const [markdownHide, setMarkdownHide] = useState(true);
  const [text, setText] = useState("Some text");
  
  const description = useRef(null);

  return (
    <>
      <div className="wrapper">
        <div ref={description} onChange={() => setText(description.current)} className="task" contentEditable="true">Task description</div>
        <ReactMarkdown source={text} className={markdownHide ? 'markdown' : 'markdown hide'} />
      </div>
      <button onClick={() => setMarkdownHide(!markdownHide)} type="button" className="button">Edit</button>
    </>
  );
}
