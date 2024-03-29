import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Profile from "./presenter";
import ActionSheet from "react-native-actionsheet";

const options = ["Cancel", "Log Out"];
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

class Container extends Component {
  static propTypes = {
    profileObject: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired
  };
  state = {
    isFetching: true,
    mode: "grid"
  };

  componentDidMount = () => {
    const { profileObject } = this.props;
    if (profileObject) {
      this.setState({
        isFetching: false
      });
    }
  };

  // 다른 사람의 profile을 불러올 때 필요. 내 profile을 불러올 땐 필요 없지만.
  componentWillReceiveProps = nextProps => {
    if (nextProps.profileObject) {
      this.setState({
        isFetching: false
      });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Profile
          {...this.props}
          {...this.state}
          changeToList={this._changeToList}
          changeToGrid={this._changeToGrid}
          showAS={this._showActionSheet}
        />
        <ActionSheet
          // 오브젝트에 레퍼런스 하려면 함수를 만들어야함
          ref={actionSheet => (this.actionSheet = actionSheet)}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this._handleSheetPress}
        />
      </View>
    );
  }

  _changeToList = () => {
    this.setState({
      mode: "list"
    });
  };

  _changeToGrid = () => {
    this.setState({
      mode: "grid"
    });
  };

  _showActionSheet = () => {
    const {
      profileObject: { is_self }
    } = this.props;
    if (is_self) {
      this.actionSheet.show();
    }
  };

  _handleSheetPress = index => {
    const { logOut } = this.props;
    if (index === 1) {
      logOut();
    }
  };
}

export default Container;
