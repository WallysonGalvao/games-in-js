import { Line, vec } from "@shopify/react-native-skia";
import { CANVAS_SIZE, CELL_SIZE, colors, GRID_SIZE } from "../constants";

export const GridLines = () => {
  const gridLines = [];

  for (let i = 0; i <= GRID_SIZE; i++) {
    // Vertical lines
    gridLines.push(
      <Line
        key={`v-${i}`}
        p1={vec(i * CELL_SIZE, 0)}
        p2={vec(i * CELL_SIZE, CANVAS_SIZE)}
        color={colors.line}
        strokeWidth={1}
      />,
    );

    // Horizontal lines
    gridLines.push(
      <Line
        key={`h-${i}`}
        p1={vec(0, i * CELL_SIZE)}
        p2={vec(CANVAS_SIZE, i * CELL_SIZE)}
        color={colors.line}
        strokeWidth={1}
      />,
    );
  }

  return gridLines;
};
