import { Sparkles } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { cn } from "../lib/utils";

const CARD_STYLES = {
  base: "absolute flex h-full w-full items-center justify-center rounded-xl border-2 backface-hidden",
  back: "border-white/20 bg-pink",
  front: "border-purple-200 bg-white",
};

type CardProps = {
  emoji: string;
  isFlipped: boolean;
  index: number;
  onClick: () => void;
};

const AnimatedSparkles = Animated.createAnimatedComponent(Sparkles);

function Card({ emoji, isFlipped, index, onClick }: CardProps) {
  const rotateY = useSharedValue(0);
  const rotateZ = useSharedValue(0);

  const handleClick = () => {
    onClick();
    rotateY.value = withTiming(isFlipped ? 0 : 180, { duration: 500 });
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(rotateY.value, [0, 180], [180, 360]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotate}deg` }],
      opacity: rotateY.value > 90 ? 1 : 0,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(rotateY.value, [0, 180], [0, 180]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotate}deg` }],
      opacity: rotateY.value < 90 ? 1 : 0,
    };
  });

  const sparklesAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withRepeat(
        withSequence(
          withTiming(1, { duration: 1000 }),
          withTiming(0.5, { duration: 1000 }),
        ),
        -1,
        true,
      ),
    };
  });

  const cardEntranceStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateZ: `${rotateZ.value * 2}deg` },
        {
          scale: interpolate(rotateZ.value, [180, 0], [1, 0.5]), // Cresce de 50% para 100%
        },
      ],
    };
  });

  useEffect(() => {
    rotateY.value = withTiming(isFlipped ? 180 : 0, { duration: 500 });
  }, [isFlipped, rotateY]);

  useEffect(() => {
    rotateZ.value = withDelay(100 * index, withTiming(180, { duration: 800 }));
  }, [index, rotateZ]);

  return (
    <Pressable className="m-1 h-16 w-16" onPress={handleClick}>
      <Animated.View style={[cardEntranceStyle]}>
        {/* View do 3D */}
        <View className="h-full w-full">
          {/* Card front */}
          <Animated.View
            className={cn(CARD_STYLES.base, CARD_STYLES.front)}
            style={[frontAnimatedStyle]}
          >
            <Text>{emoji}</Text>
          </Animated.View>

          {/* Card back */}
          <Animated.View
            className={cn(CARD_STYLES.base, CARD_STYLES.back)}
            style={[backAnimatedStyle]}
          >
            <AnimatedSparkles
              className="h-6 w-6"
              color="white"
              style={[sparklesAnimatedStyle]}
            />
          </Animated.View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default Card;
