import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Article from './components/Article';
import slideParser from './utils/parser';
import slideData, { testMd } from './data';
import RangeBlock from './components/RangeBlock';
import PredictionCard from './components/PredictionCard';
import TinderNavigation from './components/TinderNavigation';
// What is this [test](123) ?

// app state (later redux store)
// presentationType= landing, article, prediciton...
// mapParameters= zoom: int, center= [double, double]
// rawMD
// parseComplete
// parseTree

// landing page:
// question (clickable) + map

// on click of question => update question component to article (interactions)
//

class App extends Component {
  componentDidMount() {
    // const parse = slideParser(this.state.rawMD);
    // this.setState({ parseComplete: true, parseTree: parse });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <TinderNavigation />
          <PredictionCard
            title={'Nuffield'}
            img={'http://www.nuffieldhealthcareers.com/android-chrome-192x192.png'}
            predictors={[
              { predictorName: 'Number of GPs', predictorValue: 'below average' },
              { predictorName: 'Hospital rating', predictorValue: 'average' },
              { predictorName: 'Number of beds', predictorValue: 'above average' },
            ]}
            information=" I don't know anything about Nuffield 😢"
          />
          <Article />
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
