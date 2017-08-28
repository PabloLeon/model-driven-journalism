import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import Dialog from 'material-ui/Dialog';

const styles = {
  block: {},
  svgIcon: {},
  choice: {},
  dialog: {
    flex: true,
    height: 800,
    width: 1000,
  },
};

// TODO: this is actually where the logic lives: need canProceed, onNext, onAction => pass the right contextual element to show in dialog
const TextBlock = ({
  header,
  content,
  currentShowId,
  getContext,
  closeContext,
  canProceed,
  onNext,
}) =>
  (<div>
    <h1>
      {header}
    </h1>
    <div style={styles.block}>
      {content}
      {
        <Dialog
          style={styles.dialog}
          title="Dialog With Actions"
          modal={false}
          open={currentShowId !== undefined}
        >
          {currentShowId !== undefined && getContext}
          <RaisedButton label={'OK'} primary onClick={closeContext} />
        </Dialog>
      }
    </div>
    <RaisedButton label={'Next'} primary onClick={onNext} />
  </div>);

TextBlock.propTypes = {};
TextBlock.defaultProps = {};

export default TextBlock;
