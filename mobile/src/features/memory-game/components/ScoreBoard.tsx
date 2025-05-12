import {
  Clock,
  LucideIcon,
  MousePointerClick,
  RotateCcw,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { cn } from "../lib/utils";

import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import tailwindConfig from "tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const { theme } = resolveConfig(tailwindConfig);

type ScoreBoardProps = {
  moves: number;
  time: string;
  onRestart: () => void;
};

type ScoreItemProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: string;
};

const SCORE_ITEMS = [
  {
    icon: MousePointerClick,
    label: "Moves",
    color: theme.colors.yellow["400"],
  },
  {
    icon: Clock,
    label: "Time",
    color: theme.colors.blue["400"],
  },
] as const;

const ScoreItem = ({ icon: Icon, label, value, color }: ScoreItemProps) => (
  <View className="flex items-center justify-center gap-2">
    <Icon className={cn("h-5 w-5")} color={color} />
    <Text className="font-semibold text-white">
      {label}: <Text className="min-w-[16px]">{value}</Text>
    </Text>
  </View>
);

function ScoreBoard({ moves, time, onRestart }: ScoreBoardProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(500)}
      exiting={FadeOutUp.duration(500)}
      layout={LinearTransition.duration(500)}
      className="flex w-full flex-row items-center justify-between gap-4 rounded-xl bg-blue-100 p-4"
    >
      {SCORE_ITEMS.map(({ icon, label, color }) => (
        <ScoreItem
          key={label}
          icon={icon}
          label={label}
          color={color}
          value={label === "Time" ? time : moves}
        />
      ))}

      <Pressable
        onPress={onRestart}
        className="group flex items-center gap-2 px-2"
      >
        <RotateCcw
          className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180"
          color="#FFF"
        />
        <Text className="font-semibold text-white">Restart</Text>
      </Pressable>
    </Animated.View>
  );
}

export default ScoreBoard;
