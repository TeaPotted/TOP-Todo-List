import { library } from "./create-elements.js";
import { displayLibrary } from "./display-elements.js"
import { viewList } from "./display-full-list.js";

// create a function that deletes the given list
function deleteList(list) {
  // get the index of list in library then remove that the list from library
  const listIndex = library.findIndex(li => li.id === list.id);
  library.splice(listIndex, 1); // removes the list from library
  displayLibrary() // display the updated library
};

// create a function that deletes tasks from a list
function deleteTask(list, task) {
  let tasks = Object.values(list.tasks);
  const taskIndex = tasks.findIndex(t => t === task);
  tasks.splice(taskIndex, 1);
  list.tasks = tasks;
  // remove the full list view dialog
  document.body.removeChild(document.querySelector("dialog"));
  viewList(list)
  displayLibrary();
};

export {deleteList, deleteTask}