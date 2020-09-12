import React, { ReactElement, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './ronicTest.css';

export default function RonicTest():ReactElement {
  const [markdownHide, setMarkdownHide] = useState(true);
  const [text, setText] = useState('Some text');

  const description = useRef(null);
  
  function handleChange(event) {
    return setText(event.tar)
  }

  return (
    <>
      <div className="wrapper">
        <textarea ref={description} onChange={handleChange} className="task">Task description</textarea>
        <ReactMarkdown source={text} className={markdownHide ? 'markdown' : 'markdown hide'} />
      </div>
      <button onClick={() => setMarkdownHide(!markdownHide)} type="button" className="button">Edit</button>
    </>
  );
}
