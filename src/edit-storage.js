import { library, List, addTaskToList, createButton } from "./create-elements.js";
import {displayLibrary} from "./display-elements.js";
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

// create a function for editting a list's title
function editListTitle(list) {
  // get .titleDiv in the full list view dialog
  const titleDiv = document.querySelector("dialog").querySelector(".titleDiv");
  // get the h2 title element and edit button in titleDiv
  const titleH2 = titleDiv.querySelector("h2");
  const editBtn = titleDiv.querySelector(".editTitle");

  // make titleH2 editable and focus on it
  titleH2.contentEditable = "true"
  titleH2.focus();

  // create a "done" button that set's the lits's title to titleH2's textContent
  const doneBtn = createButton("doneBtn", "Done");
  // create a cancel button for cancelling editting the task's title and append it to titleDiv
  const cancelBtn = createButton("cancelBtn", "Cancel");
  cancelBtn.addEventListener("click", () => {
    // make titleH2 uneditable and make it's textContent back to list's title value
    titleH2.contentEditable = "false";
    titleH2.textContent = list.title;

    // replace doneBtn with editBtn and remove cancelBtn from titleDiv
    doneBtn.replaceWith(editBtn);
    titleDiv.removeChild(cancelBtn);
  })
  titleDiv.append(cancelBtn);

  doneBtn.addEventListener("click", () => {
    list.title = titleH2.textContent; // set list's title to titleH2's textContent
    titleH2.contentEditable = "false"; // make titleH2 uneditable
    // switch doneBtn back to editBtn and remove cancelBtn then display the updated library
    doneBtn.replaceWith(editBtn);
    titleDiv.removeChild(cancelBtn);
    displayLibrary();
  });
  editBtn.replaceWith(doneBtn); // replace editBtn with doneBtn
};

export {addListToStorage, deleteStorageList, addTask, deleteStorageTask}