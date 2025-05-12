import { motion } from "motion/react";
import { ANIMATIONS, EASY, HARD, MEDIUM } from "@/constants";
import { Card as CardType, Difficulty } from "@/types";
import { cn } from "@/lib/utils";
import Card from "./Card";

type GameBoardProps = {
  cards: CardType[];
  difficulty: Difficulty;
  onCardClick: (id: number) => void;
};

const GRID_CONFIG = {
  [EASY]: "",
  [MEDIUM]: "sm:grid-cols-5",
  [HARD]: "sm:grid-cols-5 md:grid-cols-6",
};

function GameBoard({ cards, difficulty, onCardClick }: GameBoardProps) {
  return (
    <motion.div
      {...ANIMATIONS.fadeInUp}
      className={cn(
        "grid grid-cols-4",
        GRID_CONFIG[difficulty],
        "gap-2 rounded-xl bg-blue-100 p-2 sm:gap-4 sm:p-4",
      )}
    >
      {cards.map((card) => (
        <Card key={card.id} {...card} onClick={() => onCardClick(card.id)} />
      ))}
    </motion.div>
  );
}

export default GameBoard;
