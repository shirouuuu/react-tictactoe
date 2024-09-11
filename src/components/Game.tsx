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
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";

    return (
      <li key={move}>
        {move === currentMove ? (
          <p>You're at move # {move}</p>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  // Display the moves in the desired order (ascending or descending).
  const displayedMoves = isReversed ? moves.reverse() : moves;

  return (
    <div className="game flex justify-center items-center h-full">
      <div className="game-board flex flex-col justify-center items-center p-10">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={toggleOrder}>Toggle Order</button>
        <ol>{displayedMoves}</ol>
      </div>
    </div>
  );
}
