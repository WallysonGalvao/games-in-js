import { Text, View } from "react-native";

type WordDisplayProps = {
  word: string;
  guessedLetters: Set<string>;
};

function WordDisplay({ word, guessedLetters }: WordDisplayProps) {
  return (
    <View className="flex flex-row flex-wrap gap-2 sm:space-x-2">
      {word.split("").map((letter, index) => (
        <View
          key={index}
          className="flex h-10 w-6 justify-center border-b-2 border-gray-100 pb-2 sm:h-12 sm:w-8"
        >
          <Text className="text-center text-2xl font-bold uppercase text-white">
            {guessedLetters.has(letter) ? letter : ""}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default WordDisplay;
