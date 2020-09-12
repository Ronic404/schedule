import React, { ReactElement, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './ronicTest.css';

let aaaa = `# Live demo

Changes are automatically rendered as you type.

## Table of Contents

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
`

export default function RonicTest():ReactElement {
  const [markdownHide, setMarkdownHide] = useState(true);
  const [text, setText] = useState('Some text');

  const description = useRef(null);

  const handleChange = (event:any) => setText(event.target.value);

  return (
    <>
      <div className="wrapper">
        <textarea ref={description} onChange={handleChange} className="task">Task description</textarea>
        <ReactMarkdown source={text} className={!markdownHide ? 'markdown' : 'markdown hide'} />
      </div>
      <button onClick={() => setMarkdownHide(!markdownHide)} type="button" className="button">Edit</button>
    </>
  );
}
