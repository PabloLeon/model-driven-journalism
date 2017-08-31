import React from 'react';
import PropTypes from 'prop-types';
import Choice from './Choice';

// {needsAction && <Feedback style={styles.svgIcon} />

const ChoiceBlock = ({ id, header, info, choices, makeChoice, selected }) => (
  <div>
    <h1>{header}</h1>
    <p>{info}</p>
    <div>
      {choices &&
        choices.map((o) => {
          console.log('selecte cb', o, selected);
          return (
            <Choice
              key={o.choiceId}
              choiceId={o.choiceId}
              onChoice={cid => makeChoice({ id, payload: { choiceId: cid } })}
              header={o.header}
              summary={o.summary}
              text={o.text}
              selected={o.choiceId === selected}
              expanded={false}
            />
          );
        })}
    </div>
  </div>
);

ChoiceBlock.propTypes = {
  id: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  makeChoice: PropTypes.func.isRequired,
  selected: PropTypes.string,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      choiceId: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

ChoiceBlock.defaultProps = {
  selected: '',
};

export default ChoiceBlock;
