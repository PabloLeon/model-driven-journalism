import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { predictionsMock } from '../data/';

const getTotals = (d) => {
  const length = d.length;
  if (length > 0) {
    const dEq = d
      .map(({ guess, trueValue }) => (guess === trueValue ? 1 : 0))
      .reduce((a, b) => a + b, 0);
    const frac = dEq / length;
    return frac * 100.0;
  }
  return 0.0;
};
const displayT = v => (v ? 'On target' : 'Not on target');

const PredictorTable = ({ data }) => {
  const percentageCorrect = getTotals(data);
  const numberOfEntries = data.length;
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Trust</Table.HeaderCell>
          <Table.HeaderCell>Your Guess</Table.HeaderCell>
          <Table.HeaderCell>True Value</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {numberOfEntries > 1 &&
          data.map(n => (
            <Table.Row
              key={n.ods}
              positive={n.guess === n.trueValue}
              negative={n.guess !== n.trueValue}
            >
              <Table.Cell>{n.trustName}</Table.Cell>
              <Table.Cell>{displayT(n.guess)}</Table.Cell>
              <Table.Cell>{displayT(n.trueValue)}</Table.Cell>
            </Table.Row>
          ))}
        <Table.Row>
          <Table.Cell>Total correct</Table.Cell>
          <Table.Cell />
          <Table.Cell>{`You got ${percentageCorrect.toFixed(1)}% correct.`}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

PredictorTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ods: PropTypes.string.isRequired,
      trustName: PropTypes.string.isRequired,
      guess: PropTypes.bool.isRequired,
      trueValue: PropTypes.bool.isRequired,
    }),
  ),
};
PredictorTable.defaultProps = {
  data: predictionsMock,
};
export default PredictorTable;
