import React, { Component } from 'react';
import { csv } from 'd3-request'; // this should work differently with the final version
import Article from './components/Article';
import { trustInfo, predictorInfo } from './data/';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geolocation: { longitude: -4.2, latitude: 55.5 }, // [undefined, undefined],
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
    const marks = this.state.hospitals.map(h => ({
      name: h.OrganisationName,
      odsCode: h.ParentODSCode,
      coordinates: [parseFloat(h.Longitude), parseFloat(h.Latitude)],
    }));
    this.setState({
      ...this.state,
      markers: marks,
    });

    // TODO: there should be some checks here if everything loaded correctly
    this.setState({ canProceed: true });
  }
  render() {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        {this.state.canProceed ? (
          <Article
            geolocation={this.state.geolocation}
            data={{
              allPredictors: this.state.predictorInfo,
              hospitals: this.state.hospitals,
              waitingTimes: this.state.waitingTimes,
              markers: this.state.markers,
              trustInfo,
            }}
          />
        ) : (
          <div>Loading resources</div>
        )}
      </div>
    );
  }
}
export default App;
