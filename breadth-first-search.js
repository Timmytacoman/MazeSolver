//   var queue = [];
//   queue.push(2);         // queue is now [2]
//   queue.push(5);         // queue is now [2, 5]
//   var i = queue.shift(); // queue is now [5]
//   alert(i);              // displays 2

function bfs(tiles, start) {
  console.log("starting BFS");
  console.log(tiles);
  // we have access to grid here

  // locate starting position

  var queue = [start.id];
  var visited = [start.id];

  // while the queue is not empty
  while (queue.length != 0) {
    console.log("here");
    console.log(queue);
    console.log("visited");
    console.log(visited);

    // pop off the top item
    var item = queue.shift();
    // console.log(item);

    const splitted = item.split(",");
    // console.log(splitted);
    let row = parseInt(splitted[0]);
    let col = parseInt(splitted[1]);
    console.log(row, col);

    // find surrounding items
    let left = [row, col - 1];
    let right = [row, col + 1];
    let top = [row - 1, col];
    let bottom = [row + 1, col];

    let surrounding = [left, top, right, bottom];
    console.log(surrounding);

    for (let i = 0; i < surrounding.length; i++) {
      let currentTile = surrounding[i];
      console.log(currentTile);
      let row = currentTile[0];
      let col = currentTile[1];
      console.log(row, col);

      // determine if currentTile is within boundaries
      if (row >= 0 && row < n && col >= 0 && col < m) {
        console.log("in bounds");

        // check if tile is target
        if (tiles[row][col] == 3) {
          console.log("found it!");
          return;
        }

        // determine if currentTile has already been visited
        let value = row + "," + col;
        console.log(value);
        if (!visited.includes(value)) {
          console.log("not yet visited");
          // determine if currentTile is at the wall
          if (tiles[row][col] == 0) {
            console.log("not at a wall");

            // valid search location
            // add to queue
            queue.push(value);
            // add to visited
            visited.push(value);
            // change color of tile
            // get the tile
            console.log(value);
            console.log("see above");
            displayTile = document.getElementById(value);
            displayTile.style.backgroundColor = "white";
          } else {
            console.log("at a wall");
          }
        } else {
          console.log("already visited!");
        }
      } else {
        console.log("outside of bounds");
      }
    }

    // console.log(directions);
  }

  console.log("done");
}
