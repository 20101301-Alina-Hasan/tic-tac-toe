import './App.css';
import { useState } from 'react';

function Square({ value, handleClick, isClicked }: { value: string, handleClick: () => void, isClicked: boolean }) {
  return (
    <button 
      className={`square ${isClicked ? 'bg-teal-600' : 'bg-teal-400'}`}
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [values, setValues] = useState(Array(9).fill(''));
  const [clicked, setClicked] = useState(Array(9).fill(false)); 

  function onCell(i: number) {
    const nextValues = values.slice();
    nextValues[i] = 'X';
    setValues(nextValues);

    const nextClicked = clicked.slice();
    nextClicked[i] = true; 
    setClicked(nextClicked);
  }

  return (
    <>
      <div className="board-row">
        <Square value={values[0]} handleClick={() => onCell(0)} isClicked={clicked[0]} />
        <Square value={values[1]} handleClick={() => onCell(1)} isClicked={clicked[1]} />
        <Square value={values[2]} handleClick={() => onCell(2)} isClicked={clicked[2]} />
      </div>
      <div className="board-row">
        <Square value={values[3]} handleClick={() => onCell(3)} isClicked={clicked[3]} />
        <Square value={values[4]} handleClick={() => onCell(4)} isClicked={clicked[4]} />
        <Square value={values[5]} handleClick={() => onCell(5)} isClicked={clicked[5]} />
      </div>
      <div className="board-row">
        <Square value={values[6]} handleClick={() => onCell(6)} isClicked={clicked[6]} />
        <Square value={values[7]} handleClick={() => onCell(7)} isClicked={clicked[7]} />
        <Square value={values[8]} handleClick={() => onCell(8)} isClicked={clicked[8]} />
      </div>
    </>
  );
}

