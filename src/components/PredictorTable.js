import React from 'react';
import PropTypes from 'prop-types';
// FIXME: have these imports changed?
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { predictionsMock } from '../data/';

const styles = {
  paper: {
    width: '100%',
    marginTop: '6em',
    overflowX: 'auto',
  },
};

const getTotals = (d) => {
  const length = d.length;
  if (length > 0) {
    const d_eq = d
      .map(({ id, guess, trueValue }) => (guess === trueValue ? 1 : 0))
      .reduce((a, b) => a + b, 0);
    console.log(d_eq);
    return d_eq / length * 100.0;
  }
  return 0.0;
};

const PredictorTable = ({ data }) => {
  const percentageCorrect = getTotals(data);
  const numberOfEntries = data.length;
  console.log('predictor table', data);

  return (
    <Paper style={styles.paper}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Trust</TableHeaderColumn>
            <TableHeaderColumn>Your Guess</TableHeaderColumn>
            <TableHeaderColumn>True Value</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {numberOfEntries > 1 &&
            data.map(n =>
              (<TableRow key={n.id}>
                <TableRowColumn>
                  {n.trustName}
                </TableRowColumn>
                <TableRowColumn>
                  {n.guess.toString()}
                </TableRowColumn>
                <TableRowColumn>
                  {n.trueValue.toString()}
                </TableRowColumn>
              </TableRow>),
            )}
          <TableRow>
            <TableRowColumn>Total</TableRowColumn>
            <TableRowColumn />
            <TableRowColumn>
              {`You got ${percentageCorrect}% correct.`}
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

PredictorTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      trustName: PropTypes.string.isRequired,
      guess: PropTypes.bool.isRequired,
      trueValue: PropTypes.bool.isRequired,
    }),
  ),
};

// TODO: need to check for length of tata == 1...
PredictorTable.defaultProps = {
  data: predictionsMock,
};
export default PredictorTable;
