import React from 'react';
import PropTypes from 'prop-types';

import { Header, Button, Segment, Container, Divider } from 'semantic-ui-react';
import PredictorListing from './PredictorListing';

// TODO: with fixed, llisting: first available, then chosen
// multicolum in listing (3 columns?)

// FIXME: 2 components avialable and selecte each in a segment

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
    <Container text>
      <Segment>
        <Header size="huge">{header} </Header>
        <p>{info}</p>
        <Segment>
          <PredictorListing
            selectedPredictors={selectedPredictors.map(k => ({
              key: k,
              ...availablePredictors[k],
            }))}
            availablePredictors={avblP}
            onSelect={addPrediction}
            onDelete={removePrediction}
          />
        </Segment>
        {canProceed && (
          <Button
            style={{ float: 'right' }}
            content="Next"
            icon="right arrow"
            labelPosition="right"
            onClick={onNext}
          />
        )}
      </Segment>
    </Container>
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
