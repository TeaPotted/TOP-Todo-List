import { library, List } from "./create-elements.js";
import { deleteList } from "./delete-things.js";

// create a function that converts library to a string
function stringLibrary() {
  const stringedLibrary = JSON.stringify(library, function (key, value) {
      if (typeof value === "function") {
        return "" + value;
      } return value
    }
  )
  return stringedLibrary
};


// create a function that adds a list to localStorage's 'library' item
function addListToStorage(listName) {
  List(listName);
  localStorage.setItem("library", stringLibrary());
};

export {addListToStorage}