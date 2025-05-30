import { Dimensions } from "react-native";

const { height: screenHeight } = Dimensions.get("window");

export const SCREEN = {
  height: screenHeight - 120,
};

export const PLAYER = {
  width: 50,
  height: 50,
  color: "#FFFFFF",
};

export const OBSTACLE = {
  width: 30,
  height: 70,
  color: "#fff000",
};
