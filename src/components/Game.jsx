import React, { useState } from 'react';

const rowStyle = {
  display: 'flex'
}
const backGround ={
    'height': '100vh',
    'backgroundImage': 'url(https://wallpapercave.com/wp/wp8984722.jpg)',
    'backgroundSize': 'cover',
    'background-position-y': 'center'
}
const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#C3BAAD',
  'margin': '5px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '36px',
  'color': 'white',
  'borderRadius': '5px',
  'boxShadow': '1px 2px #D2CFC7',
}

const boardStyle = {
  'backgroundColor': '#f2f2f2',
  'width': '220px',
  'height':'220px',
  'margin': '5px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid',
  'borderRadius': '5px',
  'boxShadow': '0 5px 20px 5px #D2CFC7',
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#1bbbac',
  'color': '#383b3a',
  'fontSize': '18px',
  'borderRadius': '5px',
  'boxShadow': 'inset 0 0 8px #777777',
}



function Square(props) {
  return (
    <div
      className="square"
      style={squareStyle}
      {...props}>
      {props.children}
    </div>
  );
}

function Board() {
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState([
  [' ',' ',' '],
  [' ',' ',' '],
  [' ',' ',' ']
  ]);

  const resetGame = () => {
  setBoard([
  [' ',' ',' '],
  [' ',' ',' '],
  [' ',' ',' ']
  ]);
  setTurn('X');
  setWinner(null);
  }


  const onClickHandle = (row, col) => {
  if(board[row][col]=== ' ' && !winner) {
      const newBoard = [...board];
      newBoard[row][col] = turn;
      setBoard(board);
      setTurn((previous) => previous === 'X' ? 'O': 'X')
      
      const winner = checkWinner(newBoard);
      if(winner){
      setWinner(winner);
      }
  }
  }

    const checkWinner = (board) => {
      for(let i=0; i< 3; i++){
        if(
          board[i][0] === board[i][1] &&
          board[i][1] === board[i][2] &&
          board[i][0] !== ' '
        ){
          return board[i][0];
        }
      }
      for(let i=0; i< 3; i++){
        if(
          board[0][i]=== board[1][i] &&
          board[1][i]=== board[2][i] &&
          board[0][i] !== ' '
        ){
          return board[0][i];
        }
      }
        if(
        (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
        (board[0][2] === board[1][1] && board[1][1] === board[2][0])
        ){
        if(board[1][1] !== ' '){

          return board[1][1];
        }
        }
      return null;
    
    }

  return (
    <div style={containerStyle} className="gameBoard ">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{turn}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner ? winner : "None"}</span></div>
      <button style={buttonStyle} onClick={resetGame} >Reset</button>
      <div className='card' style={boardStyle}>
        {board.map((row,rowIndex) => (
          <div className="board-row " style={rowStyle} key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Square key={colIndex} onClick={() => onClickHandle(rowIndex,colIndex)} >{cell} </Square>
            )) }
          
          </div>
       ))}
      </div>
    </div>
  );
}


export default function Game() {
  return (
    <div className="game" style={backGround}>
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}
