import { Group, Rect } from "@shopify/react-native-skia";
import React from "react";
import { colors } from "../constants";
import { Position } from "../types";

interface SnakeProps {
  cellSize: number;
  body: Position[];
}

export const Snake = ({ cellSize, body }: SnakeProps) => {
  return (
    <Group>
      {body.map((segment, index) => {
        return (
          <Rect
            key={`snake-${index}`}
            x={segment.x * cellSize}
            y={segment.y * cellSize}
            width={cellSize}
            height={cellSize}
            color={colors.snake}
          />
        );
      })}
    </Group>
  );
};
