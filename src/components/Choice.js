import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
//    maxWidth: 250,
const styles = {
  block: {},
  checkbox: {},
};
const Choice = (props) => {
  const { header, summary, text, selected, expanded } = props;
  return (
    <Card expanded={expanded} onExpandChange={() => console.log('expand')}>
      <CardHeader
        title={header}
        actAsExpander
        showExpandableButton={false}
        subtitle={summary}
        children={<Checkbox style={styles.checkbox} checked={selected} />}
      />
      <CardText expandable>
        {text}
      </CardText>
    </Card>
  );
};
export default Choice;
