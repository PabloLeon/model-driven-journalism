// HOC that wraps RangeBlock, ChoiceBlock and ContextBlock

import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

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

// at the end of the day i want to call my
// actionable texts like this:

// const ContextBlockWithcActionable = withActionable(ContextBlock, specs, state)

const withActionable = WrappedBlock =>
  class extends Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.handleMouseOver = this.handleMouseOver.bind(this);
      this.handleMouseOut = this.handleMouseOut.bind(this);
      this.state = { needsAction: true, showAction: false, hover: false, open: false };

      this.handleOpen = this.handleOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }
    handleOpen() {
      this.setState({ open: true });
    }

    handleClose() {
      this.setState({ open: false });
    }
    render() {
      const actions = [
        <FlatButton label="Cancel" primary onClick={this.handleClose} />,
        <FlatButton
          label="Submit"
          primary
          keyboardFocused
          onClick={this.handleClose}
        />,
      ];
      return (
        <span style={styles.text}>
          <span
            onClick={this.handleclick}
            onMouseOver={this.handlemouseover}
            onMouseOut={this.handlemouseout}
            className={this.state.hover ? styles.onhover : styles.nohover}
          >
            {this.props.text}
          </span>
          {this.state.needsAction && <feedback style={styles.svgicon} />}
          <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            The actions in this window were passed in as an array of React objects.
            {WrappedBlock}
          </Dialog>
        </span>
      );
    }
  };
export default withActionable;
