import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardText, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
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
const PredictionCard = ({ title, information, predictors, predictorValues, onSelect }) => {
  const infoText = `
  The ${title} trust consists of ${information.hospitals
  .length} hospitals the ${information.hospitals.map(h => `${h} `)}.
  The hospitals are located in ${information.city.map(c => `${c} `)}
  `;

  return (
    <Card style={styles.card}>
      <CardHeader
        title={<h2>{title}</h2>}
        avatar={
          <Avatar
            className={styles.avatar}
            src={
              'http://i2.getwestlondon.co.uk/incoming/article10810299.ece/ALTERNATES/s615/CS43857740.jpg'
            }
          />
        }
      />
      <CardText style={styles.content}>
        <div>
          <p>{infoText}</p>
          <div>{predictors.map((p, idx) => <p>{`${p.name}: ${predictorValues[idx]}`}</p>)}</div>
        </div>
      </CardText>
      <Divider />
      <TinderNavigation onSelect={e => onSelect(e)} />
    </Card>
  );
};
PredictionCard.propTypes = {
  title: PropTypes.string.isRequired,
  information: PropTypes.string.isRequired,
  predictors: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};
PredictionCard.defaultProps = {};

export default PredictionCard;
