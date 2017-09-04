import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';

const ContextBlock = ({ header, info }) => (
  <Container style={{ padding: '10px' }}>
    <Header size="huge">{header}</Header>
    <p>{info}</p>
    <br />
  </Container>
);
ContextBlock.propTypes = {
  header: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};

export default ContextBlock;
