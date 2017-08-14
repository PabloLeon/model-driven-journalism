import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

let id = 0;
const createPrediction = (trustName, guess, trueValue) => {
  id += 1;
  return { id, trustName, guess, trueValue };
};

// TODO: For now this is simply a boolean onTarget/not on Target
const predictionsMock = [
  createPrediction('Northern Devon', true, true),
  createPrediction('York', false, false),
  createPrediction('West London', true, false),
  createPrediction('North London', false, true),
  createPrediction('Nuffield', true, true),
];

const styleSheet = createStyleSheet(theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
}));

const getTotals = (d) => {
  const length = d.length;
  if (length > 0) {
    const d_eq = d
      .map(({ id, guess, trueValue }) => (guess == trueValue ? 1 : 0))
      .reduce((a, b) => a + b, 0);
    console.log(d_eq);
    return d_eq / length * 100.0;
  }
  return 0.0;
};

class PredictorTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentageCorrect: getTotals(props.data),
    };
  }
  render() {
    const classes = this.props.classes;
    const data = this.props.data;
    const numberOfEntries = data.length;
    return (
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Trust</TableCell>
              <TableCell numeric>Your Guess</TableCell>
              <TableCell numeric>True Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {numberOfEntries > 1 &&
              data.map(n =>
                (<TableRow key={n.id}>
                  <TableCell>
                    {n.trustName}
                  </TableCell>
                  <TableCell numeric>
                    {n.guess.toString()}
                  </TableCell>
                  <TableCell numeric>
                    {n.trueValue.toString()}
                  </TableCell>
                </TableRow>),
              )}
            <Divider />
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell />
              <TableCell numeric>
                {`You got ${this.state.percentageCorrect}% correct.`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

PredictorTable.propTypes = {
  classes: PropTypes.object.isRequired,
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
  data: [],
};
export default withStyles(styleSheet)(PredictorTable);
