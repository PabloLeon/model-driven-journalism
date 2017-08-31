import React from 'react';
import PropTypes from 'prop-types';

const ContextBlock = ({ header, info }) => (
  <div>
    <h1>{header}</h1>
    <p>{info}</p>
  </div>
);
ContextBlock.propTypes = {
  header: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};

export default ContextBlock;
