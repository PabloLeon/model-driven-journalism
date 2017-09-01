import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import ContextBlock from './ContextBlock';
import RangeBlock from './RangeBlock';
import ChoiceBlock from './ChoiceBlock';

const styles = {
  block: {},
  svgIcon: {},
  choice: {},
  dialog: {
    flex: true,
  },
};

const showContext = (id, specs, takenChoices, closeContext, choiceFun) => {
  if (id in specs) {
    // get all choices for the id
    const selectionObj = takenChoices.find(c => c.id === id);
    let selected = null;
    const s = specs[id];
    switch (s.type) {
      case 'context':
        return <ContextBlock id={id} header={s.header} info={s.info} onClose={closeContext} />;
      case 'range': {
        if (selectionObj) {
          selected = selectionObj.payload.rangeValue;
        }
        return (
          <RangeBlock
            id={id}
            header={s.header}
            info={s.info}
            range={s.range}
            onChoice={choiceFun}
            onClose={closeContext}
            value={selected}
          />
        );
      }
      case 'choice': {
        if (selectionObj) {
          selected = selectionObj.payload.choiceId;
        }
        return (
          <ChoiceBlock
            id={id}
            header={s.header}
            info={s.info}
            selected={selected}
            choices={s.choices}
            makeChoice={choiceFun}
            onClose={closeContext}
          />
        );
      }
      default:
        return <div>Undefined Context </div>;
    }
  }
  return <div>Undefined Context </div>;
};
const TextBlock = ({
  header,
  content,
  currentShowId,
  closeContext,
  contextInfo,
  canProceed,
  makeChoice,
  selected,
  onNext,
}) => (
  <div>
    <h1>{header}</h1>
    <div style={styles.block}>
      {content}
      {
        <Dialog style={styles.dialog} modal={false} open={currentShowId !== 'undefined'}>
          {currentShowId !== 'undefined' &&
            showContext(currentShowId, contextInfo, selected, closeContext, makeChoice)}
          <RaisedButton label={'OK'} primary onClick={closeContext} />
        </Dialog>
      }
    </div>
    {canProceed && <RaisedButton label={'Next'} primary onClick={onNext} />}
  </div>
);

TextBlock.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.node).isRequired,
  currentShowId: PropTypes.string.isRequired,
  canProceed: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  makeChoice: PropTypes.func.isRequired,
  closeContext: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired, payload: PropTypes.shape({}) }),
  ).isRequired,
  contextInfo: PropTypes.shape({
    id: PropTypes.shape({
      type: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      range: PropTypes.shape({}),
      choices: PropTypes.shape({}),
    }),
  }),
};
TextBlock.defaultProps = {
  contextInfo: {},
};

export default TextBlock;
