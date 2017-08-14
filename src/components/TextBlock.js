import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

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
  componentDidUnmount() {}
  selectOption(e) {
    e.preventDefault();
  }
  render() {
    const classes = this.props.classes;

    return <div className="paper" />;
  }
}
TextBlock.propTypes = {};
TextBlock.defaultProps = {};

export default withStyles(styleSheet)(TextBlock);
