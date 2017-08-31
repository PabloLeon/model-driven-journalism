import React from 'react';
import marksy from 'marksy/components';

const compile = d =>
  marksy({
    createElement: React.createElement,
    elements: d,
  });

const parse = (rawText, dict) => {
  const c = compile(dict);
  const compiledText = c(rawText);
  return compiledText.tree;
};
export default parse;
