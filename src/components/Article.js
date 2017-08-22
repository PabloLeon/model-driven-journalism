import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LandingQuestion from './LandingQuestion';
import MapView from './MapView';
import TextBlock from './TextBlock';
import PredictionCard from './PredictionCard';
import PredictorSelection from './PredictorSelection';
import ActionableText from './ActionableText';

import parser from '../utils/parser';

const styles = {
  container: { display: 'flex', flexWrap: 'nowrap', alignItems: 'center' },
};
const testMD = `
# Some blog title
Just need to show you some code first:
`;

const componentDict = {
  Range(props) {
    return <ActionableText text={'test'} />;
  },
};
const dummyPresentations = ['landing', 'article', 'predictorSelection', 'article', 'prediction'];

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
      allSlideSpecs: [testMD, testMD, testMD],
      parseStatus: 'parsing', // error || success
      currentParseTree: [],
      currentPresentation: 0,
      allPresentations: dummyPresentations,
      mapParameters: {
        width: 400,
        height: 600,
        zoom: 16,
        center: [-4.2, 55.5],
      },
      noSlides: dummyPresentations.length,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.getArticleComponent = this.getArticleComponent.bind(this);
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

  getArticleComponent(presentationType) {
    switch (presentationType) {
      case 'landing':
        return <LandingQuestion onEnter={() => this.nextSlide()} />;
        break;
      case 'article':
        // parsing here??/
        // TODO: this should probably pass the parser an object with the
        // components? then we can pass the callbacks down?

        const parsedText = parser(
          this.state.allSlideSpecs[this.state.currentPresentation],
          componentDict,
        );
        return <TextBlock content={parsedText} onNext={() => this.nextSlide()} />;
        break;
      case 'predictorSelection':
        return <PredictorSelection />;
        break;
      case 'predicionCards':
        return <PredictionCard />;
        break;
      default:
        return <div>Default</div>;
        break;
    }
  }
  nextSlide() {
    if (this.state.currentPresentation < this.state.noSlides) {
      this.setState({
        currentPresentation: this.state.currentPresentation + 1,
      });
    } else {
      console.log('no more slides', this.state.currentPresentation, this.state.noSlides);
    }
  }
  render() {
    const currentSlideStyle = this.state.allPresentations[this.state.currentPresentation];
    return (
      <div style={styles.container}>
        {this.getArticleComponent(currentSlideStyle)}
        <MapView path={'ukMap/map.json'} width={400} height={600} zoom={16} center={[-4.2, 55.5]} />
      </div>
    );
  }
}

// this.state.parseComplete ? <Article presentationType={this.state.presentationType} mapParameters={this.state.mapParameters} /> : <div>Loading</div>
Article.propTypes = {};
Article.defaultProps = {};

export default Article;
