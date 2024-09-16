import Board from "./Board";
import { useState } from "react";

/**
 * The main game component that controls the entire Tic-Tac-Toe game, including history and game order toggling.
 * @returns {JSX.Element} The rendered game board and move history.
 */
export default function Game(): JSX.Element {
  const [history, setHistory] = useState<(string | null)[][]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [isReversed, setIsReversed] = useState<boolean>(false); // State to track move order.

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  /**
   * Handles updating the game state when a move is made.
   * @param {Array<string | null>} nextSquares - The updated state of the board after a move.
   */
  function handlePlay(nextSquares: (string | null)[]): void {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  /**
   * Handles jumping to a specific move in the game history.
   * @param {number} nextMove - The move number to jump to.
   */
  function jumpTo(nextMove: number): void {
    setCurrentMove(nextMove);
  }

  /**
   * Toggles the order of the moves (ascending or descending).
   */
  function toggleOrder(): void {
    setIsReversed(!isReversed);
  }

  // Map over the game history to create buttons for each move.
  const moves: JSX.Element[] = history.map((squares: any, move) => {
    const description =
      move > 0 ? (
        <>
          Go to move{" "}
          <span
            className={`
              transition-all duration-500 ease-in-out group-hover:text-white
              ${
                move % 2 === 0
                  ? "text-mygreen font-bold"
                  : "text-myorange font-bold"
              }`}
          >
            #{move}
          </span>
        </>
      ) : (
        "Go to game start"
      );

    return (
      <li className="w-full" key={move}>
        {move === currentMove ? (
          <p className="group bg-gray-200 px-5 py-3 text-lg font-semibold text-center w-full rounded-xl  transition-all hover:duration-200 hover:bg-gradient-to-r hover:from-mygreen hover:via-myorange hover:to-myblue hover:bg-size-200  hover:text-white">
            You're at move{" "}
            <span
              className={`
                    transition-all duration-200 ease-in-out group-hover:text-white
                    ${
                      move % 2 === 0
                        ? "text-mygreen font-bold"
                        : "text-myorange font-bold"
                    }`}
            >
              #{move}
            </span>
          </p>
        ) : (
          <button
            className="group bg-gray-200 px-5 py-3 text-lg font-semibold text-center w-full rounded-xl  transition-all hover:duration-200 hover:bg-gradient-to-r hover:from-mygreen hover:via-myorange hover:to-myblue hover:bg-size-200  hover:text-white"
            onClick={() => jumpTo(move)}
          >
            {description}
          </button>
        )}
      </li>
    );
  });

  // Display the moves in the desired order (ascending or descending).
  const displayedMoves = isReversed ? moves.reverse() : moves;

  return (
    <div className="game flex w-full h-full flex-grow">
      <div className="w-1/3"></div>
      <div className="game-board flex flex-col justify-center items-center w-1/3">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info flex flex-col justify-center items-center w-1/3">
        <div className="flex flex-col justify-center items-center bg-slate-100 p-4 rounded-lg gap-4">
          <button
            className="transition-all duration-500 bg-gradient-to-r from-mygreen via-myorange to-myblue bg-size-200 bg-pos-0 hover:bg-pos-100 text-white text- text-lg font-bold py-3 px-5 rounded-full w-full"
            onClick={toggleOrder}
          >
            Toggle Order
          </button>
          <ol className="flex flex-col items-center gap-2 ">
            {displayedMoves}
          </ol>
        </div>
      </div>
    </div>
  );
}
