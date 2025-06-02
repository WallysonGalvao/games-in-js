import { useCallback, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { OBSTACLE, SCREEN } from "../constants";
import { ObstacleProps } from "../entities/Obstacle";

export const useObstacleManager = () => {
  const { width } = useWindowDimensions();

  const xPos = useSharedValue(width);
  const yPos = useSharedValue(SCREEN.height - OBSTACLE.height);

  const [obstacles, setObstacles] = useState<ObstacleProps[]>([
    { x: xPos, y: yPos },
  ]);

  const addObstacle = useCallback(() => {
    xPos.value = width;
    const newObstacle = { x: xPos, y: yPos };

    // setObstacles((prevObstacles) => {
    //   const visibleObstacles = prevObstacles.filter(
    //     (obstacle) => obstacle.x.value > -width,
    //   );
    //   return [...visibleObstacles, newObstacle];
    // });

    const visibleObstacles = obstacles.filter(
      (obstacle) => obstacle.x.value > -width,
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
