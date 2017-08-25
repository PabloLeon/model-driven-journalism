export const slidesNHS = [
  {
    type: 'landing',
    header: 'How succesful is the NHS at delivering on referral to treatment targets for cancer?',
    subheader: 'some subheader',
  },
  {
    type: 'article',
    header: 'NHS targets for referreal to treatment for cancer.',
    text:
      '[How succesful](id0) is [the NHS](id1) at delivering on the targets for referral to treatment for [cancer patients](id2) in the UK?',

    links: {
      id0: {
        type: 'range',
        header: 'Measuring success',
        info:
          'Success can be measured in **many different ways** and _different measures_ have existed in the past. The NHSs measures success by looking at the number of patients (in percentage) that are still waiting for treatment after the aimed target ellapsed.',
        range: {
          min: 0,
          max: 100,
          step: 1,
          unit: '%',
          marks: {
            85: {
              label: 'The NHS target in England.',
              context:
                'The NHS *in England* currently aims to refer **85%** of the patients to treatment',
            },
            95: {
              label: 'The NHS target gor Scotland and Wales.',
              context: 'In Scotland and Wales the aim is to refer **95%** in time.',
            },
          },
        },
      },
      id1: {
        type: 'context',
        header: 'The National Health Service',
        info:
          'There is a different organizing body in England and Scotland... We could put other information here',
      },
      id2: {
        type: 'choice',
        header: 'Same targets for different types of cancer?',
        info: 'Some text about aggreagating different cancer types.',
        choices: [
          {
            id: 'c1',
            header: 'Aggregate all cancer types',
            info:
              'The NHS currently does not distinguish between cancer types when establishing the targets for cancer types. There could be much more text here and also some *markdown*!',
          },
          {
            id: 'c2',
            header: 'Split by cancer groups',
            info: 'You can also look at the different cancer types.',
          },
        ],
      },
    },
  },

  {
    type: 'predictorSelection',
    header: 'Select a predictor',
    info:
      'Which factors do you think influence the ability of a NHS trust to refer cancer patients in time?',
  },
  {
    type: 'predictionCards',
    info: 'Try to guess if the trust is on target or not with the factors you chose earlier...',
    presentationSpecs: {
      presentationIds: ['p01', 'p02', 'p03'], // there could also be specs for: 25 closest etc
    },
  },
];

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
  return {
    cardId,
    title: trustNames[id],
    info: trustInfo[id],
    img: trustImgs[id],
    predictors: predictorValues,
  };
};

export const mockPredictorCards = trustNames.map((v, idx) => createPredictionCard(idx));
