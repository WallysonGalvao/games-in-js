import { Rect } from "@shopify/react-native-skia";
import React from "react";
import { SharedValue } from "react-native-reanimated";
import { PLAYER } from "../constants";

type PlayerProps = {
  x: number;
  y: SharedValue<number>;
};

export const Player = ({ x, y }: PlayerProps) => {
  return (
    <Rect
      x={x}
      y={y}
      width={PLAYER.width}
      height={PLAYER.height}
      color={PLAYER.color}
    />
  );
};
