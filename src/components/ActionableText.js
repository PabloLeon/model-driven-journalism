import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Feedback from 'material-ui-icons/Feedback';

const styleSheet = createStyleSheet(theme => ({
  text: {
    textDecoration: 'underline',
  },
  onHover: {
    cursor: 'pointer',
  },
  noHover: {},
  svgIcon: {
    display: 'inlineFlex',
    alignSelf: 'center',
    position: 'relative',
    height: '1em',
    width: '1em',
    bottom: '0.25em',
    position: 'relative',
  },
}));

// TODO: wrapping the contextual element (option or additional info) into
// an actionable HOC would be the most flexible, as we will end up with
// different actionable text elements, e.g. geolocation -> actionable
// geolocation = pick your area, actionable value -> pick a value (e.g. target days)
// actionable choice -> pick from a set of options

// for all of these we could provide the following options: defaultValue,
// onMouseOver/MouseOut (e.g. actionable value could be like in tangle)
// needsAction value

class ActionableText extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.state = { showAction: false, hover: false };
  }
  handleClick(e) {
    e.preventDefault();
    this.setState({ showAction: true });
  }
  handleMouseOut(e) {
    e.preventDefault();
    this.setState({ hover: false });
  }
  handleMouseOver(e) {
    e.preventDefault();
    this.setState({ hover: true });
  }
  render() {
    const classes = this.props.classes;

    return (
      <span className={classes.text}>
        <span
          onClick={this.handleClick}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          className={this.state.hover ? classes.onHover : classes.noHover}
        >
          {this.props.text}
        </span>
        {this.props.needsAction && <Feedback className={classes.svgIcon} />}
      </span>
    );
  }
}
ActionableText.propTypes = {
  text: PropTypes.string.isRequired,
  needsAction: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
ActionableText.defaultProps = {
  needsAction: false,
  onClick: () => console.log('action action'),
};

export default withStyles(styleSheet)(ActionableText);
