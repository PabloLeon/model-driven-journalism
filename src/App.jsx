import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Article from './components/Article';
import { csv } from 'd3-request'; // this should work differently with the final version
import { trustInfo, predictorInfo } from './data/';

// TODO: get predictors from the data coulms + a dictionary with context/readable column names
// TODO: Get card info from the data + a dictionary with contextual information

// we need to map the data to marker format
// so go through the city & hospital data
// map to an object with name: hospital name // coordinates: [long, lat]
// no internet connection fake center: [-4.2, 55.5],
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geolocation: [-4.2, 55.5], // [undefined, undefined],
      dataPaths: [],
      canProceed: false,
      predictorInfo,
      hospitals: undefined,
      waitingTimes: undefined,
      markers: undefined,
      predictors: undefined,
      trustInfos: undefined,
    };
    this.loadData = this.loadData.bind(this);
    this.createMarkers = this.createMarkers.bind(this);
  }
  // FIXME: longitude latitude order???
  componentDidMount() {
    this.loadData();
    // console.info('Establishing user location');
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     console.log('succesfully localized the user: ', position.coords);
    //     this.setState({
    //       ...this.state,
    //       geolocation: [position.coords.longitude, position.coords.latitude],
    //     });

    //     this.loadData();
    //   },
    //   (error) => {
    //     console.log('error localizing the user', error.message);
    //     this.setState({ ...this.state, geolocation: [undefined, undefined], canProceed: false });
    //   },
    //   { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    // );
  }

  loadData() {
    console.info('Loading data sources');
    csv('hospitals.csv', (error, d) => {
      if (error) {
        console.error('data loding error at hospital data');
        this.setState({ canProceed: false });
      }
      this.setState({
        hospitals: d,
      });
    });
    csv('waitingtimes.csv', (error, d) => {
      if (error) {
        console.error('data loding error at waiting time data');
        this.setState({ canProceed: false });
      }
      this.setState({
        waitingTimes: d,
      });
      // now get the markers
      this.createMarkers();
    });
  }
  createMarkers() {
    const marks = this.state.hospitals.map((h, idx) => ({
      name: h.OrganisationName,
      coordinates: [h.Longitude, h.Latitude],
    }));
    console.info('marks: ', marks);
    this.setState({
      ...this.state,
      markers: marks,
    });

    // TODO: there should be some checks here if everything loaded correctly
    this.setState({ canProceed: true });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div style={{ backgroundColor: 'teal', minHeight: '300' }}>
          {this.state.canProceed
            ? <Article
              geolocation={this.state.geolocation}
              data={{
                allPredictors: this.state.predictorInfo, // THIS HAS TO BE AN ARRAY
                hospitals: this.state.hospitals,
                waitingTimes: this.state.waitingTimes,
                markers: this.state.markers,
                trustInfo,
              }}
            />
            : <div>Loading resources</div>}
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
