import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
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
  onNext: PropTypes.func.isRequired,
};

export default Navigation;
