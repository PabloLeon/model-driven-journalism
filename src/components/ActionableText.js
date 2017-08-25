import React, { Component } from 'react';
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
const ActionableText = ({ inlineText, contextId, contextType, contextSpec, onAction, hovered }) => {
  console.log('actionable text', contextId, contextType, contextSpec);
  return (
    <span style={styles.text}>
      <span onClick={() => onAction(contextId, contextType, contextSpec)}>
        {inlineText}
      </span>
    </span>
  );
};

ActionableText.propTypes = {
  onAction: PropTypes.func.isRequired,
  inlineText: PropTypes.string.isRequired,
};

export default ActionableText;
// {this.state.needsAction && <feedback style={styles.svgicon} />}
