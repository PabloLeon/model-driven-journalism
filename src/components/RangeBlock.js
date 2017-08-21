import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Range from './Range';

const styles = {};

class RangeBlock extends Component {
  render() {
    return (
      <div>
        <h1>RangeBlock</h1>
        <Range min={0} max={100} />
      </div>
    );
  }
}
RangeBlock.propTypes = {};

RangeBlock.defaultProps = {};

export default RangeBlock;
