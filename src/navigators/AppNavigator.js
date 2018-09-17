import { createStackNavigator } from "react-navigation";
import { ExploreScreen, ProfileScreen } from "../screens";
import MusicRegistrationScreen from "../screens/MusicRegistrationScreen";

export default createStackNavigator(
  {
    Explore: ExploreScreen,
    Profile: ProfileScreen,
    MusicRegistration: MusicRegistrationScreen
  },
  {
    headerMode: "none"
  }
);
