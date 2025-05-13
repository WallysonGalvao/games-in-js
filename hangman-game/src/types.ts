import { GAME_STATUS } from "./constants";

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];
