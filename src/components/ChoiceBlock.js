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
          choices.map((o, choiceNo) =>
            (<Choice
              key={o.idx}
              header={o.header}
              summary={o.summary}
              text={o.text}
              selected={choiceNo === selectedId}
              expanded={choiceNo === expandedId}
            />),
          )}
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

ChoiceBlock.defaultProps = {
  selectedId: undefined,
  expandedId: undefined,
};

export default ChoiceBlock;
