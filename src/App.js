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
import { csv } from 'd3-request'; // this should work differently with the final version

const predictors = [
  { id: 'id0', label: 'Number of Gps', context: 'Some information about this predictor.' },
  {
    id: 'id1',
    label: 'Number of nurses',
    context: 'Some information about this predictor too.',
  },
];
// TODO: get predictors from the data coulms + a dictionary with context/readable column names
// TODO: Get card info from the data + a dictionary with contextual information

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geolocation: [undefined, undefined],
      dataPaths: [],
      canProceed: false,
      hospitals: undefined,
      waitingTimes: undefined,
    };
    this.loadData = this.loadData.bind(this);
  }
  loadData() {
    console.info('Loading data sources');
    csv('hospitals.csv', (error, d) => {
      if (error) {
        console.error('data loding error at hospital data');
        this.setState({ canProceed: false });
      }
      this.setState({
        ...this.state,
        hospitals: d,
      });
    });
    csv('waitingtimes.csv', (error, d) => {
      if (error) {
        console.error('data loding error at waiting time data');
        this.setState({ canProceed: false });
      }
      this.setState({
        ...this.state,
        waitingTimes: d,
      });
    });

    // TODO: there should be some checks here if everything loaded correctly
    this.setState({ canProceed: true });
  }
  componentDidMount() {
    console.info('Establishing user location');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('succesfully localized the user: ', position.coords);
        this.setState({
          ...this.state,
          geolocation: [position.coords.latitude, position.coords.longitude],
        });

        this.loadData();
      },
      (error) => {
        console.log('error localizing the user', error.message);
        this.setState({ ...this.state, geolocation: [undefined, undefined], canProceed: false });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <MuiThemeProvider>
        {this.state.canProceed
          ? <Article
            geolocation={this.state.geolocation}
            data={{
              allPredictors: predictors,
              hospitals: this.state.hospitals,
              waitingTimes: this.state.waitingTimes,
            }}
          />
          : <div>Loading resources</div>}
      </MuiThemeProvider>
    );
  }
}
export default App;
