"use strict";

let m = 20;
let n = 20;

let backgroundColor = "lightblue";
let wallColor = "black";

let exploreColor = "white";
let solutionPathColor = "lightgreen";

let startRow = m / 2;
let startCol = n / 2 - m / 4;
let startColor = "orange";

let endRow = m / 2;
let endCol = n / 2 + m / 4;
let endColor = "green";

let movingStart = false;
let prevStartRow = startRow;
let prevStartCol = startCol;

let movingEnd = false;
let prevEndRow = endRow;
let prevEndCol = endCol;
