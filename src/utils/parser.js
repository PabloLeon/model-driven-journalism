import React from 'react';
import marksy from 'marksy/components';

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
const compilePipelineStandardMd = (data, componentDict, compileOptions, params) =>
  marksy({
    createElement: React.createElement,

    elements: {
      h1(props) {
        return (
          <h1 style={{ textDecoration: 'underline', color: 'teal' }}>
            {props.children}
          </h1>
        );
      },
    },
    components: componentDict,
  });

const compileStandardMd = (d, components, options, param = { blockType: 'standardMarkdown' }) =>
  compilePipelineStandardMd(d, components, compileOptions, param);
