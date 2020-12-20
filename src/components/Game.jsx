import React from "react";
import Board from "./Board";
import { Button } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

//give style to move's history
const MyButton = styled(Button)({
  background: "linear-gradient(45deg, #0ead93 30%, #07ebc6 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "primary",
  height: 48,
  padding: "0 30px",
  margin: "1px 5px",
});

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //initial state
      xORo: true,
      stepNumber: 0,
      history: [{ squares: Array(9).fill(null) }],
    };
  }
  //Jumping to special move
  move_To(step) {
    this.setState({
      stepNumber: step,
      xORo: step % 2 === 0,
      history: this.state.history.slice(0, step + 1),
    });
  }
  //handeling the clicks
  handeler(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = whoIsWinner(squares);
    if (squares[i] || winner) {
      return;
    }
    squares[i] = this.state.xORo ? "X" : "O";
    this.setState({
      history: history.concat({
        squares: squares,
      }),
      xORo: !this.state.xORo,
      stepNumber: history.length,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = whoIsWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? "Go to ( " + move + " )" : "Start the Game";
      return (
        <li key={move}>
          <MyButton
            onClick={() => {
              this.move_To(move);
            }}
          >
            {desc}
          </MyButton>
        </li>
      );
    });
    let status = winner
      ? "Winner is : " + winner
      : "Next player is : " + (this.state.xORo ? "X" : "O");
    //main board
    return (
      <div className="game">
        <div>
          <Board
            onClick={(i) => this.handeler(i)}
            squares={current.squares}
          ></Board>
        </div>
        <div>
          <ul>
            <Button color="primary">{status}</Button>
          </ul>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

//detecting win condition
function whoIsWinner(squares) {
  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
