interface SquareProps {
    value: string | null; // The value can be "X", "O", or null
    onSquareClick: () => void; // The function called when the square is clicked
    highlight?: boolean; // Optional boolean to indicate whether to highlight the square
  }
  
  /**
   * Renders a single square of the Tic-Tac-Toe board.
   * @param {SquareProps} props - The properties passed to the component.
   * @returns {JSX.Element} The rendered button for a square.
   */
  function Square({ value, onSquareClick, highlight = false }: SquareProps): JSX.Element {
    return (
      <button
        className="square"
        onClick={onSquareClick}
        style={{ backgroundColor: highlight ? "blue" : "" }}
      >
        {value}
      </button>
    );
  }

  export default Square;