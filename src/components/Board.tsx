import classNames from "classnames";
import Square from "./Square";

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[]; // Array of either "X", "O", or null
  onPlay: (nextSquares: (string | null)[]) => void; // Function that takes an updated board array
}

/**
 * Renders the Tic-Tac-Toe board and handles the game logic for player moves.
 * @param {BoardProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered Tic-Tac-Toe board and game status.
 */
function Board({ xIsNext, squares, onPlay }: BoardProps): JSX.Element {
  /**
   * Handles the click on a square.
   * @param {number} indexSquare - The index of the square clicked.
   */
  function handleClick(indexSquare: number): void {
    if (declareWinner(squares) || squares[indexSquare] || !boardHasSpace()) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[indexSquare] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  /**
   * Determines if the board has enough space for a new move.
   * @returns {boolean} True if the board has space left.
   */
  function boardHasSpace(): boolean {
    return squares.some((square) => square === null);
  }

  /**
   * Determines if there is a winner based on the current board state.
   * @param {Array<string | null>} squares - The current state of the board.
   * @returns {number[] | null} The indices of the winning line or null if no winner.
   */
  function declareWinner(squares: (string | null)[]): number[] | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return [a, b, c];
      }
    }
    return null;
  }

  // Determine the current game status.
  const winnerSquares = declareWinner(squares);
  const winner = winnerSquares ? squares[winnerSquares[0]] : null;
  const status = winner
    ? `Winner: ${winner}`
    : !boardHasSpace()
    ? "It's a Tie!"
    : `${xIsNext ? "X" : "O"} is on the move`;

  /**
   * Renders the Tic-Tac-Toe board dynamically using loops.
   * @returns {JSX.Element[]} The array of JSX elements that represent the board.
   */
  function renderBoard(): JSX.Element[] {
    const board = [];
    let count: number = 0;

    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        count = i * 3 + j;
        row.push(renderSquare(i * 3 + j));
      }
      board.push(
        <div
          key={i}
          className={`border h-1/3 flex border-l-8 border-grey ${
            count > 5 ? "border-b-8" : ""
          }`}
        >
          {row}
        </div>
      );
    }

    return board;
  }

  /**
   * Renders a single square with optional highlighting for the winning line.
   * @param {number} index - The index of the square to render.
   * @returns {JSX.Element} The rendered square component.
   */
  function renderSquare(index: number): JSX.Element {
    const isHighlighted = winnerSquares?.includes(index) || false;
    return (
      <Square
        key={index}
        value={squares[index]}
        onSquareClick={() => handleClick(index)}
        highlight={isHighlighted}
        winner={winnerSquares != null}
      />
    );
  }

  let statusClassName = classNames("font-bold", {
    "text-mygreen": xIsNext && winnerSquares == null,
    "text-myorange": !xIsNext && winnerSquares == null,
    "text-black": !boardHasSpace(),
  });
  return (
    <>
      <div className="board w-full h-4/6 mb-4">{renderBoard()}</div>
      <p className="status flex justify-center items-center px-5 py-4 text-xl font-semibold">
        <p className={statusClassName}>{status.replace(/ .*/, "")}</p>
        <p>&nbsp;</p>
        <span>{status.split(" ").slice(1).join(" ")}</span>
      </p>
    </>
  );
}

export default Board;
