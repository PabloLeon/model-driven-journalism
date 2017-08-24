import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LandingQuestion from './LandingQuestion';
import MapView from './MapView';
import TextBlock from './TextBlock';
import PredictionCard from './PredictionCard';
import PredictionCards from './PredictionCards';
import PredictorSelection from './PredictorSelection';
import ActionableText from './ActionableText';

import parser from '../utils/parser';
import { slidesNHS, mockPredictorCards } from '../data/';

const styles = {
  container: { display: 'flex', flexWrap: 'nowrap', alignItems: 'center' },
};
class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
      allSlideSpecs: slidesNHS,
      parseStatus: 'parsing', // error || success
      geolocation: [undefined, undefined],
      localizationStatus: '',
      currentParseTree: [],
      currentPresentation: 0,
      canProceed: false,
      selectedPredictors: [], // for now simply like this...later have a inventory system
      data: {
        path: '',
        predictors: [
          { id: 'id0', label: 'Number of Gps', context: 'Some information about this predictor.' },
          {
            id: 'id1',
            label: 'Number of nurses',
            context: 'Some information about this predictor too.',
          },
        ], // dummy for now, later should be inferred from the linked data source(s)?
        predictionCards: [], // dummy, really should only store the ids to some db with the information
        // also we need to be able to get the information (below average...) for the predictors chosen by the participant
        // (selectedPredictors, data, trustDb) => {id, title,info, predictorValues = [{id, name, value}]}
      },
      mapParameters: {
        width: 400,
        height: 600,
        zoom: 16,
        center: [-4.2, 55.5],
      },
    };
    this.numberOfSlides = this.state.allSlideSpecs.length;
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateCoordinates = this.updateCoordinates.bind(this);
    this.updateLocalizationStatus = this.updateLocalizationStatus.bind(this);
    this.getArticleComponent = this.getArticleComponent.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.addPredictor = this.addPredictor.bind(this);
    this.removePredictor = this.removePredictor.bind(this);
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
  updateCoordinates(coord) {
    this.setState({ ...this.state, geolocation: coord });
  }
  updateLocalizationStatus(s) {
    this.setState({ ...this.state, localizationStatus: s });
  }

  getArticleComponent(presentationType, presentationSpec) {
    switch (presentationType) {
      case 'landing':
        return (
          <LandingQuestion
            header={presentationSpec.header}
            subheader={presentationSpec.subheader}
            onEnter={this.nextSlide}
            status={this.state.localizationStatus}
            updateCoordinates={this.updateCoordinates}
            updateLocalizationStatus={this.updateLocalizationStatus}
          />
        );
        break;
      case 'article':
        const mainTextRaw = presentationSpec.text; // this has to be parsed to markdown and links have to be parsed with json specs to actionable text
        // key of this json is the id that has to appear in the main text as a link
        const contextRaw = presentationSpec.links;

        // TODO: create 3 functions
        // parse to Choice
        // parse to Range
        // parse to Context

        // procedure: run through main text,
        // when you encounter a link check the context json
        // Insert: Actionable text with the corresponding choice/range/context element

        // jsons look like this:
        // type: choice | range | context
        // header
        // info
        // choiceSpec or rangeSpec

        // Simplest way: higher order function 3 components
        // contextual actionable text
        // range actionable text
        // choice actionable text

        return <TextBlock content={presentationSpec.text} onNext={this.nextSlide} />;
        break;
      case 'predictorSelection':
        return (
          <PredictorSelection
            header={presentationSpec.header}
            info={presentationSpec.info}
            selectedPredictors={this.state.selectedPredictors}
            availablePredictors={this.state.data.predictors}
            canProceed={this.state.canProceed}
            onNext={this.nextSlide}
            addPredictor={this.addPredictor}
            removePredictor={this.removePredictor}
            canProceed={this.state.selectedPredictors.length > 0}
          />
        );
        break;
      case 'predictionCards':
        // we first need to get the cards as an array from the presentationSpecs
        // as that only contains the ids and the presentation specs potentially live somewhere else
        // for now cheat and simply use the mock

        return (
          <PredictionCards
            cards={mockPredictorCards}
            info={presentationSpec.info}
            predictors={this.state.selectedPredictors}
            onNext={this.nextSlide}
          />
        );
        break;
      default:
        return <div>Default</div>;
        break;
    }
  }

  addPredictor(id) {
    console.log('adding predictor', id);
    // go to data and find the predictor
    // add the object to the predictors
    const predictorId = this.state.data.predictors.findIndex(v => v.id === id);
    const predictor = this.state.data.predictors[predictorId];
    this.setState({
      selectedPredictors: [...this.state.selectedPredictors, predictor],
    });
  }
  removePredictor(id) {
    console.log('removing predictor', id);
    // remove the predictors
    const newPredictors = this.state.selectedPredictors.filter(v => v.id != id);
    this.setState({
      selectedPredictors: newPredictors,
    });
  }
  nextSlide() {
    if (this.state.currentPresentation < this.numberOfSlides) {
      this.setState({
        currentPresentation: this.state.currentPresentation + 1,
      });
    }
  }
  render() {
    const currentSlideSpec = this.state.allSlideSpecs[this.state.currentPresentation];
    const currentSlideType = currentSlideSpec.type;
    return (
      <div style={styles.container}>
        {this.getArticleComponent(currentSlideType, currentSlideSpec)}
        <MapView path={'ukMap/map.json'} width={400} height={600} zoom={16} center={[-4.2, 55.5]} />
      </div>
    );
  }
}

Article.propTypes = {};
Article.defaultProps = {};

export default Article;
