import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import LandingQuestion from '../src/components/LandingQuestion';
import PredictonCard from '../src/components/PredictonCard';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('LandingQuestion', module).add('initial', () => <LandingQuestion />);

storiesOf('Prediction card', module).add('Trust card with no predictors', () => <PredictionCard />);
