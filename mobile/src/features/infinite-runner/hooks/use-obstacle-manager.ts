import { useCallback, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { OBSTACLE, SCREEN } from "../constants";
import { ObstacleProps } from "../entities/Obstacle";

export const useObstacleManager = () => {
  const { width } = useWindowDimensions();

  const xPos = useSharedValue(width);
  const yPos = useSharedValue(SCREEN.height - OBSTACLE.normalHeight);

  const [obstacles, setObstacles] = useState<ObstacleProps[]>([
    { x: xPos, y: yPos, height: OBSTACLE.normalHeight },
  ]);

  const addObstacle = useCallback(() => {
    const randomHeight =
      Math.random() > 0.5 ? OBSTACLE.normalHeight : OBSTACLE.greaterHeight;
    xPos.value = width;
    yPos.value = SCREEN.height - randomHeight;
    const height = randomHeight;

    const newObstacle = { x: xPos, y: yPos, height };

    const visibleObstacles = obstacles.filter(
      (obstacle) => obstacle.x.value + OBSTACLE.width > 0,
    );

    setObstacles([...visibleObstacles, newObstacle]);
  }, [obstacles, width, xPos, yPos]);

  const updateObstacles = useCallback(
    (gameSpeed: number) => {
      obstacles.forEach((obstacle) => {
        obstacle.x.value -= gameSpeed;
        return obstacle;
      });
    },
    [obstacles],
  );

  return {
    obstacles,
    addObstacle,
    updateObstacles,
  };
};
