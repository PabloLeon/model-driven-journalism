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

class LandingQuestion extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.props.clickQuestion();
  }
  render() {
    // const classes = this.props.classes;
    return (
      <div onClick={e => this.handleClick(e)} style={styles.box}>
        <h1>
          {this.props.text}
        </h1>
      </div>
    );
  }
}

LandingQuestion.propTypes = {
  text: PropTypes.string.isRequired,
  clickQuestion: PropTypes.func.isRequired,
};
LandingQuestion.defaultProps = {
  text: 'How succesful is the NHS at delivering on referral to treatment targets for cancer?',
};

export default LandingQuestion;
