import {createButton, createElem} from "./create-elements.js"
import { displayLibrary } from "./display-elements.js";
import { displayEditTaskDialog } from "./display-taskForm.js";

// create a function for displaying all of a task's info
function displayTask(task, list) {
  const taskDiv = createElem("div", "task", ""); // this will keep all the task's info (title, description, etc.)
  for (const key in task) { // get each key in the task object
    switch (key) {
      // create a p element for each value and append it to taskDiv
      case "taskTitle":
      case "description":
      case "dueDate":
        const taskInfo = createElem("p", key, task[key]);
        taskDiv.append(taskInfo);
        break;
      
      case "priority":
        const priority = createElem("p", "priority", task[key]);
        taskDiv.append(priority);
        taskDiv.classList.add(task[key]) // add a class of the task's priority value
        
      default: 
        break;
    };
  }

  // create a button for displaying a form to edit the task, then append button to taskDiv
  const editBtn = createButton("editTask", "Edit")
  editBtn.addEventListener("click", () => displayEditTaskDialog(task, list));

  taskDiv.append(editBtn)
  return taskDiv;
};

// create a function for displaying all the tasks in a list
function displayTasks(tasks, list) {
  const tasksContainer = createElem("div", "tasksContainer", "") // this div will keep all the tasks
  
  // for each task in the tasks array, call displayTask() on the task and append it to tasksContainer
  for (const task of tasks) {
    tasksContainer.append(displayTask(task, list));
  }
  return tasksContainer;
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

// create a function that displays a dialog element 
// of the list this function was called on
function viewList(list) {
  // create a dialog element that will display all the list's info
  const dialog = document.createElement("dialog");
  // create a div for the list title and buttons for editting it
  const titleDiv = createElem("div", "titleDiv", "");

  const listTitle = createElem("h2", "title", list.title)  // create a h2 element for the list's title
  titleDiv.append(listTitle);
  
  // create a button for exiting out of the dialog by removing the dialog from the body
  const closeBtn = createElem("button", "close", "X");
  closeBtn.addEventListener("click", () => document.body.removeChild(dialog));

  // append listTitle, displayTasks() on the list's tasks and closeBtn then append dialog to body
  dialog.append(titleDiv, displayTasks(list.tasks, list), closeBtn)
  document.body.appendChild(dialog);
  dialog.showModal(); // open the dialog so it is visible
};

export {viewList}