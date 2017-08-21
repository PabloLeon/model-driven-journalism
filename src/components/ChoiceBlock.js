import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Choice from './Choice';

const styles = {};

class ChoiceBlock extends Component {
  render() {
    const { header, info, choices, selectedId, expandedId } = this.props;
    return (
      <div>
        <h1>
          {header}
        </h1>
        <p>
          {info}
        </p>
        {choices &&
          choices.map((o, idx) => {
            <Choice
              key={o.idx}
              header={o.choiceHeader}
              summary={o.summaryText}
              text={o.text}
              selected={idx === selectedId}
              expanded={idx === expandedId}
            />;
          })}
      </div>
    );
  }
}
ChoiceBlock.propTypes = {
  selectedId: PropTypes.number,
  expandedId: PropTypes.number,
  header: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  choices: PropTypes.shape({
    idx: PropTypes.number.isRequired,
    choiceHeader: PropTypes.string.isRequired,
    summaryText: PropTypes.string.isRequired,
    text: PropTypes.string,
  }),
  onOK: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default ChoiceBlock;
