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

const trustNames = ['Northern Devon', 'York', 'West London', 'North London', 'Nuffield'];
const trustInfo = [
  'Alias in corrupti qui cupiditate consequatur voluptas. Voluptate dolorum repellat. Ipsam aliquam excepturi recusandae soluta. Unde debitis quidem fugit fuga repellat doloremque.',
  'Alias in corrupti qui cupiditate consequatur voluptas. Voluptate dolorum repellat. Ipsam aliquam excepturi recusandae soluta. Unde debitis quidem fugit fuga repellat doloremque.',
  'Alias in corrupti qui cupiditate consequatur voluptas. Voluptate dolorum repellat. Ipsam aliquam excepturi recusandae soluta. Unde debitis quidem fugit fuga repellat doloremque.',
  'Alias in corrupti qui cupiditate consequatur voluptas. Voluptate dolorum repellat. Ipsam aliquam excepturi recusandae soluta. Unde debitis quidem fugit fuga repellat doloremque.',
  'Alias in corrupti qui cupiditate consequatur voluptas. Voluptate dolorum repellat. Ipsam aliquam excepturi recusandae soluta. Unde debitis quidem fugit fuga repellat doloremque.',
];

const trustImgs = [
  'http://lorempixel.com/640/480/business',
  'http://lorempixel.com/640/480/cats',
  'http://lorempixel.com/640/480/people',
  'http://lorempixel.com/640/480/abstract',
  'http://lorempixel.com/640/480/abstract',
];

const predictorValues = [
  {
    predictorName: 'Number of GPs',
    predictorValue: 'below average',
  },
  { predictorName: 'Hospital Rating', predictorValue: 'average' },
  { predictorName: 'Number of beds', predictorValue: 'above average' },
];

let cardId = 0;
const createPredictionCard = (id) => {
  cardId += 1;
  console.log('create prediction', trustNames[id], trustInfo[id], trustImgs[id]);
  return {
    cardId,
    title: trustNames[id],
    info: trustInfo[id],
    img: trustImgs[id],
    predictors: predictorValues,
  };
};

const mockPredictorCards = trustNames.map((v, idx) => createPredictionCard(idx));

const componentDict = {
  Range(props) {
    return <ActionableText text={'test'} />;
  },
};

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
      allSlideSpecs: [
        {
          type: 'landing',
        },
        {
          type: 'predictorSelection',
          header: 'Select a predictor',
          info:
            'Which factors do you think influence the ability of a NHS trust to refer cancer patients in time?',
        },
        { type: 'prediction' },
        { type: 'article' },
      ],
      parseStatus: 'parsing', // error || success
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

  getArticleComponent(presentationType, presentationSpec) {
    switch (presentationType) {
      case 'landing':
        return <LandingQuestion text={presentationSpec.text} onEnter={this.nextSlide} />;
        break;
      case 'article':
        const parsedText = parser(presentationSpec, componentDict);
        return <TextBlock content={parsedText} onNext={this.nextSlide} />;
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
          />
        );
        break;
      case 'predicionCards':
        return <PredictionCard />;
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

// this.state.parseComplete ? <Article presentationType={this.state.presentationType} mapParameters={this.state.mapParameters} /> : <div>Loading</div>
Article.propTypes = {};
Article.defaultProps = {};

export default Article;
