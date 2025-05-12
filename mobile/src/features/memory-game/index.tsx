import { useState } from "react";
import { View } from "react-native";
import DifficultySelector from "./components/DifficultySelector";
import GameBoard from "./components/GameBoard";
import GameModal from "./components/GameModal";
import ScoreBoard from "./components/ScoreBoard";
import { useMemoryGame } from "./hooks/use-memory-game";
import { formatTime } from "./lib/formatTime";
import { Difficulty } from "./types";

export default function MemoryGame() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  const { cards, moves, time, gameCompleted, handleCardClick, resetGame } =
    useMemoryGame(difficulty || "easy");

  const formattedTime = formatTime(time);

  const handleRestart = () => {
    setDifficulty(null);
    resetGame();
  };

  if (!difficulty) return <DifficultySelector onSelect={setDifficulty} />;

  return (
    <View className="flex min-h-screen w-full flex-col items-center gap-4 bg-blue-200 p-4 sm:gap-8 sm:p-8">
      <ScoreBoard
        moves={moves}
        time={formattedTime}
        onRestart={handleRestart}
      />
      <GameBoard cards={cards} onCardClick={handleCardClick} />
      <GameModal
        moves={moves}
        time={formattedTime}
        visible={gameCompleted}
        onRestart={resetGame}
      />
    </View>
  );
}
