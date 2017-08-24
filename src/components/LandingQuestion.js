import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

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

    this.updateLocalizationStatus = this.props.updateLocalizationStatus.bind(this);
    this.updateCoordinates = this.props.updateCoordinates.bind(this);
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('succesfully localized the user: ', position.coords);
        this.updateLocalizationStatus('localized');
        this.updateCoordinates([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.log('error localizing the user', error.message);
        this.updateLocalizationStatus('error');
        this.updateCoordinates([undefined, undefined]);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  render() {
    const {
      header,
      subheader,
      onEnter,
      status,
      updateCoordinates,
      updateLocalizationStatus,
    } = this.props;
    return (
      <div>
        <h1>
          {header}
        </h1>
        <h2>
          {subheader}
        </h2>
        {status !== 'localized'
          ? <div>
              Getting geolocation: {status}
          </div>
          : <RaisedButton primary />}
      </div>
    );
  }
}
LandingQuestion.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  status: PropTypes.string.isRequired,
  onEnter: PropTypes.func.isRequired,
};
LandingQuestion.defaultProps = {};

export default LandingQuestion;
