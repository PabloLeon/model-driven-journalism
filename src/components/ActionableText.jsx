import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  text: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  svgIcon: {
    display: 'inlineFlex',
    alignSelf: 'center',
    height: '1em',
    width: '1em',
    bottom: '0.25em',
    position: 'relative',
  },
};
const ActionableText = ({ inlineText, contextId, onAction, needsAction }) => (
  <span style={styles.text} tabIndex={contextId} role="button" onClick={() => onAction(contextId)}>
    {inlineText}
  </span>
);

ActionableText.propTypes = {
  onAction: PropTypes.func.isRequired,
  inlineText: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired,
  contextId: PropTypes.string.isRequired,
  needsAction: PropTypes.bool.isRequired,
};

export default ActionableText;
// {this.state.needsAction && <feedback style={styles.svgicon} />}
