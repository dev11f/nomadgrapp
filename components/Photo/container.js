import React, { Component } from "react";
import PropTypes from "prop-types";
import Photo from "./presenter";

class Container extends Component {
  // is_liked를 하트가 눌렀을 때 바로 반영하려면 props인 is_liked를 state로 복사해야 함.
  constructor(props) {
    super(props);
    this.state = {
      // redux store에서 온 is_liked를 isLiked라는 state로 옮김
      isLiked: props.is_liked,
      likeCount: props.like_count
    };
  }
  static propTypes = {
    dispatchLike: PropTypes.func.isRequired
  };

  render() {
    return (
      <Photo handlePress={this._handlePress} {...this.props} {...this.state} />
    );
  }

  _handlePress = () => {
    const { dispatchLike } = this.props;
    const { isLiked } = this.state;
    dispatchLike(isLiked);
    if (isLiked) {
      this.setState(prevState => {
        return {
          isLiked: false,
          likeCount: prevState.likeCount - 1
        };
      });
      //  이 경우 setState는 async이기 때문에 this.state를 완벽히 신뢰할 수 없음
      // this.setState({
      // likeCount: this.state.likeCount - 1
      // })
    } else {
      this.setState(prevState => {
        return {
          isLiked: true,
          likeCount: prevState.likeCount + 1
        };
      });
    }
  };

  // 이렇게 async와 await를 쓰면 하트를 누르고 서버에서 승인해준다음 하트가 빨강색으로 바뀜
  // 느려짐. 좋아요는 그렇게 중요한 게 아니니까 서버 승인 없이 바로 보여주도록 하겠음.
  // _handlePress = async () => {
  //   const { dispatchLike } = this.props;
  //   const { isLiked } = this.state;
  //   const result = await dispatchLike(isLiked);
  //   if (result) {
  //     if (isLiked) {
  //       this.setState(prevState => {
  //         return {
  //           isLiked: false,
  //           likeCount: prevState.likeCount - 1
  //         };
  //       });
  //       //  이 경우 setState는 async이기 때문에 this.state를 완벽히 신뢰할 수 없음
  //       // this.setState({
  //       // likeCount: this.state.likeCount - 1
  //       // })
  //     } else {
  //       this.setState(prevState => {
  //         return {
  //           isLiked: true,
  //           likeCount: prevState.likeCount + 1
  //         };
  //       });
  //     }
  //   } else {
  //   }
  // };
}

export default Container;
