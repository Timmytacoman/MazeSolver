function tableCreate() {
  const body = document.body;
  const tbl = document.createElement("table");

  for (let i = 0; i < 10; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < 10; j++) {
      const td = tr.insertCell();
      td.id = i + "," + j;
      td.addEventListener("mouseenter", tileEnterEvent);
      td.addEventListener("click", tileClickEvent);
    }
  }
  body.appendChild(tbl);
}


function tileEnterEvent(event) {
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

function tileClickEvent() {
  console.log("hi");
}


tableCreate();
