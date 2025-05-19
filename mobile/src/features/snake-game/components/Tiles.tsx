import { Dimensions } from "react-native";

import { Image, useImage } from "@shopify/react-native-skia";
import { GRASS_SIZE } from "../constants";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const Tiles = () => {
  const image = useImage(require("../assets/images/grass.jpg"));

  const tiles = [];

  const columns = Math.ceil(screenWidth / GRASS_SIZE);
  const rows = Math.ceil(screenHeight / GRASS_SIZE);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      tiles.push(
        <Image
          key={`${row}-${col}`}
          image={image}
          x={col * GRASS_SIZE}
          y={row * GRASS_SIZE}
          width={GRASS_SIZE}
          height={GRASS_SIZE}
        />,
      );
    }
  }

  return tiles;
};
