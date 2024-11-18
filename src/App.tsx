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

  const onCell = (i: number) => {
    if (clicked[i] || winner) return; // Disable click if cell is already clicked or game has a winner

    const nextValues = [...values];
    nextValues[i] = player;
    setValues(nextValues);

    const nextClicked = [...clicked];
    nextClicked[i] = true;
    setClicked(nextClicked);

    if (calculateWinner(nextValues)) {
      setWinner(true); // Mark that the game has a winner
    } else {
      setPlayer(prev => (prev === 'X' ? 'O' : 'X')); // Switch players
    }
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
      <div className="status">
      <span> {player} </span>
        {winner ? (
          <span className="status-winner">wins! </span>
        ) : (
          <span> is playing...</span>
        )}
      </div>
      {Array.from({ length: 3 }, (_, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {Array.from({ length: 3 }, (_, colIndex) =>
            renderSquare(rowIndex * 3 + colIndex)
          )}
        </div>
      ))}
    </>
  );
}
