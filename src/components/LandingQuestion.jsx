import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  header: {
    color: 'black',
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
const LandingQuestion = ({ header, subheader, onEnter }) => (
  <div onClick={onEnter} role="button" tabIndex="0">
    <div style={styles.content}>
      <h1 style={styles.header}>{header}</h1>
      <h2 style={styles.subheader}>{subheader}</h2>
    </div>
  </div>
);
LandingQuestion.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  onEnter: PropTypes.func.isRequired,
};
LandingQuestion.defaultProps = {
  subheader: '',
};

export default LandingQuestion;