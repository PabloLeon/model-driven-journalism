import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';
import Range from './Range';

const RangeBlock = ({ id, value, header, info, range, onChoice }) => (
  <Container style={{ padding: '10px' }}>
    <Header size="huge">{header}</Header>
    <p>{info}</p>
    <br />
    <Container style={{ display: 'flex', alignItems: 'center' }}>
      <Range
        value={value}
        min={range.min}
        max={range.max}
        step={range.step}
        marks={range.marks}
        updateRange={v => onChoice({ id, payload: { rangeValue: v } })}
      />
    </Container>
  </Container>
);
RangeBlock.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number,
  header: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  onChoice: PropTypes.func.isRequired,
  range: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    steps: PropTypes.number,
    marks: PropTypes.shape({}),
  }).isRequired,
};
RangeBlock.defaultProps = {
  value: undefined,
};
export default RangeBlock;
