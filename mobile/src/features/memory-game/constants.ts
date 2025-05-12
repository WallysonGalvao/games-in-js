export const EASY = "easy";
export const MEDIUM = "medium";
export const HARD = "hard";

export const EMOJIS = [
  "🍭",
  "🍬",
  "🍫",
  "🧁",
  "🍪",
  "🍩",
  "🍰",
  "🎂",
  "🍮",
  "🍯",
  "🍡",
  "🍨",
] as const;

export const PAIR_COUNTS = {
  [EASY]: 6,
  [MEDIUM]: 10,
  [HARD]: 15,
} as const;
