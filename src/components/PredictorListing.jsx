import React from 'react';
import PropTypes from 'prop-types';
import Predictor from './Predictor';

import { Header, Segment, Container, Card } from 'semantic-ui-react';

const styles = {
  selected: {
    display: 'flex',
    maxHeight: '400px',
    justifyContent: 'left',
    flexWrap: 'wrap',
    overflow: 'scroll',
  },
  options: {
    display: 'flex',
    maxHeight: '400px',
    justifyContent: 'left',
    flexWrap: 'wrap',
    overflow: 'scroll',
  },
};

const PredictorListing = ({ selectedPredictors, availablePredictors, onDelete, onSelect }) => {
  // TODO: really should check how many predictors there are and only show say 6
  // have pagination below for more ...back etc
  const noPredictors = availablePredictors.length;

  return (
    <Container>
      <Segment size="small">
        <Header>Choose from all available predictors:</Header>
        <Card.Group itemsPerRow={4}>
          {availablePredictors.map(a => (
            <Predictor
              label={a.name}
              context={a.description}
              key={a.key}
              onSelect={() => onSelect(a.key)}
            />
          ))}
        </Card.Group>
      </Segment>
      <Segment size="small">
        <Header>Selected predictors</Header>
        <Card.Group itemsPerRow={4}>
          {selectedPredictors.map(p => (
            <Predictor
              label={p.name}
              context={p.description}
              key={p.key}
              onDelete={() => onDelete(p.key)}
            />
          ))}
        </Card.Group>
      </Segment>
    </Container>
  );
};

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
