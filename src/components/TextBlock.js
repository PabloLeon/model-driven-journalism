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
