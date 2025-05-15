import { Href, useRouter } from "expo-router";
import {
  Frame,
  Gamepad2,
  LucideIcon,
  PersonStanding,
  Sparkle,
  TrendingUpDown,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type Item = {
  label: string;
  href: Href;
  icon: LucideIcon;
};

const items: Item[] = [
  {
    label: "Tic Tac Toe",
    href: "/tic-tac-toe",
    icon: Frame,
  },
  {
    label: "Memory Game",
    href: "/memory-game",
    icon: Sparkle,
  },
  {
    label: "Hangman Game",
    href: "/hangman-game",
    icon: PersonStanding,
  },
  {
    label: "Snake Game",
    href: "/snake-game",
    icon: TrendingUpDown,
  },
];

export default function Index() {
  const router = useRouter();

  const onPress = (href: Href) => {
    router.navigate(href);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="w-full max-w-lg rounded-2xl p-8">
        <View className="mb-8 flex items-center justify-center gap-3">
          <Gamepad2 color="#F231A5" size={50} />
          <Text className="text-4xl font-bold text-black">Games in JS</Text>
        </View>

        <View className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <Pressable
              key={item.label}
              onPress={() => onPress(item.href)}
              className="group flex items-center gap-2 rounded-lg bg-pink px-6 py-3 text-sm text-white hover:opacity-90"
            >
              <Text className="text-lg font-bold">{item.label}</Text>
              <item.icon size={30} />
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
