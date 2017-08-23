import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: '4em',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
};

// TODO: Sould allow both delete or add depending on flag
// on select => generic function either deleting or adding
// on context => shows additional text

const Predictor = ({ onDelete, onClick, onContext, label, context, id }) =>
  (<div style={{}}>
    <Chip style={styles.chip} onClick={onContext} onRequestDelete={onDelete} onClick={onClick}>
      {label}
    </Chip>
  </div>);
Predictor.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onContext: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  context: PropTypes.string.isRequired,
};
export default Predictor;
