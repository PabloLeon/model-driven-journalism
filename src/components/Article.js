import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LandingQuestion from './LandingQuestion';
import MapView from './MapView';
import TextBlock from './TextBlock';
import PredictionCard from './PredictionCard';
import PredictionCards from './PredictionCards';
import PredictorSelection from './PredictorSelection';
import PredictorTable from './PredictorTable';

import ActionableText from './ActionableText';
import ChoiceBlock from './ChoiceBlock';
import ContextBlock from './ContextBlock';
import RangeBlock from './RangeBlock';

import parser from '../utils/parser';
import { getClosestTrust } from '../utils/ops';
import { slidesNHS, mockPredictorCards } from '../data/';
import marksy from 'marksy/components';

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
      loadError: false,
      geolocation: this.props.geolocation,
      currentParseTree: [],
      currentContextShownID: undefined,
      currentPresentation: 0,
      canProceed: false,
      selectedPredictors: [], // for now simply like this...later have a inventory system
      allPredictors: this.props.data.allPredictors,
      hospitals: this.props.data.hospitals,
      waitingTimes: this.props.data.waitingTimes,
      mapParameters: {
        width: 400,
        height: 600,
        currentCenter: [-4.2, 55.5],
        currentZoom: 16, // 16 with current shows all uk
        markers: this.props.data.markers,
      },
    };
    this.numberOfSlides = this.state.allSlideSpecs.length;
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.getArticleComponent = this.getArticleComponent.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.addPredictor = this.addPredictor.bind(this);
    this.removePredictor = this.removePredictor.bind(this);
    this.zoomToGeo = this.zoomToGeo.bind(this);
    this.getBlockContext = this.getBlockContext.bind(this);
    this.selectShownContext = this.selectShownContext.bind(this);
    this.resetCurrentContextShownId = this.resetCurrentContextShownId.bind(this);
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
    // TODO: this should happen asyncronusly in the background!
    const cT = getClosestTrust(coord, this.state.data.hospitals, this.state.data.waitingTimes);
    this.setState({ ...this.state, closestTrust: cT });
  }
  updateLocalizationStatus(s) {
    this.setState({ ...this.state, localizationStatus: s });
  }
  zoomToGeo() {
    this.setState({
      ...this.state,
      mapParameters: {
        ...this.state.mapParameters,
        currentCenter: this.state.geolocation,
        currentZoom: 20,
      },
    });
    this.nextSlide();
  }
  resetCurrentContextShownId() {
    this.setState({
      ...this.state,
      currentContextShownID: undefined,
    });
  }
  selectShownContext(id) {
    console.log('showing context from article', id);
    this.setState({
      ...this.state,
      currentContextShownID: id,
      currentContext: this.getBlockContext(id),
    });
  }

  getBlockContext(id) {
    const currentS = this.state.allSlideSpecs[this.state.currentPresentation];
    if (id in currentS.links) {
      const s = currentS.links[id];
      switch (s.type) {
        case 'context':
          return <ContextBlock header={s.header} info={s.info} />;
          break;
        case 'range':
          return <RangeBlock header={s.header} info={s.info} range={s.range} />;
          break;
        case 'choice':
          return <ChoiceBlock header={s.header} info={s.info} choices={s.choices} />;
          break;
      }
    }
  }

  getArticleComponent(presentationType, presentationSpec) {
    const selectContext = (id) => {
      // somehow this inthe switch case return...doesn't refer to the class this..js ey
      this.selectShownContext(id);
    };
    switch (presentationType) {
      case 'landing':
        return (
          <LandingQuestion
            header={presentationSpec.header}
            subheader={presentationSpec.subheader}
            onEnter={this.zoomToGeo}
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

        const compilerMain = marksy({
          createElement: React.createElement,
          elements: {
            a({ href, title, target, children }) {
              if (href in contextRaw) {
                // href contains the reference id
                // children the text that should be displayed
                const contextType = contextRaw[href].type;
                const contextSpec = contextRaw[href];
                return (
                  <ActionableText
                    inlineText={children}
                    contextId={href}
                    contextType={contextType}
                    contextSpec={contextSpec}
                    onAction={selectContext}
                  />
                );
              }
            },
          },
        });

        const compiledText = compilerMain(mainTextRaw).tree;
        // TODO: this needs logic -- when can i continue, where are the selected options stored
        return (
          <TextBlock
            header={presentationSpec.header}
            content={compiledText}
            onNext={this.nextSlide}
            currentShowId={this.state.currentContextShownID}
            getContext={this.state.currentContext}
            closeContext={this.resetCurrentContextShownId}
            canProceed // TODO: need to change this in general... do once we know how I want to store the selected options etc...
            onNext={this.nextSlide}
          />
        );
        break;
      case 'predictorSelection':
        return (
          <PredictorSelection
            header={presentationSpec.header}
            info={presentationSpec.info}
            selectedPredictors={this.state.selectedPredictors}
            availablePredictors={this.state.allPredictors}
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

        // TODO: have a dict of contextual information for the cards (text, header, img)
        // load in for the trust ids at startup

        return (
          <PredictionCards
            cards={mockPredictorCards}
            info={presentationSpec.info}
            predictors={this.state.selectedPredictors}
            onNext={this.nextSlide}
          />
        );
        break;
      case 'predictionEvaluation':
        return <PredictorTable />;
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
    const predictorId = this.state.allPredictors.findIndex(v => v.id === id);
    const predictor = this.state.allPredictors[predictorId];
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
    if (this.state.currentPresentation < this.numberOfSlides - 1) {
      this.setState({
        currentPresentation: this.state.currentPresentation + 1,
      });
    }
  }
  render() {
    const currentSlideSpec = this.state.allSlideSpecs[this.state.currentPresentation];
    const currentSlideType = currentSlideSpec.type;
    const { width, height, currentZoom, currentCenter } = this.state.mapParameters;
    return (
      <div style={styles.container}>
        {this.getArticleComponent(currentSlideType, currentSlideSpec)}
        <MapView
          path={'ukMap/ukMap.json'} // TODO: should also be a parameter
          width={width}
          height={height}
          defaultZoom={currentZoom}
          defaultCenter={currentCenter}
          currentZoom={currentZoom}
          currentCenter={currentCenter}
          markers={this.state.mapParameters.markers}
        />
      </div>
    );
  }
}

Article.propTypes = {};
Article.defaultProps = {};

export default Article;
