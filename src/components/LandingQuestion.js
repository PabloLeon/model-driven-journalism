import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  box: {
    position: 'fixed',
    top: '40%',
    left: '15%',
    fontFamily: 'Prata',
    color: 'black',
    width: '500px',
    height: '300px',
    backgroundColor: 'green',
    overflow: 'auto',
    cursor: 'pointer',
  },
};
const LandingQuestion = ({ header, subheader, onEnter }) =>
  (<div onClick={onEnter} style={styles.box}>
    <h1>
      {header}
    </h1>
    <h2>
      {subheader}
    </h2>
  </div>);
LandingQuestion.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  onEnter: PropTypes.func.isRequired,
};
LandingQuestion.defaultProps = {};

export default LandingQuestion;
