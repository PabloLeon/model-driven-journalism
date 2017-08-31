import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: '0.2em',
  },
};

const Predictor = ({ onDelete, onSelect, label }) => (
  <div style={{}}>
    <Chip style={styles.chip} onClick={onSelect} onRequestDelete={onDelete}>
      {label}
    </Chip>
  </div>
);
Predictor.propTypes = {
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default Predictor;
