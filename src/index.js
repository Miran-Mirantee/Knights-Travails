import knightMoves from "./knightMoves";
import "./style.css";

const start = [];
const dest = [];

const createBoard = () => {
  for (let y = 7; y >= 0; y--) {
    const board = document.querySelector(".board");
    const row = document.createElement("div");
    row.classList.add("row");
    board.append(row);
    for (let x = 0; x < 8; x++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      row.append(tile);
      tile.addEventListener("click", () => {
        if (start.length === 0) {
          start.push(x, y);
          console.log(start);
        } else {
          dest.push(x, y);
          console.log(dest);
          knightMoves(start, dest);
          // temporary implement
        }
      });
    }
  }
};
createBoard();

// knightMoves([0, 0], [1, 3]);
// knightMoves([0, 1], [0, 2]);
// knightMoves([3, 4], [4, 3]);
// knightMoves([3, 3], [4, 3]);
