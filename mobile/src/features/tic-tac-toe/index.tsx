import { Gamepad2, RotateCcw } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Board from "./components/Board";
import { checkWinner, isBoardFull } from "./helpers/game-logic";
import { BoardState } from "./types";

export default function TicTacToe() {
  // [x,o,x
  //  x,o,x
  //  x,o,x ]
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const winner = checkWinner(board);
  const isDraw = !winner && isBoardFull(board);

  const getGameStatus = () => {
    if (winner) return `Player ${winner} wins!`;
    if (isDraw) return "It's a Draw!";
    return `Player ${currentPlayer}'s Turn`;
  };

  // Rodada 0: [null, null, null, null, null, null, null, null, null]
  // Rodada 1: ["X", null, null, null, null, null, null, null, null]
  // Rodada 2: ["X", null, "O", null, null, null, null, null, null]
  // Rodada 3: ["X", "X", "O", null, null, null, null, null, null]
  // módulo % => 0 / 2 = 0
  // 1 % 2 = 0.5
  // 2 % 2 = 0
  // 3 / 2 = 1 !==0
  const currentPlayer = board.filter(Boolean).length % 2 === 0 ? "X" : "O";

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    setBoard(board.map((square, i) => (index === i ? currentPlayer : square)));
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
  };

  return (
    <View className="flex min-h-screen flex-col items-center justify-center bg-black">
      <View className="w-full max-w-lg rounded-2xl p-8">
        <View className="mb-8 flex items-center justify-center gap-3">
          <Gamepad2 color="#F231A5" size={32} />
          <Text className="text-4xl font-bold text-white">Tic Tac Toe</Text>
        </View>

        <View className="mb-6">
          <Text className="text-center text-xl font-semibold text-gray-100">
            {getGameStatus()}
          </Text>
        </View>

        <Board board={board} winner={winner} onClick={handleClick} />

        {(winner || isDraw) && (
          <View className="mt-8 flex justify-center">
            <Pressable
              className="group flex items-center gap-2 rounded-lg bg-pink px-6 py-3 text-sm text-white hover:opacity-90"
              onPress={handleRestart}
            >
              <Text>Restart Game</Text>
              <RotateCcw className="transition-transform duration-500 group-hover:-rotate-180" />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
