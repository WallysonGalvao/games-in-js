import { motion } from "motion/react";
import { GAME_STATUS } from "@/constants";
import type { GameStatus } from "@/types";

type GameModalProps = {
  gameStatus: GameStatus;
  word: string;
  onNewWord: () => void;
};

function GameModal({ gameStatus, word, onNewWord }: GameModalProps) {
  if (gameStatus === GAME_STATUS.PLAYING) return null;

  const isWinner = gameStatus === GAME_STATUS.WON;
  const title = isWinner ? "🎉 Congratulations! 🎉" : "💀 Game Over 💀";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <div className="max-w-sm rounded-xl bg-white p-6 text-center">
        <h2 className="mb-4 text-center text-2xl font-bold">
          {title}
          {!isWinner && (
            <p className="text-xl">The word was: {word.toUpperCase()}</p>
          )}
        </h2>

        <button
          onClick={onNewWord}
          className="rounded-lg bg-pink px-4 py-2 text-white outline-none hover:bg-pink/80 focus:ring-2 focus:ring-pink focus:ring-offset-2"
          autoFocus
        >
          New Word
        </button>
      </div>
    </motion.div>
  );
}

export default GameModal;
