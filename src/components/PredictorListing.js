import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Predictor from './Predictor';
import Divider from 'material-ui/Divider';

import Paper from 'material-ui/Paper';

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    flexWrap: 'wrap',
  },
  selected: {
    backgroundColor: 'orange',
    minHeight: 100,
  },
  options: {
    backgroundColor: 'blue',
    minHeight: 100,
  },
};

// Fixed size box ( 2 columns?! ) that wraps if more than the size
// maps all the Predictors to that columns

// TODO: add contextual information here!

const PredictorListing = ({ selectedPredictors, availablePredictors, onDelete, onSelect }) =>
  (<Paper style={styles.box}>
    <div style={styles.selected}>
      {selectedPredictors.map(s =>
        (<Predictor
          label={s.label}
          context={s.context}
          key={s.id}
          onDelete={() => onDelete(s.id)}
        />),
      )}
    </div>
    <div style={styles.options}>
      {availablePredictors.map(s =>
        <Predictor label={s.label} context={s.context} key={s.id} onClick={() => onSelect(s.id)} />,
      )}
    </div>
  </Paper>);

PredictorListing.propTypes = {
  selectedPredictors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      context: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  availablePredictors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      context: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
PredictorListing.defaultProps = {
  availablePredictors: [],
  selectedPredictors: [],
};
export default PredictorListing;
