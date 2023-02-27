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

const createBoard = () => {
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
const board = createBoard();

// fill all the tils into the graph
const fillTile = (() => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      graph.addVertex(board[i][j]);
    }
  }
})();

// check if path is travesable
const checkPath = (tile) => {
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
    if (checkPath(path)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25pZ2h0TW92ZXMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekIsb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdDQUFnQyxRQUFRO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9rbmlnaHRNb3Zlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBHcmFwaCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWRqTGlzdCA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIGFkZFZlcnRleCh2KSB7XG4gICAgdGhpcy5hZGpMaXN0LnNldCh2LCBbXSk7XG4gIH1cblxuICBhZGRFZGdlKHN0YXJ0LCBkZXN0KSB7XG4gICAgdGhpcy5hZGpMaXN0LmdldChzdGFydCkucHVzaChkZXN0KTtcbiAgICB0aGlzLmFkakxpc3QuZ2V0KGRlc3QpLnB1c2goc3RhcnQpO1xuICB9XG5cbiAgcHJpbnRHcmFwaCgpIHtcbiAgICAvLyBnZXQgYWxsIHRoZSB2ZXJ0aWNlc1xuICAgIHZhciBnZXRfa2V5cyA9IHRoaXMuYWRqTGlzdC5rZXlzKCk7XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIHZlcnRpY2VzXG4gICAgZm9yICh2YXIgaSBvZiBnZXRfa2V5cykge1xuICAgICAgLy8gZ2V0IHRoZSBjb3JyZXNwb25kaW5nIGFkamFjZW5jeSBsaXN0XG4gICAgICAvLyBmb3IgdGhlIHZlcnRleFxuICAgICAgdmFyIGdldF92YWx1ZXMgPSB0aGlzLmFkakxpc3QuZ2V0KGkpO1xuICAgICAgdmFyIGNvbmMgPSBcIlwiO1xuXG4gICAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIGFkamFjZW5jeSBsaXN0XG4gICAgICAvLyBjb25jYXRlbmF0ZSB0aGUgdmFsdWVzIGludG8gYSBzdHJpbmdcbiAgICAgIGZvciAodmFyIGogb2YgZ2V0X3ZhbHVlcykgY29uYyArPSBqICsgXCIgXCI7XG5cbiAgICAgIC8vIHByaW50IHRoZSB2ZXJ0ZXggYW5kIGl0cyBhZGphY2VuY3kgbGlzdFxuICAgICAgY29uc29sZS5sb2coaSArIFwiIC0+IFwiICsgY29uYyk7XG4gICAgfVxuICB9XG59XG5cbi8vIGNyZWF0ZSBncmFwaFxuY29uc3QgZ3JhcGggPSBuZXcgR3JhcGgoKTtcblxuY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGFyciA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGNvbnN0IHRlbXAgPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgdGVtcC5wdXNoKFtpLCBqXSk7XG4gICAgfVxuICAgIGFyci5wdXNoKHRlbXApO1xuICB9XG4gIHJldHVybiBhcnI7XG59O1xuXG4vLyBjcmVhdGUgYm9hcmRcbmNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcblxuLy8gZmlsbCBhbGwgdGhlIHRpbHMgaW50byB0aGUgZ3JhcGhcbmNvbnN0IGZpbGxUaWxlID0gKCgpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgZ3JhcGguYWRkVmVydGV4KGJvYXJkW2ldW2pdKTtcbiAgICB9XG4gIH1cbn0pKCk7XG5cbi8vIGNoZWNrIGlmIHBhdGggaXMgdHJhdmVzYWJsZVxuY29uc3QgY2hlY2tQYXRoID0gKHRpbGUpID0+IHtcbiAgbGV0IHggPSB0aWxlWzBdO1xuICBsZXQgeSA9IHRpbGVbMV07XG4gIGlmICh4ID4gNyB8fCB4IDwgMCB8fCB5ID4gNyB8fCB5IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIGNyZWF0ZSBwb3NzaWJsZSBwYXRoc1xuY29uc3QgY3JlYXRlUGF0aCA9IChzdGFydCA9IGJvYXJkWzBdWzBdKSA9PiB7XG4gIGxldCB4ID0gc3RhcnRbMF07XG4gIGxldCB5ID0gc3RhcnRbMV07XG4gIGNvbnN0IHBhdGhzID0gW107XG4gIGNvbnN0IHRlbXAgPSBbXTtcbiAgY29uc3QgcGF0aDEgPSBbeCArIDIsIHkgKyAxXTtcbiAgY29uc3QgcGF0aDIgPSBbeCArIDIsIHkgLSAxXTtcbiAgY29uc3QgcGF0aDMgPSBbeCAtIDIsIHkgKyAxXTtcbiAgY29uc3QgcGF0aDQgPSBbeCAtIDIsIHkgLSAxXTtcbiAgY29uc3QgcGF0aDUgPSBbeCArIDEsIHkgKyAyXTtcbiAgY29uc3QgcGF0aDYgPSBbeCArIDEsIHkgLSAyXTtcbiAgY29uc3QgcGF0aDcgPSBbeCAtIDEsIHkgKyAyXTtcbiAgY29uc3QgcGF0aDggPSBbeCAtIDEsIHkgLSAyXTtcbiAgdGVtcC5wdXNoKHBhdGgxLCBwYXRoMiwgcGF0aDMsIHBhdGg0LCBwYXRoNSwgcGF0aDYsIHBhdGg3LCBwYXRoOCk7XG4gIGZvciAobGV0IHBhdGggb2YgdGVtcCkge1xuICAgIGlmIChjaGVja1BhdGgocGF0aCkpIHtcbiAgICAgIHBhdGhzLnB1c2goYm9hcmRbcGF0aFswXV1bcGF0aFsxXV0pO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IHBhdGggb2YgcGF0aHMpIHtcbiAgICBpZiAoIWdyYXBoLmFkakxpc3QuZ2V0KHN0YXJ0KS5pbmNsdWRlcyhwYXRoKSkge1xuICAgICAgZ3JhcGguYWRkRWRnZShzdGFydCwgcGF0aCk7XG4gICAgICBjcmVhdGVQYXRoKHBhdGgpO1xuICAgIH1cbiAgfVxufTtcbmNyZWF0ZVBhdGgoKTtcblxuLy8gZnVuY3Rpb24gdG8gcGVyZm9ybXMgQkZTXG5jb25zdCBiZnMgPSAoZywgc3RhcnQsIGRlc3QsIHByZWQsIGRpc3QpID0+IHtcbiAgLy8gY3JlYXRlIGEgdmlzaXRlZCBvYmplY3RcbiAgbGV0IHZpc2l0ZWQgPSB7fTtcblxuICAvLyBDcmVhdGUgYW4gYXJyYXkgZm9yIHF1ZXVlXG4gIGNvbnN0IHEgPSBbXTtcblxuICBmb3IgKGxldCBpIG9mIFsuLi5nLmFkakxpc3Qua2V5cygpXSkge1xuICAgIHZpc2l0ZWRbaV0gPSBmYWxzZTtcbiAgICBkaXN0W2ldID0gOTk5OTk5OTk7XG4gICAgcHJlZFtpXSA9IC0xO1xuICB9XG5cbiAgLy8gYWRkIHRoZSBzdGFydGluZyBub2RlIHRvIHRoZSBxdWV1ZVxuICB2aXNpdGVkW3N0YXJ0XSA9IHRydWU7XG4gIGRpc3Rbc3RhcnRdID0gMDtcbiAgcS5wdXNoKHN0YXJ0KTtcblxuICAvLyBsb29wIHVudGlsIHF1ZXVlIGlzIGVtcHR5XG4gIHdoaWxlIChxLmxlbmd0aCAhPT0gMCkge1xuICAgIC8vIGdldCB0aGUgZWxlbWVudCBmcm9tIHRoZSBxdWV1ZVxuICAgIGxldCBnZXRRdWV1ZUVsZW1lbnQgPSBxLnNoaWZ0KCk7XG5cbiAgICAvLyBnZXQgdGhlIGFkamFjZW50IGxpc3QgZm9yIGN1cnJlbnQgdmVydGV4XG4gICAgbGV0IGdldF9MaXN0ID0gZy5hZGpMaXN0LmdldChnZXRRdWV1ZUVsZW1lbnQpO1xuXG4gICAgLy8gbG9vcCB0aHJvdWdoIHRoZSBsaXN0IGFuZCBhZGQgdGhlIGVsZW1lbnQgdG8gdGhlXG4gICAgLy8gcXVldWUgaWYgaXQgaXMgbm90IHByb2Nlc3NlZCB5ZXRcbiAgICBmb3IgKGxldCBpIGluIGdldF9MaXN0KSB7XG4gICAgICBsZXQgbmVpZ2ggPSBnZXRfTGlzdFtpXTtcblxuICAgICAgaWYgKCF2aXNpdGVkW25laWdoXSkge1xuICAgICAgICB2aXNpdGVkW25laWdoXSA9IHRydWU7XG4gICAgICAgIGRpc3RbbmVpZ2hdID0gZGlzdFtnZXRRdWV1ZUVsZW1lbnRdICsgMTtcbiAgICAgICAgcHJlZFtuZWlnaF0gPSBnZXRRdWV1ZUVsZW1lbnQ7XG4gICAgICAgIHEucHVzaChuZWlnaCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWlnaCA9PSBkZXN0KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBrbmlnaHRNb3ZlcyA9IChzdGFydCwgZGVzdCwgZyA9IGdyYXBoKSA9PiB7XG4gIC8vIHByZWRlY2Vzc29yW2ldIGFycmF5IHN0b3JlcyBwcmVkZWNlc3NvciBvZlxuICAvLyBpIGFuZCBkaXN0YW5jZSBhcnJheSBzdG9yZXMgZGlzdGFuY2Ugb2YgaVxuICAvLyBmcm9tIHNcbiAgc3RhcnQgPSBib2FyZFtzdGFydFswXV1bc3RhcnRbMV1dO1xuICBkZXN0ID0gYm9hcmRbZGVzdFswXV1bZGVzdFsxXV07XG4gIGNvbnN0IHNpemUgPSBnLmFkakxpc3Quc2l6ZTtcbiAgbGV0IHByZWQgPSBuZXcgQXJyYXkoc2l6ZSkuZmlsbCgwKTtcbiAgbGV0IGRpc3QgPSBuZXcgQXJyYXkoc2l6ZSkuZmlsbCgwKTtcblxuICBpZiAoYmZzKGcsIHN0YXJ0LCBkZXN0LCBwcmVkLCBkaXN0KSA9PSBmYWxzZSkge1xuICAgIGNvbnNvbGUubG9nKFwiR2l2ZW4gc291cmNlIGFuZCBkZXN0aW5hdGlvbiBhcmUgbm90IGNvbm5lY3RlZFwiKTtcbiAgfVxuXG4gIC8vIHZlY3RvciBwYXRoIHN0b3JlcyB0aGUgc2hvcnRlc3QgcGF0aFxuICBsZXQgcGF0aCA9IG5ldyBBcnJheSgpO1xuICBsZXQgY3Jhd2wgPSBkZXN0O1xuICBwYXRoLnB1c2goY3Jhd2wpO1xuICB3aGlsZSAocHJlZFtjcmF3bF0gIT0gLTEpIHtcbiAgICBwYXRoLnB1c2gocHJlZFtjcmF3bF0pO1xuICAgIGNyYXdsID0gcHJlZFtjcmF3bF07XG4gIH1cblxuICAvLyBkaXN0YW5jZSBmcm9tIHNvdXJjZSBpcyBpbiBkaXN0YW5jZSBhcnJheVxuICBjb25zb2xlLmxvZyhcIlNob3J0ZXN0IHBhdGggbGVuZ3RoIGlzIDogXCIsIGRpc3RbZGVzdF0pO1xuXG4gIC8vIHByaW50aW5nIHBhdGggZnJvbSBzb3VyY2UgdG8gZGVzdGluYXRpb25cbiAgY29uc29sZS5sb2coXCJQYXRoIGlzOlwiKTtcblxuICBmb3IgKGxldCBpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgY29uc29sZS5sb2cocGF0aFtpXSk7XG59O1xuXG5rbmlnaHRNb3ZlcyhbMCwgMF0sIFsxLCAzXSk7XG5rbmlnaHRNb3ZlcyhbMCwgMV0sIFswLCAyXSk7XG5rbmlnaHRNb3ZlcyhbMywgNF0sIFs0LCAzXSk7XG5rbmlnaHRNb3ZlcyhbMywgM10sIFs0LCAzXSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=