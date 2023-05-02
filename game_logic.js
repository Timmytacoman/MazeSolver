function test() {

    console.log("here");

    let tbl = document.getElementById("pixelCanvas");


    for(let i = 0; i < 11; i++) {
        let myRow = document.createElement("tr");
        myRow.id = "row" + i;

        tbl.appendChild(myRow);
        let rowW = document.getElementById("row" + i);

        for (let j = 0; j < 11; j++) {
            let myCell = document.createElement("td");
            rowW.appendChild(myCell);
        }

    }

    console.log(tbl);
}
