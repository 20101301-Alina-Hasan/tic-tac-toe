import './App.css';
import { useState } from 'react';

type SquareProps = {
  value: string;
  handleClick: () => void;
  isClicked: boolean;
};

function Square({ value, handleClick, isClicked }: SquareProps) {
  const bgColor = value === 'X' ? 'bg-teal-600' : value === 'O' ? 'bg-red-500' : 'bg-teal-400';

  return (
    <button 
      className={`square ${isClicked ? bgColor : 'bg-gray-300'}`} 
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [player, setPlayer] = useState('X');
  const [values, setValues] = useState(Array(9).fill(''));
  const [clicked, setClicked] = useState(Array(9).fill(false));

  const onCell = (i: number) => {
    if (clicked[i]) return; // Prevent changing already clicked cells

    setValues(prev => {
      const nextValues = [...prev];
      nextValues[i] = player;
      return nextValues;
    });

    setClicked(prev => {
      const nextClicked = [...prev];
      nextClicked[i] = true;
      return nextClicked;
    });

    setPlayer(prev => (prev === 'X' ? 'O' : 'X'));
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
