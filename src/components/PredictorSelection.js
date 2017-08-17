import React, { Component } from 'react';

const styleSheet = createStyleSheet({
  box: {},
  selected: {},
  options: {},
});
class PredictorSelection extends Component {
  render() {
    const {} = this.props;
    return <div>Test</div>;
  }
}

export default withStyles(styleSheet)(PredictorSelection);
