import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    // const classes = this.props.classes;
    return (
      <div style={styles.box}>
        <h1 style={styles.header}>
          {this.props.text}
        </h1>
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

export default LandingQuestion;
