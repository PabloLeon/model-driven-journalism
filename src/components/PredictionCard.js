import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import PredictorListing from './PredictorListing';
import TinderNavigation from './TinderNavigation';

const styles = {
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
};

class PredictionCard extends Component {
  render() {
    const { title, avatar, subheader, img, information, predictors } = this.props;
    return (
      <Card style={styles.card}>
        <CardHeader
          title={
            <h2>
              {title}
            </h2>
          }
          avatar={<Avatar className={styles.avatar} src={img} />}
          subheader={subheader}
        />
        <CardContent style={styles.content}>
          {
            <div>
              {/*  TODO: This should be its own component and text should be enriched with contextual information (at least hyperlink style onhover show info) */}
              <p>
                {information}
              </p>
              <PredictorListing predictors={predictors} />
            </div>
          }
        </CardContent>
        <Divider />
        <TinderNavigation />
      </Card>
    );
  }
}
export default PredictionCard;
