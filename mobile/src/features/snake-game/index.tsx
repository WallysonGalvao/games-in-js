import { Canvas, Fill, Line, vec } from "@shopify/react-native-skia";
import React from "react";
import { CANVAS_SIZE, CELL_SIZE, GRID_SIZE } from "./constants";
import { Food } from "./entities/Food";
import { Snake } from "./entities/Snake";

const bgColor = "#2c3e50";
const lineColor = "#ffffff33";

export default function SnakeGame() {
  const gridLines = [];

  for (let i = 0; i <= GRID_SIZE; i++) {
    // Vertical lines
    gridLines.push(
      <Line
        key={`v-${i}`}
        p1={vec(i * CELL_SIZE, 0)}
        p2={vec(i * CELL_SIZE, CANVAS_SIZE)}
        color={lineColor}
        strokeWidth={1}
      />,
    );

    // Horizontal lines
    gridLines.push(
      <Line
        key={`h-${i}`}
        p1={vec(0, i * CELL_SIZE)}
        p2={vec(CANVAS_SIZE, i * CELL_SIZE)}
        color={lineColor}
        strokeWidth={1}
      />,
    );
  }

  return (
    <Canvas style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Fill color={bgColor} />
      {gridLines}
      <Snake cellSize={CELL_SIZE} />
      <Food cellSize={CELL_SIZE} />
    </Canvas>
  );
}
