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

const checkPath = (tile) => {
  let x = tile[0];
  let y = tile[1];
  if (x > 7 || x < 0 || y > 7 || y < 0) {
    return false;
  }
  return true;
};

// create possible paths
const createPath = (start) => {
  const graph = new Graph();
  graph.addVertex(start);
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
      paths.push(path);
    }
  }

  for (let path of paths) {
    graph.addVertex(path);
    graph.addEdge(start, path);
  }
  graph.printGraph();
};

// const createBoard = () => {
//   const arr = [];
//   for (let i = 0; i < 8; i++) {
//     const temp = [];
//     for (let j = 0; j < 8; j++) {
//       temp.push([i, j]);
//     }
//     arr.push(temp);
//   }
//   return arr;
// };

createPath([0, 0]);

// const board = createBoard();
// console.log(board);

// const graph = new Graph();
// const arr = [1, 0];
// graph.addVertex(arr);
// const temp = graph.adjList.keys();
// // graph.printGraph();
// console.log(temp.next().value);
