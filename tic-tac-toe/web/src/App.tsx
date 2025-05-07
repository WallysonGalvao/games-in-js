import { useState } from "react";
import { Gamepad2, RotateCcw } from "lucide-react";
import Board from "./components/Board";
import { BoardState } from "./types";
import { checkWinner, isBoardFull } from "./helpers/game-logic";

function App() {
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-blue-200">
      <div className="w-full max-w-lg rounded-2xl bg-blue-100 p-8">
        <div className="mb-8 flex items-center justify-center gap-3">
          <Gamepad2 className="text-pink h-8 w-8" />
          <h1 className="text-4xl font-bold text-white">Tic Tac Toe</h1>
        </div>

        <div className="mb-6 text-center">
          <p className="text-xl font-semibold text-gray-100">
            {getGameStatus()}
          </p>
        </div>

        <Board board={board} winner={winner} onClick={handleClick} />

        {(winner || isDraw) && (
          <div className="mt-8 flex justify-center">
            <button
              className="group bg-pink flex items-center gap-2 rounded-lg px-6 py-3 text-sm text-white hover:opacity-90"
              onClick={handleRestart}
            >
              Restart Game
              <RotateCcw className="transition-transform duration-500 group-hover:-rotate-180" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
