import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withActionable from './withActionable';

const styles = {};

const ContextBlock = ({ inlineText, header, info }) =>
  (<span>
    <span onClick={() => console.log('lasdasd')}>
      {inlineText}
    </span>
    {/* {needsAction && <Feedback style={styles.svgIcon} />} */}
  </span>);
ContextBlock.propTypes = {
  header: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  // onOK: PropTypes.func.isRequired,
  // onCancel: PropTypes.func.isRequired,
};

ContextBlock.defaultProps = {};

const ContextBlockWithActionable = withActionable(ContextBlock);
export default ContextBlockWithActionable;
