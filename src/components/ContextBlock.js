import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {};

class ContextBlock extends Component {
  render() {
    const { header, info } = this.props;
    return (
      <div>
        <h1>
          {header}
        </h1>
        <p>
          {info}
        </p>
      </div>
    );
  }
}
ContextBlock.propTypes = {
  header: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  onOK: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

ContextBlock.defaultProps = {};

export default ContextBlock;
