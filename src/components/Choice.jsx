import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';

const styles = {
  block: {},
  checkbox: {},
};
const Choice = (props) => {
  const { choiceId, header, summary, text, selected, expanded, onChoice } = props;
  return (
    <Card expanded={expanded}>
      <CardHeader title={header} actAsExpander showExpandableButton={false} subtitle={summary}>
        <Checkbox style={styles.checkbox} checked={selected} onCheck={() => onChoice(choiceId)} />
      </CardHeader>
      <CardText expandable>{text}</CardText>
    </Card>
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
