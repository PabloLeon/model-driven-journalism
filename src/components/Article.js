import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import LandingQuestion from './LandingQuestion';
import MapView from './MapView';

const styles = {
  container: { display: 'flex', flexWrap: 'nowrap', alignItems: 'center' },
};

class Article extends Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.container}>
        <LandingQuestion />
        <MapView />
      </div>
    );
  }
}

Article.propTypes = {};
Article.defaultProps = {};

export default withStyles(styles, { name: 'Article' })(Article);
