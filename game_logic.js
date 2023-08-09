// 0: draw, 1: erase
let drawType = 0;

function tableCreate() {
  const body = document.body;
  const tbl = document.createElement("table");

  for (let i = 0; i < 10; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < 10; j++) {
      const td = tr.insertCell();
      td.id = i + "," + j;
      td.addEventListener("mouseover", tileEnterEvent);
      td.addEventListener("click", tileClickEvent);
    }
  }
  body.appendChild(tbl);
}

function tileEnterEvent(event) {
  // console.log(event);
  if (event.buttons == 1) {
    // pencil
    if (drawType == 0) {
      event.srcElement.style.backgroundColor = "black";
    // eraser
    } else if (drawType == 1) {
      event.srcElement.style.backgroundColor = "#96d4d4";
    }
  }
}

function tileClickEvent(event) {
    // pencil
    if (drawType == 0) {
      event.srcElement.style.backgroundColor = "black";
    // eraser
    } else if (drawType == 1) {
      event.srcElement.style.backgroundColor = "#96d4d4";
    }}

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
  console.log("here");
  // register pencil
  const pencil = document.getElementById("pencil");
  pencil.addEventListener("click", selectPencil);
  // register eraser
  const eraser = document.getElementById("eraser");
  eraser.addEventListener("click", selectEraser);
}

tableCreate();
registerListeners();
