import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // I would like to get rid of  this dependeny in the future
import PropTypes from 'prop-types';

const Range = ({ value, step, min, max, marks, updateRange }) => (
  <div>
    <Slider
      dots
      min={min}
      max={max}
      step={step}
      onChange={rV => updateRange(rV)}
      defaultValue={value}
      style={{ width: 700, margin: 10 }}
      marks={marks}
    />
  </div>
);

Range.propTypes = {
  updateRange: PropTypes.func.isRequired,
  marks: PropTypes.shape({
    mark: PropTypes.shape({
      label: PropTypes.string.isRequired,
      style: PropTypes.shape({}),
      content: PropTypes.string,
    }),
  }),
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number,
  step: PropTypes.number.isRequired,
};
Range.defaultProps = {
  marks: {},
  value: null,
};

export default Range;
