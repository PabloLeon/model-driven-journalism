import React, { Component } from 'react';
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
import { getCenterGeo } from '../utils/ops';

const styles = {
  box: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  wrapper: {
    height: '100%',
  },
  content: {
    padding: '50',
  },
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: '0',
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
      predictions: [],
      currentPresentation: 0,
      canProceed: false,
      selectedPredictors: [], // for now simply like this...later have a inventory system
      allPredictors: this.props.data.allPredictors,
      requiredPredictionIds: ['R1F', 'RAE', 'RJC'], // add real ones
      currentCardIdx: 0,
      trustInfo: this.props.data.trustInfo,
      hospitals: this.props.data.hospitals,
      waitingTimes: this.props.data.waitingTimes,
      mapParameters: {
        center: {
          longitude: -4.2,
          latitude: 55.5,
        },
        zoom: 20, // 16 with current shows all uk
        allMarkers: this.props.data.markers,
        currentMarkers: this.props.data.markers.slice(0, 80),
      },
    };
    this.numberOfSlides = this.state.allSlideSpecs.length;
    this.getArticleView = this.getArticleView.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.addPredictor = this.addPredictor.bind(this);
    this.removePredictor = this.removePredictor.bind(this);
    this.zoomToGeo = this.zoomToGeo.bind(this);
    this.makePrediction = this.makePrediction.bind(this);
    this.getMapParameters = this.getMapParameters.bind(this);
    this.closeContext = this.closeContext.bind(this);
    this.selectContext = this.selectContext.bind(this);
    this.makeChoice = this.makeChoice.bind(this);
    this.getRequiredChoices = this.getRequiredChoices.bind(this);
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
            canProceed={article.state.selectedPredictors.length > 0} // TODO: for now..later set number of min max predcitors
            onNext={article.nextSlide}
            addPrediction={article.addPredictor}
            removePrediction={article.removePredictor}
          />
        );
      case 'predictionCards': {
        console.log('prediction cards', article.state.currentCardIdx);
        const currentCardODSId = article.state.requiredPredictionIds[article.state.currentCardIdx];
        const trustInfo = article.state.trustInfo[currentCardODSId];
        const predictorInfo = article.state.selectedPredictors.map(
          predictorId => article.state.allPredictors[predictorId],
        );
        const cardValues = article.state.waitingTimes.find(wT => wT.ods_code === currentCardODSId);

        // FIXME
        // this is only required because currently some trust have more than one statistic
        // for the 3 cancer types... I ignored that the whole time
        // the new and final dataset will include ALL cancer types, so that this issue should
        // not occur
        console.log('card values', cardValues, currentCardODSId);
        const predictorValues = article.state.selectedPredictors.map(k => cardValues[k]);
        return (
          <PredictionCard
            title={trustInfo.organisation[0]} // FIXME: this is currently an array...clean up the data
            info={currentSlideSpec.info}
            trustInformation={trustInfo}
            predictors={predictorInfo}
            predictorValues={predictorValues}
            onSelect={article.makePrediction}
            odsCode={currentCardODSId}
          />
        );
      }
      case 'predictionEvaluation': {
        // data format array of object
        // with o.trustName, o.guess (bool), o.trueValue (bool)
        // FIXME: currently there is more than one but this should not be
        // an issue in the final version?
        const wt = this.state.requiredPredictionIds.map(pid =>
          this.state.waitingTimes.find(wt => wt.ods_code === pid),
        );
        const wtsForPredicted = wt.map(w => ({
          ods: w.ods_code,
          percVal: parseFloat(w.percenttreat_62days),
        }));
        // FIXME: there should be a tag in the json spec for hte predictor
        const wtpSelected = this.state.choices.find(c => c.id === 'id0').payload.rangeValue / 100;
        // FIXME: organisation is an array...shouldbe unique in the final version?

        // FIXME: this is terrible...
        const guesses = wtsForPredicted.map(waitingTime => ({
          ods: waitingTime.ods,
          trustName: this.state.trustInfo[waitingTime.ods].organisation[0],
          guess: this.state.predictions.find(p => p.id === waitingTime.ods).payload.prediction,
          trueValue: waitingTime.percVal <= wtpSelected,
        }));

        return <PredictorTable data={guesses} />;
      }

      default:
        return <div>Default</div>;
    }
  }

  getMapParameters(slideSpec, cardIdx) {
    const sType = slideSpec.type;
    switch (sType) {
      case 'predictionCards': {
        const newMarkers = this.state.mapParameters.allMarkers.filter(
          m => m.odsCode === this.state.requiredPredictionIds[cardIdx],
        );
        const newCenter = getCenterGeo(newMarkers.map(m => m.coordinates));
        console.log('new center', newCenter);
        console.log('new markers', newMarkers);

        return {
          ...this.state.mapParameters,
          currentMarkers: newMarkers,
          center: newCenter,
          zoom: 140,
        };
      }
      default:
        return {
          ...this.state.mapParameters,
          zoom: 20,
          currentMarkers: [],
          center: { longitude: -4.2, latitude: 55.5 },
        };
    }
  }

  makePrediction({ id, payload }) {
    this.setState({
      predictions: [...this.state.predictions, { id, payload }],
    });
    if (this.state.currentCardIdx < this.state.requiredPredictionIds.length - 1) {
      this.setState({
        currentCardIdx: this.state.currentCardIdx + 1,
        mapParameters: this.getMapParameters(
          this.state.allSlideSpecs[this.state.currentPresentation],
          this.state.currentCardIdx + 1,
        ),
      });
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
      // there is another presentation

      // if the next presentation slide is a prediction presentatiaon
      const nextSlide = this.state.allSlideSpecs[this.state.currentPresentation + 1];
      console.log('next slide');
      if (nextSlide.type === 'predictionCards' && this.state.currentCardIdx === 0) {
        // set the map Parameters
        this.setState({
          currentPresentation: this.state.currentPresentation + 1,
          mapParameters: this.getMapParameters(nextSlide, 0),
        });
      } else {
        this.setState({
          currentPresentation: this.state.currentPresentation + 1,
          mapParameters: this.getMapParameters(
            this.state.allSlideSpecs[this.state.currentPresentation + 1],
            this.state.currentCardIdx,
          ),
        });
      }
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
    const { center, zoom, currentMarkers } = this.state.mapParameters;

    const currentArticleView = this.getArticleView(currentSlideSpec, currentSlideType);
    return (
      <div>
        <div style={styles.map}>
          <MapView
            path={'ukMap/ukMap.json'} // TODO: should also be a parameter
            width={this.state.width}
            height={this.state.height}
            center={center}
            zoom={zoom}
            markers={currentMarkers}
          />
        </div>
        <div style={styles.wrapper}>
          <div style={styles.box}>
            <div style={styles.content}>{currentArticleView}</div>
          </div>
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
