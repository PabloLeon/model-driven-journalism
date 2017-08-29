import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

const styles = {
  card: {
    minWidth: 400,
    maxWidth: 600,
  },
};

const TinderNavigation = ({ onSelect }) =>
  (<Paper zDepth={1}>
    <BottomNavigation>
      <BottomNavigationItem
        label="Not on target"
        icon={<ThumbDown />}
        onClick={() => onSelect('below')}
      />
      <BottomNavigationItem
        label="On target"
        icon={<ThumbUp />}
        onClick={() => onSelect('above')}
      />
    </BottomNavigation>
  </Paper>);
export default TinderNavigation;
