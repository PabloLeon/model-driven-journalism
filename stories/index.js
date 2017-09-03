import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import MapView from '../src/components/MapView';
import LandingQuestion from '../src/components/LandingQuestion';
import TextBlock from '../src/components/TextBlock';

import slidesNHS from '../src/data';

const mapParameters = {
  path: 'ukMap/ukMap.json',
  width: 800,
  height: 800,
  center: {
    longitude: -4.2,
    latitude: 55.5,
  },
  zoom: 16,
};
storiesOf('Map View', module).add('centered main view', () => (
  <MapView path={mapParameters.path} center={mapParameters.center} zoom={mapParameters.zoom} />
));

const landingParameters = {
  header: 'How succesful is the NHS at delivering on referral to treatment targets for cancer?',
  subheader:
    'Which factors determine the ability of your regional NHS to fulfill the cancer waiting time targets?',
};
storiesOf('Landing Question', module).add('Main article page', () => (
  <LandingQuestion {...landingParameters} onEnter={action('enter')} />
));

// TODO: extract the parser from the article logic
// const parsedText = parse(currentSlideSpec.text, parseDict);
// storiesOf('Article', module).add('with reuqired actions', () => <TextBlock />);
