import { Text, TouchableOpacity, View } from "react-native";

const KEY_ROWS = [
  "qwertyuiop".split(""),
  "asdfghjkl".split(""),
  "zxcvbnm".split(""),
];

type KeyboardProps = {
  guessedLetters: Set<string>;
  onGuessLetter: (letter: string) => void;
};

const KEY_BG_CLASSES = {
  guessed: "bg-gray-100",
  unguessed: "bg-blue-100",
};

const KEY_TEXT_CLASSES = {
  guessed: "text-gray-200",
  unguessed: "text-white",
};

function Keyboard({ guessedLetters, onGuessLetter }: KeyboardProps) {
  const handleKeyDown = (letter: string) => {
    if (KEY_ROWS.flat().includes(letter)) {
      onGuessLetter(letter);
    }
  };

  return (
    <View className="flex flex-col items-center gap-2">
      {KEY_ROWS.map((row, rowIndex) => (
        <View key={rowIndex} className="flex flex-row gap-1">
          {row.map((letter) => {
            const isGuessed = guessedLetters.has(letter);

            return (
              <TouchableOpacity
                key={letter}
                onPress={() => handleKeyDown(letter)}
                disabled={isGuessed}
                className={`flex h-10 w-10 items-center justify-center rounded sm:h-10 sm:w-10 ${isGuessed ? KEY_BG_CLASSES.guessed : KEY_BG_CLASSES.unguessed}`}
              >
                <Text
                  className={`text-lg font-semibold uppercase text-white ${isGuessed ? KEY_TEXT_CLASSES.guessed : KEY_TEXT_CLASSES.unguessed}`}
                >
                  {letter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

export default Keyboard;
