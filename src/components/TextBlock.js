import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

export default TextBlock;
