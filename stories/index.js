import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import LandingQuestion from '../src/components/LandingQuestion';
import PredictionCard from '../src/components/PredictionCard';
import PredictorSelection from '../src/components/PredictorSelection';
import PredictorListing from '../src/components/PredictorListing';

const predictorMock = [
  'Number of GPs',
  'Number of Nurses',
  'Number of administrative staff',
  'Number of Beds',
  'Financial situation',
];

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('LandingQuestion', module).add('initial', () => <LandingQuestion />);

storiesOf('Prediction card', module).add('Trust card with no predictors', () =>
  (<PredictionCard
    title={'Nuffield'}
    predictors={predictorMock}
    information=" I don't know anything about Nuffield 😢"
  />),
);
storiesOf('Predictor listing', module)
  .add('display list of predictors', () => <PredictorListing predictors={predictorMock} />)
  .add('with no predictors', () => <PredictorListing />);
storiesOf('Predictor selection', module).add('adding predictors to the selection', () =>
  <PredictorSelection />,
);
