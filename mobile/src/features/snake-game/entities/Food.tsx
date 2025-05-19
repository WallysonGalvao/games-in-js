import { Image, rect, useImage } from "@shopify/react-native-skia";
import React from "react";

import { SPRITE_SHEET_SIZE, SPRITE_SIZE } from "../constants";
import { Position } from "../types";

interface FoodProps {
  position: Position;
  cellSize: number;
}

export const Food = ({ cellSize, position }: FoodProps) => {
  const image = useImage(require("../assets/images/sprite_sheet.png"));

  const x = position.x * cellSize;
  const y = position.y * cellSize;

  const clip = rect(x, y, SPRITE_SIZE, SPRITE_SIZE);

  return (
    <Image
      image={image}
      x={position.x * cellSize}
      y={position.y * cellSize}
      width={SPRITE_SHEET_SIZE}
      height={SPRITE_SHEET_SIZE}
      clip={clip}
      fit="contain"
    />
  );
};
