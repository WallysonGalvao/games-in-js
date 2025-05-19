import { Image, useImage } from "@shopify/react-native-skia";
import React from "react";

import { Position } from "../types";

interface FoodProps {
  position: Position;
  cellSize: number;
}

export const Food = ({ cellSize, position }: FoodProps) => {
  const image = useImage(require("../assets/images/apple.png"));

  return (
    <Image
      image={image}
      x={position.x * cellSize}
      y={position.y * cellSize}
      width={cellSize}
      height={cellSize}
    />
  );
};
