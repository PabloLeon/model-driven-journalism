import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment, Container, Divider, Button } from 'semantic-ui-react';

const LandingQuestion = ({ header, subheader, onEnter }) => (
  <Container text>
    <Segment>
      <Header size="huge">{header} </Header>
      <Container>{subheader}</Container>
      <br />
      <Button content="Next" icon="right arrow" labelPosition="right" onClick={onEnter} />
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
// <div onClick={onEnter} role="button" tabIndex="0">
//   <div style={styles.content}>
//     <h1 style={styles.header}>{header}</h1>
//     <h2 style={styles.subheader}>{subheader}</h2>
//   </div>
// </div>
