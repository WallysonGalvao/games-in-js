import { LinearGradient } from "expo-linear-gradient";
import { Brain, Sparkles, Zap } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";

import tailwindConfig from "tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
import { EASY, HARD, MEDIUM } from "../constants";
import { Difficulty } from "../types";

const { theme } = resolveConfig(tailwindConfig);

const DIFFICULTIES = [
  {
    type: EASY,
    label: "Easy",
    icon: Sparkles,
    colors: [theme.colors.green["400"], theme.colors.emerald["500"]],
  },
  {
    type: MEDIUM,
    label: "Medium",
    icon: Brain,
    colors: [theme.colors.blue["400"], theme.colors.indigo["500"]],
  },
  {
    type: HARD,
    label: "Hard",
    icon: Zap,
    colors: [theme.colors.purple["400"], theme.colors.purple["700"]],
  },
] as const;

type DifficultySelectorProps = {
  onSelect: (difficulty: Difficulty) => void;
};

function DifficultySelector({ onSelect }: DifficultySelectorProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(500)}
      exiting={FadeOutUp.duration(500)}
      layout={LinearTransition.duration(500)}
      className="flex min-h-screen w-full flex-col items-center gap-4 bg-blue-200 p-4 sm:gap-8 sm:p-8"
    >
      <View className="flex w-full flex-col gap-6 px-4">
        <Text className="mb-2 text-center text-2xl font-bold text-white sm:mb-4 sm:text-3xl">
          Select Difficulty
        </Text>

        <View className="flex w-full flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          {DIFFICULTIES.map(({ type, label, icon: Icon, colors }) => (
            <Pressable
              key={label}
              onPress={() => onSelect(type)}
              style={{ borderWidth: 1 }}
            >
              <LinearGradient colors={colors} style={styles.linearGradient}>
                <View className="flex flex-row items-center justify-center gap-2 sm:flex-col">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                  <Text className="text-base font-medium sm:text-lg">
                    {label}
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

export default DifficultySelector;

const styles = StyleSheet.create({
  linearGradient: {
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
