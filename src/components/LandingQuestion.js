import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = {
  box: {
    position: 'fixed',
    top: '40%',
    left: '15%',
  },
  header: {
    fontFamily: 'Prata',
    color: 'black',
  },
};

class LandingQuestion extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.box}>
        <Typography className={classes.header} type="display3" component="h1">
          {this.props.text}
        </Typography>
      </div>
    );
  }
}

LandingQuestion.propTypes = {
  text: PropTypes.string.isRequired,
};
LandingQuestion.defaultProps = {
  text: 'default text',
};

export default withStyles(styles, { name: 'LandingQuestion' })(LandingQuestion);
