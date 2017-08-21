import React, { Component } from 'react';
import PredictorListing from './PredictorListing';
import Navigation from './Navigation';
import Predictor from './Predictor';
import PredictorOptions from './PredictorOptions';
import Divider from 'material-ui/Divider';

const styles = {
  box: {},
  selected: {},
  options: {},
};
class PredictorSelection extends Component {
  render() {
    return (
      <div>
        <h1>Choose the predictors </h1>
        <p>Some text to inform your choice </p>
        <PredictorListing predictors={['testPredictor']} />
        <Divider />
        <PredictorOptions />
        <Navigation />
      </div>
    );
  }
}

export default PredictorSelection;
