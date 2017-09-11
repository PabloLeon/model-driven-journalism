import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment, Container, Button } from 'semantic-ui-react';
import parse from '../utils/parser';

const LandingQuestion = ({ header, subheader, onEnter }) => (
  <Container text>
    <Segment clearing>
      <Header size="huge">{header} </Header>
      <Header.Subheader>{parse(subheader, {})}</Header.Subheader>
      <br />
      <Button
        content="Next"
        icon="right arrow"
        labelPosition="right"
        onClick={onEnter}
        floated="right"
      />
    </Segment>
  </Container>
);
LandingQuestion.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  onEnter: PropTypes.func.isRequired,
};
LandingQuestion.defaultProps = {
  subheader: '',
};

export default LandingQuestion;
