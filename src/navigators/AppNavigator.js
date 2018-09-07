import { createStackNavigator } from "react-navigation";
import { ExploreScreen, ProfileScreen } from "../screens";

export default createStackNavigator(
  {
    Explore: ExploreScreen,
    Profile: ProfileScreen
  },
  {
    headerMode: "none"
  }
);
