import React, { Component } from 'react';
import Predictor from './Predictor';

const styles = {
  box: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
  },
};

// Fixed size box ( 2 columns?! ) that wraps if more than the size
// maps all the Predictors to that columns

class PredictorListing extends Component {
  render() {
    const { predictors } = this.props;
    return (
      <div style={styles.box}>
        {predictors &&
          predictors.map(predictor =>
            <Predictor text={predictor} context={predictor} key={predictor} />,
          )}
      </div>
    );
  }
}
export default PredictorListing;
