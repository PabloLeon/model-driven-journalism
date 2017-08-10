import React, { Component } from 'react';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Chip from 'material-ui/Chip';

const styleSheet = createStyleSheet({
  box: {},
  selected: {},
  options: {},
});

// Fixed size box ( 2 columns?! ) that wraps if more than the size
// maps all the Predictors to that columns

class PredictorListing extends Component {
  render() {
    const { predictors } = this.props;
    return (
      <div>
        {predictors && predictors.map(predictor => <Chip label={predictor} key={predictor} />)}
      </div>
    );
  }
}

export default withStyles(styleSheet)(PredictorListing);
