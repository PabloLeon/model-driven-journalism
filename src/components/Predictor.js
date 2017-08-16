import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import grey from 'material-ui/colors/grey';

const styles = {
  chip: {
    margin: '4em',
  },
  svgIcon: {
    color: grey[800],
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
    const classes = this.props.classes;

    return (
      <div style={{}}>
        <Chip
          className={classes.chip}
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
export default withStyles(styles, { name: 'Predictor' })(Predictor);
