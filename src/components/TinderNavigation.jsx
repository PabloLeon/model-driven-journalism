import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react';

const TinderNavigation = ({ onSelect }) => (
  <Grid columns={2} relaxed>
    <Grid.Column>
      <Button
        content="Not on target"
        icon="thumbs up"
        labelPosition="right"
        onClick={() => onSelect(false)}
      />
    </Grid.Column>
    <Grid.Column>
      <Button
        content="On target"
        icon="thumbs down"
        labelPosition="left"
        onClick={() => onSelect(true)}
      />
    </Grid.Column>
  </Grid>
);

TinderNavigation.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default TinderNavigation;
