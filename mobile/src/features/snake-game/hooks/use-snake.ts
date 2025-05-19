import { useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  CELL_SIZE,
  GRID_SIZE,
  INITIAL_DIRECTION,
  INITIAL_SNAKE_POSITION,
} from "../constants";
import { Position } from "../types";

export const useSnake = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const maxCellsX = Math.floor(screenWidth / CELL_SIZE);
  const maxCellsY = Math.floor(screenHeight / CELL_SIZE);

  const effectiveGridSizeX = Math.min(GRID_SIZE, maxCellsX);
  const effectiveGridSizeY = Math.min(GRID_SIZE, maxCellsY);

  const [body, setBody] = useState<Position[]>(INITIAL_SNAKE_POSITION);

  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] =
    useState<Position>(INITIAL_DIRECTION);

  const addTail = () => {
    const tail = body[body.length - 1];
    setBody((prevBody) => [...prevBody, tail]);
  };

  const move = () => {
    setDirection(nextDirection);

    setBody([
      {
        x: body[0].x + nextDirection.x,
        y: body[0].y + nextDirection.y,
      },
      ...body.slice(0, -1),
    ]);
  };

  const checkCollisions = () => {
    const nextHead = {
      x: body[0].x + nextDirection.x,
      y: body[0].y + nextDirection.y,
    };

    const hitWall =
      nextHead.x >= effectiveGridSizeX + 1 ||
      nextHead.x < 0 ||
      nextHead.y < 0 ||
      nextHead.y >= effectiveGridSizeY - 3;

    const hitSelf = body.some(
      (segment) => segment.x === nextHead.x && segment.y === nextHead.y,
    );

    return hitWall || hitSelf;
  };

  const changeDirection = (newDir: Position) => {
    const isOpposite =
      (newDir.x !== 0 && direction.x === -newDir.x) ||
      (newDir.y !== 0 && direction.y === -newDir.y);

    if (!isOpposite) {
      setNextDirection(newDir);
    }
  };

  return {
    body,
    setBody,
    direction,
    setNextDirection,
    move,
    checkCollisions,
    changeDirection,
    addTail,
  };
};
