import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import LandingQuestion from './LandingQuestion';
import MapView from './MapView';
import TextBlock from './TextBlock';
import PredictionCard from './PredictionCard';
import PredictorSelection from './PredictorSelection';
import PredictorTable from './PredictorTable';
import ActionableText from './ActionableText';
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
    padding: '50px',
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
      allSlideSpecs: this.props.data.slideSpec,
      geolocation: this.props.geolocation,
      userLocation: this.props.userLocation,
      currentContextShownID: 'undefined',
      choices: [], // contains the choices made in the context
      predictions: [],
      currentPresentation: 0,
      canProceed: false,
      selectedPredictors: [], // for now simply like this...later have a inventory system
      allPredictors: this.props.data.allPredictors,
      requiredPredictionIds: this.props.data.requiredTrusts, // ['RRV', 'RWE', 'R1F', 'RAE', 'RJC'], // TODO: fetch these dynamically
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
        currentMarkers: []//this.props.data.markers.slice(0, 80),
      },
    };
    this.numberOfSlides = this.state.allSlideSpecs.length;
    this.getArticleView = this.getArticleView.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.addPredictor = this.addPredictor.bind(this);
    this.removePredictor = this.removePredictor.bind(this);
    this.makePrediction = this.makePrediction.bind(this);
    this.getMapParameters = this.getMapParameters.bind(this);
    this.closeContext = this.closeContext.bind(this);
    this.selectContext = this.selectContext.bind(this);
    this.makeChoice = this.makeChoice.bind(this);
    this.getRequiredChoices = this.getRequiredChoices.bind(this);
    this.sendUserData = this.sendUserData.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
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
        const currentCardODSId = article.state.requiredPredictionIds[article.state.currentCardIdx];
        const trustInfo = article.state.trustInfo[currentCardODSId];
        const predictorInfo = article.state.selectedPredictors.map(
          predictorId => article.state.allPredictors[predictorId],
        );
        const cardValues = article.state.waitingTimes.find(wT => wT.ods_code === currentCardODSId);

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
        //TODO: this is not the way this should be in the final version
        this.sendUserData()


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
          trueValue: waitingTime.percVal >= wtpSelected,
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
        console.log('get map aparameters', newMarkers, this.state.mapParameters);
        const newCenter = getCenterGeo(newMarkers.map(m => m.coordinates), 8.5, 0);

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
  getUserLocation() {
    console.log('getting user location');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        console.log('locaiton', location.coords);
        this.setState({ userLocation: location.coords });
      });
    } else {
      console.log('no user location');
      this.setState({ userLocation: undefined });
    }
  }

  sendUserData() {
    // send the user interactions
    const ts = Math.floor(Date.now() / 1000);
    const d = JSON.stringify({
      timestamp: ts,
      userLocation: this.state.userLocation,
      selectedChoices: this.state.choices,
      selectedPredictors: this.state.selectedPredictors,
      requiredPredictions: this.state.requiredPredictionIds,
      userPredictions: this.state.predictions,
    });
    console.log('send stored user data', d);
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
    const { center, zoom, currentMarkers, xOffset } = this.state.mapParameters;

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
            xOffset={xOffset}
          />
        </div>
        <div style={styles.wrapper}>
          <div style={styles.box}>
            <Container style={styles.content}>{currentArticleView}</Container>
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
