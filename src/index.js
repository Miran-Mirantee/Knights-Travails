import "./style.css";

const createBoard = () => {
  for (let i = 0; i < 8; i++) {
    const board = document.querySelector(".board");
    const row = document.createElement("div");
    row.classList.add("row");
    board.append(row);
    for (let j = 0; j < 8; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      row.append(tile);
    }
  }
};
createBoard();
