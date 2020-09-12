import React, { ReactElement, useState } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './ronicTest.css';

const initialText = `# Live demo

Changes are automatically rendered as you type.

## Table of Content

* Hello
* Hello2


## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)

<input >


![](https://example.com/your-image.png)`;

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
        <ReactMarkdown source={text} className="markdown" escapeHtml={false} />
      </div>
      <Button
        onClick={() => setTaskHide(!taskHide)}
        type="primary"
        style={{ marginLeft: 8 }}
        size="large"
        shape="round"
      >
        Edit
      </Button>
    </>
  );
}
