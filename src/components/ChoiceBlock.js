import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Choice from './Choice';

const styles = {};

const ChoiceBlock = ({ header, info, choices }) =>
  (<div>
    <div>
      {(header, info, choices)}
    </div>
  </div>);
// {needsAction && <Feedback style={styles.svgIcon} />
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
// ChoiceBlock.propTypes = {
//   selectedId: PropTypes.number,
//   expandedId: PropTypes.number,
//   header: PropTypes.string.isRequired,
//   info: PropTypes.string.isRequired,
//   choices: PropTypes.arrayOf(
//     PropTypes.shape({
//       idx: PropTypes.number.isRequired,
//       choiceHeader: PropTypes.string.isRequired,
//       summaryText: PropTypes.string.isRequired,
//       text: PropTypes.string,
//     }),
//   ),
//   onOK: PropTypes.func.isRequired,
//   onCancel: PropTypes.func.isRequired,
// };

// ChoiceBlock.defaultProps = {
//   selectedId: undefined,
//   expandedId: undefined,
// };

export default ChoiceBlock;
