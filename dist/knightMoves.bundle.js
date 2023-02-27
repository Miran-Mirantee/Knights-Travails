/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/knightMoves.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addVertex(v) {
    this.adjList.set(v, []);
  }

  addEdge(start, dest) {
    this.adjList.get(start).push(dest);
    this.adjList.get(dest).push(start);
  }

  printGraph() {
    // get all the vertices
    var get_keys = this.adjList.keys();

    // iterate over the vertices
    for (var i of get_keys) {
      // get the corresponding adjacency list
      // for the vertex
      var get_values = this.adjList.get(i);
      var conc = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (var j of get_values) conc += j + " ";

      // print the vertex and its adjacency list
      console.log(i + " -> " + conc);
    }
  }
}

// create graph
const graph = new Graph();

const _createBoard = () => {
  const arr = [];
  for (let i = 0; i < 8; i++) {
    const temp = [];
    for (let j = 0; j < 8; j++) {
      temp.push([i, j]);
    }
    arr.push(temp);
  }
  return arr;
};

// create board
const board = _createBoard();

// fill all the tils into the graph
const _fillTile = (() => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      graph.addVertex(board[i][j]);
    }
  }
})();

// check if path is travesable
const _checkPath = (tile) => {
  let x = tile[0];
  let y = tile[1];
  if (x > 7 || x < 0 || y > 7 || y < 0) {
    return false;
  }
  return true;
};

// create possible paths
const _createPath = (start = board[0][0]) => {
  let x = start[0];
  let y = start[1];
  const paths = [];
  const temp = [];
  const path1 = [x + 2, y + 1];
  const path2 = [x + 2, y - 1];
  const path3 = [x - 2, y + 1];
  const path4 = [x - 2, y - 1];
  const path5 = [x + 1, y + 2];
  const path6 = [x + 1, y - 2];
  const path7 = [x - 1, y + 2];
  const path8 = [x - 1, y - 2];
  temp.push(path1, path2, path3, path4, path5, path6, path7, path8);
  for (let path of temp) {
    if (_checkPath(path)) {
      paths.push(board[path[0]][path[1]]);
    }
  }

  for (let path of paths) {
    if (!graph.adjList.get(start).includes(path)) {
      graph.addEdge(start, path);
      _createPath(path);
    }
  }
};
_createPath();

// function to performs BFS
const _bfs = (g, start, dest, pred, dist) => {
  // create a visited object
  let visited = {};

  // Create an array for queue
  const q = [];

  for (let i of [...g.adjList.keys()]) {
    visited[i] = false;
    dist[i] = 99999999;
    pred[i] = -1;
  }

  // add the starting node to the queue
  visited[start] = true;
  dist[start] = 0;
  q.push(start);

  // loop until queue is empty
  while (q.length !== 0) {
    // get the element from the queue
    let getQueueElement = q.shift();

    // get the adjacent list for current vertex
    let get_List = g.adjList.get(getQueueElement);

    // loop through the list and add the element to the
    // queue if it is not processed yet
    for (let i in get_List) {
      let neigh = get_List[i];

      if (!visited[neigh]) {
        visited[neigh] = true;
        dist[neigh] = dist[getQueueElement] + 1;
        pred[neigh] = getQueueElement;
        q.push(neigh);
      }

      if (neigh == dest) {
        return true;
      }
    }
  }
  return false;
};

