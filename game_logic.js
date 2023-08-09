// 0: draw, 1: erase
let drawType = 0;
// width and height of grid
let n = 10;
let m = 10;

// construct grid
let tiles = Array();
for (let i = 0; i < n; i++) {
  let row = Array.from("0".repeat(m));
  tiles.push(row);
}
console.log(tiles);
console.log("initial ^");

function tableCreate() {
  const body = document.body;
  const tbl = document.createElement("table");
  tbl.id = "grid";

  for (let i = 0; i < n; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < m; j++) {
      const td = tr.insertCell();
      td.id = i + "," + j;
      td.addEventListener("mouseover", tileEnterEvent);
      td.addEventListener("mousedown", tileClickEvent);
    }
  }
  body.appendChild(tbl);
}

function handleCell(event) {
  // scrape location data
  row = event.srcElement.id[0];
  col = event.srcElement.id[2];
  // console.log(row, col);

  // pencil
  if (drawType == 0) {
    // change color
    event.srcElement.style.backgroundColor = "black";
    // update grid value to wall
    tiles[row][col] = "1";

    // eraser
  } else if (drawType == 1) {
    // change color
    event.srcElement.style.backgroundColor = "#96d4d4";
    // update grid value to non wall
    tiles[row][col] = "0";
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
  solve.addEventListener("click", getGridArray);
}

function getGridArray() {
  // grid is <table id="grid">
  console.log(document.getElementById("grid"));
  console.log(tiles);
}

tableCreate();
registerListeners();

// let test = document.getElementById("0,0");
// console.log(test.isWall);
// console.log(document.getElementById("grid"));
