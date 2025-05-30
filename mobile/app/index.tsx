import { Href, useRouter } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

import hangmanGame from "@/assets/images/games/hangman-game.jpg";
import infiniteRunner from "@/assets/images/games/infinite-runner.jpg";
import memoryGame from "@/assets/images/games/memory-game.jpg";
import snakeGame from "@/assets/images/games/snake-game.jpg";
import tictactoe from "@/assets/images/games/tic-tac-toe.jpg";
import trivia from "@/assets/images/games/trivia.jpg";

type Item = {
  label: string;
  href: Href;
  image: ImageSourcePropType;
};

const items: Item[] = [
  {
    label: "Tic Tac Toe",
    href: "/tic-tac-toe",
    image: tictactoe,
  },
  {
    label: "Memory Game",
    href: "/memory-game",
    image: memoryGame,
  },
  {
    label: "Hangman Game",
    href: "/hangman-game",
    image: hangmanGame,
  },
  {
    label: "Trivia",
    href: "/trivia",
    image: trivia,
  },
  {
    label: "Snake Game",
    href: "/snake-game",
    image: snakeGame,
  },
  {
    label: "Infinite Runner",
    href: "/infinite-runner",
    image: infiniteRunner,
  },
];

export default function Index() {
  const router = useRouter();

  const onPress = (href: Href) => {
    router.navigate(href);
  };

  return (
    <View className="flex-1">
      {items.map((item) => (
        <Pressable
          key={item.label}
          onPress={() => onPress(item.href)}
          className="items-center justify-center"
        >
          <Image
            source={item.image}
            className="h-[155px] w-full"
            resizeMode="cover"
          />
          <Text className="absolute left-0 right-0 text-center text-[50px] font-bold text-white shadow-lg shadow-black">
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
