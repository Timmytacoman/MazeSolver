// class to hold tile data
class Tile {
    color = backgroundColor;
    isWall = false;

    constructor(row, col) {
        this.row = row;
        this.col = col;
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
            tileObject = tiles[i][j];

            // create the table cell
            let tableCell = tableRow.insertCell();

            // add cell listener
            tableCell.addEventListener("mouseleave", cellClickEvent);
            tableCell.addEventListener("click", cellClickEvent);

            // set the cell's attributes
            let cellStyle = tableCell.style;
            // set background color
            cellStyle.backgroundColor = tileObject.color;
        }
    }

    // add the table to the board
    board.appendChild(table);
}

function cellClickEvent(event) {
    // check if left click is being used
    console.log(event.buttons);
    console.log(event);

    if (event.type == "mouseleave") {
        if (event.buttons != 1) {
            return;
        }
    }


    let row = event.target.parentNode.rowIndex;
    let col = event.target.cellIndex;
    // find corresponding tile object
    let tileObject = tiles[row][col];
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

let tiles = initTiles(m, n);
drawGrid(tiles);
