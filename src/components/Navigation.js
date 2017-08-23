import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  backgroundColor: 'red',
  float: 'right',
  padding: '0.5em',
};

const Navigation = (props) => {
  const { onNext } = props;
  return (
    <div style={styles}>
      <RaisedButton label={'Next'} primary onClick={onNext} />
    </div>
  );
};
Navigation.propTypes = {
  canProceed: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  canProceed: false,
};

export default Navigation;
