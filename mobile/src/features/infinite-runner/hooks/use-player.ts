import { useSharedValue } from "react-native-reanimated";
import { PLAYER, SCREEN } from "../constants";

export const usePlayer = () => {
  const yPos = useSharedValue(SCREEN.height - PLAYER.height);
  const velocity = useSharedValue(0);
  const grounded = useSharedValue(true);

  const jump = () => {
    if (grounded.value) {
      velocity.value = -20;
      grounded.value = false;
    }
  };

  return { yPos, velocity, grounded, jump };
};
