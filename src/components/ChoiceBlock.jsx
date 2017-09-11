import React from 'react';
import PropTypes from 'prop-types';
import parse from '../utils/parser';
import { Container, Item, Header } from 'semantic-ui-react';
import Choice from './Choice';

// {needsAction && <Feedback style={styles.svgIcon} />

const ChoiceBlock = ({ id, header, info, choices, makeChoice, selected }) => (
  <Container style={{ padding: '10px' }}>
    <Header size="huge">{header}</Header>
    <p>{parse(info, {})}</p>
    <br />
    <Container>
      <Item.Group divided relaxed>
        {choices &&
          choices.map(o => (
            <Choice
              key={o.choiceId}
              choiceId={o.choiceId}
              onChoice={cid => makeChoice({ id, payload: { choiceId: cid } })}
              header={o.header}
              info={parse(o.info, {})}
              selected={o.choiceId === selected}
            />
          ))}
      </Item.Group>
    </Container>
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
