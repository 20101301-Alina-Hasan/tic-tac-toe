import './App.css';
import { useState } from 'react';

type SquareProps = {
  value: string;
  handleClick: () => void;
  isClicked: boolean;
};

function Square({ value, handleClick, isClicked }: SquareProps) {
  const bgColor = isClicked
    ? value === 'X'
      ? 'bg-teal-600'
      : value === 'O'
        ? 'bg-red-500'
        : ''
    : 'bg-gray-300 hover:bg-gray-400';

  return (
    <button className={`square ${bgColor}`} onClick={handleClick}> {value} </button>
  );
}

function calculateWinner(squares: string[]): boolean {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return true; // A winner exists
    }
  }
  return false; // No winner yet
}

export default function Board() {
  const [player, setPlayer] = useState('X');
  const [values, setValues] = useState(Array(9).fill(''));
  const [clicked, setClicked] = useState(Array(9).fill(false));
  const [winner, setWinner] = useState(false); // Track if there's a winner
  const [gameOver, setGameOver] = useState(false); // Track if the game is over
  const [filledCells, setFilledCells] = useState(0); // Counter to track filled cells

  const onCell = (i: number) => {
    if (clicked[i] || winner || gameOver) return; // Disable click if cell is already clicked, game has a winner, or game is over

    const nextValues = [...values];
    nextValues[i] = player;
    setValues(nextValues);

    const nextClicked = [...clicked];
    nextClicked[i] = true;
    setClicked(nextClicked);

    setFilledCells(prev => prev + 1); // Increment filledCells when a cell is clicked

    if (calculateWinner(nextValues)) {
      setWinner(true); // Mark that the game has a winner
    } else if (filledCells + 1 === 9) {
      setGameOver(true); // Mark the game as over if the board is full
    } else {
      setPlayer(prev => (prev === 'X' ? 'O' : 'X')); // Switch players
    }
  };

  const restartGame = () => {
    setPlayer('X');
    setValues(Array(9).fill(''));
    setClicked(Array(9).fill(false));
    setWinner(false);
    setGameOver(false);
    setFilledCells(0); // Reset filledCells counter
  };

  const renderSquare = (i: number) => (
    <Square
      value={values[i]}
      handleClick={() => onCell(i)}
      isClicked={clicked[i]}
    />
  );

  return (
    <>
      <div className="">
        <div className="status">
          {winner ? (
            <>
              <span>{player}</span>
              <span className="status-winner"> wins!</span>
            </>
          ) : gameOver ? (
            <span>It's a draw!</span>
          ) : (
            <span>{player} is playing...</span>
          )}
        </div>
        {Array.from({ length: 3 }, (_, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {Array.from({ length: 3 }, (_, colIndex) =>
              renderSquare(rowIndex * 3 + colIndex)
            )}
          </div>
        ))}
        {(gameOver || winner) && (
          <div className='status'>
            <button onClick={restartGame} className="restart-button">
              Restart Game
            </button>
          </div>
        )}
      </div>
    </>
  );
}
