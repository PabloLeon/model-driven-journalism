import React from 'react';
import PropTypes from 'prop-types';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

const TinderNavigation = ({ onSelect }) => (
  <Paper zDepth={1}>
    <BottomNavigation>
      <BottomNavigationItem
        label="Not on target"
        icon={<ThumbDown />}
        onClick={() => onSelect('Not on target')}
      />
      <BottomNavigationItem
        label="On target"
        icon={<ThumbUp />}
        onClick={() => onSelect('On target')}
      />
    </BottomNavigation>
  </Paper>
);

TinderNavigation.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default TinderNavigation;
