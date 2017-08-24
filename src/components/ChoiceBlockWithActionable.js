import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Choice from './Choice';
import withActionable from './withActionable';

const styles = {};

const ChoiceBlock = ({ inlineText, header, info, choices }) =>
  (<span>
    <span onClick={() => console.log('lasdasd')}>
      {inlineText}
    </span>
    {/* {needsAction && <Feedback style={styles.svgIcon} />} */}
  </span>);
//   <div>
//     <h1>
//       {header}
//     </h1>
//     <p>
//       {info}
//     </p>
//     {choices &&
//       choices.map((o, choiceNo) =>
//         (<Choice
//           key={o.idx}
//           header={o.header}
//           summary={o.summary}
//           text={o.text}
//           selected={choiceNo === selectedId}
//           expanded={choiceNo === expandedId}
//         />),
//       )}
ChoiceBlock.propTypes = {
  selectedId: PropTypes.number,
  expandedId: PropTypes.number,
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
  onOK: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

ChoiceBlock.defaultProps = {
  selectedId: undefined,
  expandedId: undefined,
};
const ChoiceBlockWithActionable = withActionable(ChoiceBlock);
export default ChoiceBlockWithActionable;
