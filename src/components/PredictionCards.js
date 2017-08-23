import React from 'react';
import PredictionCard from './PredictionCard';

import PropTypes from 'prop-types';

const PredictionCards = ({ cards, currentCardIndex, userCardSelection }) => {
  const currentCard = cards[currentCardIndex];
  console.log('prediciton cards', currentCardIndex);
  if (currentCard) {
    return (
      <PredictionCard
        title={currentCard.title}
        avatar={currentCard.avatar}
        subheader={currentCard.subheader}
        img={currentCard.img}
        information={currentCard.information}
        predictors={currentCard.predictors}
        onSelect={e => userCardSelection(e)}
      />
    );
  }
  return <div>No cards</div>;
};
PredictionCards.PropTypes = {
  currentCardIndex: PropTypes.number.isRequired,
  userCardSelection: PropTypes.func.isRequired,
  cards:
    PropTypes.arrayOf[
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        subheader: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        information: PropTypes.string.isRequired,
      })
    ],
};

export default PredictionCards;
