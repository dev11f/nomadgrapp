import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "../../components/Profile";

class Container extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.user.username
  });

  // 이건 props를 state로 바꾸는 것. 업데이트 하려고
  constructor(props) {
    super(props);
    const {
      // 이 순서는 console.log 하면 알 수 있음.
      navigation: {
        state: {
          params: { user }
        }
      }
    } = props;
    this.state = {
      profileObject: user
    };
  }

  componentDidMount = () => {
    this._getProfile();
  };

  static propTypes = {};

  render() {
    const { profileObject } = this.state;
    return <Profile {...this.state} refresh={this._getProfile} />;
  }

  _getProfile = async () => {
    const { getProfile } = this.props;
    const {
      profileObject: { username }
    } = this.state;
    const completeProfile = await getProfile(username);
    if (completeProfile.username) {
      this.setState({
        profileObject: completeProfile
      });
    }
  };
}

export default Container;
