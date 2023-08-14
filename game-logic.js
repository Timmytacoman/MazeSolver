// 0: draw
// 1: erase
// 2: start
// 3: end
let drawType = 0;
// width and height of grid
let m = 20;
let n = 30;

let startRow = 4;
let startCol = 6;
let endRow = 4;
let endCol = 10;

let backgroundColor = "#96d4d4";
let pathColor = "white";
let startColor = "rgb(255, 255, 0)";
let endColor = "rgb(255, 111, 0)";

// construct grid
let tiles = Array();
for (let i = 0; i < m; i++) {
  let row = Array(n).fill(0);
  tiles.push(row);
}

// console.log(tiles);
// console.log("initial ^");

function tableCreate() {
  const body = document.body;
  const tbl = document.createElement("table");
  tbl.id = "grid";

  for (let i = 0; i < m; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < n; j++) {
      const td = tr.insertCell();
      td.id = i + "," + j;
      td.addEventListener("mouseover", tileEnterEvent);
      td.addEventListener("mousedown", tileClickEvent);
    }
  }
  body.appendChild(tbl);
}

function resetAll() {
  // console.log("here");
  // reset all colors to default
  // console.log(grid);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let element = document.getElementById(i + "," + j);
      let color = element.style.backgroundColor;
      console.log(color);
      if (color != startColor && color != endColor) {
        element.style.transition = "0s";
        element.style.backgroundColor = backgroundColor;
      }
    }
  }
  // reset all walls to empty
  console.log(tiles);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (tiles[i][j] == 1) {
        tiles[i][j] = 0;
      }
    }
  }
}

function clearBoard() {
  console.log("here");
  // reset all non (black or default) to default
  console.log(grid);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let element = document.getElementById(i + "," + j);
      let color = element.style.backgroundColor;
      console.log(color);
      if (color != "black" && color != startColor && color != endColor) {
        element.style.transition = "0s";
        element.style.backgroundColor = backgroundColor;
      }
    }
  }
}

function handleCell(event) {
  // scrape location data
  // row = event.srcElement.id[0];

  // clear rest of board if necessary
  clearBoard();

  let entire = event.srcElement.id;
  const splitted = entire.split(",");
  // console.log(splitted);
  let row = splitted[0];
  let col = splitted[1];
  // col = event.srcElement.id[2];
  // console.log(row, col);

  // pencil
  if (drawType == 0) {
    // change color
    event.srcElement.style.backgroundColor = "black";
    // update grid value to wall
    tiles[row][col] = 1;

    // eraser
  } else if (drawType == 1) {
    // change color
    event.srcElement.style.backgroundColor = "#96d4d4";
    // update grid value to non wall
    tiles[row][col] = 0;
  }
}

function tileEnterEvent(event) {
  // console.log(event);
  if (event.buttons == 1) {
    handleCell(event);
  }
}

function tileClickEvent(event) {
  handleCell(event);
}

function selectPencil() {
  drawType = 0;
  // find drawing buttons
  var pencilButton = document.getElementById("pencil");
  var eraserButton = document.getElementById("eraser");
  pencilButton.style.fontWeight = "bold";
  eraserButton.style.fontWeight = "normal";
}

function selectEraser() {
  drawType = 1;
  // find drawing buttons
  var pencilButton = document.getElementById("pencil");
  var eraserButton = document.getElementById("eraser");
  pencilButton.style.fontWeight = "normal";
  eraserButton.style.fontWeight = "bold";
}

function registerListeners() {
  // console.log("here");
  // register pencil
  const pencil = document.getElementById("pencil");
  pencil.addEventListener("click", selectPencil);
  // register eraser
  const eraser = document.getElementById("eraser");
  eraser.addEventListener("click", selectEraser);
  // register solve buttons
  const solve = document.getElementById("solve");
  solve.addEventListener("click", breadthFirstSearch);
  // reset button
  const reset = document.getElementById("reset-button");
  console.log(reset);
  reset.addEventListener("click", resetAll);
}

// function getGridArray() {
//   // grid is <table id="grid">
//   // console.log(document.getElementById("grid"));
//   // console.log(tiles);
//   breadthFirstSearch();
// }

function breadthFirstSearch() {
  // imported from breadth-first-search.js
  bfs(tiles, start);
}

tableCreate();
registerListeners();

// temp insert start and end positions
// 2 -> start
// 3-> end

tiles[startRow][startCol] = 2;
tiles[endRow][endCol] = 3;
let start = document.getElementById(startRow + "," + startCol);
start.style.backgroundColor = "rgb(255, 255, 0)";

let end = document.getElementById(endRow + "," + endCol);
end.style.backgroundColor = "rgb(255, 111, 0)";

// let test = document.getElementById("0,0");
// console.log(test.isWall);
// console.log(document.getElementById("grid"));
