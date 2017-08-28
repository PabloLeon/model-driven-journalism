import React, { Component } from 'react';
import PredictorListing from './PredictorListing';
import Navigation from './Navigation';
import Predictor from './Predictor';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';

const styles = {
  box: {},
  selected: {},
  options: {},
};

// key, spec: {name, info}
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
  const avblP = Object.keys(availablePredictors)
    .filter(k => selectedPredictors.indexOf(k) === -1)
    .map(k => ({ key: k, ...availablePredictors[k] }));
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
        selectedPredictors={selectedPredictors.map(k => ({ key: k, ...availablePredictors[k] }))}
        availablePredictors={avblP}
        onSelect={addPredictor}
        onDelete={removePredictor}
      />
      <Divider />
      {canProceed && <Navigation onNext={onNext} />}
    </div>
  );
};

PredictorSelection.defaultProps = {
  selectedPredictors: {},
  availablePredictors: {},
};
PredictorSelection.propTypes = {
  header: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  selectedPredictors: PropTypes.object,
  availablePredictors: PropTypes.object,
  onNext: PropTypes.func.isRequired,
  canProceed: PropTypes.bool,
};

export default PredictorSelection;
