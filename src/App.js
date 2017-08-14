import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Article from './components/Article';
import PredictionCard from './components/PredictionCard';
import Predictor from './components/Predictor';
import PredictorTable from './components/PredictorTable';

class App extends Component {
  render() {
    return <PredictorTable />;
  }
}
export default App;
