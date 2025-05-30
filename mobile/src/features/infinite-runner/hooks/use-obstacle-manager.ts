import { useCallback, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { OBSTACLE, SCREEN } from "../constants";
import { ObstacleProps } from "../entities/Obstacle";

export const useObstacleManager = () => {
  const { width } = useWindowDimensions();

  const xPos = useSharedValue(width);
  const yPos = useSharedValue(SCREEN.height - OBSTACLE.height);
  const nextSpawnTime = useSharedValue(0);

  const [obstacles, setObstacles] = useState<ObstacleProps[]>([
    { x: xPos, y: yPos },
  ]);

  const addObstacle = useCallback(() => {
    const newObstacle = {
      id: Math.random().toString(36).substring(7),
      x: xPos,
      y: yPos,
    };

    setObstacles((prev) => [...prev, newObstacle]);
  }, [xPos, yPos]);

  const updateObstacles = useCallback(() => {
    setObstacles((prev) => {
      const updated = prev
        .map((ob) => {
          ob.x.value -= 5;
          return ob;
        })
        .filter((ob) => ob.x.value > -OBSTACLE.width);

      return updated;
    });
  }, []);

  return {
    obstacles,
    nextSpawnTime,
    addObstacle,
    updateObstacles,
    setObstacles,
  };
};
