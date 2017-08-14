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
      <div className={classes.text}>
        <span
          onClick={this.handleClick}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          className={this.state.hover ? classes.onHover : classes.noHover}
        >
          {this.props.text}
        </span>
        {this.props.needsAction && <Feedback className={classes.svgIcon} />}
      </div>
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
