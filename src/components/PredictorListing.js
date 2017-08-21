import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Predictor from './Predictor';

const styles = {
  box: {
    minHeight: '50px',
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
  },
};

// Fixed size box ( 2 columns?! ) that wraps if more than the size
// maps all the Predictors to that columns

// TODO: add contextual information here!

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

PredictorListing.propTypes = {
  information: PropTypes.string,
};
PredictorListing.defaultProps = {
  information: 'The predictor listing contains some information text.',
};
export default PredictorListing;
