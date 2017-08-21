import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LandingQuestion from './LandingQuestion';
import MapView from './MapView';
import TextBlock from './TextBlock';
import PredictionCard from './PredictionCard';
import PredictorSelection from './PredictorSelection';

const styles = {
  container: { display: 'flex', flexWrap: 'nowrap', alignItems: 'center' },
};
const testMD = `
# Some blog title
Just need to show you some code first:

<Row>
  <Col>Need to tell you something over here</Col>
  <Col>And over here</Col>
</Row>
`;

const dummyPresentations = ['landing', 'predictorSelection', 'article', 'prediction'];

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
        return <LandingQuestion clickQuestion={() => this.nextSlide()} />;
      case 'article':
        return <TextBlock />;
      case 'predictorSelection':
        return <PredictorSelection />;
      case 'predicionCards':
        return <PredictionCard />;
      default:
        return <div>Default</div>;
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
        <MapView width={400} height={600} zoom={16} center={[-4.2, 55.5]} />
      </div>
    );
  }
}

// this.state.parseComplete ? <Article presentationType={this.state.presentationType} mapParameters={this.state.mapParameters} /> : <div>Loading</div>
Article.propTypes = {};
Article.defaultProps = {};

export default Article;
