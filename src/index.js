import "./styles.css"
import {List} from "./create-elements.js";
import {displayLibrary} from "./display-elements.js"
import { addListToStorage } from "./edit-storage.js";


// get #createList and #listTitle buttons
const createListBtn = document.getElementById("createList");
const listTitle = document.getElementById("listTitle");

displayLibrary(); // display the library

// make createListBtn create a new list using listTitle and then display the updated library
createListBtn.addEventListener("click", () => {
  addListToStorage(listTitle.value);
  displayLibrary();
});

// if enter key was clicked on listTitle, create a new list and display the updated library
listTitle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // so it does not submit #newListForm
    addListToStorage(listTitle.value);
    displayLibrary();
  }
});