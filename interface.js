// class to hold tile data
class Tile {
    color = backgroundColor;

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
    // create the table element
    let table = document.createElement("table");

    for (let i = 0; i < tiles.length; i++) {
        let tableRow = table.insertRow();
        for(let j = 0; j < tiles[0].length; j++) {
            // console.log(tiles[i][j]);
            let tableCell = tableRow.insertCell();

        }
    }

    board.appendChild(table);

    for (let i = 0; i < tiles.length; i++) {}
}

let tiles = initTiles(10, 10);
// console.log(tiles);
drawGrid(tiles);
