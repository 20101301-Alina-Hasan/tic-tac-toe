import './App.css';

export default function Square() {
  return (
    <>
      <div className='board-row'>
        <button className="button-base  no-border-r">1</button>
        <button className="button-base  no-border-r">2</button>
        <button className="button-base">3</button>
      </div>
      <div className='board-row'>
        <button className="button-base no-border-r no-border-t">4</button>
        <button className="button-base no-border-r no-border-t">5</button>
        <button className="button-base no-border-t">6</button>
      </div>
      <div className='board-row'>
        <button className="button-base no-border-r no-border-t">7</button>
        <button className="button-base no-border-r no-border-t">8</button>
        <button className="button-base no-border-t">9</button>
      </div>
    </>
  );
}
