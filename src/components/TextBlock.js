import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ActionableText from './ActionableText';

const styles = {
  block: {},
  svgIcon: {},
  choice: {},
};

const defaultText = 'Default text';

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
    return (
      <div>
        {this.props.mdText}
      </div>
    );
  }
}
TextBlock.propTypes = {};
TextBlock.defaultProps = {
  mdText: defaultText,
};

export default withStyles(styles, { name: 'TextBlock' })(TextBlock);
