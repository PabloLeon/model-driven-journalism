import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import LandingQuestion from './LandingQuestion';
import MapView from './MapView';
import TextBlock from './TextBlock';
import PredictionCard from './PredictionCard';
import PredictorSelection from './PredictorSelection';
import PredictorTable from './PredictorTable';
import ActionableText from './ActionableText';

import { slidesNHS } from '../data/';
import parse from '../utils/parser';

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    backgroundColor: 'red',
    alignItems: 'center',
    alignContent: 'ceneter',
  },
};

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      width: window.innerWidth,
      allSlideSpecs: slidesNHS,
      geolocation: this.props.geolocation,
      currentContextShownID: 'undefined',
      choices: [], // contains the choices made in the context
      currentPresentation: 0,
      canProceed: false,
      selectedPredictors: [], // for now simply like this...later have a inventory system
      allPredictionsDone: false,
      allPredictors: this.props.data.allPredictors,
      requiredPredictionIDs: ['R1F', 'RAE', 'RJC'], // add real ones
      currentCardIdx: 0,
      trustInfo: this.props.data.trustInfo,
      hospitals: this.props.data.hospitals,
      waitingTimes: this.props.data.waitingTimes,
      mapParameters: {
        currentCenter: {
          longitude: -4.2,
          latitude: 55.5,
        },
        currentZoom: 16, // 16 with current shows all uk
        currentMarkers: [],
        allMarkers: this.props.data.markers,
      },
    };
    this.numberOfSlides = this.state.allSlideSpecs.length;
    this.getArticleView = this.getArticleView.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.addPredictor = this.addPredictor.bind(this);
    this.removePredictor = this.removePredictor.bind(this);
    this.zoomToGeo = this.zoomToGeo.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.getMarkers = this.getMarkers.bind(this);
    this.closeContext = this.closeContext.bind(this);
    this.selectContext = this.selectContext.bind(this);
    this.makeChoice = this.makeChoice.bind(this);
    this.getRequiredChoices = this.getRequiredChoices.bind(this);
  }
  componentWillMount() {
    const m = this.getMarkers();
    this.setState({
      ...this.state,
      mapParameters: { ...this.state.mapParameters, currentMakers: m },
    });
  }

  getRequiredChoices() {
    const spec = this.state.allSlideSpecs[this.state.currentPresentation];
    const slideType = spec.type;
    switch (slideType) {
      case 'article': {
        const nonContex = Object.keys(spec.links).filter(k => spec.links[k].type !== 'context');
        const nonChose = nonContex.filter(
          nc => this.state.choices.map(c => c.id).indexOf(nc) === -1,
        );
        return nonChose;
      }
      default:
        return [];
    }
  }
  getArticleView(currentSlideSpec, currentSlideType) {
    const article = this; // since reference get's lost deep down in the switches
    switch (currentSlideType) {
      case 'landing':
        return (
          <LandingQuestion
            header={currentSlideSpec.header}
            subheader={currentSlideSpec.subheader}
            onEnter={article.nextSlide}
          />
        );
      case 'article': {
        const parseDict = {
          a({ href, children }) {
            if (href in currentSlideSpec.links) {
              return (
                <ActionableText
                  inlineText={children}
                  contextId={href}
                  onAction={article.selectContext}
                  needsAction={article.getRequiredChoices().indexOf(href) !== -1}
                />
              );
            }
            return <a>Undefined Contextual Link</a>;
          },
        };
        const parsedText = parse(currentSlideSpec.text, parseDict);
        return (
          <TextBlock
            header={currentSlideSpec.header}
            content={parsedText}
            currentShowId={article.state.currentContextShownID}
            contextInfo={currentSlideSpec.links}
            makeChoice={article.makeChoice}
            closeContext={article.closeContext}
            canProceed={article.getRequiredChoices().length === 0}
            selected={article.state.choices}
            onNext={article.nextSlide}
          />
        );
      }
      case 'predictorSelection':
        return (
          <PredictorSelection
            header={currentSlideSpec.header}
            info={currentSlideSpec.info}
            selectedPredictors={article.state.selectedPredictors}
            availablePredictors={article.state.allPredictors}
            canProceed={article.state.allPredictionsDone}
            onNext={article.nextSlide}
            addPrediction={article.addPredictor}
            removePrediction={article.removePredictor}
          />
        );
      case 'predictionCards': {
        const currentCardODSId = article.state.requredPredictionIds[article.state.currentCardIdx];
        const trustInfo = article.state.trustInfo[currentCardODSId];
        const predictorInfo = article.state.selectedPredictors.map(
          predictorId => article.state.allPredictors[predictorId],
        );
        const cardValues = article.state.waitingTimes.filter(
          wT => wT.ods_code === currentCardODSId,
        );
        // FIXME
        // this is only required because currently some trust have more than one statistic
        // for the 3 cancer types... I ignored that the whole time
        // the new and final dataset will include ALL cancer types, so that this issue should
        // not occur

        const cardPredictorValues = article.state.selectedPredictors.map(
          predictorId =>
            (cardValues.length > 1 ? cardValues[0][predictorId] : cardValues[predictorId]),
        );
        return (
          <PredictionCard
            title={currentSlideSpec.currentCardOrganisation}
            information={trustInfo}
            predictors={predictorInfo}
            predictorValues={cardPredictorValues}
            onSelect={article.nextCard}
          />
        );
      }
      case 'predictionEvaluation':
        return <PredictorTable />;

      default:
        return <div>Default</div>;
    }
  }

  getMarkers() {
    const currentSlideSpec = this.state.allSlideSpecs[this.state.currentPresentation];
    const sType = currentSlideSpec.type;

    switch (sType) {
      case 'predictionCards':
        return this.state.mapParameters.allMarkers.filter(
          m => m.odsCode === this.state.requiredPredictionIDs[this.state.currentCardIdx],
        );
      default:
        return [];
    }
  }
  nextCard() {
    if (this.state.currentCardIdx < this.state.requiredPredictionIDs.length - 1) {
      this.setState({ currentCardIdx: this.state.currentCardIdx + 1 });
    } else {
      this.nextSlide();
    }
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

  addPredictor(predictor) {
    this.setState({
      selectedPredictors: [...this.state.selectedPredictors, predictor],
    });
  }
  removePredictor(id) {
    const newP = this.state.selectedPredictors.filter(spK => spK !== id);
    this.setState({
      selectedPredictors: newP,
    });
  }
  nextSlide() {
    if (this.state.currentPresentation < this.numberOfSlides - 1) {
      this.setState({
        currentPresentation: this.state.currentPresentation + 1,
      });
    }
  }
  selectContext(id) {
    this.setState({
      currentContextShownID: id,
    });
  }
  closeContext() {
    this.setState({
      currentContextShownID: 'undefined',
    });
  }
  makeChoice({ id, payload }) {
    this.setState(previous => ({
      choices: [...previous.choices.filter(c => c.id !== id), { id, payload }],
    }));
  }

  render() {
    const currentSlideSpec = this.state.allSlideSpecs[this.state.currentPresentation];
    const currentSlideType = currentSlideSpec.type;
    const { currentCenter, currentZoom, currentMarkers } = this.state.mapParameters;

    const currentArticleView = this.getArticleView(currentSlideSpec, currentSlideType);
    return (
      <div style={{ display: 'flex' }}>
        <div style={styles.box}>
          <Paper>{currentArticleView}</Paper>
        </div>
        <div style={styles.box}>
          <MapView
            path={'ukMap/ukMap.json'} // TODO: should also be a parameter
            width={this.state.width / 2}
            height={this.state.height}
            center={currentCenter}
            zoom={currentZoom}
            markers={currentMarkers}
          />
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  geolocation: PropTypes.shape({
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allPredictors: PropTypes.shape({
      id: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }),
    }).isRequired,
    hospitals: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    waitingTimes: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    markers: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    trustInfo: PropTypes.shape({}).isRequired,
  }).isRequired,
};
Article.defaultProps = {};

export default Article;
