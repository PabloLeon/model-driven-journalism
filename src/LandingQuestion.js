import React, { Component } from 'react';

const landingStyle = {
  position: 'fixed',
  top: '40%',
  left: '15%',
};
class LandingQuestion extends Component {
  render() {
    return (
      <div style={landingStyle}>
        <h1> Landing Question </h1>
        <p>Some text</p>
      </div>
    );
  }
}

export default LandingQuestion;
