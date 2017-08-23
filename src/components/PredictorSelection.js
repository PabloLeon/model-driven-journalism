import React, { Component } from 'react';
import PredictorListing from './PredictorListing';
import Navigation from './Navigation';
import Predictor from './Predictor';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';

import { getAvailablePredictors } from '../utils/ops';

const styles = {
  box: {},
  selected: {},
  options: {
    minHeight: '50px',
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
  },
};

const PredictorSelection = ({
  header,
  info,
  selectedPredictors,
  availablePredictors,
  addPredictor,
  removePredictor,
  onNext,
  canProceed,
}) => {
  const predictors = getAvailablePredictors(availablePredictors, selectedPredictors);
  return (
    <div>
      <h1>
        {header}
      </h1>
      <p>
        {info}
      </p>
      <Divider />
      <PredictorListing
        selectedPredictors={selectedPredictors}
        availablePredictors={predictors}
        onSelect={addPredictor}
        onDelete={removePredictor}
      />
      <Divider />
      {canProceed && <Navigation onNext={onNext} />}
    </div>
  );
};

PredictorSelection.defaultProps = {
  selectedPredictors: [],
  availablePredictors: [],
};
PredictorSelection.propTypes = {
  header: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  selectedPredictors: PropTypes.array,
  availablePredictors: PropTypes.array,
  onNext: PropTypes.func.isRequired,
  canProceed: PropTypes.bool,
};

export default PredictorSelection;
