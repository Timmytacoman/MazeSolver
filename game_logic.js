let w = 10;
let h = 10;

function drawRectangle(lineWidth, strokeStyle, left, top, width, height) {
  console.log("drawing rect");
  const canvas = document.getElementById("pixelCanvas");
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.rect(left, top, width, height);
  ctx.stroke();
}

function buildGrid() {
  //   drawRectangle("6", "red", 5, 5, 290, 140);
  for (var i = 0; i < 1000; i++) {
    console.log(i);
  }
}

function test() {
  console.log("test");
  //   let tbl = document.getElementById("pixelCanvas");
  //   tbl.remove();
}


var i = 0;
var button = document.getElementById("goButton");
button.addEventListener("click", function () {
  i++;
  goButton.innerHTML = i;
});