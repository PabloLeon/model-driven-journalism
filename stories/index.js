import React from 'react';

import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import RaisedButton from 'material-ui/RaisedButton';
import MapView from '../src/components/MapView';
import PredictionCard from '../src/components/PredictionCard';
import PredictorSelection from '../src/components/PredictorSelection';
import PredictorListing from '../src/components/PredictorListing';
import Predictor from '../src/components/Predictor';
import PredictorTable from '../src/components/PredictorTable';
import TinderNavigation from '../src/components/TinderNavigation';
import TextBlock from '../src/components/TextBlock';
import ActionableText from '../src/components/ActionableText';
import ChoiceBlock from '../src/components/ChoiceBlock';
import Choice from '../src/components/Choice';
import Navigation from '../src/components/Navigation';
import PredictionCards from '../src/components/PredictionCards';

import Range from '../src/components/Range';
import RangeBlock from '../src/components/RangeBlock';

import parser from '../src/utils/parser';

const predictorsNames = [
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
const predictionsMock = [
  createPrediction('Northern Devon', true, true),
  createPrediction('York', false, false),
  createPrediction('West London', true, false),
  createPrediction('North London', false, true),
  createPrediction('Nuffield', true, true),
];
addDecorator(muiTheme());

//
// Stories
//

const parsedText = parser(`
# Header

Some markdown text, **bold**, _underlined_,...

- One 
- Two
- Three
`);

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
storiesOf('Predictor Listing').add('no predicors selected', () =>
  (<PredictorListing
    availablePredictors={[
      { id: 'id0', label: 'predictor1', context: 'Some information about this predictor.' },
      { id: 'id1', label: 'predictor2', context: 'Some information about this predictor too.' },
    ]}
  />),
);
storiesOf('Tinder Navigation').add('Basic', () =>
  <TinderNavigation onSelect={e => console.log(e)} />,
);

let currentCard = 0;

const mockSubmit = (e) => {
  const submitAction = action('submitted');
  currentCard += 1;
  submitAction(e, currentCard, mockPredictorCards[currentCard]);
};
storiesOf('Card Tinder').add('flip through a set of trust cards', () =>
  (<PredictionCards
    cards={mockPredictorCards}
    currentCardIndex={currentCard}
    userCardSelection={mockSubmit}
  />),
);
storiesOf('Predictor selection').add('select predictors', () =>
  (<PredictorSelection
    predictors={predictorValues}
    options={{ id1: 'predictor 1', id2: 'predictor 2' }}
  />),
);
storiesOf('Prediction card', module).add('Trust card with predictors', () =>
  (<PredictionCard
    title={'Nuffield'}
    img={'http://www.nuffieldhealthcareers.com/android-chrome-192x192.png'}
    predictors={predictorsNames}
    information=" I don't know anything about Nuffield 😢"
  />),
);
storiesOf('PredictorTable', module)
  .add('Basic', () => <PredictorTable data={predictionsMock} />)
  .add('Empty', () => <PredictorTable />);

storiesOf('Article', module).add('plain text', () => <TextBlock content={parsedText} />);
storiesOf('Article Navigation', module)
  .add('Can proceed', () => <Navigation canProceed />)
  .add('Cannot proceed', () => <Navigation canProceed={false} />);

const choiceMockHeader = 'Same targets for different cancer?';
const choiceMockInfo =
  'Some text about different ways to aggregate...should contain formatted text in the future';
let choiceId = 0;
const createChoice = (header, summary, text) => {
  choiceId += 1;
  return { choiceId, header, summary, text };
};
const choiceMockHeaders = ['Aggregating all cancer types:', 'Splitting up by cancer types:'];
const choiceMockSummaries = [
  'Do not distinguish between different cancer types.',
  'Distinguishing between different cancer types based on their mortality.',
];
const choiceMockText = [
  'The NHS currently does not distinguish between different cancer types..Laboriosam officiis explicabo. Odio quidem nulla neque eveniet. Voluptatem omnis perferendis..',
  'We could also distinguish between cancer types..Ut nesciunt quis. Adipisci nihil voluptatem atque. Repellendus odit architecto doloremque provident inventore beatae eveniet..',
];

storiesOf('Range', module)
  .add('With marks', () => <Range min={0} max={100} />)
  .add('No marks', () => <Range />)
  .add('No marks and no steps', () => <Range />);
storiesOf('RangeBlock', module).add('Expanded', () => <RangeBlock />);

storiesOf('Choice', module)
  .add('Expanded', () =>
    (<Choice
      header="Choice header"
      summary="Enim aut voluptas magni et quae eius. Deleniti repudiandae vel quas qui sit praesentium officia. Illum provident consequatur quo id deserunt et sit consequuntur quibusdam."
      text="Vitae error labore fugit est. Placeat tempore vel sunt quas est. Quia nihil eligendi voluptatem officiis minus cum iusto consectetur culpa. Ratione quod ut reiciendis ab vitae neque eligendi. Harum possimus recusandae laboriosam est qui quidem laudantium commodi maxime."
      selected
      expanded
    />),
  )
  .add('Collapsed', () =>
    (<Choice
      header="Choice header"
      summary="Enim aut voluptas magni et quae eius. Deleniti repudiandae vel quas qui sit praesentium officia. Illum provident consequatur quo id deserunt et sit consequuntur quibusdam."
      text="Vitae error labore fugit est. Placeat tempore vel sunt quas est. Quia nihil eligendi voluptatem officiis minus cum iusto consectetur culpa. Ratione quod ut reiciendis ab vitae neque eligendi. Harum possimus recusandae laboriosam est qui quidem laudantium commodi maxime."
      selected
      expanded={false}
    />),
  );

const choiceBlocks = choiceMockHeaders.map((header, idx) =>
  createChoice(header, choiceMockSummaries[idx], choiceMockText[idx]),
);

storiesOf('Choice Block', module)
  .add('choice block with suggestion no expanded', () =>
    <ChoiceBlock header={choiceMockHeader} info={choiceMockInfo} choices={choiceBlocks} />,
  )
  .add('choice block with suggestion expanded', () =>
    (<ChoiceBlock
      header={choiceMockHeader}
      info={choiceMockInfo}
      choices={choiceBlocks}
      expandedId={1}
      selectedId={0}
    />),
  );

storiesOf('Maps', module).add('Basic UK overview', () =>
  (<div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
    <MapView path={'ukMap/map.json'} width={400} height={600} zoom={16} center={[-4.2, 55.5]} />
  </div>),
);
storiesOf('Predictor', module).add('Basic', () =>
  <Predictor text="Test predictor" context="contextual info" />,
);
storiesOf('Text Block', module).add('Basic', () => <TextBlock />);
storiesOf('Actionable Text', module)
  .add('No action needed', () => <ActionableText text="you can do something with me" />)
  .add('Action needed', () => <ActionableText text="I need action!" needsAction />);
