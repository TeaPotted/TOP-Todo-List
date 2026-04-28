import { library } from "./create-elements.js";

// create a function that adds a list to localStorage's 'library' item
function addListToStorage(listName) {
  List(typeof(listName));
  localStorage.setItem("library", JSON.stringify(library));
};

// create a function that deletes a list from localStorage 'library' item
function deleteStorageList(list) {
  
};

export {addListToStorage}