import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

const TinderNavigation = ({ onSelect }) => (
  <Button.Group attached="bottom" fluid size="huge">
    <Button onClick={() => onSelect(false)}>
      <Icon name="thumbs down" />
    </Button>
    <Button.Or />
    <Button onClick={() => onSelect(true)}>
      <Icon name="thumbs up" />
    </Button>
  </Button.Group>
);

TinderNavigation.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default TinderNavigation;
