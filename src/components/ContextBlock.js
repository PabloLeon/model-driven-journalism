import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {};

const ContextBlock = ({ header, info }) =>
  (<div>
    <div>
      {(header, info)}
    </div>
  </div>);
//   (<span>
//     <span onClick={() => console.log('lasdasd')}>
//       {inlineText}
//     </span>
//     {/* {needsAction && <Feedback style={styles.svgIcon} />} */}
//   </span>);
// ContextBlock.propTypes = {
//   header: PropTypes.string.isRequired,
//   info: PropTypes.string.isRequired,
//   // onOK: PropTypes.func.isRequired,
//   // onCancel: PropTypes.func.isRequired,
// };

ContextBlock.defaultProps = {};

export default ContextBlock;
