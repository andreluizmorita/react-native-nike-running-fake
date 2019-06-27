import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import BeginRunScreen from "./screens/BeginRunScreen";
import HistoryScreen from "./screens/HistoryScreen";
import RunningScreen from "./screens/RunningScreen";

import { createAppContainer, createStackNavigator } from "react-navigation";
import getSceneIndicesForInterpolationInputRange from "@react-navigation/core/src/utils/getSceneIndicesForInterpolationInputRange";

const forFadedZoom = props => {
  const { layout, position, scene } = props;
  const interpolate = getSceneIndicesForInterpolationInputRange(props);

  if (!interpolate) return { opacity: 0 };

  const { first, last } = interpolate;
  const index = scene.index;
  const opacity = position.interpolate({
    inputRange: [first, index, last],
    outputRange: [0, 1, 1]
  });

  const scale = position.interpolate({
    inputRange: [first, index, last],
    outputRange: [1.2, 1, 1.2]
  });

  return {
    opacity,
    transform: [{ scale }]
  };
};

const stackNavigator =  createStackNavigator(
  {
    Splash: { screen: SplashScreen },
    Home: { screen: HomeScreen },
    BeginRun: { screen: BeginRunScreen },
    History: { screen: HistoryScreen },
    Running: { screen: RunningScreen  }
  },
  {
    initialRouteName: "Splash",
    headerMode: "none",
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
        return forFadedZoom(sceneProps);
      }
    })
  }
);

const Routes = createAppContainer(stackNavigator);
export default Routes;
