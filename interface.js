"use strict";

// class to hold tile data
class Tile {
    color = backgroundColor;
    isWall = false;
    isStart = false;
    isTarget = false;

    constructor(row, col) {
        this.row = row;
        this.col = col;
    }


    // method to provide dictionary mappings for algorithm solving since key must be a string in javascript
    // source: https://stackoverflow.com/questions/6307514/is-it-possible-to-override-javascripts-tostring-function-to-provide-meaningfu
    toString() {
        return this.row + "," + this.col;
    }
}

// function to create the tile objects and store them in an array
function initTiles(m, n) {
    // m: number of rows
    // n: number of cols

    // create tiles object
    let tiles = Array();

    // iterate through rows to create cells
    for (let i = 0; i < m; i++) {
        let row = Array();
        for (let j = 0; j < n; j++) {
            // create tile obj
            let tile = new Tile(i, j);
            // check if the tile is the start or end
            if (i == startRow && j == startCol) {
                tile.isStart = true;
                tile.color = startColor;
            }
            if (i == endRow && j == endCol) {
                tile.isTarget = true;
                tile.color = endColor;
            }
            row.push(tile);
        }
        tiles.push(row);
    }
    return tiles;
}

// function to display the grid based on data in the tiles array
function drawGrid(tiles) {
    // capture the board
    let board = document.getElementById("board");

    // delete previous table src: https://stackoverflow.com/questions/2688602/delete-the-entire-table-rendered-from-different-pages-using-javascript
    var tbl = document.getElementById("table");
    if (tbl) {
        tbl.parentNode.removeChild(tbl);
    }

    // create the table element
    let table = document.createElement("table");
    table.id = "table";

    // iterate through tiles object
    for (let i = 0; i < tiles.length; i++) {
        // create the row for the table
        let tableRow = table.insertRow();
        for (let j = 0; j < tiles[0].length; j++) {
            // caputre the corresponding tile object
            let tileObject = tiles[i][j];

            // create the table cell
            let tableCell = tableRow.insertCell();

            // add cell listener
            tableCell.addEventListener("mouseleave", handleCellClickEvent);
            tableCell.addEventListener("click", handleCellClickEvent);

            // set the cell's attributes
            let cellStyle = tableCell.style;
            // set background color
            cellStyle.backgroundColor = tileObject.color;
        }
    }

    // add the table to the board
    board.appendChild(table);
}

function handleCellClickEvent(event) {
    // check if left click is being used
    if (event.type == "mouseleave") {
        if (event.buttons != 1) {
            return;
        }
    }

    let row = event.target.parentNode.rowIndex;
    let col = event.target.cellIndex;
    // find corresponding tile object
    let tileObject = tiles[row][col];

    // check if we start clicking on a target cell
    console.log(tileObject);
    if (tileObject.isStart) {
        movingStart = true;
        return;
    }

    if (tileObject.isTarget) {
        movingEnd = true;
        return;
    }

    // check if we are dragging endpoints
    let changed = checkEndPoints(tileObject, row, col);
    if (changed) {
        return;
    }

    // change the wall status
    tileObject.isWall = !tileObject.isWall;
    // change to appropriate color
    if (tileObject.isWall) {
        tileObject.color = wallColor;
    } else {
        tileObject.color = backgroundColor;
    }

    // redraw the grid
    drawGrid(tiles);
}

function checkEndPoints(tileObject, row, col) {
    // if we are dragging with the start
    if (movingStart) {
        // reset the previous location
        let previousStart = tiles[prevStartRow][prevStartCol];
        previousStart.isStart = false;
        previousStart.color = backgroundColor;
        previousStart.isWall = false;

        // make this location the new start
        tileObject.isStart = true;
        tileObject.color = startColor;

        // update previous location
        prevStartRow = row;
        prevStartCol = col;

        // redraw the grid
        drawGrid(tiles);
        console.log(tiles);
        return true;
    }

    // if we are dragging the end
    if (movingEnd) {
        // reset the previous location
        let previousEnd = tiles[prevEndRow][prevEndCol];
        previousEnd.isTarget = false;
        previousEnd.color = backgroundColor;
        previousEnd.isWall = false;

        // make this location the new target
        tileObject.isTarget = true;
        tileObject.color = endColor;

        // update previous location
        prevEndRow = row;
        prevEndCol = col;

        // redraw the grid
        drawGrid(tiles);
        console.log(tiles);
        return true;
    }
    return false;
}

// reset the vars when we are moving the endpoints
function resetMoving() {
    movingStart = false;
    movingEnd = false;
}

// register events
function registerListeners() {
    // register reset moving from mouseup
    document.addEventListener("mouseup", resetMoving);
    // register solve board button
    let button = document.getElementById("solve-board-button");
    button.addEventListener("click", breadthFirstSearch);
}

/* Solving functions
 *
 */



// global scope to init tiles
let tiles = initTiles(m, n);
drawGrid(tiles);
registerListeners();
