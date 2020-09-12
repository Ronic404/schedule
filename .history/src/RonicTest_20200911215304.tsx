import React, { ReactElement, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './ronicTest.css';

export default function RonicTest():ReactElement {
  const [markdownHide, setMarkdownHide] = useState(true);
  const [text, setText] = useState("Some text")
  const input = '# This is a header\n\nAnd this is a paragraph';

  return (
    <>
      <div className="wrapper">
        <div onChange={() =>} className="task" contentEditable="true">Task description</div>
        <ReactMarkdown source={text} className={markdownHide ? 'markdown' : 'markdown hide'} />
      </div>
      <button onClick={() => setMarkdownHide(!markdownHide)} type="button" className="button">Edit</button>
    </>
  );
}
