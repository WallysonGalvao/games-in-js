import HangmanFigure from "@/components/HangmanFigure";
import WordDisplay from "@/components/WordDisplay";
import Keyboard from "@/components/Keyboard";
import GameModal from "@/components/GameModal";
import { useHangman } from "@/hooks/use-hangman";

function App() {
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
    <div className="flex min-h-screen flex-col items-center gap-8 bg-blue-200 p-8">
      <h1 className="text-4xl font-bold text-pink">Hangman</h1>

      <HangmanFigure remainingGuesses={remainingGuesses} />

      <div className="text-center text-gray-100">
        <p className="mb-2 text-xl sm:text-2xl">
          Remaining guesses:{" "}
          <span className="font-bold">{remainingGuesses}</span>
        </p>

        <p className="text-lg">Tip: {tip}</p>
      </div>

      <WordDisplay word={word} guessedLetters={guessedLetters} />

      <Keyboard guessedLetters={guessedLetters} onGuessLetter={onGuessLetter} />

      <GameModal gameStatus={gameStatus} word={word} onNewWord={selectWord} />
    </div>
  );
}

export default App;
