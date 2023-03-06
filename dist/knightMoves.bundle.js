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
  for (let i = path.length - 1; i >= 0; i--) console.log(path[i]);
  return path;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knightMoves);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25pZ2h0TW92ZXMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekIsb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQyxRQUFRO0FBQ3hDO0FBQ0E7O0FBRUEsaUVBQWUsV0FBVyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMva25pZ2h0TW92ZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjbGFzcyBHcmFwaCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWRqTGlzdCA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIGFkZFZlcnRleCh2KSB7XG4gICAgdGhpcy5hZGpMaXN0LnNldCh2LCBbXSk7XG4gIH1cblxuICBhZGRFZGdlKHN0YXJ0LCBkZXN0KSB7XG4gICAgdGhpcy5hZGpMaXN0LmdldChzdGFydCkucHVzaChkZXN0KTtcbiAgICB0aGlzLmFkakxpc3QuZ2V0KGRlc3QpLnB1c2goc3RhcnQpO1xuICB9XG5cbiAgcHJpbnRHcmFwaCgpIHtcbiAgICAvLyBnZXQgYWxsIHRoZSB2ZXJ0aWNlc1xuICAgIHZhciBnZXRfa2V5cyA9IHRoaXMuYWRqTGlzdC5rZXlzKCk7XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIHZlcnRpY2VzXG4gICAgZm9yICh2YXIgaSBvZiBnZXRfa2V5cykge1xuICAgICAgLy8gZ2V0IHRoZSBjb3JyZXNwb25kaW5nIGFkamFjZW5jeSBsaXN0XG4gICAgICAvLyBmb3IgdGhlIHZlcnRleFxuICAgICAgdmFyIGdldF92YWx1ZXMgPSB0aGlzLmFkakxpc3QuZ2V0KGkpO1xuICAgICAgdmFyIGNvbmMgPSBcIlwiO1xuXG4gICAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIGFkamFjZW5jeSBsaXN0XG4gICAgICAvLyBjb25jYXRlbmF0ZSB0aGUgdmFsdWVzIGludG8gYSBzdHJpbmdcbiAgICAgIGZvciAodmFyIGogb2YgZ2V0X3ZhbHVlcykgY29uYyArPSBqICsgXCIgXCI7XG5cbiAgICAgIC8vIHByaW50IHRoZSB2ZXJ0ZXggYW5kIGl0cyBhZGphY2VuY3kgbGlzdFxuICAgICAgY29uc29sZS5sb2coaSArIFwiIC0+IFwiICsgY29uYyk7XG4gICAgfVxuICB9XG59XG5cbi8vIGNyZWF0ZSBncmFwaFxuY29uc3QgZ3JhcGggPSBuZXcgR3JhcGgoKTtcblxuY29uc3QgX2NyZWF0ZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBhcnIgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBjb25zdCB0ZW1wID0gW107XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgIHRlbXAucHVzaChbaSwgal0pO1xuICAgIH1cbiAgICBhcnIucHVzaCh0ZW1wKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufTtcblxuLy8gY3JlYXRlIGJvYXJkXG5jb25zdCBib2FyZCA9IF9jcmVhdGVCb2FyZCgpO1xuXG4vLyBmaWxsIGFsbCB0aGUgdGlscyBpbnRvIHRoZSBncmFwaFxuY29uc3QgX2ZpbGxUaWxlID0gKCgpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgZ3JhcGguYWRkVmVydGV4KGJvYXJkW2ldW2pdKTtcbiAgICB9XG4gIH1cbn0pKCk7XG5cbi8vIGNoZWNrIGlmIHBhdGggaXMgdHJhdmVzYWJsZVxuY29uc3QgX2NoZWNrUGF0aCA9ICh0aWxlKSA9PiB7XG4gIGxldCB4ID0gdGlsZVswXTtcbiAgbGV0IHkgPSB0aWxlWzFdO1xuICBpZiAoeCA+IDcgfHwgeCA8IDAgfHwgeSA+IDcgfHwgeSA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBjcmVhdGUgcG9zc2libGUgcGF0aHNcbmNvbnN0IF9jcmVhdGVQYXRoID0gKHN0YXJ0ID0gYm9hcmRbMF1bMF0pID0+IHtcbiAgbGV0IHggPSBzdGFydFswXTtcbiAgbGV0IHkgPSBzdGFydFsxXTtcbiAgY29uc3QgcGF0aHMgPSBbXTtcbiAgY29uc3QgdGVtcCA9IFtdO1xuICBjb25zdCBwYXRoMSA9IFt4ICsgMiwgeSArIDFdO1xuICBjb25zdCBwYXRoMiA9IFt4ICsgMiwgeSAtIDFdO1xuICBjb25zdCBwYXRoMyA9IFt4IC0gMiwgeSArIDFdO1xuICBjb25zdCBwYXRoNCA9IFt4IC0gMiwgeSAtIDFdO1xuICBjb25zdCBwYXRoNSA9IFt4ICsgMSwgeSArIDJdO1xuICBjb25zdCBwYXRoNiA9IFt4ICsgMSwgeSAtIDJdO1xuICBjb25zdCBwYXRoNyA9IFt4IC0gMSwgeSArIDJdO1xuICBjb25zdCBwYXRoOCA9IFt4IC0gMSwgeSAtIDJdO1xuICB0ZW1wLnB1c2gocGF0aDEsIHBhdGgyLCBwYXRoMywgcGF0aDQsIHBhdGg1LCBwYXRoNiwgcGF0aDcsIHBhdGg4KTtcbiAgZm9yIChsZXQgcGF0aCBvZiB0ZW1wKSB7XG4gICAgaWYgKF9jaGVja1BhdGgocGF0aCkpIHtcbiAgICAgIHBhdGhzLnB1c2goYm9hcmRbcGF0aFswXV1bcGF0aFsxXV0pO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IHBhdGggb2YgcGF0aHMpIHtcbiAgICBpZiAoIWdyYXBoLmFkakxpc3QuZ2V0KHN0YXJ0KS5pbmNsdWRlcyhwYXRoKSkge1xuICAgICAgZ3JhcGguYWRkRWRnZShzdGFydCwgcGF0aCk7XG4gICAgICBfY3JlYXRlUGF0aChwYXRoKTtcbiAgICB9XG4gIH1cbn07XG5fY3JlYXRlUGF0aCgpO1xuXG4vLyBmdW5jdGlvbiB0byBwZXJmb3JtcyBCRlNcbmNvbnN0IF9iZnMgPSAoZywgc3RhcnQsIGRlc3QsIHByZWQsIGRpc3QpID0+IHtcbiAgLy8gY3JlYXRlIGEgdmlzaXRlZCBvYmplY3RcbiAgbGV0IHZpc2l0ZWQgPSB7fTtcblxuICAvLyBDcmVhdGUgYW4gYXJyYXkgZm9yIHF1ZXVlXG4gIGNvbnN0IHEgPSBbXTtcblxuICBmb3IgKGxldCBpIG9mIFsuLi5nLmFkakxpc3Qua2V5cygpXSkge1xuICAgIHZpc2l0ZWRbaV0gPSBmYWxzZTtcbiAgICBkaXN0W2ldID0gOTk5OTk5OTk7XG4gICAgcHJlZFtpXSA9IC0xO1xuICB9XG5cbiAgLy8gYWRkIHRoZSBzdGFydGluZyBub2RlIHRvIHRoZSBxdWV1ZVxuICB2aXNpdGVkW3N0YXJ0XSA9IHRydWU7XG4gIGRpc3Rbc3RhcnRdID0gMDtcbiAgcS5wdXNoKHN0YXJ0KTtcblxuICAvLyBsb29wIHVudGlsIHF1ZXVlIGlzIGVtcHR5XG4gIHdoaWxlIChxLmxlbmd0aCAhPT0gMCkge1xuICAgIC8vIGdldCB0aGUgZWxlbWVudCBmcm9tIHRoZSBxdWV1ZVxuICAgIGxldCBnZXRRdWV1ZUVsZW1lbnQgPSBxLnNoaWZ0KCk7XG5cbiAgICAvLyBnZXQgdGhlIGFkamFjZW50IGxpc3QgZm9yIGN1cnJlbnQgdmVydGV4XG4gICAgbGV0IGdldF9MaXN0ID0gZy5hZGpMaXN0LmdldChnZXRRdWV1ZUVsZW1lbnQpO1xuXG4gICAgLy8gbG9vcCB0aHJvdWdoIHRoZSBsaXN0IGFuZCBhZGQgdGhlIGVsZW1lbnQgdG8gdGhlXG4gICAgLy8gcXVldWUgaWYgaXQgaXMgbm90IHByb2Nlc3NlZCB5ZXRcbiAgICBmb3IgKGxldCBpIGluIGdldF9MaXN0KSB7XG4gICAgICBsZXQgbmVpZ2ggPSBnZXRfTGlzdFtpXTtcblxuICAgICAgaWYgKCF2aXNpdGVkW25laWdoXSkge1xuICAgICAgICB2aXNpdGVkW25laWdoXSA9IHRydWU7XG4gICAgICAgIGRpc3RbbmVpZ2hdID0gZGlzdFtnZXRRdWV1ZUVsZW1lbnRdICsgMTtcbiAgICAgICAgcHJlZFtuZWlnaF0gPSBnZXRRdWV1ZUVsZW1lbnQ7XG4gICAgICAgIHEucHVzaChuZWlnaCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWlnaCA9PSBkZXN0KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBrbmlnaHRNb3ZlcyA9IChzdGFydCwgZGVzdCwgZyA9IGdyYXBoKSA9PiB7XG4gIC8vIHByZWRlY2Vzc29yW2ldIGFycmF5IHN0b3JlcyBwcmVkZWNlc3NvciBvZlxuICAvLyBpIGFuZCBkaXN0YW5jZSBhcnJheSBzdG9yZXMgZGlzdGFuY2Ugb2YgaVxuICAvLyBmcm9tIHNcbiAgc3RhcnQgPSBib2FyZFtzdGFydFswXV1bc3RhcnRbMV1dO1xuICBkZXN0ID0gYm9hcmRbZGVzdFswXV1bZGVzdFsxXV07XG4gIGNvbnN0IHNpemUgPSBnLmFkakxpc3Quc2l6ZTtcbiAgbGV0IHByZWQgPSBuZXcgQXJyYXkoc2l6ZSkuZmlsbCgwKTtcbiAgbGV0IGRpc3QgPSBuZXcgQXJyYXkoc2l6ZSkuZmlsbCgwKTtcblxuICBpZiAoX2JmcyhnLCBzdGFydCwgZGVzdCwgcHJlZCwgZGlzdCkgPT0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIkdpdmVuIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gYXJlIG5vdCBjb25uZWN0ZWRcIik7XG4gIH1cblxuICAvLyB2ZWN0b3IgcGF0aCBzdG9yZXMgdGhlIHNob3J0ZXN0IHBhdGhcbiAgbGV0IHBhdGggPSBuZXcgQXJyYXkoKTtcbiAgbGV0IGNyYXdsID0gZGVzdDtcbiAgcGF0aC5wdXNoKGNyYXdsKTtcbiAgd2hpbGUgKHByZWRbY3Jhd2xdICE9IC0xKSB7XG4gICAgcGF0aC5wdXNoKHByZWRbY3Jhd2xdKTtcbiAgICBjcmF3bCA9IHByZWRbY3Jhd2xdO1xuICB9XG5cbiAgLy8gZGlzdGFuY2UgZnJvbSBzb3VyY2UgaXMgaW4gZGlzdGFuY2UgYXJyYXlcbiAgY29uc29sZS5sb2coXCJTaG9ydGVzdCBwYXRoIGxlbmd0aCBpcyA6IFwiLCBkaXN0W2Rlc3RdKTtcblxuICAvLyBwcmludGluZyBwYXRoIGZyb20gc291cmNlIHRvIGRlc3RpbmF0aW9uXG4gIGZvciAobGV0IGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBjb25zb2xlLmxvZyhwYXRoW2ldKTtcbiAgcmV0dXJuIHBhdGg7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBrbmlnaHRNb3ZlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==