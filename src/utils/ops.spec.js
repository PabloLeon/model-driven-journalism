import { getAvailablePredictors } from './ops';

const allAvailable = [{ id: 1, text: 'test1' }, { id: 2, text: 'test2' }];
const selectedEmpty = [];
const selectedOverlap = [{ id: 1, text: 'test1' }];
it('it displays all available predictors if no predictors are selected', () => {
  const available = getAvailablePredictors(allAvailable, selectedEmpty);
  expect(available.length).toEqual(2);
  expect(available).toEqual(allAvailable);
});

it('it displays available predictors if predictors are selected', () => {
  const available = getAvailablePredictors(allAvailable, selectedOverlap);
  expect(available.length).toEqual(1);
  expect(available).toEqual([{ id: 2, text: 'test2' }]);
});

// TODO: test for closest trust? didn't fix boundary cases (no hospital data etc.)
