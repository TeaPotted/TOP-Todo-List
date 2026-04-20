import "./styles.css"
import {List} from "./create-elements.js";
import {displayLibrary} from "./display-elements.js"


// get #createList and #listTitle buttons
const createListBtn = document.getElementById("createList");
const listTitle = document.getElementById("listTitle");

displayLibrary(); // display the library

// make createListBtn create a new list using listTitle and then display the updated library
createListBtn.addEventListener("click", () => {
  List(listTitle.value);
  displayLibrary();
});