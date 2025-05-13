import { Text, View } from "react-native";
import GameModal from "./components/GameModal";
import HangmanFigure from "./components/HangmanFigure";
import Keyboard from "./components/Keyboard";
import WordDisplay from "./components/WordDisplay";
import { useHangman } from "./hooks/use-hangman";

export default function HangmanGame() {
  const {
    word,
    tip,
    remainingGuesses,
    guessedLetters,
    gameStatus,
    selectWord,
    onGuessLetter,
  } = useHangman();

  return (
    <View className="flex min-h-screen flex-col items-center gap-8 bg-blue-200 p-8">
      <Text className="text-4xl font-bold text-pink">Hangman</Text>

      <HangmanFigure remainingGuesses={remainingGuesses} />

      <View>
        <Text className="mb-2 text-center text-xl text-gray-100 sm:text-2xl">
          Remaining guesses:{" "}
          <Text className="font-bold">{remainingGuesses}</Text>
        </Text>

        <Text className="text-center text-lg text-gray-100">Tip: {tip}</Text>
      </View>

      <WordDisplay word={word} guessedLetters={guessedLetters} />

      <Keyboard guessedLetters={guessedLetters} onGuessLetter={onGuessLetter} />

      <GameModal gameStatus={gameStatus} word={word} onNewWord={selectWord} />
    </View>
  );
}
