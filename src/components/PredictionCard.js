import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';

const styleSheet = createStyleSheet({
  card: {
    minWidth: 400,
    maxWidth: 600,
  },
  heading: {},
  content: {
    minHeight: 300,
    maxHeight: 600,
  },
  avatar: {
    maxWidth: 50,
    maxHeight: 50,
  },
  navigation: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 8,
    paddingBottom: 8,
  },
  icons: {
    height: 38,
    width: 38,
  },
});

class PredictionCard extends Component {
  render() {
    const { title, avatar, subheader, classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          title={
            <Typography type="headline" component="h2">
              {title}
            </Typography>
          }
          avatar={
            <Avatar
              className={classes.avatar}
              src={'http://www.nuffieldhealthcareers.com/android-chrome-192x192.png'}
            />
          }
          subheader={subheader}
        />
        <CardContent className={classes.content}>
          {<Typography component="p">I don't know anything about Nuffield :/</Typography>}
          Predictors
        </CardContent>
        <BottomNavigation onChange={this.handleChange} showLabels>
          <BottomNavigationButton label="Below" icon={<ThumbDown />} />
          <BottomNavigationButton label="Above" icon={<ThumbUp />} />
        </BottomNavigation>
      </Card>
    );
  }
}

export default withStyles(styleSheet)(PredictionCard);