const knightMoves = (start, dest, g = graph) => {
  // predecessor[i] array stores predecessor of
  // i and distance array stores distance of i
  // from s
  start = board[start[0]][start[1]];
  dest = board[dest[0]][dest[1]];
  const size = g.adjList.size;
  let pred = new Array(size).fill(0);
  let dist = new Array(size).fill(0);

  if (_bfs(g, start, dest, pred, dist) == false) {
    console.log("Given source and destination are not connected");
  }

  // vector path stores the shortest path
  let path = new Array();
  let crawl = dest;
  path.push(crawl);
  while (pred[crawl] != -1) {
    path.push(pred[crawl]);
    crawl = pred[crawl];
  }

  // distance from source is in distance array
  console.log("Shortest path length is : ", dist[dest]);

  // printing path from source to destination
  console.log("Path is:");
  // console.log(path);
  for (let i = path.length - 1; i >= 0; i--) console.log(path[i]);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knightMoves);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25pZ2h0TW92ZXMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekIsb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsUUFBUTtBQUN4Qzs7QUFFQSxpRUFBZSxXQUFXLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9rbmlnaHRNb3Zlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNsYXNzIEdyYXBoIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hZGpMaXN0ID0gbmV3IE1hcCgpO1xuICB9XG5cbiAgYWRkVmVydGV4KHYpIHtcbiAgICB0aGlzLmFkakxpc3Quc2V0KHYsIFtdKTtcbiAgfVxuXG4gIGFkZEVkZ2Uoc3RhcnQsIGRlc3QpIHtcbiAgICB0aGlzLmFkakxpc3QuZ2V0KHN0YXJ0KS5wdXNoKGRlc3QpO1xuICAgIHRoaXMuYWRqTGlzdC5nZXQoZGVzdCkucHVzaChzdGFydCk7XG4gIH1cblxuICBwcmludEdyYXBoKCkge1xuICAgIC8vIGdldCBhbGwgdGhlIHZlcnRpY2VzXG4gICAgdmFyIGdldF9rZXlzID0gdGhpcy5hZGpMaXN0LmtleXMoKTtcblxuICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgdmVydGljZXNcbiAgICBmb3IgKHZhciBpIG9mIGdldF9rZXlzKSB7XG4gICAgICAvLyBnZXQgdGhlIGNvcnJlc3BvbmRpbmcgYWRqYWNlbmN5IGxpc3RcbiAgICAgIC8vIGZvciB0aGUgdmVydGV4XG4gICAgICB2YXIgZ2V0X3ZhbHVlcyA9IHRoaXMuYWRqTGlzdC5nZXQoaSk7XG4gICAgICB2YXIgY29uYyA9IFwiXCI7XG5cbiAgICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgYWRqYWNlbmN5IGxpc3RcbiAgICAgIC8vIGNvbmNhdGVuYXRlIHRoZSB2YWx1ZXMgaW50byBhIHN0cmluZ1xuICAgICAgZm9yICh2YXIgaiBvZiBnZXRfdmFsdWVzKSBjb25jICs9IGogKyBcIiBcIjtcblxuICAgICAgLy8gcHJpbnQgdGhlIHZlcnRleCBhbmQgaXRzIGFkamFjZW5jeSBsaXN0XG4gICAgICBjb25zb2xlLmxvZyhpICsgXCIgLT4gXCIgKyBjb25jKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gY3JlYXRlIGdyYXBoXG5jb25zdCBncmFwaCA9IG5ldyBHcmFwaCgpO1xuXG5jb25zdCBfY3JlYXRlQm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGFyciA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGNvbnN0IHRlbXAgPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgdGVtcC5wdXNoKFtpLCBqXSk7XG4gICAgfVxuICAgIGFyci5wdXNoKHRlbXApO1xuICB9XG4gIHJldHVybiBhcnI7XG59O1xuXG4vLyBjcmVhdGUgYm9hcmRcbmNvbnN0IGJvYXJkID0gX2NyZWF0ZUJvYXJkKCk7XG5cbi8vIGZpbGwgYWxsIHRoZSB0aWxzIGludG8gdGhlIGdyYXBoXG5jb25zdCBfZmlsbFRpbGUgPSAoKCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICBncmFwaC5hZGRWZXJ0ZXgoYm9hcmRbaV1bal0pO1xuICAgIH1cbiAgfVxufSkoKTtcblxuLy8gY2hlY2sgaWYgcGF0aCBpcyB0cmF2ZXNhYmxlXG5jb25zdCBfY2hlY2tQYXRoID0gKHRpbGUpID0+IHtcbiAgbGV0IHggPSB0aWxlWzBdO1xuICBsZXQgeSA9IHRpbGVbMV07XG4gIGlmICh4ID4gNyB8fCB4IDwgMCB8fCB5ID4gNyB8fCB5IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIGNyZWF0ZSBwb3NzaWJsZSBwYXRoc1xuY29uc3QgX2NyZWF0ZVBhdGggPSAoc3RhcnQgPSBib2FyZFswXVswXSkgPT4ge1xuICBsZXQgeCA9IHN0YXJ0WzBdO1xuICBsZXQgeSA9IHN0YXJ0WzFdO1xuICBjb25zdCBwYXRocyA9IFtdO1xuICBjb25zdCB0ZW1wID0gW107XG4gIGNvbnN0IHBhdGgxID0gW3ggKyAyLCB5ICsgMV07XG4gIGNvbnN0IHBhdGgyID0gW3ggKyAyLCB5IC0gMV07XG4gIGNvbnN0IHBhdGgzID0gW3ggLSAyLCB5ICsgMV07XG4gIGNvbnN0IHBhdGg0ID0gW3ggLSAyLCB5IC0gMV07XG4gIGNvbnN0IHBhdGg1ID0gW3ggKyAxLCB5ICsgMl07XG4gIGNvbnN0IHBhdGg2ID0gW3ggKyAxLCB5IC0gMl07XG4gIGNvbnN0IHBhdGg3ID0gW3ggLSAxLCB5ICsgMl07XG4gIGNvbnN0IHBhdGg4ID0gW3ggLSAxLCB5IC0gMl07XG4gIHRlbXAucHVzaChwYXRoMSwgcGF0aDIsIHBhdGgzLCBwYXRoNCwgcGF0aDUsIHBhdGg2LCBwYXRoNywgcGF0aDgpO1xuICBmb3IgKGxldCBwYXRoIG9mIHRlbXApIHtcbiAgICBpZiAoX2NoZWNrUGF0aChwYXRoKSkge1xuICAgICAgcGF0aHMucHVzaChib2FyZFtwYXRoWzBdXVtwYXRoWzFdXSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgcGF0aCBvZiBwYXRocykge1xuICAgIGlmICghZ3JhcGguYWRqTGlzdC5nZXQoc3RhcnQpLmluY2x1ZGVzKHBhdGgpKSB7XG4gICAgICBncmFwaC5hZGRFZGdlKHN0YXJ0LCBwYXRoKTtcbiAgICAgIF9jcmVhdGVQYXRoKHBhdGgpO1xuICAgIH1cbiAgfVxufTtcbl9jcmVhdGVQYXRoKCk7XG5cbi8vIGZ1bmN0aW9uIHRvIHBlcmZvcm1zIEJGU1xuY29uc3QgX2JmcyA9IChnLCBzdGFydCwgZGVzdCwgcHJlZCwgZGlzdCkgPT4ge1xuICAvLyBjcmVhdGUgYSB2aXNpdGVkIG9iamVjdFxuICBsZXQgdmlzaXRlZCA9IHt9O1xuXG4gIC8vIENyZWF0ZSBhbiBhcnJheSBmb3IgcXVldWVcbiAgY29uc3QgcSA9IFtdO1xuXG4gIGZvciAobGV0IGkgb2YgWy4uLmcuYWRqTGlzdC5rZXlzKCldKSB7XG4gICAgdmlzaXRlZFtpXSA9IGZhbHNlO1xuICAgIGRpc3RbaV0gPSA5OTk5OTk5OTtcbiAgICBwcmVkW2ldID0gLTE7XG4gIH1cblxuICAvLyBhZGQgdGhlIHN0YXJ0aW5nIG5vZGUgdG8gdGhlIHF1ZXVlXG4gIHZpc2l0ZWRbc3RhcnRdID0gdHJ1ZTtcbiAgZGlzdFtzdGFydF0gPSAwO1xuICBxLnB1c2goc3RhcnQpO1xuXG4gIC8vIGxvb3AgdW50aWwgcXVldWUgaXMgZW1wdHlcbiAgd2hpbGUgKHEubGVuZ3RoICE9PSAwKSB7XG4gICAgLy8gZ2V0IHRoZSBlbGVtZW50IGZyb20gdGhlIHF1ZXVlXG4gICAgbGV0IGdldFF1ZXVlRWxlbWVudCA9IHEuc2hpZnQoKTtcblxuICAgIC8vIGdldCB0aGUgYWRqYWNlbnQgbGlzdCBmb3IgY3VycmVudCB2ZXJ0ZXhcbiAgICBsZXQgZ2V0X0xpc3QgPSBnLmFkakxpc3QuZ2V0KGdldFF1ZXVlRWxlbWVudCk7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggdGhlIGxpc3QgYW5kIGFkZCB0aGUgZWxlbWVudCB0byB0aGVcbiAgICAvLyBxdWV1ZSBpZiBpdCBpcyBub3QgcHJvY2Vzc2VkIHlldFxuICAgIGZvciAobGV0IGkgaW4gZ2V0X0xpc3QpIHtcbiAgICAgIGxldCBuZWlnaCA9IGdldF9MaXN0W2ldO1xuXG4gICAgICBpZiAoIXZpc2l0ZWRbbmVpZ2hdKSB7XG4gICAgICAgIHZpc2l0ZWRbbmVpZ2hdID0gdHJ1ZTtcbiAgICAgICAgZGlzdFtuZWlnaF0gPSBkaXN0W2dldFF1ZXVlRWxlbWVudF0gKyAxO1xuICAgICAgICBwcmVkW25laWdoXSA9IGdldFF1ZXVlRWxlbWVudDtcbiAgICAgICAgcS5wdXNoKG5laWdoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5laWdoID09IGRlc3QpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGtuaWdodE1vdmVzID0gKHN0YXJ0LCBkZXN0LCBnID0gZ3JhcGgpID0+IHtcbiAgLy8gcHJlZGVjZXNzb3JbaV0gYXJyYXkgc3RvcmVzIHByZWRlY2Vzc29yIG9mXG4gIC8vIGkgYW5kIGRpc3RhbmNlIGFycmF5IHN0b3JlcyBkaXN0YW5jZSBvZiBpXG4gIC8vIGZyb20gc1xuICBzdGFydCA9IGJvYXJkW3N0YXJ0WzBdXVtzdGFydFsxXV07XG4gIGRlc3QgPSBib2FyZFtkZXN0WzBdXVtkZXN0WzFdXTtcbiAgY29uc3Qgc2l6ZSA9IGcuYWRqTGlzdC5zaXplO1xuICBsZXQgcHJlZCA9IG5ldyBBcnJheShzaXplKS5maWxsKDApO1xuICBsZXQgZGlzdCA9IG5ldyBBcnJheShzaXplKS5maWxsKDApO1xuXG4gIGlmIChfYmZzKGcsIHN0YXJ0LCBkZXN0LCBwcmVkLCBkaXN0KSA9PSBmYWxzZSkge1xuICAgIGNvbnNvbGUubG9nKFwiR2l2ZW4gc291cmNlIGFuZCBkZXN0aW5hdGlvbiBhcmUgbm90IGNvbm5lY3RlZFwiKTtcbiAgfVxuXG4gIC8vIHZlY3RvciBwYXRoIHN0b3JlcyB0aGUgc2hvcnRlc3QgcGF0aFxuICBsZXQgcGF0aCA9IG5ldyBBcnJheSgpO1xuICBsZXQgY3Jhd2wgPSBkZXN0O1xuICBwYXRoLnB1c2goY3Jhd2wpO1xuICB3aGlsZSAocHJlZFtjcmF3bF0gIT0gLTEpIHtcbiAgICBwYXRoLnB1c2gocHJlZFtjcmF3bF0pO1xuICAgIGNyYXdsID0gcHJlZFtjcmF3bF07XG4gIH1cblxuICAvLyBkaXN0YW5jZSBmcm9tIHNvdXJjZSBpcyBpbiBkaXN0YW5jZSBhcnJheVxuICBjb25zb2xlLmxvZyhcIlNob3J0ZXN0IHBhdGggbGVuZ3RoIGlzIDogXCIsIGRpc3RbZGVzdF0pO1xuXG4gIC8vIHByaW50aW5nIHBhdGggZnJvbSBzb3VyY2UgdG8gZGVzdGluYXRpb25cbiAgY29uc29sZS5sb2coXCJQYXRoIGlzOlwiKTtcbiAgLy8gY29uc29sZS5sb2cocGF0aCk7XG4gIGZvciAobGV0IGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBjb25zb2xlLmxvZyhwYXRoW2ldKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGtuaWdodE1vdmVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9