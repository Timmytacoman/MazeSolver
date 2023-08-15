"use strict";

function getStart() {
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let tile = tiles[i][j];
            if (tile.isStart) {
                return tile;
            }
        }
    }
}

function getEnd() {
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let tile = tiles[i][j];
            if (tile.isTarget) {
                return tile;
            }
        }
    }
}

// returns the valid (in-bound) neighbors of some node
function getNeighbors(node) {
    let row = node.row;
    let col = node.col;
    let possible = [
        [row - 1, col],
        [row, col + 1],
        [row + 1, col],
        [row, col - 1],
    ];
    let neighbors = [];
    for (let i = 0; i < possible.length; i++) {
        let p = possible[i];
        let row = p[0];
        let col = p[1];
        if (0 <= row && row < m && 0 <= col && col < n) {
            neighbors.push(tiles[row][col]);
        }
    }
    return neighbors;
}

// function to trace the solution of parent node mappings to endpoint
function traceSolution(dct, end) {
    // calculate solution array
    console.log(dct);
    let solution = [];
    let current = end;
    console.log(current);
    while (current != null) {
        solution.push(current);
        current = dct[current];
    }
    // trim and reverse
    solution = solution.slice(1, -1).reverse();
    return solution;
}

// function to animate the solution path
async function animateSolution(tiles, trace) {
    console.log(trace);
    for (let i = 0; i < trace.length; i++) {
        // update tile color
        console.log(trace[i]);
        let splitted = trace[i].split(",");
        let row = splitted[0];
        let col = splitted[1];
        let tile = tiles[row][col];
        tile.color = solutionPathColor;
        // add delay for animation
        await new Promise((resolve) => setTimeout(resolve, 100));
        drawGrid(tiles);
    }
}

function resetBoardSolution(tiles) {
    // we need to reset any non wall tile unless it is an endpoint
    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            let tile = tiles[i][j];
            if (tile.isStart || tile.isTarget) {
                continue;
            }
            if (!tile.isWall) {
                tile.color = backgroundColor;
            }
        }
    } 

}

/*
Start queue
Start visited
Start map to previous node

While queue:
    - pop queue
    - check if popped is end
    - get neighbors
    - validate neighbors
    - add neighbors to queue
    - add to visited
    - add mapping to previous node
*/

async function breadthFirstSearch() {
    // clear board solution if present
    resetBoardSolution(tiles);
    
    // find endpoints
    let start = getStart();
    let end = getEnd();

    console.log(start);
    console.log(end);

    // init arrays
    let queue = [start];
    let visited = new Set();
    visited.add(start);

    // keep track of previous node
    let dct = {};
    dct[start] = null;

    console.log(queue);
    console.log(visited);

    // while loop
    while (queue.length != 0) {
        // pop off
        let popped = queue.shift();
        console.log("popped");
        console.log(popped);

        // collect the neighbors
        let neighbors = getNeighbors(popped);

        // validate the neighbors
        for (let i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            console.log("neighbor");
            console.log(neighbor);

            // check if we found the solution
            if (neighbor == end) {
                console.log("found it");
                // add last node
                dct[neighbor.toString()] = popped.toString();

                // trace solution
                let trace = traceSolution(dct, end.toString());
                // animate solution
                animateSolution(tiles, trace);
                return;
            }

            // check that neighbor is not visited
            if (visited.has(neighbor)) {
                console.log("already visited");
                continue;
            }

            // check if we hit a wall
            if (neighbor.isWall) {
                continue;
            }

            // at this point, the node is good for exploring

            // add to queue
            queue.push(neighbor);

            // add to visited
            visited.add(neighbor);

            // create dictionary mapping here
            // needed to write toString method in tile class for this to work src: https://stackoverflow.com/questions/6307514/is-it-possible-to-override-javascripts-tostring-function-to-provide-meaningfu
            dct[neighbor.toString()] = popped.toString();

            // update color in class to exploring
            neighbor.color = exploreColor;
            drawGrid(tiles);
            // add delay for animation
            await new Promise((resolve) => setTimeout(resolve, 1));
        }
    }
}
