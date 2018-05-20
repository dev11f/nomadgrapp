import { StackNavigator } from "react-navigation";
import ProfileScreen from "../screens/ProfileScreen";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const ProfileRoute = StackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ screenProps }) => ({
        // (props라고 해도 되는데, 그 중 하나인 screenProps만 가져온 것)
        headerTitle: screenProps.username
      })
    },
    ...sharedRoutes
  },
  {
    ...sharedOptions
  }
);

export default ProfileRoute;
