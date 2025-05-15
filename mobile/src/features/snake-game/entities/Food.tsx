import { Rect } from "@shopify/react-native-skia";
import React, { useMemo } from "react";

import { useWindowDimensions } from "react-native";
import { GRID_SIZE } from "../constants";

type Position = {
  x: number;
  y: number;
};

interface FoodProps {
  cellSize: number;
}

const foodColor = "#e74c3c";

export const Food = ({ cellSize }: FoodProps) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const maxCellsX = Math.floor(screenWidth / cellSize);
  const maxCellsY = Math.floor(screenHeight / cellSize);

  const effectiveGridSizeX = Math.min(GRID_SIZE, maxCellsX);
  const effectiveGridSizeY = Math.min(GRID_SIZE, maxCellsY);

  const position: Position = useMemo(() => {
    return {
      x: Math.floor(Math.random() * effectiveGridSizeX),
      y: Math.floor(Math.random() * effectiveGridSizeY),
    };
  }, [effectiveGridSizeX, effectiveGridSizeY]);

  return (
    <Rect
      x={position.x * cellSize}
      y={position.y * cellSize}
      width={cellSize}
      height={cellSize}
      color={foodColor}
    />
  );
};
