import { useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { OBSTACLE, SCREEN } from "../constants";

export const useObstacle = () => {
  const { width } = useWindowDimensions();

  const xPos = useSharedValue(width);
  const yPos = useSharedValue(SCREEN.height - OBSTACLE.height);

  return { xPos, yPos };
};
