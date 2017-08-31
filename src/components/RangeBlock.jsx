import React from 'react';
import PropTypes from 'prop-types';
import Range from './Range';

const RangeBlock = ({ id, value, header, info, range, onChoice }) => (
  <div>
    <h1>{header}</h1>
    <p>{info}</p>
    <Range
      value={value}
      min={range.min}
      max={range.max}
      step={range.step}
      marks={range.marks}
      updateRange={v => onChoice({ id, payload: { rangeValue: v } })}
    />
  </div>
);
RangeBlock.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number,
  header: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  onChoice: PropTypes.func.isRequired,
  range: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    steps: PropTypes.number,
    marks: PropTypes.shape({}),
  }).isRequired,
};
RangeBlock.defaultProps = {
  value: undefined,
};
export default RangeBlock;
