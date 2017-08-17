import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LandingQuestion from '../src/components/LandingQuestion';
import PredictionCard from '../src/components/PredictionCard';
import PredictorSelection from '../src/components/PredictorSelection';
import PredictorListing from '../src/components/PredictorListing';
import Predictor from '../src/components/Predictor';
import PredictorTable from '../src/components/PredictorTable';
import TinderNavigation from '../src/components/TinderNavigation';
import TextBlock from '../src/components/TextBlock';
import ActionableText from '../src/components/ActionableText';
import Article from '../src/components/Article';
import MapView from '../src/components/MapView';

addDecorator(muiTheme());

const predictorMock = [
  'Number of GPs',
  'Number of Nurses',
  'Number of administrative staff',
  'Number of Beds',
  'Financial situation',
];

let id = 0;
const createPrediction = (trustName, guess, trueValue) => {
  id += 1;
  return { id, trustName, guess, trueValue };
};

// TODO: For now this is simply a boolean onTarget/not on Target
const predictionsMock = [
  createPrediction('Northern Devon', true, true),
  createPrediction('York', false, false),
  createPrediction('West London', true, false),
  createPrediction('North London', false, true),
  createPrediction('Nuffield', true, true),
];

// we can pass a link to the stories linking to another story by using linkTo("storyname")

storiesOf('Maps', module).add('Basic UK overview', () => <MapView />);

// storiesOf('LandingQuestion', module)
//   .addDecorator(muiTheme())
//   .add('initial', () => <LandingQuestion />);
// // later on we will need to change the logic (how the current page is loaded, for now simply decorate as in the article view)
// storiesOf('Landing Page', module).add('Question with Map', () =>
//   (<div>
//     <LandingQuestion text="Something about the NHS" />
//     <MapView />
//   </div>),
// );

// TODO: One correct/one wrong need to be done
storiesOf('PredictorTable', module)
  .add('Basic', () => <PredictorTable data={predictionsMock} />)
  .add('One correct', () => <PredictorTable data={predictionsMock[0]} />)
  .add('One wrong', () => <PredictorTable data={predictionsMock[2]} />)
  .add('Empty', () => <PredictorTable />);

storiesOf('Actionable Text', module)
  .add('No action needed', () => <ActionableText text="you can do something with me" />)
  .add('Action needed', () => <ActionableText text="I need action!" needsAction />);

storiesOf('Text Block', module).add('Basic', () => <TextBlock />);
storiesOf('Tinder Navigation').add('Basic', () => <TinderNavigation />);

storiesOf('Predictor', module).add('Basic', () =>
  <Predictor text="Test predictor" context="contextual info" />,
);

storiesOf('Prediction card', module).add('Trust card with predictors', () =>
  (<PredictionCard
    title={'Nuffield'}
    img={'http://www.nuffieldhealthcareers.com/android-chrome-192x192.png'}
    predictors={predictorMock}
    information=" I don't know anything about Nuffield 😢"
  />),
);
