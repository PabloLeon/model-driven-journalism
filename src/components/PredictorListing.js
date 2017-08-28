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

const PredictorListing = ({ selectedPredictors, availablePredictors, onDelete, onSelect }) =>
  (<Paper style={styles.box}>
    <div style={styles.selected}>
      {selectedPredictors.map(p =>
        (<Predictor
          label={p.name}
          context={p.description}
          key={p.key}
          onDelete={() => onDelete(p.key)}
        />),
      )}
    </div>
    <div style={styles.options}>
      {availablePredictors.map(a =>
        (<Predictor
          label={a.name}
          context={a.description}
          key={a.key}
          onClick={() => onSelect(a.key)}
        />),
      )}
    </div>
  </Paper>);

PredictorListing.propTypes = {
  selectedPredictors: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  availablePredictors: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),

  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
PredictorListing.defaultProps = {
  availablePredictors: {},
  selectedPredictors: {},
};
export default PredictorListing;
