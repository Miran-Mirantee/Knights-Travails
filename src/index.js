import knightMoves from "./knightMoves";
import "./style.css";

const start = [];
const dest = [];

const createBoard = () => {
  const board = document.querySelector(".board");
  for (let y = 7; y >= 0; y--) {
    const row = document.createElement("div");
    row.classList.add("row");
    board.append(row);
    for (let x = 0; x < 8; x++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      if ((x + y) % 2 === 0) {
        tile.classList.add("black");
      }
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
  const numRow = document.createElement("div");
  numRow.classList.add("numRow");
  for (let i = 7; i >= 0; i--) {
    const num = document.createElement("div");
    num.classList.add("num");
    num.textContent = i;
    numRow.append(num);
  }
  const numCol = document.createElement("div");
  numCol.classList.add("numCol");
  for (let i = 0; i < 8; i++) {
    const num = document.createElement("div");
    num.classList.add("num");
    num.textContent = i;
    numCol.append(num);
  }
  board.append(numRow, numCol);
};
createBoard();

// knightMoves([0, 0], [1, 3]);
// knightMoves([0, 1], [0, 2]);
// knightMoves([3, 4], [4, 3]);
// knightMoves([3, 3], [4, 3]);
