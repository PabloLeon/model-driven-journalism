import { parser, splitFile } from './parser';
import data, { testMd } from '../data';

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

it('parses to markdown', () => {});
