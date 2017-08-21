import React, { Component } from 'react';
import Predictor from './Predictor';

const styles = {
  box: {
    minHeight: '50px',
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
  },
};

// Pass a flag to the predictors here that makes selectable instead of deletable

class PredictorOptions extends Component {
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
export default PredictorOptions;
