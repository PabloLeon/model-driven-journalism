import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Article from './components/Article';
import PredictionCard from './components/PredictionCard';
import Predictor from './components/Predictor';
import PredictorTable from './components/PredictorTable';
import TextBlock from './components/TextBlock';
import slideParser from './utils/parser';
import slideData, { testMd } from './data';
// What is this [test](123) ?

const testMD = `
# Some blog title
Just need to show you some code first:

<Row>
  <Col>Need to tell you something over here</Col>
  <Col>And over here</Col>
</Row>
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawMD: testMD,
      parseComplete: false,
      parseTree: [],
    };
  }
  componentDidMount() {
    const parse = slideParser(this.state.rawMD);
    this.setState({ parseComplete: true, parseTree: parse });
  }
  render() {
    return (
      <div>
        <h1> App </h1>
        <div>
          {this.state.parseComplete && this.state.parseTree}
        </div>
      </div>
    );
  }
}
export default App;
