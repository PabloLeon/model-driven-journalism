import React, { Component } from 'react';
import { csv } from 'd3-request'; // this should work differently with the final version
import { Loader } from 'semantic-ui-react';
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
    this.sampleTrusts = this.sampleTrusts.bind(this);
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
          const requiredTrusts = this.sampleTrusts(d, 10);
          this.setState({
            waitingTimes: d,
            waitingtimeLoaded: true,
            requiredTrusts,
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
  sampleTrusts(t, n) {
    const shuffle = (array) => {
      let counter = array.length;
      while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter--;
        const temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
      return array;
    };

    const trusts = t.map(t => t.ParentODSCode);
    return shuffle(t.map(t => t.ods_code)).slice(0, n);
  }
  createMarkers(d) {
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
            data={{
              geolocation: this.state.geolocation,
              allPredictors: this.state.articleSpecs.predictorInfo,
              hospitals: this.state.hospitals,
              waitingTimes: this.state.waitingTimes,
              markers: this.state.markers,
              trustInfo: this.state.articleSpecs.trustInfo,
              slideSpec: this.state.articleSpecs.slides,
              requiredTrusts: this.state.requiredTrusts,
            }}
          />
        ) : (
          <Loader>Loading resources</Loader>
        )}
      </div>
    );
  }
}
export default App;
