import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardText, CardHeader } from 'material-ui/Card';
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
    const { title, subheader, img, information, predictors, onSelect } = this.props;
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
        <CardText style={styles.content}>
          <div>
            {/*  TODO: This should be its own component and text should be enriched with contextual information (at least hyperlink style onhover show info) */}
            <p>
              {information}
            </p>
            <div>
              {predictors.map((p, idx) =>
                (<p>
                  `${p.predictorName}: ${p.predictorValue}`
                </p>),
              )}
            </div>
          </div>
        </CardText>
        <Divider />
        <TinderNavigation onSelect={e => onSelect(e)} />
      </Card>
    );
  }
}
PredictionCard.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
PredictionCard.defaultProps = {};

export default PredictionCard;
