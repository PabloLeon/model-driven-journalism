import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {};

const ContextBlock = ({ header, info }) =>
  (<div>
    <h1>
      {header}
    </h1>
    <p>
      {info}
    </p>
  </div>);
ContextBlock.propTypes = {};

ContextBlock.defaultProps = {};

export default ContextBlock;
