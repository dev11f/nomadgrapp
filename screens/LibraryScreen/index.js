import React, { Component } from "react";
import { CameraRoll } from "react-native";
import LibraryScreen from "./presenter";

class Container extends Component {
  state = {
    photos: null,
    pickedPhoto: null
  };

  componentWillMount = async () => {
    // const cameraPhotos = await CameraRoll.getPhotos({
    const { edges } = await CameraRoll.getPhotos({
      first: 200,
      groupTypes: "SavedPhotos",
      assetType: "Photos"
    });
    this.setState({
      // photos: cameraPhotos.edges,
      photos: edges,
      pickedPhoto: edges[0]
    });
  };
  render() {
    return (
      <LibraryScreen
        {...this.state}
        pickPhoto={this._pickPhoto}
        approvePhoto={this._approvePhoto}
      />
    );
  }

  _pickPhoto = photo => {
    this.setState({
      pickedPhoto: photo
    });
  };

  _approvePhoto = () => {
    // component면 withNavigation을 해야 하지만 Screen에는 이미 있음
    const {
      navigation: { navigate }
    } = this.props;
    const { pickedPhoto } = this.state;
    navigate("UploadPhoto", { uri: pickedPhoto.node.image.uri });
  };
}

export default Container;
