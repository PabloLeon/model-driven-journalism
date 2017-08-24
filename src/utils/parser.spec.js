import { parser, splitFile } from './parser';
import data, { testMd } from '../data';

import marksy from 'marksy/components';

it('splits the file for files with header and context', () => {
  const [rawText, rawContext] = splitFile('header---body');
  expect(rawText).toEqual('header');
  expect(rawContext).toEqual('body');
});

it('returns the first part if no sperator is found', () => {
  const singleBlockTest = 'header - body -- -';
  const [rawText, rawContext] = splitFile(singleBlockTest);
  expect(rawText).toEqual(singleBlockTest);
  expect(rawContext).toEqual(undefined);
});

it('throws for invalid inputs', () => {
  expect(() => {
    splitFile('header --- bodyheader --- body');
  }).toThrow();
});

it('parses links for main text blocks as special elements', () => {
  const test = `
  # header1
  - one
  - two 
  - three
  
  There is some text here, [this is not a link](#id0) and some more inline text.
  ## header2
  # header3
  ## header2
  `;

  marksy({
    createElement: React.createElement,
    elements: {
      a({ href, title, target, children }) {
        return (
          <span style={{ backgroundColor: 'orange' }}>
            {(title, href, target)}{' '}
          </span>
        );
      },
    },
  });
});
