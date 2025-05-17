import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { CELL_SIZE, GRID_SIZE } from "../constants";
import { Position } from "../types";

export const useFood = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const maxCellsX = Math.floor(screenWidth / CELL_SIZE);
  const maxCellsY = Math.floor(screenHeight / CELL_SIZE);

  const effectiveGridSizeX = Math.min(GRID_SIZE, maxCellsX);
  const effectiveGridSizeY = Math.min(GRID_SIZE, maxCellsY);

  const [position, setPosition] = useState<Position>({
    x: Math.floor(Math.random() * effectiveGridSizeX),
    y: Math.floor(Math.random() * effectiveGridSizeY),
  });

  const getRandomPosition = () => {
    return {
      x: Math.floor(Math.random() * effectiveGridSizeX),
      y: Math.floor(Math.random() * effectiveGridSizeY),
    };
  };

  const respawn = () => {
    setPosition(getRandomPosition());
  };

  return { position, respawn };
};
