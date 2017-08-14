import React, { Component } from 'react';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Predictor from './Predictor';

const styleSheet = createStyleSheet({
  box: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
  },
});

// Fixed size box ( 2 columns?! ) that wraps if more than the size
// maps all the Predictors to that columns

class PredictorListing extends Component {
  render() {
    const { predictors } = this.props;
    const classes = this.props.classes;
    return (
      <div className={classes.box}>
        {predictors &&
          predictors.map(predictor =>
            <Predictor text={predictor} context={predictor} key={predictor} />,
          )}
      </div>
    );
  }
}

export default withStyles(styleSheet)(PredictorListing);
