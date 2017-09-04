import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Checkbox, Item, Header } from 'semantic-ui-react';

const Choice = (props) => {
  const { choiceId, header, info, selected, onChoice } = props;
  return (
    <Item>
      <Item.Content>
        <Header size="small">{header}</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={14}>
              <p>{info}</p>
            </Grid.Column>
            <Grid.Column width={1} floated="right">
              <Checkbox checked={selected} onChange={() => onChoice(choiceId)} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br />
      </Item.Content>
    </Item>
  );
};

Choice.propTypes = {
  choiceId: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  onChoice: PropTypes.func.isRequired,
  info: PropTypes.string,
  selected: PropTypes.bool.isRequired,
};

Choice.defaultProps = {
  text: '',
  info: '',
};
export default Choice;
