import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const styles = {
  text: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  svgIcon: {
    display: 'inlineFlex',
    alignSelf: 'left',
    height: '1em',
    width: '1em',
    bottom: '0.4em',
    position: 'relative',
    textDecoration: 'none',
  },
};
const ActionableText = ({ inlineText, contextId, onAction, needsAction }) => (
  <span style={styles.text} tabIndex={contextId} role="button" onClick={() => onAction(contextId)}>
    {inlineText}
    {!needsAction && <Icon name="info" style={styles.svgIcon} />}
    {needsAction && <Icon name="idea" style={styles.svgIcon} />}
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
