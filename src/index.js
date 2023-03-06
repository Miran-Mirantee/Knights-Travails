import knightMoves from "./knightMoves";
import "./style.css";

let start = [];
let getStartPoint = false;
let end = [];
let getEndPoint = false;
let paths = [];
let isMoving = false;

const createBoard = () => {
  const board = document.querySelector(".board");
  for (let y = 7; y >= 0; y--) {
    const row = document.createElement("div");
    row.classList.add("row");
    board.append(row);
    for (let x = 0; x < 8; x++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.setAttribute("data-tile", `[${x},${y}]`);
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

const sleep = (millisec) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, millisec);
  });
};

const moveKnight = async (cords) => {
  const knight = document.querySelector(".knight");
  isMoving = true;
  knight.style.opacity = `1`;
  for (let cord of cords) {
    knight.style.transitionDuration = `1s`;

    // move the knight to the start without delay
    if (cords.indexOf(cord) === 0) {
      knight.style.display = "block";
      knight.style.transitionDuration = `0s`;
    }
    knight.style.transform = `translate(${cord.x}px, ${cord.y}px)`;
    await sleep(1000);
  }
  isMoving = false;
};

// getting an offset cordination
const knight = document.querySelector(".knight");
const knightCord = knight.getBoundingClientRect();

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
  // if the knight is moving then exit
  if (!isMoving) {
    if (start.length !== 0 && end.length !== 0)
      paths = [...knightMoves(start, end)].reverse();
    else return;

    // clear old path and order
    const oldPaths = document.querySelectorAll(".path");
    for (let path of oldPaths) {
      path.classList.remove("path");
      path.removeChild(path.firstChild);
    }
    const cords = [];

    // mark the path and get cordinate
    for (let i in paths) {
      const tile = document.querySelector(
        `[data-tile="${JSON.stringify(paths[i])}"]`
      );
      const order = document.createElement("div");
      const tileCord = tile.getBoundingClientRect();
      tile.classList.add("path");
      order.classList.add("order");
      order.textContent = parseInt(i) + 1;
      tile.append(order);
      cords.push({
        x: tileCord.left - knightCord.left + 7.03,
        y: tileCord.top - knightCord.top + 7.03,
      });
    }
    moveKnight(cords);
  }
});

// knightMoves([0, 0], [1, 3]);
