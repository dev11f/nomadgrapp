import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    creator: { id }
  } = ownProps;
  return {
    followUser: () => {
      return dispatch(userActions.followUser(id));
    },
    unfollowUser: () => {
      return dispatch(userActions.unfollowUser(id));
    }

    // 이건 container 밖에서 체크하는 경우. 이 경우보다 안에서 체크하는 게 더 낫다.
    // handleFollowPress: isFollowing => {
    //   if (isFollowing) {
    //     return dispatch(userActions.unfollowUser(id));
    //   } else {
    //     return dispatch(userActions.followUser(id));
    //   }
    // }
  };
};

export default connect(null, mapDispatchToProps)(Container);
