import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const styles = {
  float: 'right',
  padding: '0.5em',
};

const Navigation = (props) => {
  const { onNext } = props;
  return (
    <div style={styles}>
      <Button label={'Next'} onClick={onNext} />
    </div>
  );
};
Navigation.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default Navigation;
