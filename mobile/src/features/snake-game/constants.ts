import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const CANVAS_SIZE = height;
export const GRID_SIZE = 30;
export const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;
