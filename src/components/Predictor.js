import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: '4em',
  },
  svgIcon: {
    color: '#424242',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
};

class Predictor extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = { showContext: false };
  }
  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({
      showContext: !prevState.showContext,
    }));
  }
  handleDelete(e) {
    console.log('delete predictor');
  }

  render() {
    const { onDelete, text, context } = this.props;
    return (
      <div style={{}}>
        <Chip
          style={styles.chip}
          label={text}
          onClick={this.handleClick}
          onRequestDelete={this.handleDelete}
        />
        {this.state.showContext &&
          <div>
            {context}
          </div>}
      </div>
    );
  }
}
Predictor.propTypes = {
  onRequestDelete: PropTypes.func.isRequired,
};
export default Predictor;
