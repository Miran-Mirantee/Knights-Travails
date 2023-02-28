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
  for (let i = path.length - 1; i >= 0; i--) console.log(path[i]);
  return path;
};

export default knightMoves;
