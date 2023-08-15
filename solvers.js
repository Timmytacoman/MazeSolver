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
        [row + 1, col],
        [row, col + 1],
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
    while(current != null) {
        solution.push(current);
        current = dct[current];
    }
    // trim and reverse
    solution = solution.slice(0, -1).reverse();
    console.log(solution);

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

function breadthFirstSearch() {
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

        // check if we popped the solution
        if (popped == end) {
            console.log("found it");
            console.log(dct);
            // trace solution
            traceSolution(dct, end);
            return;
        }

        // collect the neighbors
        let neighbors = getNeighbors(popped);

        // validate the neighbors
        for (let i = 0; i < neighbors.length; i++) {
            let n = neighbors[i];

            console.log("n");
            console.log(n);

            // check that neighbor is not visited
            if (visited.has(n)) {
                console.log("already visited");
                break;
            }

            // at this point, the node is good for exploring

            // add to queue
            queue.push(n);

            // add to visited
            visited.add(n);

            // create dictionary mapping here
            // needed to write toString method in tile class for this to work src: https://stackoverflow.com/questions/6307514/is-it-possible-to-override-javascripts-tostring-function-to-provide-meaningfu
            dct[n.toString()] = popped.toString();
        }
    }
}
