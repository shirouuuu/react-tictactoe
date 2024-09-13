import classNames from "classnames";

interface SquareProps {
  value: string | null; // The value can be "X", "O", or null
  onSquareClick: () => void; // The function called when the square is clicked
  highlight?: boolean;
  winner?: boolean; // Optional boolean to indicate whether to highlight the square
}

/**
 * Renders a single square of the Tic-Tac-Toe board.
 * @param {SquareProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered button for a square.
 */
function Square({
  value,
  onSquareClick,
  highlight = false,
  winner = false,
}: SquareProps): JSX.Element {
  let className = classNames(
    "w-56 h-56 border-r-8 border-t-8 border-grey bg-gray-100/75 text-8xl font-extrabold",
    {
      "text-black text-opacity-0": !highlight && winner,
      "bg-gray-400": highlight,
      "text-mygreen": value == "X",
      "text-myorange": value == "O",
    }
  );
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;
