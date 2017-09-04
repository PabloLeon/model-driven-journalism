import React from 'react';
import PropTypes from 'prop-types';
import Range from './Range';
import { Container, Segment, Header } from 'semantic-ui-react';

const RangeBlock = ({ id, value, header, info, range, onChoice }) => (
  <Container style={{ padding: '10' }}>
    <Header size="huge">{header}</Header>
    <p>{info}</p>
    <br />
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Range
        value={value}
        min={range.min}
        max={range.max}
        step={range.step}
        marks={range.marks}
        updateRange={v => onChoice({ id, payload: { rangeValue: v } })}
      />
    </div>
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
