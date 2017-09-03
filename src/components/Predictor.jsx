import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Card } from 'semantic-ui-react';
// TODO: onledete functionality
const Predictor = ({ onDelete, onSelect, label }) => (
  <Card onClick={onSelect}>
    <Card.Content>
      {onDelete && (
        <Icon
          remove
          name="remove"
          onClick={onDelete}
          style={{ position: 'absolute', top: '0', right: '0' }}
        />
      )}
      <Card.Header>{label}</Card.Header>
      <Card.Meta>Where does the predictor come from</Card.Meta>
      <Card.Description />
    </Card.Content>
  </Card>
);
Predictor.propTypes = {
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default Predictor;
