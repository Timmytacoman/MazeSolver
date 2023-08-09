function tableCreate() {
  const body = document.body;
  const tbl = document.createElement("table");

  for (let i = 0; i < 10; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < 10; j++) {
      const td = tr.insertCell();
      td.id = i + "," + j;
      td.addEventListener("mouseenter", clickMethod);
      // td.addEventListener("click", (event) => {
        // td.textContent = `Click count: ${event.detail}`;
        // console.log(event.altKey)
        // if (event.altKey) {
        //   td.style.backgroundColor = "black";
        // }
        // else {
        //   td.style.backgroundColor = "#96D4D4"
        // }
      // });
    }
  }
  body.appendChild(tbl);
}


function clickMethod(event) {
  console.log(event);
  if(event.buttons == 1) {
    // console.log("left click detected!")
    // console.log(event.srcElement)
    event.srcElement.style.backgroundColor = "black";
  }

  else if (event.altKey) {
    event.srcElement.style.backgroundColor = "#96D4D4";
  }
}


tableCreate();
