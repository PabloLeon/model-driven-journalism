import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import LandingQuestion from '../src/components/LandingQuestion';
import PredictionCard from '../src/components/PredictionCard';
import PredictorSelection from '../src/components/PredictorSelection';
import PredictorListing from '../src/components/PredictorListing';
import Predictor from '../src/components/Predictor';
import PredictorTable from '../src/components/PredictorTable';
import TinderNavigation from '../src/components/TinderNavigation';

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

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('LandingQuestion', module).add('initial', () => <LandingQuestion />);

storiesOf('Predictor', module).add('Basic', () =>
  <Predictor text="Test predictor" context="contextual info" />,
);

storiesOf('Tinder Navigation').add('Basic', () => <TinderNavigation />);

storiesOf('Prediction card', module).add('Trust card with predictors', () =>
  (<PredictionCard
    title={'Nuffield'}
    img={'http://www.nuffieldhealthcareers.com/android-chrome-192x192.png'}
    predictors={predictorMock}
    information=" I don't know anything about Nuffield 😢"
  />),
);

// TODO: One correct/one wrong need to be done
storiesOf('PredictorTable', module)
  .add('Basic', () => <PredictorTable data={predictionsMock} />)
  .add('One correct', () => <PredictorTable data={predictionsMock[0]} />)
  .add('One wrong', () => <PredictorTable data={predictionsMock[2]} />)
  .add('Empty', () => <PredictorTable />);
