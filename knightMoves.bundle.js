/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/knightMoves.js ***!
  \****************************/
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
const createPath = (start = board[0][0]) => {
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
      createPath(path);
    }
  }
};
createPath();

// function to performs BFS
const bfs = (g, start, dest, pred, dist) => {
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

  if (bfs(g, start, dest, pred, dist) == false) {
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

  for (let i = path.length - 1; i >= 0; i--) console.log(path[i]);
};

knightMoves([0, 0], [1, 3]);
knightMoves([0, 1], [0, 2]);
knightMoves([3, 4], [4, 3]);
knightMoves([3, 3], [4, 3]);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25pZ2h0TW92ZXMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekIsb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdDQUFnQyxRQUFRO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9rbmlnaHRNb3Zlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBHcmFwaCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWRqTGlzdCA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIGFkZFZlcnRleCh2KSB7XG4gICAgdGhpcy5hZGpMaXN0LnNldCh2LCBbXSk7XG4gIH1cblxuICBhZGRFZGdlKHN0YXJ0LCBkZXN0KSB7XG4gICAgdGhpcy5hZGpMaXN0LmdldChzdGFydCkucHVzaChkZXN0KTtcbiAgICB0aGlzLmFkakxpc3QuZ2V0KGRlc3QpLnB1c2goc3RhcnQpO1xuICB9XG5cbiAgcHJpbnRHcmFwaCgpIHtcbiAgICAvLyBnZXQgYWxsIHRoZSB2ZXJ0aWNlc1xuICAgIHZhciBnZXRfa2V5cyA9IHRoaXMuYWRqTGlzdC5rZXlzKCk7XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIHZlcnRpY2VzXG4gICAgZm9yICh2YXIgaSBvZiBnZXRfa2V5cykge1xuICAgICAgLy8gZ2V0IHRoZSBjb3JyZXNwb25kaW5nIGFkamFjZW5jeSBsaXN0XG4gICAgICAvLyBmb3IgdGhlIHZlcnRleFxuICAgICAgdmFyIGdldF92YWx1ZXMgPSB0aGlzLmFkakxpc3QuZ2V0KGkpO1xuICAgICAgdmFyIGNvbmMgPSBcIlwiO1xuXG4gICAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIGFkamFjZW5jeSBsaXN0XG4gICAgICAvLyBjb25jYXRlbmF0ZSB0aGUgdmFsdWVzIGludG8gYSBzdHJpbmdcbiAgICAgIGZvciAodmFyIGogb2YgZ2V0X3ZhbHVlcykgY29uYyArPSBqICsgXCIgXCI7XG5cbiAgICAgIC8vIHByaW50IHRoZSB2ZXJ0ZXggYW5kIGl0cyBhZGphY2VuY3kgbGlzdFxuICAgICAgY29uc29sZS5sb2coaSArIFwiIC0+IFwiICsgY29uYyk7XG4gICAgfVxuICB9XG59XG5cbi8vIGNyZWF0ZSBncmFwaFxuY29uc3QgZ3JhcGggPSBuZXcgR3JhcGgoKTtcblxuY29uc3QgX2NyZWF0ZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBhcnIgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBjb25zdCB0ZW1wID0gW107XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgIHRlbXAucHVzaChbaSwgal0pO1xuICAgIH1cbiAgICBhcnIucHVzaCh0ZW1wKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufTtcblxuLy8gY3JlYXRlIGJvYXJkXG5jb25zdCBib2FyZCA9IF9jcmVhdGVCb2FyZCgpO1xuXG4vLyBmaWxsIGFsbCB0aGUgdGlscyBpbnRvIHRoZSBncmFwaFxuY29uc3QgX2ZpbGxUaWxlID0gKCgpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgZ3JhcGguYWRkVmVydGV4KGJvYXJkW2ldW2pdKTtcbiAgICB9XG4gIH1cbn0pKCk7XG5cbi8vIGNoZWNrIGlmIHBhdGggaXMgdHJhdmVzYWJsZVxuY29uc3QgX2NoZWNrUGF0aCA9ICh0aWxlKSA9PiB7XG4gIGxldCB4ID0gdGlsZVswXTtcbiAgbGV0IHkgPSB0aWxlWzFdO1xuICBpZiAoeCA+IDcgfHwgeCA8IDAgfHwgeSA+IDcgfHwgeSA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBjcmVhdGUgcG9zc2libGUgcGF0aHNcbmNvbnN0IGNyZWF0ZVBhdGggPSAoc3RhcnQgPSBib2FyZFswXVswXSkgPT4ge1xuICBsZXQgeCA9IHN0YXJ0WzBdO1xuICBsZXQgeSA9IHN0YXJ0WzFdO1xuICBjb25zdCBwYXRocyA9IFtdO1xuICBjb25zdCB0ZW1wID0gW107XG4gIGNvbnN0IHBhdGgxID0gW3ggKyAyLCB5ICsgMV07XG4gIGNvbnN0IHBhdGgyID0gW3ggKyAyLCB5IC0gMV07XG4gIGNvbnN0IHBhdGgzID0gW3ggLSAyLCB5ICsgMV07XG4gIGNvbnN0IHBhdGg0ID0gW3ggLSAyLCB5IC0gMV07XG4gIGNvbnN0IHBhdGg1ID0gW3ggKyAxLCB5ICsgMl07XG4gIGNvbnN0IHBhdGg2ID0gW3ggKyAxLCB5IC0gMl07XG4gIGNvbnN0IHBhdGg3ID0gW3ggLSAxLCB5ICsgMl07XG4gIGNvbnN0IHBhdGg4ID0gW3ggLSAxLCB5IC0gMl07XG4gIHRlbXAucHVzaChwYXRoMSwgcGF0aDIsIHBhdGgzLCBwYXRoNCwgcGF0aDUsIHBhdGg2LCBwYXRoNywgcGF0aDgpO1xuICBmb3IgKGxldCBwYXRoIG9mIHRlbXApIHtcbiAgICBpZiAoX2NoZWNrUGF0aChwYXRoKSkge1xuICAgICAgcGF0aHMucHVzaChib2FyZFtwYXRoWzBdXVtwYXRoWzFdXSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgcGF0aCBvZiBwYXRocykge1xuICAgIGlmICghZ3JhcGguYWRqTGlzdC5nZXQoc3RhcnQpLmluY2x1ZGVzKHBhdGgpKSB7XG4gICAgICBncmFwaC5hZGRFZGdlKHN0YXJ0LCBwYXRoKTtcbiAgICAgIGNyZWF0ZVBhdGgocGF0aCk7XG4gICAgfVxuICB9XG59O1xuY3JlYXRlUGF0aCgpO1xuXG4vLyBmdW5jdGlvbiB0byBwZXJmb3JtcyBCRlNcbmNvbnN0IGJmcyA9IChnLCBzdGFydCwgZGVzdCwgcHJlZCwgZGlzdCkgPT4ge1xuICAvLyBjcmVhdGUgYSB2aXNpdGVkIG9iamVjdFxuICBsZXQgdmlzaXRlZCA9IHt9O1xuXG4gIC8vIENyZWF0ZSBhbiBhcnJheSBmb3IgcXVldWVcbiAgY29uc3QgcSA9IFtdO1xuXG4gIGZvciAobGV0IGkgb2YgWy4uLmcuYWRqTGlzdC5rZXlzKCldKSB7XG4gICAgdmlzaXRlZFtpXSA9IGZhbHNlO1xuICAgIGRpc3RbaV0gPSA5OTk5OTk5OTtcbiAgICBwcmVkW2ldID0gLTE7XG4gIH1cblxuICAvLyBhZGQgdGhlIHN0YXJ0aW5nIG5vZGUgdG8gdGhlIHF1ZXVlXG4gIHZpc2l0ZWRbc3RhcnRdID0gdHJ1ZTtcbiAgZGlzdFtzdGFydF0gPSAwO1xuICBxLnB1c2goc3RhcnQpO1xuXG4gIC8vIGxvb3AgdW50aWwgcXVldWUgaXMgZW1wdHlcbiAgd2hpbGUgKHEubGVuZ3RoICE9PSAwKSB7XG4gICAgLy8gZ2V0IHRoZSBlbGVtZW50IGZyb20gdGhlIHF1ZXVlXG4gICAgbGV0IGdldFF1ZXVlRWxlbWVudCA9IHEuc2hpZnQoKTtcblxuICAgIC8vIGdldCB0aGUgYWRqYWNlbnQgbGlzdCBmb3IgY3VycmVudCB2ZXJ0ZXhcbiAgICBsZXQgZ2V0X0xpc3QgPSBnLmFkakxpc3QuZ2V0KGdldFF1ZXVlRWxlbWVudCk7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggdGhlIGxpc3QgYW5kIGFkZCB0aGUgZWxlbWVudCB0byB0aGVcbiAgICAvLyBxdWV1ZSBpZiBpdCBpcyBub3QgcHJvY2Vzc2VkIHlldFxuICAgIGZvciAobGV0IGkgaW4gZ2V0X0xpc3QpIHtcbiAgICAgIGxldCBuZWlnaCA9IGdldF9MaXN0W2ldO1xuXG4gICAgICBpZiAoIXZpc2l0ZWRbbmVpZ2hdKSB7XG4gICAgICAgIHZpc2l0ZWRbbmVpZ2hdID0gdHJ1ZTtcbiAgICAgICAgZGlzdFtuZWlnaF0gPSBkaXN0W2dldFF1ZXVlRWxlbWVudF0gKyAxO1xuICAgICAgICBwcmVkW25laWdoXSA9IGdldFF1ZXVlRWxlbWVudDtcbiAgICAgICAgcS5wdXNoKG5laWdoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5laWdoID09IGRlc3QpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGtuaWdodE1vdmVzID0gKHN0YXJ0LCBkZXN0LCBnID0gZ3JhcGgpID0+IHtcbiAgLy8gcHJlZGVjZXNzb3JbaV0gYXJyYXkgc3RvcmVzIHByZWRlY2Vzc29yIG9mXG4gIC8vIGkgYW5kIGRpc3RhbmNlIGFycmF5IHN0b3JlcyBkaXN0YW5jZSBvZiBpXG4gIC8vIGZyb20gc1xuICBzdGFydCA9IGJvYXJkW3N0YXJ0WzBdXVtzdGFydFsxXV07XG4gIGRlc3QgPSBib2FyZFtkZXN0WzBdXVtkZXN0WzFdXTtcbiAgY29uc3Qgc2l6ZSA9IGcuYWRqTGlzdC5zaXplO1xuICBsZXQgcHJlZCA9IG5ldyBBcnJheShzaXplKS5maWxsKDApO1xuICBsZXQgZGlzdCA9IG5ldyBBcnJheShzaXplKS5maWxsKDApO1xuXG4gIGlmIChiZnMoZywgc3RhcnQsIGRlc3QsIHByZWQsIGRpc3QpID09IGZhbHNlKSB7XG4gICAgY29uc29sZS5sb2coXCJHaXZlbiBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGFyZSBub3QgY29ubmVjdGVkXCIpO1xuICB9XG5cbiAgLy8gdmVjdG9yIHBhdGggc3RvcmVzIHRoZSBzaG9ydGVzdCBwYXRoXG4gIGxldCBwYXRoID0gbmV3IEFycmF5KCk7XG4gIGxldCBjcmF3bCA9IGRlc3Q7XG4gIHBhdGgucHVzaChjcmF3bCk7XG4gIHdoaWxlIChwcmVkW2NyYXdsXSAhPSAtMSkge1xuICAgIHBhdGgucHVzaChwcmVkW2NyYXdsXSk7XG4gICAgY3Jhd2wgPSBwcmVkW2NyYXdsXTtcbiAgfVxuXG4gIC8vIGRpc3RhbmNlIGZyb20gc291cmNlIGlzIGluIGRpc3RhbmNlIGFycmF5XG4gIGNvbnNvbGUubG9nKFwiU2hvcnRlc3QgcGF0aCBsZW5ndGggaXMgOiBcIiwgZGlzdFtkZXN0XSk7XG5cbiAgLy8gcHJpbnRpbmcgcGF0aCBmcm9tIHNvdXJjZSB0byBkZXN0aW5hdGlvblxuICBjb25zb2xlLmxvZyhcIlBhdGggaXM6XCIpO1xuXG4gIGZvciAobGV0IGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBjb25zb2xlLmxvZyhwYXRoW2ldKTtcbn07XG5cbmtuaWdodE1vdmVzKFswLCAwXSwgWzEsIDNdKTtcbmtuaWdodE1vdmVzKFswLCAxXSwgWzAsIDJdKTtcbmtuaWdodE1vdmVzKFszLCA0XSwgWzQsIDNdKTtcbmtuaWdodE1vdmVzKFszLCAzXSwgWzQsIDNdKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==