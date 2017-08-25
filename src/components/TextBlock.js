import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import Dialog from 'material-ui/Dialog';

const styles = {
  block: {},
  svgIcon: {},
  choice: {},
};

// TODO: this is actually where the logic lives: need canProceed, onNext, onAction => pass the right contextual element to show in dialog
const TextBlock = ({ header, content, currentShowId, getContext, closeContext }) =>
  (<div>
    <h1>
      {header}
    </h1>
    <div style={styles.block}>
      {content}
      {
        <Dialog title="Dialog With Actions" modal={false} open={currentShowId !== undefined}>
          {currentShowId !== undefined && getContext}
          <RaisedButton label={'OK'} primary onClick={closeContext} />
        </Dialog>
      }
    </div>
  </div>);

TextBlock.propTypes = {};
TextBlock.defaultProps = {};

export default TextBlock;
