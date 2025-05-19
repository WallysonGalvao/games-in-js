import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const CANVAS_SIZE = height;
export const GRID_SIZE = 30;
export const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;
export const SPRITE_SIZE = 40;
export const SPRITE_SHEET_SIZE = 160;
export const GRASS_SIZE = 300;

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
} as const;

// generated with https://www.finalparsec.com/tools/sprite_sheet_maker
export const SPRITES = {
  // Snake body parts
  body_bottomleft: { x: 40, y: 0 },
  body_bottomright: { x: 0, y: 40 },
  body_horizontal: { x: 40, y: 40 },
  body_topleft: { x: 80, y: 0 },
  body_topright: { x: 80, y: 40 },
  body_vertical: { x: 0, y: 80 },
  // Snake head parts
  head_down: { x: 40, y: 80 },
  head_left: { x: 80, y: 80 },
  head_right: { x: 120, y: 0 },
  head_up: { x: 120, y: 40 },
  // Snake tail parts
  tail_down: { x: 120, y: 80 },
  tail_left: { x: 0, y: 120 },
  tail_right: { x: 40, y: 120 },
  tail_up: { x: 80, y: 120 },
  // Apple
  apple: { x: 0, y: 0 },
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
