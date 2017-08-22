import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  block: {},
  svgIcon: {},
  choice: {},
};

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
        <h1>Header</h1>
        {this.props.content}
      </div>
    );
  }
}
TextBlock.propTypes = {};
TextBlock.defaultProps = {};

export default TextBlock;
