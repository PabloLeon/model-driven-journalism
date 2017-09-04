import React from 'react';
import PropTypes from 'prop-types';

import { Container, Segment, Header } from 'semantic-ui-react';
import Choice from './Choice';

// {needsAction && <Feedback style={styles.svgIcon} />

const ChoiceBlock = ({ id, header, info, choices, makeChoice, selected }) => (
  <Container style={{ padding: '10' }}>
    <Header size="huge">{header}</Header>
    <p>{info}</p>
    <Segment>
      {choices &&
        choices.map((o) => {
          console.log('choice block', o);
          return (
            <Choice
              key={o.choiceId}
              choiceId={o.choiceId}
              onChoice={cid => makeChoice({ id, payload: { choiceId: cid } })}
              header={o.header}
              info={o.info}
              selected={o.choiceId === selected}
            />
          );
        })}
    </Segment>
  </Container>
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
