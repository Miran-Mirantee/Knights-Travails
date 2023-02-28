import knightMoves from "./knightMoves";
import "./style.css";

let start = [];
let getStartPoint = false;
let end = [];
let getEndPoint = false;
let path = [];

const createBoard = () => {
  const board = document.querySelector(".board");
  for (let y = 7; y >= 0; y--) {
    const row = document.createElement("div");
    row.classList.add("row");
    board.append(row);
    for (let x = 0; x < 8; x++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.setAttribute("data-tile", `[${x}, ${y}]`);
      if ((x + y) % 2 === 0) {
        tile.classList.add("black");
      }
      row.append(tile);
      tile.addEventListener("click", () => {
        const tileArr = tile.getAttribute("data-tile");
        if (getStartPoint) {
          start = [...JSON.parse(tileArr)];
          console.log(`Start: ${start}`);
        }
        if (getEndPoint) {
          end = [...JSON.parse(tileArr)];
          console.log(`End: ${end}`);
        }
      });
    }
  }
  const numRow = document.createElement("div");
  numRow.classList.add("numRow");

  const _createNum = (parent, i) => {
    const num = document.createElement("div");
    num.classList.add("num");
    num.textContent = i;
    parent.append(num);
  };
  for (let i = 7; i >= 0; i--) {
    _createNum(numRow, i);
  }
  const numCol = document.createElement("div");
  numCol.classList.add("numCol");
  for (let i = 0; i < 8; i++) {
    _createNum(numCol, i);
  }
  board.append(numRow, numCol);
};
createBoard();

const startBtn = document.querySelector(".startBtn");
const endBtn = document.querySelector(".endBtn");
const traverseBtn = document.querySelector(".traverseBtn");
startBtn.addEventListener("click", () => {
  getStartPoint = true;
  getEndPoint = false;
});

endBtn.addEventListener("click", () => {
  getStartPoint = false;
  getEndPoint = true;
});
traverseBtn.addEventListener("click", () => {
  if (start.length !== 0 && end.length !== 0)
    path = [...knightMoves(start, end)].reverse();

  console.log(path);
});

// knightMoves([0, 0], [1, 3]);
