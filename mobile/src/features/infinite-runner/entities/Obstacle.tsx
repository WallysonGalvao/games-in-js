import { Rect } from "@shopify/react-native-skia";
import React from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { OBSTACLE } from "../constants";

export type ObstacleProps = {
  x: SharedValue<number>;
  y: SharedValue<number>;
  height: number;
};

export const Obstacle = ({ x, y, height }: ObstacleProps) => {
  const derivedX = useDerivedValue(() => x.value);
  const derivedY = useDerivedValue(() => y.value);

  return (
    <Rect
      x={derivedX}
      y={derivedY}
      width={OBSTACLE.width}
      height={height}
      color={OBSTACLE.color}
    />
  );
};
