import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css'


// Components 

const Restart = () => {
  return (
    <div>
      <button onClick={handleRestart}>Restart</button>
    </div>
  )
}

const handleRestart = () => {
  window.location.reload();
}


const Square = (props) => {
  return (
    <button
      onClick={props.onClickEvent}
      className="square"
    >
      {props.value}
    </button>
  )
}

const Board = () => {
  const initialSquares = Array(9).fill(null)
  const [squares, setSquares] = useState(initialSquares)
  const [xIsNext, setxIsNext] = useState(true)

  const handleClickEvent = (i) => {
    const newSquares = [...squares]

    const wnnerDeclared = Boolean(calculateWinner(newSquares))
    const sqaureFilled = Boolean(newSquares[i])
    if (wnnerDeclared || sqaureFilled) {
      return
    }


    newSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(newSquares)
    setxIsNext(!xIsNext)
  }

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClickEvent={() => handleClickEvent(i)}
      />
    )
  }

  const winner = calculateWinner(squares)
  const status = winner ?
    `Winner: ${winner}` :
    `Next player: ${xIsNext ? 'X' : 'O'}`


  return (
    <div className="status">{
      status}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div >
  )
}

const Game = () => {
  return (
    <div className="game">
      Tic-Tac-Toe
      <Board />
      <Restart />
    </div>
  )
}




ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];  // 'X' or 'O'
    }
  }
  return null;
}