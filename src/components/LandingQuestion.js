import React, { Component } from 'react';

const landingStyle = {
  position: 'fixed',
  top: '40%',
  left: '15%',
};
const headerStyle = {
  fontFamily: 'Prata',
};
class LandingQuestion extends Component {
  render() {
    return (
      <div style={landingStyle}>
        <div style={headerStyle}>
          <h1> Landing Question </h1>
        </div>
        <p>Some text</p>
      </div>
    );
  }
}

export default LandingQuestion;
