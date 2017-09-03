import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const styles = {
  chip: {
    margin: '0.2em',
  },
};

// TODO: onledete functionality
const Predictor = ({ onDelete, onSelect, label }) => (
  <div style={styles.chip} onClick={onSelect}>
    {onDelete && <Icon remove name="remove" onClick={onDelete} />}
    {label}
  </div>
);
Predictor.propTypes = {
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default Predictor;
