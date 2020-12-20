import React from "react";
import Square from "./Square";

//making game bord
export default function Board(props) {
  const rdSq = (i) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      ></Square>
    );
  };
  return (
    <div>
      <div>
        {rdSq(0)}
        {rdSq(1)}
        {rdSq(2)}
      </div>
      <div>
        {rdSq(3)}
        {rdSq(4)}
        {rdSq(5)}
      </div>
      <div>
        {rdSq(6)}
        {rdSq(7)}
        {rdSq(8)}
      </div>
    </div>
  );
}
