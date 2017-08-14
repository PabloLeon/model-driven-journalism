import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import marksy from 'marksy/components';

import ActionableText from './ActionableText';

const defaultText = `
  The text can contain any **sort of markdown**,
  ## Subheaders
  
  - List items
  - And another one

  And also custom components, like actionable items:

  **i am actionable, but i don't know how i should pass all my options**

  maybe just by id?
`;
// components: {
//   Action(props) {
//     return <ActionableText text={props.text} />;
//   },

const compile = marksy({
  createElement,
  elements: {
    strong({ id, children }) {
      return <ActionableText text={children} />;
    },
  },
});

const styleSheet = createStyleSheet(theme => ({
  block: {},
  svgIcon: {},
  choice: {},
}));

class TextBlock extends Component {
  constructor(props) {
    super(props);
    this.selectOption = this.selectOption.bind(this);
    this.state = { nextOption: 0, canProceed: true };
  }
  componentDidMount() {}
  componentWillUnmount() {}
  selectOption(e) {
    e.preventDefault();
  }
  render() {
    const classes = this.props.classes;
    const compiledBlock = compile(this.props.mdText);
    return (
      <div>
        {compiledBlock.tree}
      </div>
    );
  }
}
TextBlock.propTypes = {};
TextBlock.defaultProps = {
  mdText: defaultText,
};

export default withStyles(styleSheet)(TextBlock);
