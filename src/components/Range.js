import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // I would like to get rid of all these dependencies in the future

const Range = (props) => {
  const { value, step, min, max, marks } = props;
  return (
    <div>
      <Slider
        dots
        min={min}
        max={max}
        step={step}
        onChange={() => console.log('lala')}
        defaultValue={value}
        marks={marks}
      />
    </div>
  );
};

export default Range;
