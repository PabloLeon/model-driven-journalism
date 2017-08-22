import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  backgroundColor: 'red',
  float: 'right',
  padding: '0.5em',
};

const Navigation = (props) => {
  const { canProceed, nextSlide } = props;
  return (
    <div style={styles}>
      {canProceed && <RaisedButton label={'Next'} primary onClick={nextSlide} />}
    </div>
  );
};
Navigation.propTypes = {
  canProceed: PropTypes.bool.isRequired,
  nextSlide: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  canProceed: false,
  nextSlide: () => console.log('navigation next slide default'),
};

export default Navigation;
