import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';

const styles = {
  card: {
    minWidth: 400,
    maxWidth: 600,
  },
};

class TinderNavigation extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(e, v) {
    e.preventDefault();
    this.props.onSelect(v);
  }
  render() {
    const { onDelete, text, context } = this.props;
    return (
      <BottomNavigation onChange={this.handleSelect} showLabels>
        <BottomNavigationButton label="Below" icon={<ThumbDown />} />
        <BottomNavigationButton label="Above" icon={<ThumbUp />} />
      </BottomNavigation>
    );
  }
}
export default TinderNavigation;
