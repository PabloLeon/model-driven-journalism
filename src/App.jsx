import React, { Component } from 'react';
import { csv } from 'd3-request'; // this should work differently with the final version
import Article from './components/Article';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geolocation: { longitude: -4.2, latitude: 55.5 }, // [undefined, undefined],
      specsLoaded: false,
      hospitalsLoaded: false,
      waitingtimeLoaded: false,
      hospitals: undefined,
      waitingTimes: undefined,
      markers: undefined,
      predictors: undefined,
      canProceed: false,
    };
    this.fetchArticleSpec = this.fetchArticleSpecs.bind(this);
    this.fetchWaitingTimesSpecs = this.fetchWaitingTimesSpecs.bind(this);
    this.fetchHospitalSpecs = this.fetchHospitalSpecs.bind(this);
    this.createMarkers = this.createMarkers.bind(this);
    this.allLoaded = this.allLoaded.bind(this);
  }
  componentDidMount() {
    this.fetchArticleSpecs();
    this.fetchWaitingTimesSpecs();
    this.fetchHospitalSpecs();
  }

  fetchArticleSpecs() {
    fetch('https://raw.githubusercontent.com/PabloLeon/journalismData/master/articleSpec.json')
      .then(response => response.json())
      .then((data) => {
        this.setState({ specsLoaded: true, articleSpecs: data });
      });
  }
  fetchWaitingTimesSpecs() {
    csv(
      'https://raw.githubusercontent.com/PabloLeon/journalismData/master/waitingtimes.csv',
      (error, d) => {
        if (error) {
          console.log('error', error.message);
        } else {
          this.setState({
            waitingTimes: d,
            waitingtimeLoaded: true,
          });
        }
      },
    );
  }
  fetchHospitalSpecs() {
    csv(
      'https://raw.githubusercontent.com/PabloLeon/journalismData/master/hospitals.csv',
      (error, d) => {
        if (error) {
          console.error('data loding error at hospital data');
        } else {
          console.error('data loaded', d);
          this.setState({
            hospitals: d,
            hospitalsLoaded: true,
          });
          this.createMarkers(d);
        }
      },
    );
  }
  allLoaded() {
    if (
      this.state.canProceed &&
      this.state.hospitalsLoaded &&
      this.state.waitingtimeLoaded &&
      this.state.specsLoaded
    ) {
      return true;
    }
    return false;
  }

  createMarkers(d) {
    console.log('creating markers', d);
    const marks = d.map(h => ({
      name: h.OrganisationName,
      odsCode: h.ParentODSCode,
      coordinates: [parseFloat(h.Longitude), parseFloat(h.Latitude)],
    }));
    this.setState({
      ...this.state,
      markers: marks,
      canProceed: true,
    });
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
        {this.allLoaded() ? (
          <Article
            geolocation={this.state.geolocation}
            data={{
              allPredictors: this.state.articleSpecs.predictorInfo,
              hospitals: this.state.hospitals,
              waitingTimes: this.state.waitingTimes,
              markers: this.state.markers,
              trustInfo: this.state.articleSpecs.trustInfo,
              slideSpec: this.state.articleSpecs.slides,
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
