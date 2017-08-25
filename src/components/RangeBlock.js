import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Range from './Range';

const styles = {};
{
  /* <div>
<h1>
  {header}
</h1>
<p>
  {' '}{info}{' '}
</p>
<Range min={range.min} max={range.max} step={range.step} marks={range.marks} />
 */
}
const RangeBlock = ({ header, info, range }) =>
  (<div>
    <div>
      {(header, info, range)}
    </div>
  </div>);
// RangeBlock.propTypes = {
//   selectedValue: PropTypes.number,
//   hoverMark: PropTypes.number,
//   header: PropTypes.string.isRequired,
//   info: PropTypes.string.isRequired,
//   range: PropTypes.shape({
//     min: PropTypes.number.isRequired,
//     max: PropTypes.number.isRequired,
//     steps: PropTypes.number,
//     marks: PropTypes.object,
//   }).isRequired,
//   onOK: PropTypes.func.isRequired,
//   onCancel: PropTypes.func.isRequired,
// };

// RangeBlock.defaultProps = {};
export default RangeBlock;
