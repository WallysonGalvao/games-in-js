import Animated, {
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";
import { Line as SVGLine } from "react-native-svg";

type Part = {
  type: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  id: string;
};

type CustomLineProps = {
  shouldShow: boolean;
  part: Part;
};

const AnimatedLine = Animated.createAnimatedComponent(SVGLine);

export const Line = ({ part, shouldShow }: CustomLineProps) => {
  const animatedLineProps = useAnimatedProps(() => ({
    opacity: withTiming(shouldShow ? 1 : 0, { duration: 500 }),
  }));

  return (
    <AnimatedLine
      {...part}
      stroke="#F231A5"
      strokeWidth="4"
      animatedProps={animatedLineProps}
    />
  );
};
