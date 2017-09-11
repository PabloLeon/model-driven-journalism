import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Card, Popup } from 'semantic-ui-react';
// TODO: onledete functionality
const card = (onDelete, onSelect, label) => (
  <Card onClick={onSelect}>
    <Card.Header size="small" style={{ color: 'black' }}>
      {label}
    </Card.Header>
    {onDelete && (
      <Icon
        name="remove"
        onClick={onDelete}
        style={{ position: 'absolute', top: '0', right: '0' }}
      />
    )}
  </Card>
);
const Predictor = ({ onDelete, onSelect, label, additionalInfo }) => (
  <Popup trigger={card(onDelete, onSelect, label)} content={additionalInfo} />
);
Predictor.propTypes = {
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  label: PropTypes.string.isRequired,
  additionalInfo: PropTypes.string,
};
Predictor.defaultProps = {
  additionalInfo: '',
};

export default Predictor;
