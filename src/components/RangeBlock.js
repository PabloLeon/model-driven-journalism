import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Range from './Range';

const styles = {};

class RangeBlock extends Component {
  render() {
    const { header, info, range } = this.props;
    return (
      <div>
        <h1>
          {header}
        </h1>
        <p>
          {' '}{info}{' '}
        </p>
        <Range min={range.min} max={range.max} step={range.step} marks={range.marks} />
      </div>
    );
  }
}
RangeBlock.propTypes = {
  selectedValue: PropTypes.number,
  hoverMark: PropTypes.number,
  header: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  range: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    steps: PropTypes.number,
    marks: PropTypes.object,
  }).isRequired,
  onOK: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

RangeBlock.defaultProps = {
  selectedValue: undefined,
  hoverMark: undefined,
  header: 'RangeBlock default header',
  info: 'RangeBlock default info',
  range: {
    min: 0,
    max: 100,
    step: 10,
    marks: {
      0: '0%',
      50: '50%',
      85: {
        style: {
          color: 'orange',
        },
        label: '85%: The current NHS target',
      },
      100: '100%',
    },
  },
};

export default RangeBlock;
