import React, { Component } from 'react';
import LandingQuestion from './LandingQuestion';
import MapView from './MapView';
import PredictionCard from './PredictionCard';

class Article extends Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
    return (
      <div style={{}}>
        <MapView />
        <PredictionCard />
      </div>
    );
  }
}

export default Article;
