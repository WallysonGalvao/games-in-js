import { Rect } from "@shopify/react-native-skia";
import React from "react";

import { colors } from "../constants";
import { Position } from "../types";

interface FoodProps {
  position: Position;
  cellSize: number;
}

export const Food = ({ cellSize, position }: FoodProps) => {
  return (
    <Rect
      x={position.x * cellSize}
      y={position.y * cellSize}
      width={cellSize}
      height={cellSize}
      color={colors.food}
    />
  );
};
