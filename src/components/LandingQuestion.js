import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  header: {
    color: 'white',
    fontSize: '2em',
    fontVariant: 'small-caps',
  },
  subheader: {
    color: 'black',
    fontStyle: 'italic',
    fontSize: '1em',
  },
  content: {
    flexDirection: 'column',
  },
};
const LandingQuestion = ({ header, subheader, onEnter }) =>
  (<div onClick={onEnter}>
    <div style={styles.content}>
      <h1 style={styles.header}>
        {header}
      </h1>
      <h2 style={styles.subheader}>
        {subheader}
      </h2>
    </div>
  </div>);
LandingQuestion.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  onEnter: PropTypes.func.isRequired,
};
LandingQuestion.defaultProps = {};

export default LandingQuestion;
