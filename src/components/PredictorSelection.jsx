import React from 'react';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';

import PredictorListing from './PredictorListing';
import Navigation from './Navigation';

const PredictorSelection = ({
  header,
  info,
  selectedPredictors,
  availablePredictors,
  addPrediction,
  removePrediction,
  onNext,
  canProceed,
}) => {
  const avblP = Object.keys(availablePredictors)
    .filter(k => selectedPredictors.indexOf(k) === -1)
    .map(k => ({ key: k, ...availablePredictors[k] }));
  return (
    <div>
      <h1>{header}</h1>
      <p>{info}</p>
      <Divider />
      <PredictorListing
        selectedPredictors={selectedPredictors.map(k => ({
          key: k,
          ...availablePredictors[k],
        }))}
        availablePredictors={avblP}
        onSelect={addPrediction}
        onDelete={removePrediction}
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
  addPrediction: PropTypes.func.isRequired,
  removePrediction: PropTypes.func.isRequired,
  selectedPredictors: PropTypes.arrayOf(PropTypes.string),
  availablePredictors: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onNext: PropTypes.func.isRequired,
  canProceed: PropTypes.bool.isRequired,
};

export default PredictorSelection;
