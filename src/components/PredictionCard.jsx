import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table, Container, Segment } from 'semantic-ui-react';
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

const PredictorDisplay = ({ name, value }) => <p>{`${name}: ${value}`}</p>;

const PredictionCard = ({
  title,
  info,
  trustInformation,
  predictors,
  predictorValues,
  onSelect,
  odsCode,
}) => {
  const infoText = formatText(title, trustInformation.hospitals, trustInformation.city);

  return (
    <Container text>
      <Card>
        <Card.Content>
          <Card.Header size="huge">{title}</Card.Header>
          <Card.Meta>{infoText}</Card.Meta>
          <Card.Content extra>
            <Segment>
              <Table basic="very" celled collapsing>
                <Table.Body>
                  {predictors.map((p, id) => (
                    <Table.Row>
                      <Table.Cell>{p.name}</Table.Cell>
                      <Table.Cell>{predictorValues[id]}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Segment>
          </Card.Content>
        </Card.Content>
        <Card.Content extra>
          <p>{info}</p>
        </Card.Content>
        <TinderNavigation onSelect={e => onSelect({ id: odsCode, payload: { prediction: e } })} />
      </Card>
    </Container>
  );
};
PredictionCard.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  trustInformation: PropTypes.shape({}).isRequired,
  predictors: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  predictorValues: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
  odsCode: PropTypes.string.isRequired,
};
PredictionCard.defaultProps = {};

export default PredictionCard;
