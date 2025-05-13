import React from "react";
import Animated, {
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Line as SVGLine } from "react-native-svg";
import { GUESSES } from "../constants";
import { Line } from "./Line";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type HangmanFigureProps = {
  remainingGuesses: number;
};

function HangmanFigure({ remainingGuesses }: HangmanFigureProps) {
  const gallowsLines = [
    { x1: 40, y1: 180, x2: 160, y2: 180 },
    { x1: 60, y1: 20, x2: 60, y2: 180 },
    { x1: 60, y1: 20, x2: 140, y2: 20 },
    { x1: 140, y1: 20, x2: 140, y2: 50 },
  ];

  const parts = [
    { type: "line", x1: 140, y1: 70, x2: 140, y2: 120, id: "body" },
    { type: "line", x1: 140, y1: 85, x2: 120, y2: 100, id: "leftArm" },
    { type: "line", x1: 140, y1: 85, x2: 160, y2: 100, id: "rightArm" },
    { type: "line", x1: 140, y1: 120, x2: 120, y2: 140, id: "leftLeg" },
    { type: "line", x1: 140, y1: 120, x2: 160, y2: 140, id: "rightLeg" },
  ];

  const animatedCirlceProps = useAnimatedProps(() => ({
    opacity: withTiming(GUESSES - remainingGuesses > 0 ? 1 : 0, {
      duration: 500,
    }),
  }));

  return (
    <Svg width="200" height="200" viewBox="0 0 200 200">
      {gallowsLines.map((line, i) => (
        <SVGLine key={i} {...line} stroke="#38444d" strokeWidth="4" />
      ))}

      <AnimatedCircle
        cx="140"
        cy="60"
        r="10"
        stroke="#F231A5"
        strokeWidth="4"
        animatedProps={animatedCirlceProps}
      />

      {parts.map((part, index) => {
        const shouldShow = GUESSES - remainingGuesses > index + 1;
        return <Line key={part.id} part={part} shouldShow={shouldShow} />;
      })}
    </Svg>
  );
}

export default HangmanFigure;
