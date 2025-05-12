import { useEffect, useState } from "react";
import { EMOJIS, PAIR_COUNTS } from "@/constants";
import { Card, Difficulty } from "@/types";
import { useTimer } from "./use-timer";

export const createShuffledCards = (difficulty: Difficulty) => {
  const pairs = PAIR_COUNTS[difficulty];
  const gameEmojis = EMOJIS.slice(0, pairs);

  return [...gameEmojis, ...gameEmojis]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
};

export const checkGameCompletion = (cards: Card[]) => {
  return cards.every((card) => card.isMatched);
};

export function useMemoryGame(difficulty: Difficulty) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const { time, resetTime } = useTimer(gameStarted && !gameCompleted);

  const initializeGame = () => {
    setCards(createShuffledCards(difficulty));
    setMoves(0);
    resetTime();
    setGameStarted(false);
    setGameCompleted(false);
    setFlippedCards([]);
  };

  useEffect(initializeGame, [difficulty, resetTime]);

  const handleCardClick = (id: number) => {
    const clickedCard = cards.find((card) => card.id === id)!;

    if (
      flippedCards.length === 2 ||
      clickedCard.isFlipped ||
      clickedCard.isMatched
    ) {
      return;
    }

    if (!gameStarted) setGameStarted(true);

    // flip the clicked card
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card,
      ),
    );

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);
      const [firstCard, secondCard] = newFlippedCards;

      const isMatched = firstCard.emoji === secondCard.emoji;

      setTimeout(() => {
        const updatedCards = cards.map((card) => {
          if (card.id === firstCard.id || card.id === secondCard.id) {
            return {
              ...card,
              isFlipped: isMatched,
              isMatched,
            };
          }

          return card;
        });

        setCards(updatedCards);
        setFlippedCards([]);

        if (isMatched && checkGameCompletion(updatedCards)) {
          setGameCompleted(true);
        }
      }, 500);
    }
  };

  return {
    cards,
    moves,
    time,
    gameCompleted,
    handleCardClick,
    resetGame: initializeGame,
  };
}
