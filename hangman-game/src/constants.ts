export const GUESSES = 6;

export const WORDS = [
  {
    word: "react",
    tip: "A popular JavaScript library for building user interfaces",
  },
  { word: "hangman", tip: "The name of this game" },
  { word: "typescript", tip: "A typed superset of JavaScript" },
  { word: "nextjs", tip: "A React framework for production" },
  { word: "vercel", tip: "A platform for deploying web projects" },
];

export const GAME_STATUS = {
  PLAYING: "playing",
  WON: "won",
  LOST: "lost",
} as const;
