import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
// Could use material ui stepper for this?
// else icon button or normal?

const styles = {};

class Navigation extends Component {
  render() {
    const canProceed = true;
    return canProceed && <RaisedButton label={'Next'} primary onClick={this.handleNext} />;
  }
}
export default Navigation;
