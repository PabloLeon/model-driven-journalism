import React from 'react';
import PropTypes from 'prop-types';
import Predictor from './Predictor';

const styles = {
  box: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  selected: {
    minHeight: '50px',
    display: 'flex',
    maxHeight: '400px',
    justifyContent: 'left',
    flexWrap: 'wrap',
    overflow: 'scroll',
  },
  options: {
    minHeight: '150px',
    maxHeight: '400px',
    justifyContent: 'left',
    flexWrap: 'wrap',
    overflow: 'scroll',
  },
};

// Fixed size box ( 2 columns?! ) that wraps if more than the size
// maps all the Predictors to that columns

const PredictorListing = ({ selectedPredictors, availablePredictors, onDelete, onSelect }) => (
  <div style={styles.box}>
    <div style={styles.selected}>
      {selectedPredictors.map(p => (
        <Predictor
          label={p.name}
          context={p.description}
          key={p.key}
          onDelete={() => onDelete(p.key)}
        />
      ))}
    </div>
    <div style={styles.options}>
      {availablePredictors.map(a => (
        <Predictor
          label={a.name}
          context={a.description}
          key={a.key}
          onSelect={() => onSelect(a.key)}
        />
      ))}
    </div>
  </div>
);

PredictorListing.propTypes = {
  selectedPredictors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      key: PropTypes.string,
    }),
  ),
  availablePredictors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      key: PropTypes.string,
    }),
  ),
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
};
PredictorListing.defaultProps = {
  availablePredictors: [],
  selectedPredictors: [],
};
export default PredictorListing;
