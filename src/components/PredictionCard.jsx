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

const enumerateToString = (arrElems) => {
  const l = arrElems.length;
  if (l < 2) {
    return `${arrElems.map(e => `${e}`)}`;
  }
  if (l === 2) {
    return `${arrElems[0]} and ${arrElems[1]}`;
  }
  const [last, slast, ...rest] = arrElems.reverse();
  return `${rest.reverse().map(e => ` ${e}`)} ${slast} and ${last}`;
};

const formatText = (title, hospitals, cities) => {
  const uniqueHospitals = [...new Set(hospitals)];
  const uniqueCities = [...new Set(cities)];

  const citiesLen = uniqueCities.length;
  const hospitalLen = uniqueHospitals.length;

  return `${title} consists of ${hospitalLen} ${hospitalLen > 1 ? 'hospitals' : 'hospital'},  
  ${hospitalLen > 1 ? enumerateToString(uniqueHospitals) : `${uniqueHospitals[0]}`}.
  
  The ${hospitalLen === 1 ? 'hospital is' : 'hospitals are'} located in ${citiesLen > 1
  ? enumerateToString(uniqueCities)
  : uniqueCities[0]}.`;
};
const PredictionCard = ({
  title,
  info,
  trustInformation,
  predictors,
  predictorValues,
  onSelect,
}) => {
  const infoText = formatText(title, trustInformation.hospitals, trustInformation.city);

  return (
    <Card style={styles.card}>
      <CardHeader
        title={<h2>{title}</h2>}
        avatar={
          <Avatar
            src={
              'http://i2.getwestlondon.co.uk/incoming/article10810299.ece/ALTERNATES/s615/CS43857740.jpg'
            }
          />
        }
      />
      <CardText style={styles.content}>
        <div>
          <p>{info}</p>
          <p>{infoText}</p>
          <div>
            {predictors.map((p, idx) => <p key={idx}>{`${p.name}: ${predictorValues[idx]}`}</p>)}
          </div>
        </div>
      </CardText>
      <Divider />
      <TinderNavigation onSelect={e => onSelect(e)} />
    </Card>
  );
};
PredictionCard.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  trustInformation: PropTypes.shape({}).isRequired,
  predictors: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  predictorValues: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
};
PredictionCard.defaultProps = {};

export default PredictionCard;
