import { library, List, addTaskToList } from "./create-elements.js";
import { deleteList, deleteTask } from "./delete-things.js";

// create a function that adds a list to localStorage's 'library' item
function addListToStorage(listName) {
  List(listName);
  localStorage.setItem("library", JSON.stringify(library));
};

// create a function that adds a task to the given list then
// saves the updated list in localStorage's 'library' item
function addTask (list, taskTitle, description, dueDate, priority) {
  addTaskToList(list, taskTitle, description, dueDate, priority);
  localStorage.setItem("library", JSON.stringify(library))
};

// create a function for deleting a task from the given list and updating the localStorage's "library" item
function deleteStorageTask(list, task) {
  deleteTask(list, task);
  localStorage.setItem("library", JSON.stringify(library));
};

// create a function that deletes a list from localStorage 'library' item
function deleteStorageList(list) {
  // delete the list and then update "library" item in localStorage
  deleteList(list);
  localStorage.setItem("library", JSON.stringify(library));
};

export {addListToStorage, deleteStorageList, addTask, deleteStorageTask}