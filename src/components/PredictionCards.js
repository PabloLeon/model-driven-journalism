import React from 'react';
import PredictionCard from './PredictionCard';

import PropTypes from 'prop-types';

class PredictionCards extends React.Component {
  constructor(props) {
    super(props);
    const { cards, info, predictedSelectors } = props;
    this.state = {
      currentCardIndex: 0,
      cards,
      canProceed: false,
    };
    this.nextCard = this.nextCard.bind(this);
  }

  nextCard() {
    console.log('next card:', this.state.currentCardIndex, this.state.cards.length);
    if (this.state.currentCardIndex < this.state.cards.length - 1) {
      const newIdx = (this.state.currentCardIndex += 1);
      this.setState({
        currentCardIndex: newIdx,
      });
    } else {
      this.props.onNext();
    }
  }

  // TODO: do something useful with the prediction selection
  // send to server or store locally in article state

  // TODO: use the predictors

  render() {
    const currentCard = this.state.cards[this.state.currentCardIndex];
    return (
      <PredictionCard
        title={currentCard.title}
        avatar={currentCard.avatar}
        subheader={currentCard.subheader}
        img={currentCard.img}
        information={currentCard.information}
        predictors={currentCard.predictors}
        onSelect={this.nextCard}
      />
    );
  }
}
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
