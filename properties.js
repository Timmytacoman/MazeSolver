"use strict";

let m = 30;
let n = 50;

let backgroundColor = "lightblue";
let wallColor = "black";

let exploreColor = "white";
let solutionPathColor = "lightgreen";

let startRow = Math.floor(m / 2);
let startCol = Math.floor(n / 2 - m / 4);
let startColor = "orange";

let endRow = Math.floor(m / 2);
let endCol = Math.floor(n / 2 + m / 4);
let endColor = "green";

let bfsDelaySearchTime = 1;
let bfsDelaySolutionTime = 100;

let movingStart = false;
let prevStartRow = startRow;
let prevStartCol = startCol;

let movingEnd = false;
let prevEndRow = endRow;
let prevEndCol = endCol;
