import React, { ReactElement, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './ronicTest.css';

const initialText = `# Live demo
Changes are automatically rendered as you type.
## Table of Contents
* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
`;

export default function RonicTest():ReactElement {
  const [taskHide, setTaskHide] = useState(true);
  const [text, setText] = useState(initialText);

  const handleChange = (event:any) => setText(event.target.value);

  return (
    <>
      <div className="wrapper">
        <textarea
          onChange={handleChange}
          className={!taskHide ? 'task' : 'task hide'}
        >
          {initialText}
        </textarea>
        <ReactMarkdown source={text} escapeHtml={true} className="markdown" />
      </div>
      <button onClick={() => setTaskHide(!taskHide)} type="button" className="button">Edit</button>
    </>
  );
}
