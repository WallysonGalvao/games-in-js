import { Pressable } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Player } from "../types";

import tailwindConfig from "@/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const colors = resolveConfig(tailwindConfig).theme.colors;

type SquareProps = {
  value: Player | null;
  isWinner: boolean;
  onClick: () => void;
};

const getTextColor = (value: Player | null) =>
  value === "X" ? "text-pink" : "text-white";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Square({ value, isWinner, onClick }: SquareProps) {
  const borderColorProgress = useDerivedValue(() => {
    return withTiming(isWinner ? 1 : 0, { duration: 500 });
  });

  const animatedBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderColorProgress.value,
      [0, 1],
      [colors.gray[200], value === "X" ? colors.pink : colors.white],
    );
    return { borderColor };
  });

  const animetadScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: value
            ? withSequence(withSpring(1.1), withSpring(1))
            : withSpring(1),
        },
      ],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: value
            ? withDelay(10, withTiming("180deg", { duration: 300 }))
            : "0deg",
        },
      ],
    };
  });

  return (
    <AnimatedPressable
      onPress={onClick}
      className="m-2 h-28 w-28 items-center justify-center rounded-xl border-4"
      style={[animetadScaleStyle, animatedBorderStyle]}
    >
      {value && (
        <Animated.Text
          className={`text-4xl font-bold ${getTextColor(value)}`}
          style={animatedTextStyle}
        >
          {value}
        </Animated.Text>
      )}
    </AnimatedPressable>
  );
}

export default Square;
