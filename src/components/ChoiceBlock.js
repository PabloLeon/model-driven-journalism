import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Choice from './Choice';

const styles = {};

// {needsAction && <Feedback style={styles.svgIcon} />
// need these props
// choiceNo === selectedId
// expandedId
const ChoiceBlock = ({ header, info, choices }) =>
  (<div>
    <h1>
      {' '}{header}
    </h1>
    <p>
      {info}
    </p>
    <div>
      {choices &&
        choices.map((o, choiceNo) =>
          (<Choice
            key={o.idx}
            header={o.header}
            summary={o.summary}
            text={o.text}
            selected={false}
            expanded={false}
          />),
        )}
    </div>
  </div>);

ChoiceBlock.propTypes = {
  header: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      idx: PropTypes.number.isRequired,
      choiceHeader: PropTypes.string.isRequired,
      summaryText: PropTypes.string.isRequired,
      text: PropTypes.string,
    }),
  ),
};

export default ChoiceBlock;
