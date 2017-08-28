import { getAvailablePredictors } from './ops';

const allAvailable = [
  { key: 'a', spec: { name: 'test1', description: 'a' } },
  { key: 'b', spec: { name: 'test1', description: 'a' } },
];
const selectedEmpty = [];
const selectedOverlap = [{ key: 'a', spec: { name: 'test1', description: 'a' } }];

it('it displays all available predictors if no predictors are selected', () => {
  const available = getAvailablePredictors(allAvailable, selectedEmpty);
  expect(available.length).toEqual(2);
  expect(available).toEqual(allAvailable);
});

it('it displays available predictors if predictors are selected', () => {
  const available = getAvailablePredictors(allAvailable, selectedOverlap);

  expect(available).toEqual([{ key: 'b', spec: { name: 'test1', description: 'a' } }]);
  expect(available.length).toEqual(1);
});

// TODO: test for closest trust? didn't fix boundary cases (no hospital data etc.)
