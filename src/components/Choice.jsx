import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const styles = {
  block: {},
  checkbox: {},
};
const Choice = (props) => {
  const { choiceId, header, summary, text, selected, expanded, onChoice } = props;
  return (
    <div>
      <h1>{header}</h1>
      <p>{summary}</p>
      <p>{text}</p>
      <Checkbox style={styles.checkbox} checked={selected} onChange={() => onChoice(choiceId)} />
    </div>
  );
};

Choice.propTypes = {
  choiceId: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  summary: PropTypes.string,
  onChoice: PropTypes.func.isRequired,
  text: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  expanded: PropTypes.bool.isRequired,
};

Choice.defaultProps = {
  summary: '',
  text: '',
};
export default Choice;
