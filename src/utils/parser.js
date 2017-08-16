import React from 'react';
import marksy from 'marksy/components';

import slideData, { testMd } from '../data';

const separatorRE = /---/;
const idRE = /#id\d+ /; // not sure if we need the ()?
const valRE = /#value\d+/;
const choiceRE = /#choice\d+/;

const compileOptions = {
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  smartypants: true,
  sanitize: true,
};

export default (mdData) => {
  const [mainTextRaw, contextElementsRaw] = splitFile(mdData);
  const compiledMainText = compileStandardMd(mainTextRaw);
  return compiledMainText.tree;
};

export const splitFile = (d) => {
  const splits = d.split(separatorRE);
  if (splits.length > 2) {
    console.error(
      `The markdown file ${JSON.stringify(
        d,
      )} does not comply with the required formatting. You cannot use more than one dash '---' in your files.`,
    );
    throw new ReferenceError('Invalid markdown file.');
  }
  return [splits[0], splits[1]];
};

// Components look like this: <MyComponent> text </MyComponent>
// and might contain props
const compilePipelineStandardMd = marksy({
  createElement: React.createElement,

  elements: {
    h1(props) {
      return (
        <h1 style={{ textDecoration: 'underline' }}>
          {props.children}
        </h1>
      );
    },
  },
  components: {
    Row({ children }) {
      return (
        <div style={{ display: 'flex' }}>
          {children}
        </div>
      );
    },
    Col({ children }) {
      return (
        <div
          style={{
            flex: '1',
            padding: '10px',
            backgroundColor: 'red',
            border: '1px solid #333',
          }}
        >
          {children}
        </div>
      );
    },
  },
});

const compileStandardMd = (d, param = { blockType: 'standardMarkdown' }) =>
  compilePipelineStandardMd(d, compileOptions, param);
// const cp = compileStandardMd(testMd);
// cp contains the parse [0], cp.tree, cp.toc
// console.log(cp);
