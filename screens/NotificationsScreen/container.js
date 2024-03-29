import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationsScreen from "./presenter";

class Container extends Component {
  static propTypes = {
    notifications: PropTypes.array,
    getNotifications: PropTypes.func.isRequired
  };

  static defaultProps = {
    notifications: []
  };

  state = {
    isFetching: false
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.notifications) {
      this.setState({
        isFetching: false
      });
    }
  };

  render() {
    return (
      <NotificationsScreen
        {...this.props}
        {...this.state}
        refresh={this._refresh}
      />
    );
  }

  _refresh = () => {
    const { getNotifications } = this.props;
    this.setState({
      isFetching: true
    });
    getNotifications();
  };
}

export default Container;
