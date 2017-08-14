import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import PredictorListing from './PredictorListing';

import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';

const styleSheet = createStyleSheet({
  card: {
    minWidth: 400,
    maxWidth: 600,
  },
});

class TinderNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(e, v) {
    e.preventDefault();
    this.props.onSelect(v);
  }
  render() {
    const { onDelete, text, context } = this.props;
    const classes = this.props.classes;
    return (
      <BottomNavigation onChange={this.handleSelect} showLabels>
        <BottomNavigationButton label="Below" icon={<ThumbDown />} />
        <BottomNavigationButton label="Above" icon={<ThumbUp />} />
      </BottomNavigation>
    );
  }
}
export default withStyles(styleSheet)(TinderNavigation);
