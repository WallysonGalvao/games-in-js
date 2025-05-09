import { motion } from "motion/react";
import { Player } from "../types";

type SquareProps = {
  value: Player | null;
  isWinner: boolean;
  onClick: () => void;
};

const getTextColor = (value: Player | null) =>
  value === "X" ? "text-pink" : "text-white";

const getBorderColor = (value: Player | null, isWinner: boolean) => {
  if (!isWinner) return "border-gray-200";
  return value === "X" ? "border-pink" : "border-white";
};

function Square({ value, isWinner, onClick }: SquareProps) {
  return (
    <motion.button
      className={`h-32 w-32 rounded-xl border-4 text-4xl font-bold ${getTextColor(value)} ${getBorderColor(value, isWinner)}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      {value && (
        <motion.span
          className="block"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
}

export default Square;
