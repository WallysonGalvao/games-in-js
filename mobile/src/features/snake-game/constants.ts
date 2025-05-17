import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const CANVAS_SIZE = height;
export const GRID_SIZE = 30;
export const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
} as const;

export const colors = {
  bg: "#2c3e50",
  line: "#ffffff33",
  snake: "#4CAF50",
  food: "#e74c3c",
} as const;

export const INITIAL_SNAKE_POSITION = [
  { x: 5, y: 10 },
  { x: 4, y: 10 },
  { x: 3, y: 10 },
];
