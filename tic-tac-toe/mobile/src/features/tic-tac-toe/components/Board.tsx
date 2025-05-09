import { View } from "react-native";
import { WINNING_COMBINATIONS } from "../helpers/game-logic";
import { BoardState, Player } from "../types";
import Square from "./Square";

type BoardProps = {
  board: BoardState;
  winner: Player | null;
  onClick: (index: number) => void;
};

function Board({ board, winner, onClick }: BoardProps) {
  const isWinner = (index: number): boolean => {
    if (!winner) return false;

    return WINNING_COMBINATIONS.some(
      (combo) =>
        combo.includes(index) && combo.every((i) => board[i] === winner),
    );
  };

  return (
    <View className="m-2 mx-auto flex max-w-[26rem] grid-cols-3 flex-row flex-wrap items-center justify-center">
      {board.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onClick(index)}
          isWinner={isWinner(index)}
        />
      ))}
    </View>
  );
}

export default Board;
