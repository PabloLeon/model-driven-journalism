import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // I would like to get rid of all these dependencies in the future

const style = { width: 400, margin: 50 };
const marks = {
  '-10': '-10°C',
  0: <strong>0°C</strong>,
  26: '26°C',
  37: '37°C',
  50: '50°C',
  100: {
    style: {
      color: 'red',
    },
    label: <strong>100°C</strong>,
  },
};

function log(value) {
  console.log(value); //eslint-disable-line
}

const Range = props =>
  // const { value, step, defaultValue, min, max } = props;
  (<div>
    <div style={style}>
      <p>Slider with marks and steps</p>
      <Slider dots min={-10} marks={marks} step={10} onChange={log} defaultValue={20} />
    </div>

    <div style={style}>
      <p>Slider with marks, `included=false`</p>
      <Slider min={-10} marks={marks} included={false} defaultValue={20} />
    </div>
  </div>);

export default Range;
