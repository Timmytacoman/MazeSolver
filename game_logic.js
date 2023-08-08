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
  drawRectangle("6", "red", 5, 5, 290, 140);
}

function test() {
  let tbl = document.getElementById("pixelCanvas");

  console.log(tbl);
}
