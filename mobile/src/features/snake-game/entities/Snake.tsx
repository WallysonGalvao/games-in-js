import { Group, Rect } from "@shopify/react-native-skia";
import React from "react";

type Position = {
  x: number;
  y: number;
};

interface SnakeProps {
  cellSize: number;
}

const snakeColor = "#4CAF50";

export const Snake = ({ cellSize }: SnakeProps) => {
  const body: Position[] = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];

  return (
    <Group>
      {body.map((segment, index) => (
        <Rect
          key={`snake-${index}`}
          x={segment.x * cellSize}
          y={segment.y * cellSize}
          width={cellSize}
          height={cellSize}
          color={snakeColor}
        />
      ))}
    </Group>
  );
};
